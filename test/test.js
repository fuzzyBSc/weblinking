
var link = weblinking.parse("<http://example.com/;;;,,,>; rel=\"next;;;,,, next\"; foo='bar'; media=text/html; title*=UTF-8'de'N%c3%a4chstes%20Kapitel"),
	rel = link.getLinkValuesByRel("next;;;,,,");
if (rel.length !== 1) throw "Wrong link-value count";
if (rel[0].urireference !== "http://example.com/;;;,,,") throw "Wrong URI-Reference";
if (rel[0].rel.value !== "next;;;,,, next") throw "Wrong rel value";
if (rel[0].rel.charset !== "US-ASCII") throw "Wrong rel charset";
if (rel[0].rel.language !== "") throw "Wrong rel language";
if (rel[0].foo.value !== "bar") throw "Wrong foo value";
if (rel[0].foo.charset !== "US-ASCII") throw "Wrong media charset";
if (rel[0].foo.language !== "") throw "Wrong media language";
if (rel[0].media.value !== "text/html") throw "Wrong media value";
if (rel[0].media.charset !== "US-ASCII") throw "Wrong media charset";
if (rel[0].media.language !== "") throw "Wrong media language";
if (rel[0].title.value !== "N\u00E4chstes Kapitel") throw "Wrong title value";
if (rel[0].title.charset !== "UTF-8") throw "Wrong title charset";
if (rel[0].title.language !== "de") throw "Wrong title language";