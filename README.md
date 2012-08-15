weblinking
==========
Please see the weblinking.js file for an RFC5988-compliant link header parser written in javascript.

Please see the UNLICENSE file for legal information.

The weblinking.js file is sufficient if you just want to pick up the library and use it. If you want to run the automated test programs you'll want the following submodules:
[submodule "submodule/qunit"]
	path = submodule/qunit
	url = https://github.com/jquery/qunit.git

Also, grab the following and put them into the dependencies directory:
* The google closure compiler.jar file - https://developers.google.com/closure/compiler/
* The js-uri URI.js file - http://code.google.com/p/js-uri/

The closure compiler is there to test how it behaves when included in a closure compile. The URI.js is there to resolve relative URIs. If you want to resolve relative URIs at runtime you'll need to be able to provide a function that resolves a relative URI string relative to a base URI object.
