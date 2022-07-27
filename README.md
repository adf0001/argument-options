# argument-options
argument options tool

# Install
```
npm install argument-options
```

# Usage & Api
```javascript
var argument_options = require("argument-options");

done(!(
	/*
	for function like func( ..., options )

	argumentOptions(options [, shortcutMapping | shortcutName [, defaultProperties ]] )

		shortcutMapping
			an object mapping typeof-string to shortcut property name;
				or to a function like func(options) that return another options;
		
		shortcutName
			a user-defined shortcut name string, usually a checking result from the caller process;

		defaultProperties:
			the default properties;
			if the defaultProperties is not empty, and the `options` is not an object after the shortcut processing,
				a _raw_options property will be added to the result;

	return a new options, or the original `options`, or the `defaultProperties`;
	*/

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

```
