
//global variable, for html page, refer tpsvr @ npm.
argument_options = require("../argument-options.js");

cmp_json = function (value, expect) {
	if (JSON.stringify(value) === JSON.stringify(expect)) return true;
	console.error("value string: " + JSON.stringify(value));
	console.error("the expected: " + JSON.stringify(expect));
	return false;
};

module.exports = {

	"argument_options": function (done) {
		//if (typeof window !==/=== "undefined") throw "disable for browser/nodejs";

		var o1 = 1;
		var o2 = "1";

		done(!(
			cmp_json(argument_options("a"), "a") &&
			cmp_json(argument_options("a", { "string": "bb" }), { bb: "a" }) &&
			cmp_json(argument_options("a", { "number": "bb" }), "a") &&
			cmp_json(argument_options(123, { "number": "bb" }), { bb: 123 }) &&

			cmp_json(argument_options(null, { "object": "bb" }), { bb: null }) &&
			cmp_json(argument_options({ a: 1 }, { "object": "bb" }), { bb: { a: 1 } }) &&

			cmp_json(argument_options({ a: 1 }, { "object": o => o ? o : 1 }), { a: 1 }) &&
			cmp_json(argument_options(null, { "object": o => o ? o : 1 }), 1) &&

			cmp_json(argument_options({ a: 1 }, null, { a: 2 }), { a: 1 }) &&
			cmp_json(argument_options({ a: 1 }, null, { b: 2 }), { a: 1, b: 2 }) &&

			cmp_json(argument_options("a", { "number": "bb" }, {}), { _raw_options: "a" }) &&
			cmp_json(argument_options(void 0, { "number": "bb" }, {}), {}) &&
			cmp_json(argument_options(null, { "number": "bb" }, {}), {}) &&
			cmp_json(argument_options(0, { "number": "bb" }, {}), { bb: 0 }) &&
			cmp_json(argument_options(0, { "string": "bb" }, {}), { _raw_options: 0 }) &&
			cmp_json(argument_options(false, { "number": "bb" }, {}), { _raw_options: false }) &&
			cmp_json(argument_options("", { "number": "bb" }, {}), { _raw_options: "" }) &&

			cmp_json(argument_options([1],
				{ "object": o => { if (o instanceof Array) return { arr: o }; } }, {}), { arr: [1] }) &&
			cmp_json(argument_options({ a: 1 },
				{ "object": o => { if (o instanceof Array) return { arr: o }; } }, {}), { a: 1 }) &&
			cmp_json(argument_options(null,
				{ "object": o => { if (o instanceof Array) return { arr: o }; } }, {}), {}) &&
			cmp_json(argument_options(null,
				{ "object": o => { if (o instanceof Array) return { arr: o }; } }), null) &&

			cmp_json(argument_options(o1, typeof o1 === "string" && "a"), o1) &&
			cmp_json(argument_options(o2, typeof o2 === "string" && "a"), { a: o2 }) &&
			cmp_json(argument_options(o1, typeof o1 === "number" && "b"), { b: o1 }) &&
			cmp_json(argument_options(o2, typeof o2 === "number" && "b"), o2) &&

			cmp_json(argument_options(o1,
				(typeof o1 === "string" && "a") || (typeof o1 === "number" && "b")), { b: o1 }) &&
			cmp_json(argument_options(o2,
				(typeof o2 === "string" && "a") || (typeof o2 === "number" && "b")), { a: o2 }) &&

			true
		));
	},

	"check exports": function (done) {
		for (var i in argument_options) {
			if (typeof argument_options[i] === "undefined") { done("undefined: " + i); return; }
		}
		done(false);
		
		console.log(argument_options);
		var list = "export list: " + Object.keys(argument_options).join(", ");
		console.log(list);
		return list;
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('argument_options', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
