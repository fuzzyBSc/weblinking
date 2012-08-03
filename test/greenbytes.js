// These tests are adapted from: http://greenbytes.de/tech/tc/httplink/
// Used with permission. See email from Julian Reschke <julian.reschke@gmx.de>
// to Benjamin Carlyle <benjamincarlyle@soundadvice.id.au> dated 31 July 2012 17:15

var baseURI = new URI("http://base.example.com/test.html");
var resolver = function(baseURI, relative) {
	var relativeURI = new URI(relative);
	return relativeURI.resolve(baseURI);
}

//simplecssreversed - this test should fail to parse
link = weblinking.parse("rel=stylesheet; <fail.css>")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 0) throw "wrong count";

//simplecsssq - this test should fail to parse
link = weblinking.parse("<fail.css>; rel='stylesheet'")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 0) throw "wrong count";

//simplecssmrel
link = weblinking.parse("<simple.css>; rel=\"foobar stylesheet\"")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].rel.value !== "foobar stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";
rel = link.getLinkValuesByRel("foobar");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].rel.value !== "foobar stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecssmlink
link = weblinking.parse("<foo>; rel=bar, <simple.css>; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";
rel = link.getLinkValuesByRel("bar");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "foo") throw "wrong uri";
if (rel[0].rel.value !== "bar") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/foo") throw "wrong resovled URI";

//simplecssanchr
link = weblinking.parse("<fail.css>; anchor=\"http://example.com/\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "fail.css") throw "wrong uri";
if (rel[0].anchor.value!== "http://example.com/") throw "wrong anchor";
if (rel[0].anchor.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].anchor.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://example.com/fail.css") throw "wrong resovled URI";

//simplecssanchrsame
link = weblinking.parse("<simple.css>; anchor=\"\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].anchor.value!== "") throw "wrong anchor";
if (rel[0].anchor.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].anchor.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecssanchrsame2
link = weblinking.parse("<simple.css>; anchor=\"\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].anchor.value!== "") throw "wrong anchor";
if (rel[0].anchor.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].anchor.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecssanchrsamefrag
link = weblinking.parse("<fail.css>; anchor=\"#foo\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "fail.css") throw "wrong uri";
if (rel[0].anchor.value!== "#foo") throw "wrong anchor";
if (rel[0].anchor.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].anchor.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/fail.css") throw "wrong resovled URI";

//simplecssanchrsamefrag2
link = weblinking.parse("<fail.css>; anchor=\"#foo\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "fail.css") throw "wrong uri";
if (rel[0].anchor.value!== "#foo") throw "wrong anchor";
if (rel[0].anchor.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].anchor.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/fail.css") throw "wrong resovled URI";

// simplexslttypenotype
link = weblinking.parse("<simple.xslt>; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.xslt") throw "wrong uri";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.xslt") throw "wrong resovled URI";

//simplexslttypedepr
link = weblinking.parse("<simple.xslt>; rel=stylesheet; type=\"text/xsl\"")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.xslt") throw "wrong uri";
if (rel[0].type.value !== "text/xsl") throw "wrong type";
if (rel[0].type.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].type.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.xslt") throw "wrong resovled URI";

//simplexslttypedepr2
link = weblinking.parse("<simple.xslt.asis>; rel=stylesheet; type=\"text/xsl\"")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.xslt.asis") throw "wrong uri";
if (rel[0].type.value !== "text/xsl") throw "wrong type";
if (rel[0].type.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].type.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.xslt.asis") throw "wrong resovled URI";

//simplexslttypeoff
link = weblinking.parse("<simple.xslt>; rel=stylesheet; type=\"application/xslt+xml\"")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.xslt") throw "wrong uri";
if (rel[0].type.value !== "application/xslt+xml") throw "wrong type";
if (rel[0].type.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].type.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.xslt") throw "wrong resovled URI";

//simplecsstitle
link = weblinking.parse("<simple.css>; rel=stylesheet; title=\"A simple CSS stylesheet\"")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].title.value !== "A simple CSS stylesheet") throw "wrong title";
if (rel[0].title.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecsstitleq
link = weblinking.parse("<simple.css>; rel=stylesheet; title=\"title with a DQUOTE \\\" and backslash: \\\\\"")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].title.value !== "title with a DQUOTE \" and backslash: \\") throw "wrong title";
if (rel[0].title.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecsstitleq2
link = weblinking.parse("<simple.css>; title=\"title with a DQUOTE \\\" and backslash: \\\\\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].title.value !== "title with a DQUOTE \" and backslash: \\") throw "wrong title";
if (rel[0].title.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecsstitletok
link = weblinking.parse("<simple.css>; rel=stylesheet; title=AsimpleCSSstylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].title.value !== "AsimpleCSSstylesheet") throw "wrong title";
if (rel[0].title.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecsstitle5987
link = weblinking.parse("<simple.css>; rel=stylesheet; title*=UTF-8''stylesheet-%E2%82%AC")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].title.value !== "stylesheet-\u20AC") throw "wrong title";
if (rel[0].title.charset !== "UTF-8") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecsstitle5987r
link = weblinking.parse("<simple.css>; title*=UTF-8''stylesheet-%E2%82%AC; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].title.value !== "stylesheet-\u20AC") throw "wrong title";
if (rel[0].title.charset !== "UTF-8") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecsstitle5987iso88591
link = weblinking.parse("<simple.css>; title*=iso-8859-1''stylesheet-%E4; title=\"fallback title\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
/* We don't support non-UTF-8 encodings.
if (rel[0].title.value !== "stylesheet-\u00E4") throw "wrong title";
if (rel[0].title.charset !== "iso8859-1") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
*/
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecsstitle5987noenc
link = weblinking.parse("<simple.css>; title*=''A%20simple%20CSS%20stylesheet; title=\"fallback title\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].title.value !== "fallback title") throw "wrong title";
if (rel[0].title.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecsstitle5987invenc
link = weblinking.parse("<simple.css>; title*=foobar''A%20simple%20CSS%20stylesheet; title=\"fallback title\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].title.value !== "fallback title") throw "wrong title";
if (rel[0].title.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecsstitle5987parseerror
link = weblinking.parse("<simple.css>; title*=foobar; title=\"fallback title\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].title.value !== "fallback title") throw "wrong title";
if (rel[0].title.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecsstitle5987parseerror2
link = weblinking.parse("<simple.css>; title*=UTF-8''foobar%; title=\"fallback title\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].title.value !== "fallback title") throw "wrong title";
if (rel[0].title.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].title.language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simpleext
link = weblinking.parse("<simple.css>; ext=foo; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
// "ext" is quoted here for the benefit of the closure compiler
if (rel[0]["ext"].value !== "foo") throw "wrong ext";
if (rel[0]["ext"].charset !== "US-ASCII") throw "wrong charset";
if (rel[0]["ext"].language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simpleextq
link = weblinking.parse("<simple.css>; ext=\"\\\"\"; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
//"ext" is quoted here for the benefit of the closure compiler
if (rel[0]["ext"].value !== "\"") throw "wrong ext";
if (rel[0]["ext"].charset !== "US-ASCII") throw "wrong charset";
if (rel[0]["ext"].language !== "") throw "wrong language";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simpleexta
link = weblinking.parse("<simple.css>; ext1='start; rel=stylesheet; ext2=end'")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
//"ext" is quoted here for the benefit of the closure compiler
if (rel[0]["ext1"].value !== "'start") throw "wrong ext1";
if (rel[0]["ext1"].charset !== "US-ASCII") throw "wrong charset";
if (rel[0]["ext1"].language !== "") throw "wrong language";
if (rel[0]["ext2"].value !== "end'") throw "wrong ext2";
if (rel[0]["ext2"].charset !== "US-ASCII") throw "wrong charset";
if (rel[0]["ext2"].language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simpleextrel
link = weblinking.parse("<simple.css>; rel=\"http://example.com/myrel stylesheet\"")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].rel.value !== "http://example.com/myrel stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
rel = link.getLinkValuesByRel("http://example.com/myrel");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].rel.value !== "http://example.com/myrel stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecss2
link = weblinking.parse("<ybg.css>; rel=stylesheet, <simple.css>; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 2) throw "wrong count";
if (rel[0].urireference !== "ybg.css") throw "wrong uri";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/ybg.css") throw "wrong resovled URI";
if (rel[1].urireference !== "simple.css") throw "wrong uri";
if (rel[1].rel.value !== "stylesheet") throw "wrong rel";
if (rel[1].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[1].rel.language !== "") throw "wrong language";
if (rel[1].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";

//simplecssafterother
link = weblinking.parse("<ybf.css>; rel=foobar, <simple.css>; rel=stylesheet")
rel = link.getLinkValuesByRel("stylesheet");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "simple.css") throw "wrong uri";
if (rel[0].rel.value !== "stylesheet") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/simple.css") throw "wrong resovled URI";
rel = link.getLinkValuesByRel("foobar");
if (rel.length !== 1) throw "wrong count";
if (rel[0].urireference !== "ybf.css") throw "wrong uri";
if (rel[0].rel.value !== "foobar") throw "wrong rel";
if (rel[0].rel.charset !== "US-ASCII") throw "wrong charset";
if (rel[0].rel.language !== "") throw "wrong language";
if (rel[0].resolve(baseURI, resolver).toString() !== "http://base.example.com/ybf.css") throw "wrong resovled URI";
