// These tests are adapted from: http://greenbytes.de/tech/tc/httplink/
// Used with permission. See email from Julian Reschke <julian.reschke@gmx.de>
// to Benjamin Carlyle <benjamincarlyle@soundadvice.id.au> dated 31 July 2012 17:15

/*global module, test */
module("greenbytes");

test("simplecssreversed - this test should fail to parse", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("rel=stylesheet; <fail.css>");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 0, "wrong count");
});

test("simplecsssq - this test should fail to parse", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<fail.css>; rel='stylesheet'");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 0, "wrong count");
});

test("simplecssmrel", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; rel=\"foobar stylesheet\"");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].rel.value, "foobar stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
	rel = link.getLinkValuesByRel("foobar");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].rel.value, "foobar stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecssmlink", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<foo>; rel=bar, <simple.css>; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
	rel = link.getLinkValuesByRel("bar");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "foo", "wrong uri");
	strictEqual(rel[0].rel.value, "bar", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/foo", "wrong resovled URI");
});

test("simplecssanchr", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<fail.css>; anchor=\"http://example.com/\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "fail.css", "wrong uri");
	strictEqual(rel[0].anchor.value, "http://example.com/", "wrong anchor");
	strictEqual(rel[0].anchor.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].anchor.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://example.com/fail.css", "wrong resovled URI");
});

test("simplecssanchrsame", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; anchor=\"\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].anchor.value, "", "wrong anchor");
	strictEqual(rel[0].anchor.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].anchor.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecssanchrsame2", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; anchor=\"\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].anchor.value, "", "wrong anchor");
	strictEqual(rel[0].anchor.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].anchor.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecssanchrsamefrag", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<fail.css>; anchor=\"#foo\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "fail.css", "wrong uri");
	strictEqual(rel[0].anchor.value, "#foo", "wrong anchor");
	strictEqual(rel[0].anchor.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].anchor.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/fail.css", "wrong resovled URI");
});

test("simplecssanchrsamefrag2", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<fail.css>; anchor=\"#foo\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "fail.css", "wrong uri");
	strictEqual(rel[0].anchor.value, "#foo", "wrong anchor");
	strictEqual(rel[0].anchor.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].anchor.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/fail.css", "wrong resovled URI");
});

test(" simplexslttypenotype", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.xslt>; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.xslt", "wrong uri");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.xslt", "wrong resovled URI");
});

test("simplexslttypedepr", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.xslt>; rel=stylesheet; type=\"text/xsl\"");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.xslt", "wrong uri");
	strictEqual(rel[0].type.value, "text/xsl", "wrong type");
	strictEqual(rel[0].type.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].type.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.xslt", "wrong resovled URI");
});

test("simplexslttypedepr2", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.xslt.asis>; rel=stylesheet; type=\"text/xsl\"");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.xslt.asis", "wrong uri");
	strictEqual(rel[0].type.value, "text/xsl", "wrong type");
	strictEqual(rel[0].type.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].type.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.xslt.asis", "wrong resovled URI");
});

test("simplexslttypeoff", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.xslt>; rel=stylesheet; type=\"application/xslt+xml\"");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.xslt", "wrong uri");
	strictEqual(rel[0].type.value, "application/xslt+xml", "wrong type");
	strictEqual(rel[0].type.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].type.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.xslt", "wrong resovled URI");
});

test("simplecsstitle", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; rel=stylesheet; title=\"A simple CSS stylesheet\"");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].title.value, "A simple CSS stylesheet", "wrong title");
	strictEqual(rel[0].title.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecsstitleq", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; rel=stylesheet; title=\"title with a DQUOTE \\\" and backslash: \\\\\"");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].title.value, "title with a DQUOTE \" and backslash: \\", "wrong title");
	strictEqual(rel[0].title.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecsstitleq2", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; title=\"title with a DQUOTE \\\" and backslash: \\\\\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].title.value, "title with a DQUOTE \" and backslash: \\", "wrong title");
	strictEqual(rel[0].title.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecsstitletok", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; rel=stylesheet; title=AsimpleCSSstylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].title.value, "AsimpleCSSstylesheet", "wrong title");
	strictEqual(rel[0].title.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecsstitle5987", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; rel=stylesheet; title*=UTF-8''stylesheet-%E2%82%AC");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].title.value, "stylesheet-\u20AC", "wrong title");
	strictEqual(rel[0].title.charset, "UTF-8", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecsstitle5987r", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; title*=UTF-8''stylesheet-%E2%82%AC; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].title.value, "stylesheet-\u20AC", "wrong title");
	strictEqual(rel[0].title.charset, "UTF-8", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecsstitle5987iso88591", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; title*=iso-8859-1''stylesheet-%E4; title=\"fallback title\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	/* We don't support non-UTF-8 encodings.
	strictEqual(rel[0].title.value, "stylesheet-\u00E4", "wrong title");
	strictEqual(rel[0].title.charset, "iso8859-1", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	*/
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecsstitle5987noenc", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; title*=''A%20simple%20CSS%20stylesheet; title=\"fallback title\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].title.value, "fallback title", "wrong title");
	strictEqual(rel[0].title.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecsstitle5987invenc", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; title*=foobar''A%20simple%20CSS%20stylesheet; title=\"fallback title\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].title.value, "fallback title", "wrong title");
	strictEqual(rel[0].title.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecsstitle5987parseerror", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; title*=foobar; title=\"fallback title\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].title.value, "fallback title", "wrong title");
	strictEqual(rel[0].title.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecsstitle5987parseerror2", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; title*=UTF-8''foobar%; title=\"fallback title\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].title.value, "fallback title", "wrong title");
	strictEqual(rel[0].title.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].title.language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simpleext", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; ext=foo; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	// "ext" is quoted here for the benefit of the closure compiler
	strictEqual(rel[0]["ext"].value, "foo", "wrong ext");
	strictEqual(rel[0]["ext"].charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0]["ext"].language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simpleextq", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; ext=\"\\\"\"; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	//"ext" is quoted here for the benefit of the closure compiler
	strictEqual(rel[0]["ext"].value, "\"", "wrong ext");
	strictEqual(rel[0]["ext"].charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0]["ext"].language, "", "wrong language");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simpleexta", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; ext1='start; rel=stylesheet; ext2=end'");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	//"ext" is quoted here for the benefit of the closure compiler
	strictEqual(rel[0]["ext1"].value, "'start", "wrong ext1");
	strictEqual(rel[0]["ext1"].charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0]["ext1"].language, "", "wrong language");
	strictEqual(rel[0]["ext2"].value, "end'", "wrong ext2");
	strictEqual(rel[0]["ext2"].charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0]["ext2"].language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simpleextrel", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<simple.css>; rel=\"http://example.com/myrel stylesheet\"");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].rel.value, "http://example.com/myrel stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	rel = link.getLinkValuesByRel("http://example.com/myrel");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].rel.value, "http://example.com/myrel stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecss2", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<ybg.css>; rel=stylesheet, <simple.css>; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 2, "wrong count");
	strictEqual(rel[0].urireference, "ybg.css", "wrong uri");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/ybg.css", "wrong resovled URI");
	strictEqual(rel[1].urireference, "simple.css", "wrong uri");
	strictEqual(rel[1].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[1].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[1].rel.language, "", "wrong language");
	strictEqual(rel[1].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
});

test("simplecssafterother", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};

	var link = weblinking.parse("<ybf.css>; rel=foobar, <simple.css>; rel=stylesheet");
	var rel = link.getLinkValuesByRel("stylesheet");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "simple.css", "wrong uri");
	strictEqual(rel[0].rel.value, "stylesheet", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/simple.css", "wrong resovled URI");
	rel = link.getLinkValuesByRel("foobar");
	strictEqual(rel.length, 1, "wrong count");
	strictEqual(rel[0].urireference, "ybf.css", "wrong uri");
	strictEqual(rel[0].rel.value, "foobar", "wrong rel");
	strictEqual(rel[0].rel.charset, "US-ASCII", "wrong charset");
	strictEqual(rel[0].rel.language, "", "wrong language");
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://base.example.com/ybf.css", "wrong resovled URI");
});

