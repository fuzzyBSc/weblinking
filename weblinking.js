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
 * @module weblinking
 * 
 * Copyright Benjamin Carlyle 2012. See accompanying UNLICENSE file. 
 */
var weblinking = (function() {
	// Assert code sourced from
	// http://aymanh.com/9-javascript-tips-you-may-not-know/#assertion
	var AssertException = function(message) {
		this.message = message;
	};
	AssertException.prototype.toString = function() {
		return 'AssertException: ' + this.message;
	};

	var assert = function(exp, message) {
		if (!exp) {
			throw new AssertException(message);
		}
	};

	// Private
	var linkValueRegex = /^\s*<\s*([^>]*)\s*>\s*(,|;|$)/;
	var linkParamRegex = /^\s*((([^=*]*)\s*=\s*(("\s*([^"]*)\s*")|([^\s",;]*)))|(([^=*]*)\*\s*=\s*([^',;]*)'([^',;]*)'([^',;]*)))\s*(,|;|$)/;
	var emptyRegex = /^\s*$/;

	return {
		// Public

		linkPrototype : {
			/** Returns the link-values that match the nominated rel value
			 * @param{rel} The link relation to search for
			 */
			getLinkValuesByRel : function(rel) {
				var result = [];
				for ( var ii = 0; ii != this.linkvalue.length; ++ii) {
					if (this.linkvalue[ii].rel.value === rel)
						result.push(this.linkvalue[ii]);
				}
				return result;
			}
		},

		test : (function() {
			return {
				run : function() {
					var link = weblinking.parse("<http://example.com/;;;,,,>;"
							+ " rel=\"next;;;,,,\";" + " media=text/html;"
							+ " title*=UTF-8'de'N%c3%a4chstes%20Kapitel");
					var rel = link.getLinkValuesByRel("next;;;,,,");
					assert(rel.length === 1);
					assert(rel[0].urireference === "http://example.com/;;;,,,");
					assert(rel[0].rel.value === "next;;;,,,");
					assert(rel[0].rel.charset === "US-ASCII");
					assert(rel[0].rel.language === "");
					assert(rel[0].media.value === "text/html");
					assert(rel[0].media.charset === "US-ASCII");
					assert(rel[0].media.language === "");
					assert(rel[0].title.value === decodeURIComponent("N\u00E4chstes Kapitel"));
					assert(rel[0].title.charset === "UTF-8");
					assert(rel[0].title.language === "de");
				}
			};
		})(),

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
		parse : function(header) {
			var link = Object.create(this.linkPrototype);
			link.linkvalue = [];

			var linkvalue;
			var fields;
			var obj;
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
					var fields = linkParamRegex.exec(header);
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
})();

weblinking.test.run();
