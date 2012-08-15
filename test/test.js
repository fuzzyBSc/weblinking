/*global module, test */
module("test");

test("Regex match test", function () {
	'use strict';
	/*global URI, weblinking, strictEqual
	*/

	var baseURI = new URI("http://base.example.com/test.html");
	var resolver = function (baseURI, relative) {
		var relativeURI = new URI(relative);
		return relativeURI.resolve(baseURI);
	};
	var link = weblinking.parse(
			"<http://example.com/;;;,,,>; rel=\"next;;;,,, next\"; a-zA-Z0-9!#$&+-.^_`|~=!#$%&'()*+-./0-9:<=>?@a-zA-Z[]^_`{|}~; title*=UTF-8'de'N%c3%a4chstes%20Kapitel"
			),
		rel = link.getLinkValuesByRel("next;;;,,,");
	strictEqual(rel.length, 1, "Wrong link-value count");
	strictEqual(rel[0].urireference, "http://example.com/;;;,,,", "Wrong URI-Reference");
	strictEqual(rel[0].rel.value, "next;;;,,, next", "Wrong rel value");
	strictEqual(rel[0].rel.charset, "US-ASCII", "Wrong rel charset");
	strictEqual(rel[0].rel.language, "", "Wrong rel language");
	strictEqual(rel[0]["a-zA-Z0-9!#$&+-.^_`|~"].value, "!#$%&'()*+-./0-9:<=>?@a-zA-Z[]^_`{|}~", "Wrong a-zA-Z0-9!#$&+-.^_`|~ value");
	strictEqual(rel[0]["a-zA-Z0-9!#$&+-.^_`|~"].charset, "US-ASCII", "Wrong media charset");
	strictEqual(rel[0]["a-zA-Z0-9!#$&+-.^_`|~"].language, "", "Wrong media language");
	strictEqual(rel[0].title.value, "N\u00E4chstes Kapitel", "Wrong title value");
	strictEqual(rel[0].title.charset, "UTF-8", "Wrong title charset");
	strictEqual(rel[0].title.language, "de", "Wrong title language");
	
	strictEqual(rel[0].resolve(baseURI, resolver).toString(), "http://example.com/;;;,,,", "wrong resovled URI");
});
