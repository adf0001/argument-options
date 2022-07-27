
// argument-options @ npm, argument options tool.

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
function argumentOptions(options, shortcutMapping, defaultProperties) {
	var newOptions = options, created, optionsType;

	if (shortcutMapping) {
		if (typeof shortcutMapping === "string") {
			//shortcutName
			newOptions = {};
			created = true;
			newOptions[shortcutMapping] = options;
		}
		else if ((optionsType = typeof options) in shortcutMapping) {
			var shortcut = shortcutMapping[optionsType];
			var shortcutType = typeof shortcut;
			if (shortcutType === "string") {
				newOptions = {};
				created = true;
				newOptions[shortcut] = options;
			}
			else if (shortcutType === "function") {
				newOptions = shortcut(options) || options;	//if the function return undefined, then keep the old;
				created = newOptions !== options;
			}
		}
	}

	if (defaultProperties) {
		var newOptionsType = typeof newOptions;

		if (newOptions === null || newOptionsType === "undefined") newOptions = defaultProperties;
		else {
			if (!created) {
				if (newOptionsType === "object") {
					newOptions = Object.assign({}, newOptions);
				}
				else {
					newOptions = { _raw_options: options };
				}
				created = true;
			}

			for (var i in defaultProperties) {
				if (!(i in newOptions)) {
					newOptions[i] = defaultProperties[i];
				}
			}
		}
	}

	return newOptions;
}

// module

module.exports = exports = argumentOptions;		//default

Object.assign(exports,
	{
		argumentOptions
	}
);
