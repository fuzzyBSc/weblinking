var baseURI = new URI("http://example.com/test.html");
var resolver = function(baseURI, relative) {
	var relativeURI = new URI(relative);
	return relativeURI.resolve(baseURI);
}
var link = weblinking.parse("<http://example.com/;;;,,,>; rel=\"next;;;,,, next\"; a-zA-Z0-9!#$&+-.\^_`|~=!#$%&'()*+-./0-9:<=>?@a-zA-Z[]^_`{|}~; title*=UTF-8'de'N%c3%a4chstes%20Kapitel"),
	rel = link.getLinkValuesByRel("next;;;,,,");
if (rel.length !== 1) throw "Wrong link-value count";
if (rel[0].urireference !== "http://example.com/;;;,,,") throw "Wrong URI-Reference";
if (rel[0].rel.value !== "next;;;,,, next") throw "Wrong rel value";
if (rel[0].rel.charset !== "US-ASCII") throw "Wrong rel charset";
if (rel[0].rel.language !== "") throw "Wrong rel language";
if (rel[0]["a-zA-Z0-9!#$&+-.\^_`|~"].value !== "!#$%&'()*+-./0-9:<=>?@a-zA-Z[]^_`{|}~") throw "Wrong a-zA-Z0-9!#$&+-.\^_`|~ value";
if (rel[0]["a-zA-Z0-9!#$&+-.\^_`|~"].charset !== "US-ASCII") throw "Wrong media charset";
if (rel[0]["a-zA-Z0-9!#$&+-.\^_`|~"].language !== "") throw "Wrong media language";
if (rel[0].title.value !== "N\u00E4chstes Kapitel") throw "Wrong title value";
if (rel[0].title.charset !== "UTF-8") throw "Wrong title charset";
if (rel[0].title.language !== "de") throw "Wrong title language";

if (rel[0].resolve(baseURI, resolver).toString() !== "http://example.com/;;;,,,") throw "wrong resovled URI";
