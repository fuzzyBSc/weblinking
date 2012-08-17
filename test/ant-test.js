var module = function () {};
var test = function (name, func) {
	func();
};
var strictEqual = function (a, b, description) {
	if (a !== b) {
		throw description;
	}
};
var document = {
	getElementById: function () {
		return {};
	}
};