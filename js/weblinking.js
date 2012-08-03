/**
 * This module is able to parse RFC5988 Web Linking link values, such as those
 * found in the HTTP link header. It's main export is the parse function which
 * returns a Link object. The Link object is a list of links, each containing a
 * URI-Reference, plus additional link parameters. Link parameters are expressed
 * as a tuple of {value, charset, language} in order to capture extended
 * parameters such as the extended variant of "title". Unfortunately it isn't
 * possible to obtain the link header associated with the current loaded page.
 * We must depend on the browser inserting &lt;link&gt; elements into the DOM
 * for access to this information.This module can be used in conjunction with
 * the XMLHttpRequest getResponseHeader function.
 * 
 * Note that this is a parser rather than a validator. Invalid headers may still
 * be accepted.
 * 
 * Bugs:
 * <ul>
 * <li>All extended parameters must be encoded in US-ASCII or UTF-8 (ie subsets
 * of UTF-8). Other encodings break the javascript decodeURI function.</li>
 * <li>Because the properties of a link are referred to by string names within
 * this code, the advanced optimisations mode of the closure compiler may
 * require them to be referred to the same way by code outside of weblinking.js
 * to avoid incorrect renaming. The simple optimisations mode does not suffer
 * this problem.</li>
 * </ul>
 * 
 * Copyright Benjamin Carlyle 2012. See accompanying UNLICENSE file.
 * 
 * @author <a href="http://soundadvice.id.au/blog/">Benjamin Carlyle</a>
 * @namespace
 */
var weblinking = (function () {
	'use strict';
	/*properties
	Link, LinkParam, LinkValue, charset, create, exec, getLinkValuesByRel,
	indexOf, language, length, linkvalue, parse, push, rel, replace, test,
	urireference, value, weblinking
	*/
	var
		/** @private @type regex */
		linkRegex = /^\s*<\s*([^>]*)\s*>\s*(,|;|$)/,
		/** @private @type regex */
		paramRegex = /^\s*((([a-zA-Z0-9!#$&+-.\^_`|~]*)\s*=\s*(("\s*((([^"\\])|(\\.))*)\s*")|([!#$%&'()*+-.\/0-9:<=>?@a-zA-Z\[\]\^_`{|}~]*)))|(([a-zA-Z0-9!#$&+-.\^_`|~]*)\*\s*=\s*([^',;]*)'([^',;]*)'([^',;]*)))\s*(,|;|$)/,
		/** @private @type regex */
		skipLinkRegex = /^[^,]*(,|$)/,
		/** @private @type regex */
		skipParamRegex = /^[^,;]*(,|;|$)/,
		/** @private @type regex */
		emptyRegex = /^\s*$/;

	var LinkParamProto = {
			toString: function () {
				return this.value;
			}
		};

	var LinkValueProto = {
			/**
			 * Resolve the link URI Reference, relative to the specified Uri
			 * object.
			 * 
			 * The code for the resolve function depends upon the closure
			 * library, or a similar object. Specifically the object must have a
			 * resolve function that accepts a string and returns an object of
			 * the same type.
			 * 
			 * @name weblinking.LinkValue.resolve
			 * @param baseURI
			 *            The absolute URI to resolve this relative URI against
			 * @param resolver
			 *            A resolver function(baseURI, relativeURI). This
			 *            function is required to accept a base URI of the type
			 *            passed into resolve plus a string parameter, and
			 *            return a type consistent that can be passed into the
			 *            resolver again.
			 * @returns The resolved URI as returned from resolver
			 */
			resolve: function (baseURI, resolver) {
				if (this.anchor !== undefined) {
					baseURI = resolver(baseURI, this.anchor.toString());
				}
				return resolver(baseURI, this.urireference);
			}
		};

	var stripslasshes = function (str) {
		// From: http://phpjs.org/functions/stripslashes:537
	    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +   improved by: Ates Goral (http://magnetiq.com)
	    // +      fixed by: Mick@el
	    // +   improved by: marrtins
	    // +   bugfixed by: Onno Marsman
	    // +   improved by: rezna
	    // +   input by: Rick Waldron
	    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
	    // +   input by: Brant Messenger (http://www.brantmessenger.com/)
	    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
	    // *     example 1: stripslashes('Kevin\'s code');
	    // *     returns 1: "Kevin's code"
	    // *     example 2: stripslashes('Kevin\\\'s code');
	    // *     returns 2: "Kevin\'s code"
	    return (str + '').replace(/\\(.?)/g, function (s, n1) {
	        switch (n1) {
	        case '\\':
	            return '\\';
	        case '0':
	            return '\u0000';
	        case '':
	            return '';
	        default:
	            return n1;
	        }
	    });
	};

	return {
		// Public

		/** A single link-param
		 * @name weblinking.LinkParam
		 * @param {!string} value The value of the parameter.
		 * @param {!string} [charset] The charset of the parameter.
		 * @param {!string} [language] The language of the parameter.
		 * @namespace
		 */
		LinkParam: function (value, charset, language) {
			var that = Object.create(LinkParamProto);
			/** The value of the link parameter (decoded if ext-value)
			 * @name weblinking.LinkParam.value
			 * @type !string
			 */
			that.value = value;
			/** The charset of the link parameter
			 * @name weblinking.LinkParam.charset
			 * @type !string
			 * @default US-ASCII
			 */
			that.charset = charset || 'US-ASCII';
			/** The language of the link parameter
			 * @name weblinking.LinkParam.language
			 * @type !string
			 * @default ""
			 */
			that.language = language || '';
			return that;
		},

		/**
		 * A single link-value.
		 *
		 * The fixed urireference field is always available. Other fields of
		 * type weblinking.LinkParam are added directly as fields.
		 * @name weblinking.LinkValue
		 * @param {!string} urireference The URI-Reference for this link-value.
		 * @namespace
		 */
		LinkValue: function (urireference) {
			var that = Object.create(LinkValueProto);
			/** The uri reference of the link-value
			 * @name weblinking.LinkValue.urireference
			 * @type !string
			 */
			that.urireference = urireference;
			return that;
		},

		/** A set of link-values
		 * @name weblinking.Link
		 * @namespace
		 * */
		Link: {
			/**
			 * Returns the link-values that match the nominated rel value
			 *
			 * @param {!string} rel The link relation to search for.
			 * @return {!weblinking.LinkValue[]} The set of link-values corresponding to rel.
			 */
			getLinkValuesByRel: function (rel) {
				var result = [], ii, length, expandedrel, expandedvalue;
				expandedrel = ' ' + rel + ' ';
				for (ii = 0, length = this.linkvalue.length; ii < length; ii += 1) {
					if (this.linkvalue[ii].rel !== undefined) {
						expandedvalue = ' ' + this.linkvalue[ii].rel.value + ' ';
						if (expandedvalue.indexOf(expandedrel) >= 0) {
							result.push(this.linkvalue[ii]);
						}
					}
				}
				return result;
			}
		},

		/**
		 * Parse the nominated link header
		 *
		 * @name weblinking.parse
		 * @function
		 *
		 * @param {!string} header The text of the Link header.
		 *
		 * @return {!weblinking.Link} The parsed header information.
		 */
		parse: function (header) {
			var result, linkvalue, fields, obj, matched, keepLooping, urireference;

			result = Object.create(this.Link);
			/** The set of link values
			 * @name weblinking.Link.linkvalue
			 * @type !weblinking.LinkValue[]
			 */
			result.linkvalue = [];

			var linkFunc = function (all, uriref, endToken) {
				matched = true;
				if (uriref !== undefined) {
					// Look for URI-Reference
					urireference = uriref;
				}
				keepLooping = (endToken === ';');
				return '';
			};

			var paramFunc = function (all, e1, e2, parmname, e4, e5, doubleQuotedValue, e7, e8, e9, unquotedValue, e11, extparmname, extcharset, extlanguage, extvalue, endToken) {
				matched = true;
				if (unquotedValue !== undefined) {
					// This is an unquoted value
					obj = weblinking.LinkParam(unquotedValue);
					linkvalue[parmname] = obj;
				} else if (doubleQuotedValue !== undefined) {
					// This is a double-quoted value
					obj = weblinking.LinkParam(stripslasshes(doubleQuotedValue));
					linkvalue[parmname] = obj;
				} else if (extvalue !== undefined) {
					try {
						// This is an extension value
						obj = weblinking.LinkParam(decodeURI(extvalue),
								extcharset, extlanguage);
						linkvalue[extparmname] = obj;
					}
					catch (err)
					{
						// There was most likely a character encoding issue.
						// We continue and hope for the best.
					}
				}
				keepLooping = (endToken === ';');
				return '';
			};

			var skipFunc = function (all, endToken) {
				matched = true;
				keepLooping = (endToken === ';');
				return '';
			};

			while (!emptyRegex.test(header)) {
				// Loop over link-values
				keepLooping = false;
				matched = false;

				header = header.replace(linkRegex, linkFunc);

				if (!matched) {
					// Invalid link
					// Skip past the next comma.
					header = header.replace(skipLinkRegex, skipFunc);

					if (!matched) {
						// It looks like even that attempt didn't match. Abandon all further processing.
						header = '';
					}
					continue;
				}
				
				linkvalue = weblinking.LinkValue(urireference);
				result.linkvalue.push(linkvalue);

				while (keepLooping) {
					// Loop over fields within the link-value
					keepLooping = false;
					matched = false;
					header = header.replace(paramRegex, paramFunc);
					if (!matched) {
						// Invalid parameter
						// Skip past the next comma or colon.
						header = header.replace(skipParamRegex, skipFunc);

						if (!matched) {
							// It looks like even that attempt didn't match. Abandon all further processing.
							header = '';
						}
					}
				}
			}

			return result;
		}
	};
}());
