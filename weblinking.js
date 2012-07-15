/**
 * This module is able to parse RFC5988 Web Linking link values, such as those
 * found in the HTTP link header. It's main export is the parse function which
 * returns an object with prototype linkPrototype. The link object contains the
 * link's URI-Reference, plus additional link parameters. Link parameters are
 * expressed as a tuple of {value, charset, language} in order to capture
 * extended parameters such as the extended variant of "title". Unfortunately it
 * isn't possible to obtain the link header associated with the current loaded
 * page, but this module can be used in conjunction with the XMLHttpRequest
 * getResponseHeader function.
 * 
 * Note that this is parser rather than a validator. Invalid headers may still
 * be accepted.
 * 
 * @module weblinking
 * 
 * Copyright Benjamin Carlyle 2012. See accompanying UNLICENSE file.
 */
var weblinking = (function () {
	"use strict";
	/*jslint regexp: true */
	/*properties
	charset, create, exec, getLinkValuesByRel, language, length, linkPrototype,
	linkvalue, media, parse, push, rel, replace, run, test, title, urireference,
	value, indexOf
	*/
	// Private
	var linkValueRegex = /^\s*<\s*([^>]*)\s*>\s*(,|;|$)/, linkParamRegex = /^\s*((([^=*]*)\s*=\s*(("\s*([^"]*)\s*")|([^\s",;]*)))|(([^=*]*)\*\s*=\s*([^',;]*)'([^',;]*)'([^',;]*)))\s*(,|;|$)/, emptyRegex = /^\s*$/;

	return {
		// Public

		linkPrototype : {
			/**
			 * Returns the link-values that match the nominated rel value
			 * 
			 * @param{rel} The link relation to search for
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
		 * @alias weblinking:parse
		 * @returns an object with structure { linkvalue: [ { urireference:
		 *          string, parmname: { value: string, charset: string,
		 *          language: string }, ... ] } where one instance of the
		 *          parmname structure is created for each link-param. The
		 *          returned object's prototype is linkPrototype. By default
		 *          charset is US-ASCII and language is "". If extended
		 *          parameters are used the values are taken from the
		 *          parameters. prototype
		 */
		parse : function (header) {
			var link, linkvalue, fields, obj;

			link = Object.create(this.linkPrototype);
			link.linkvalue = [];

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
				link.linkvalue.push(linkvalue);
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
						obj = {};
						obj.value = fields[7];
						obj.charset = "US-ASCII";
						obj.language = "";
						linkvalue[fields[3]] = obj;
					}
					if (fields[6] !== undefined) {
						// This is a quoted value
						obj = {};
						obj.value = fields[6];
						obj.charset = "US-ASCII";
						obj.language = "";
						linkvalue[fields[3]] = obj;
					}
					if (fields[8] !== undefined) {
						// This is an extension value
						obj = {};
						obj.value = decodeURIComponent(fields[12]);
						obj.charset = fields[10];
						obj.language = fields[11];
						linkvalue[fields[9]] = obj;
					}
					header = header.replace(linkParamRegex, "");

				} while (fields[13] === ";");
			}

			return link;
		}
	};
}());
