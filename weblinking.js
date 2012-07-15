/**
 * This module is able to parse RFC5988 Web Linking link values, such as those
 * found in the HTTP link header. It's main export is the parse function which
 * returns a Link object. The Link object is a list of links, each containing a
 * URI-Reference, plus additional link parameters. Link parameters are
 * expressed as a tuple of {value, charset, language} in order to capture
 * extended parameters such as the extended variant of "title". Unfortunately it
 * isn't possible to obtain the link header associated with the current loaded
 * page, but this module can be used in conjunction with the XMLHttpRequest
 * getResponseHeader function.
 * 
 * Note that this is a parser rather than a validator. Invalid headers may still
 * be accepted.
 * 
 * Copyright Benjamin Carlyle 2012. See accompanying UNLICENSE file.
 * 
 * @author <a href="http://soundadvice.id.au/blog/">Benjamin Carlyle</a>
 * @namespace
 */
var weblinking = (function () {
	"use strict";
	/*jslint regexp: true */
	/*properties
	Link, LinkParam, LinkValue, charset, create, exec, getLinkValuesByRel,
	indexOf, language, length, linkvalue, parse, push, rel, replace, test,
	urireference, value, weblinking
	*/
	var
		/** @private @type regex */
		linkValueRegex = /^\s*<\s*([^>]*)\s*>\s*(,|;|$)/,
		/** @private @type regex */
		linkParamRegex = /^\s*((([^=*]*)\s*=\s*(("\s*([^"]*)\s*")|([^\s",;]*)))|(([^=*]*)\*\s*=\s*([^',;]*)'([^',;]*)'([^',;]*)))\s*(,|;|$)/,
		/** @private @type regex */
		emptyRegex = /^\s*$/;

	/**
	 * @scope weblinking
	 */
	return {
		// Public

		/** A single link-param
		 * @param {!string} value The value of the parameter
		 * @param {!string} [charset] The charset of the parameter
		 * @param {!string} [language] The language of the parameter
		 * @namespace
		 */
		LinkParam : function (value, charset, language) {
			var that = {};
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
			that.charset = charset || "US-ASCII";
			/** The language of the link parameter
			 * @name weblinking.LinkParam.language
			 * @type !string
			 * @default ""
			 */
			that.language = language || "";
			return that;
		},

		/**
		 * A single link-value.
		 * 
		 * The fixed urireference field is always available. Other fields of
		 * type weblinking.LinkParam are added directly as fields.
		 * @param {!string} urireference The URI-Reference for this link-value
		 * @namespace
		 */
		LinkValue : function (urireference) {
			var that = {};
			/** The uri reference of the link-value
			 * @name weblinking.LinkValue.urireference
			 * @type !string
			 */
			that.urireference = urireference;
			return that;
		},

		/** A set of link-values
		 * @namespace
		 * */
		Link : {
			/**
			 * Returns the link-values that match the nominated rel value
			 * 
			 * @param {!string} rel The link relation to search for
			 * @return {!weblinking.LinkValue[]} The set of link-values corresponding to rel
			 */
			getLinkValuesByRel : function (rel) {
				var result = [], ii, length, expandedrel, expandedvalue;
				expandedrel = ' ' + rel + ' ';
				for (ii = 0, length = this.linkvalue.length; ii < length; ii += 1) {
					expandedvalue = ' ' + this.linkvalue[ii].rel.value + ' ';
					if (expandedvalue.indexOf(expandedrel) >= 0) {
						result.push(this.linkvalue[ii]);
					}
				}
				return result;
			}
		},

		/**
		 * Parse the nominated link header
		 * 
		 * @function
		 * 
		 * @param {!string} header The text of the Link header
		 * 
		 * @returns {!weblinking.Link} The parsed header information.
		 */
		parse : function (header) {
			var result, linkvalue, fields, obj;

			result = Object.create(this.Link);
			/** The set of link values
			 * @name weblinking.Link.linkvalue
			 * @type !weblinking.LinkValue[]
			 */
			result.linkvalue = [];

			while (!emptyRegex.test(header)) {
				// Loop over link-values

				// Look for URI-Reference
				fields = linkValueRegex.exec(header);
				if (fields === null) {
					// Invalid URI-Reference
					throw "Parse error while reading URI Reference in link header "
							+ header;
				}
				linkvalue = {};
				result.linkvalue.push(linkvalue);
				linkvalue.urireference = fields[1];
				header = header.replace(linkValueRegex, "");

				do {
					// Loop over fields within the link-value
					// Note that we currently only support quoted and unquoted
					// fields - not ext-value
					fields = linkParamRegex.exec(header);
					if (fields === null) {
						// Invalid parameter
						throw "Parse error while reading parameter in link header "
								+ header;
					}
					if (fields[7] !== undefined) {
						// This is an unquoted value
						obj = weblinking.LinkParam(fields[7]);
						linkvalue[fields[3]] = obj;
					}
					if (fields[6] !== undefined) {
						// This is a quoted value
						obj = weblinking.LinkParam(fields[6]);
						linkvalue[fields[3]] = obj;
					}
					if (fields[8] !== undefined) {
						// This is an extension value
						obj = weblinking.LinkParam(decodeURI(fields[12]),
								fields[10], fields[11]);
						linkvalue[fields[9]] = obj;
					}
					header = header.replace(linkParamRegex, "");

				} while (fields[13] === ";");
			}

			return result;
		}
	};
}());

window['weblinking'] = weblinking;
