/*!
 * jQuery JavaScript Library v1.8.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Aug 30 2012 17:17:22 GMT-0400 (Eastern Daylight Time)
 */
(function( window, undefined ) {
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,
	navigator = window.navigator,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Save a reference to some core methods
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

	// Used for detecting and trimming whitespace
	core_rnotwhite = /\S/,
	core_rspace = /\s+/,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	},

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context && context.nodeType ? context.ownerDocument || context : document );

					// scripts is true for back-compat
					selector = jQuery.parseHTML( match[1], doc, true );
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						this.attr.call( selector, context, true );
					}

					return jQuery.merge( this, selector );

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.8.1",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ),
			"slice", core_slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready, 1 );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ core_toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// scripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, scripts ) {
		var parsed;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			scripts = context;
			context = 0;
		}
		context = context || document;

		// Single tag
		if ( (parsed = rsingleTag.exec( data )) ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
		return jQuery.merge( [],
			(parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
	},

	parseJSON: function( data ) {
		if ( !data || typeof data !== "string") {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && core_rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var name,
			i = 0,
			length = obj.length,
			isObj = length === undefined || jQuery.isFunction( obj );

		if ( args ) {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.apply( obj[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( obj[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jQuery.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
				core_push.call( ret, arr );
			} else {
				jQuery.merge( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key,
			ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && jQuery.isFunction( value );

			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( jQuery( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}

			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
				}
			}

			chainable = 1;
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready, 1 );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.split( core_rspace ), function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" && ( !options.unique || !self.has( arg ) ) ) {
								list.push( arg );
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
								function() {
									var returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								} :
								newDefer[ action ]
							);
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return typeof obj === "object" ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ] = list.fire
			deferred[ tuple[0] ] = list.fire;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		fragment,
		eventName,
		i,
		isSupported,
		clickFn,
		div = document.createElement("div");

	// Preliminary tests
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: ( document.compatMode === "CSS1Compat" ),

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", clickFn = function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent("onclick");
		div.detachEvent( "onclick", clickFn );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	input.setAttribute( "checked", "checked" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "name", "t" );

	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for ( i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, div, tds, marginDiv,
			divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// NOTE: To any future maintainer, we've window.getComputedStyle
		// because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. For more
			// info see bug #3333
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = document.createElement("div");
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			div.appendChild( marginDiv );
			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "block";
			div.style.overflow = "visible";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			container.style.zoom = 1;
		}

		// Null elements to avoid leaks in IE
		body.removeChild( container );
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	fragment.removeChild( div );
	all = a = select = opt = input = fragment = div = null;

	return support;
})();
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	deletedIds: [],

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = jQuery.deletedIds.pop() || ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, part, attr, name, l,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attr = elem.attributes;
					for ( l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split( ".", 2 );
		parts[1] = parts[1] ? "." + parts[1] : "";
		part = parts[1] + "!";

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				data = this.triggerHandler( "getData" + part, [ parts[0] ] );

				// Try to fetch any internally stored data first
				if ( data === undefined && elem ) {
					data = jQuery.data( elem, key );
					data = dataAttr( elem, key, data );
				}

				return data === undefined && parts[1] ?
					this.data( parts[0] ) :
					data;
			}

			parts[1] = value;
			this.each(function() {
				var self = jQuery( this );

				self.triggerHandler( "setData" + part, parts );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + part, parts );
			});
		}, null, value, arguments.length > 1, null, false );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery.removeData( elem, type + "queue", true );
				jQuery.removeData( elem, key, true );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook, fixSpecified,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea|)$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var removes, className, elem, c, cl, i, l;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}
		if ( (value && typeof value === "string") || value === undefined ) {
			removes = ( value || "" ).split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];
				if ( elem.nodeType === 1 && elem.className ) {

					className = (" " + elem.className + " ").replace( rclass, " " );

					// loop over each item in the removal list
					for ( c = 0, cl = removes.length; c < cl; c++ ) {
						// Remove until there is nothing to remove,
						while ( className.indexOf(" " + removes[ c ] + " ") > -1 ) {
							className = className.replace( " " + removes[ c ] + " " , " " );
						}
					}
					elem.className = value ? jQuery.trim( className ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( core_rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	// Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
	attrFn: {},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {

			attrNames = value.split( core_rspace );

			for ( ; i < attrNames.length; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.value = value + "" );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var t, tns, type, origType, namespaces, origCount,
			j, events, special, eventType, handleObj,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, "events", true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
			type = event.type || event,
			namespaces = [];

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			for ( old = elem; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old === (elem.ownerDocument || document) ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
			handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments ),
			run_all = !event.exclusive && !event.namespace,
			special = jQuery.event.special[ event.type ] || {},
			handlerQueue = [];

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers that should run if there are delegated events
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !(event.button && event.type === "click") ) {

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					selMatch = {};
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector;

						if ( selMatch[ sel ] === undefined ) {
							selMatch[ sel ] = jQuery( sel, this ).index( cur ) >= 0;
						}
						if ( selMatch[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, matches: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
		event.metaKey = !!event.metaKey;

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8 –
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "_submit_attached" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "_submit_attached", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "_change_attached", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) { // && selector != null
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012 jQuery Foundation and other contributors
 *  Released under the MIT license
 *  http://sizzlejs.com/
 */
(function( window, undefined ) {

var dirruns,
	cachedruns,
	assertGetIdNotName,
	Expr,
	getText,
	isXML,
	contains,
	compile,
	sortOrder,
	hasDuplicate,

	baseHasDuplicate = true,
	strundefined = "undefined",

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	document = window.document,
	docElem = document.documentElement,
	done = 0,
	slice = [].slice,
	push = [].push,

	// Augment a function for special use by Sizzle
	markFunction = function( fn, value ) {
		fn[ expando ] = value || true;
		return fn;
	},

	createCache = function() {
		var cache = {},
			keys = [];

		return markFunction(function( key, value ) {
			// Only keep the most recent entries
			if ( keys.push( key ) > Expr.cacheLength ) {
				delete cache[ keys.shift() ];
			}

			return (cache[ key ] = value);
		}, cache );
	},

	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments not in parens/brackets,
	//   then attribute selectors and non-pseudos (denoted by :),
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

	// For matchExpr.POS and matchExpr.needsContext
	pos = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rnot = /^:not/,
	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|nth|last|first)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"POS": new RegExp( pos, "ig" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	// Support

	// Used for testing something on an element
	assert = function( fn ) {
		var div = document.createElement("div");

		try {
			return fn( div );
		} catch (e) {
			return false;
		} finally {
			// release memory in IE
			div = null;
		}
	},

	// Check if getElementsByTagName("*") returns only elements
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem, results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

function Sizzle( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector, context, results, seed, xml );
}

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

isXML = Sizzle.isXML = function isXML( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
contains = Sizzle.contains = docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	docElem.compareDocumentPosition ?
	function( a, b ) {
		return b && !!( a.compareDocumentPosition( b ) & 16 );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

Sizzle.attr = function( elem, name ) {
	var attr,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( Expr.attrHandle[ name ] ) {
		return Expr.attrHandle[ name ]( elem );
	}
	if ( assertAttributes || xml ) {
		return elem.getAttribute( name );
	}
	attr = elem.getAttributeNode( name );
	return attr ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			attr.specified ? attr.value : null :
		null;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	order: new RegExp( "ID|TAG" +
		(assertUsableName ? "|NAME" : "") +
		(assertUsableClassName ? "|CLASS" : "")
	),

	// IE6/7 return a modified href
	attrHandle: assertHrefNotNormalized ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		},

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			},

		"NAME": function( tag, context ) {
			if ( typeof context.getElementsByName !== strundefined ) {
				return context.getElementsByName( name );
			}
		},

		"CLASS": function( className, context, xml ) {
			if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
				return context.getElementsByClassName( className );
			}
		}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr.CHILD
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match, context, xml ) {
			var unquoted, excess;
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			if ( match[3] ) {
				match[2] = match[3];
			} else if ( (unquoted = match[4]) ) {
				// Only check arguments that contain a pseudo
				if ( rpseudo.test(unquoted) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, context, xml, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					unquoted = unquoted.slice( 0, excess );
					match[0] = match[0].slice( 0, excess );
				}
				match[2] = unquoted;
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ expando ][ className ];
			if ( !pattern ) {
				pattern = classCache( className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)") );
			}
			return function( elem ) {
				return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
			};
		},

		"ATTR": function( name, operator, check ) {
			if ( !operator ) {
				return function( elem ) {
					return Sizzle.attr( elem, name ) != null;
				};
			}

			return function( elem ) {
				var result = Sizzle.attr( elem, name ),
					value = result + "";

				if ( result == null ) {
					return operator === "!=";
				}

				switch ( operator ) {
					case "=":
						return value === check;
					case "!=":
						return value !== check;
					case "^=":
						return check && value.indexOf( check ) === 0;
					case "*=":
						return check && value.indexOf( check ) > -1;
					case "$=":
						return check && value.substr( value.length - check.length ) === check;
					case "~=":
						return ( " " + value + " " ).indexOf( check ) > -1;
					case "|=":
						return value === check || value.substr( 0, check.length + 1 ) === check + "-";
				}
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				var doneName = done++;

				return function( elem ) {
					var parent, diff,
						count = 0,
						node = elem;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					parent = elem.parentNode;

					if ( parent && (parent[ expando ] !== doneName || !elem.sizset) ) {
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.sizset = ++count;
								if ( node === elem ) {
									break;
								}
							}
						}

						parent[ expando ] = doneName;
					}

					diff = elem.sizset - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument, context, xml ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.pseudos[ pseudo.toLowerCase() ];

			if ( !fn ) {
				Sizzle.error( "unsupported pseudo: " + pseudo );
			}

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( !fn[ expando ] ) {
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return function( elem ) {
						return fn( elem, 0, args );
					};
				}
				return fn;
			}

			return fn( argument, context, xml );
		}
	},

	pseudos: {
		"not": markFunction(function( selector, context, xml ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var matcher = compile( selector.replace( rtrim, "$1" ), context, xml );
			return function( elem ) {
				return !matcher( elem );
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputPseudo("radio"),
		"checkbox": createInputPseudo("checkbox"),
		"file": createInputPseudo("file"),
		"password": createInputPseudo("password"),
		"image": createInputPseudo("image"),

		"submit": createButtonPseudo("submit"),
		"reset": createButtonPseudo("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},

	setFilters: {
		"first": function( elements, argument, not ) {
			return not ? elements.slice( 1 ) : [ elements[0] ];
		},

		"last": function( elements, argument, not ) {
			var elem = elements.pop();
			return not ? elements : [ elem ];
		},

		"even": function( elements, argument, not ) {
			var results = [],
				i = not ? 1 : 0,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"odd": function( elements, argument, not ) {
			var results = [],
				i = not ? 0 : 1,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"lt": function( elements, argument, not ) {
			return not ? elements.slice( +argument ) : elements.slice( 0, +argument );
		},

		"gt": function( elements, argument, not ) {
			return not ? elements.slice( 0, +argument + 1 ) : elements.slice( +argument + 1 );
		},

		"eq": function( elements, argument, not ) {
			var elem = elements.splice( +argument, 1 );
			return not ? elements : elem;
		}
	}
};

function siblingCheck( a, b, ret ) {
	if ( a === b ) {
		return ret;
	}

	var cur = a.nextSibling;

	while ( cur ) {
		if ( cur === b ) {
			return -1;
		}

		cur = cur.nextSibling;
	}

	return 1;
}

sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	} :
	function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
[0, 0].sort( sortOrder );
baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		i = 1;

	hasDuplicate = baseHasDuplicate;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				results.splice( i--, 1 );
			}
		}
	}

	return results;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

function tokenize( selector, context, xml, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, group, i,
		preFilters, filters,
		checkContext = !xml && context !== document,
		// Token cache should maintain spaces
		key = ( checkContext ? "<s>" : "" ) + selector.replace( rtrim, "$1<s>" ),
		cached = tokenCache[ expando ][ key ];

	if ( cached ) {
		return parseOnly ? 0 : slice.call( cached, 0 );
	}

	soFar = selector;
	groups = [];
	i = 0;
	preFilters = Expr.preFilter;
	filters = Expr.filter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				soFar = soFar.slice( match[0].length );
				tokens.selector = group;
			}
			groups.push( tokens = [] );
			group = "";

			// Need to make sure we're within a narrower context if necessary
			// Adding a descendant combinator will generate what is needed
			if ( checkContext ) {
				soFar = " " + soFar;
			}
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			group += match[0];
			soFar = soFar.slice( match[0].length );

			// Cast descendant combinators to space
			matched = tokens.push({
				part: match.pop().replace( rtrim, " " ),
				string: match[0],
				captures: match
			});
		}

		// Filters
		for ( type in filters ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				( match = preFilters[ type ](match, context, xml) )) ) {

				group += match[0];
				soFar = soFar.slice( match[0].length );
				matched = tokens.push({
					part: type,
					string: match.shift(),
					captures: match
				});
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Attach the full group as a selector
	if ( group ) {
		tokens.selector = group;
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			slice.call( tokenCache(key, groups), 0 );
}

function addCombinator( matcher, combinator, context, xml ) {
	var dir = combinator.dir,
		doneName = done++;

	if ( !matcher ) {
		// If there is no matcher to check, check against the context
		matcher = function( elem ) {
			return elem === context;
		};
	}
	return combinator.first ?
		function( elem ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					return matcher( elem ) && elem;
				}
			}
		} :
		xml ?
			function( elem ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 ) {
						if ( matcher( elem ) ) {
							return elem;
						}
					}
				}
			} :
			function( elem ) {
				var cache,
					dirkey = doneName + "." + dirruns,
					cachedkey = dirkey + "." + cachedruns;
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 ) {
						if ( (cache = elem[ expando ]) === cachedkey ) {
							return elem.sizset;
						} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
							if ( elem.sizset ) {
								return elem;
							}
						} else {
							elem[ expando ] = cachedkey;
							if ( matcher( elem ) ) {
								elem.sizset = true;
								return elem;
							}
							elem.sizset = false;
						}
					}
				}
			};
}

function addMatcher( higher, deeper ) {
	return higher ?
		function( elem ) {
			var result = deeper( elem );
			return result && higher( result === true ? elem : result );
		} :
		deeper;
}

// ["TAG", ">", "ID", " ", "CLASS"]
function matcherFromTokens( tokens, context, xml ) {
	var token, matcher,
		i = 0;

	for ( ; (token = tokens[i]); i++ ) {
		if ( Expr.relative[ token.part ] ) {
			matcher = addCombinator( matcher, Expr.relative[ token.part ], context, xml );
		} else {
			matcher = addMatcher( matcher, Expr.filter[ token.part ].apply(null, token.captures.concat( context, xml )) );
		}
	}

	return matcher;
}

function matcherFromGroupMatchers( matchers ) {
	return function( elem ) {
		var matcher,
			j = 0;
		for ( ; (matcher = matchers[j]); j++ ) {
			if ( matcher(elem) ) {
				return true;
			}
		}
		return false;
	};
}

compile = Sizzle.compile = function( selector, context, xml ) {
	var group, i, len,
		cached = compilerCache[ expando ][ selector ];

	// Return a cached group function if already generated (context dependent)
	if ( cached && cached.context === context ) {
		return cached;
	}

	// Generate a function of recursive functions that can be used to check each element
	group = tokenize( selector, context, xml );
	for ( i = 0, len = group.length; i < len; i++ ) {
		group[i] = matcherFromTokens(group[i], context, xml);
	}

	// Cache the compiled function
	cached = compilerCache( selector, matcherFromGroupMatchers(group) );
	cached.context = context;
	cached.runs = cached.dirruns = 0;
	return cached;
};

function multipleContexts( selector, contexts, results, seed ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results, seed );
	}
}

function handlePOSGroup( selector, posfilter, argument, contexts, seed, not ) {
	var results,
		fn = Expr.setFilters[ posfilter.toLowerCase() ];

	if ( !fn ) {
		Sizzle.error( posfilter );
	}

	if ( selector || !(results = seed) ) {
		multipleContexts( selector || "*", contexts, (results = []), seed );
	}

	return results.length > 0 ? fn( results, argument, not ) : [];
}

function handlePOS( groups, context, results, seed ) {
	var group, part, j, groupLen, token, selector,
		anchor, elements, match, matched,
		lastIndex, currentContexts, not,
		i = 0,
		len = groups.length,
		rpos = matchExpr["POS"],
		// This is generated here in case matchExpr["POS"] is extended
		rposgroups = new RegExp( "^" + rpos.source + "(?!" + whitespace + ")", "i" ),
		// This is for making sure non-participating
		// matching groups are represented cross-browser (IE6-8)
		setUndefined = function() {
			var i = 1,
				len = arguments.length - 2;
			for ( ; i < len; i++ ) {
				if ( arguments[i] === undefined ) {
					match[i] = undefined;
				}
			}
		};

	for ( ; i < len; i++ ) {
		group = groups[i];
		part = "";
		elements = seed;
		for ( j = 0, groupLen = group.length; j < groupLen; j++ ) {
			token = group[j];
			selector = token.string;
			if ( token.part === "PSEUDO" ) {
				// Reset regex index to 0
				rpos.exec("");
				anchor = 0;
				while ( (match = rpos.exec( selector )) ) {
					matched = true;
					lastIndex = rpos.lastIndex = match.index + match[0].length;
					if ( lastIndex > anchor ) {
						part += selector.slice( anchor, match.index );
						anchor = lastIndex;
						currentContexts = [ context ];

						if ( rcombinators.test(part) ) {
							if ( elements ) {
								currentContexts = elements;
							}
							elements = seed;
						}

						if ( (not = rendsWithNot.test( part )) ) {
							part = part.slice( 0, -5 ).replace( rcombinators, "$&*" );
							anchor++;
						}

						if ( match.length > 1 ) {
							match[0].replace( rposgroups, setUndefined );
						}
						elements = handlePOSGroup( part, match[1], match[2], currentContexts, elements, not );
					}
					part = "";
				}

			}

			if ( !matched ) {
				part += selector;
			}
			matched = false;
		}

		if ( part ) {
			if ( rcombinators.test(part) ) {
				multipleContexts( part, elements || [ context ], results, seed );
			} else {
				Sizzle( part, context, results, seed ? seed.concat(elements) : elements );
			}
		} else {
			push.apply( results, elements );
		}
	}

	// Do not sort if this is a single filter
	return len === 1 ? results : Sizzle.uniqueSort( results );
}

function select( selector, context, results, seed, xml ) {
	// Remove excessive whitespace
	selector = selector.replace( rtrim, "$1" );
	var elements, matcher, cached, elem,
		i, tokens, token, lastToken, findContext, type,
		match = tokenize( selector, context, xml ),
		contextNodeType = context.nodeType;

	// POS handling
	if ( matchExpr["POS"].test(selector) ) {
		return handlePOS( match, context, results, seed );
	}

	if ( seed ) {
		elements = slice.call( seed, 0 );

	// To maintain document order, only narrow the
	// set if there is one group
	} else if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		if ( (tokens = slice.call( match[0], 0 )).length > 2 &&
				(token = tokens[0]).part === "ID" &&
				contextNodeType === 9 && !xml &&
				Expr.relative[ tokens[1].part ] ) {

			context = Expr.find["ID"]( token.captures[0].replace( rbackslash, "" ), context, xml )[0];
			if ( !context ) {
				return results;
			}

			selector = selector.slice( tokens.shift().string.length );
		}

		findContext = ( (match = rsibling.exec( tokens[0].string )) && !match.index && context.parentNode ) || context;

		// Reduce the set if possible
		lastToken = "";
		for ( i = tokens.length - 1; i >= 0; i-- ) {
			token = tokens[i];
			type = token.part;
			lastToken = token.string + lastToken;
			if ( Expr.relative[ type ] ) {
				break;
			}
			if ( Expr.order.test(type) ) {
				elements = Expr.find[ type ]( token.captures[0].replace( rbackslash, "" ), findContext, xml );
				if ( elements == null ) {
					continue;
				} else {
					selector = selector.slice( 0, selector.length - lastToken.length ) +
						lastToken.replace( matchExpr[ type ], "" );

					if ( !selector ) {
						push.apply( results, slice.call(elements, 0) );
					}

					break;
				}
			}
		}
	}

	// Only loop over the given elements once
	if ( selector ) {
		matcher = compile( selector, context, xml );
		dirruns = matcher.dirruns++;
		if ( elements == null ) {
			elements = Expr.find["TAG"]( "*", (rsibling.test( selector ) && context.parentNode) || context );
		}

		for ( i = 0; (elem = elements[i]); i++ ) {
			cachedruns = matcher.runs++;
			if ( matcher(elem) ) {
				results.push( elem );
			}
		}
	}

	return results;
}

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
			rbuggyQSA = [],
			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [":active"],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'/>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				if ( context.nodeType === 9 ) {
					try {
						push.apply( results, slice.call(context.querySelectorAll( selector ), 0) );
						return results;
					} catch(qsaError) {}
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var groups, i, len,
						old = context.getAttribute("id"),
						nid = old || expando,
						newContext = rsibling.test( selector ) && context.parentNode || context;

					if ( old ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}

					groups = tokenize(selector, context, xml);
					// Trailing space is unnecessary
					// There is always a context check
					nid = "[id='" + nid + "']";
					for ( i = 0, len = groups.length; i < len; i++ ) {
						groups[i] = nid + groups[i].selector;
					}
					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							groups.join(",")
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( matchExpr["PSEUDO"].source, matchExpr["POS"].source, "!=" );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && (!rbuggyQSA || !rbuggyQSA.test( expr )) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// Deprecated
Expr.setFilters["nth"] = Expr.setFilters["eq"];

// Back-compat
Expr.filters = Expr.pseudos;

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, l, length, n, r, ret,
			self = this;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		ret = this.pushStack( "", "find", selector );

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rcheckableType = /^(?:checkbox|radio)$/,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "X<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
		}
	},

	after: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( elem.getElementsByTagName( "*" ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		if ( !isDisconnected( this[0] ) ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		}

		return this.length ?
			this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
			this;
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = [].concat.apply( [], args );

		var results, first, fragment, iNoClone,
			i = 0,
			value = args[0],
			scripts = [],
			l = this.length;

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call( this, i, table ? self.html() : undefined );
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			results = jQuery.buildFragment( args, this, scripts );
			fragment = results.fragment;
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				// Fragments from the fragment cache must always be cloned and never used in place.
				for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						i === iNoClone ?
							fragment :
							jQuery.clone( fragment, true, true )
					);
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;

			if ( scripts.length ) {
				jQuery.each( scripts, function( i, elem ) {
					if ( elem.src ) {
						if ( jQuery.ajax ) {
							jQuery.ajax({
								url: elem.src,
								type: "GET",
								dataType: "script",
								async: false,
								global: false,
								"throws": true
							});
						} else {
							jQuery.error("no ajax");
						}
					} else {
						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
					}

					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				});
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	if ( nodeName === "object" ) {
		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;

	// IE blanks contents when cloning scripts
	} else if ( nodeName === "script" && dest.text !== src.text ) {
		dest.text = src.text;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, context, scripts ) {
	var fragment, cacheable, cachehit,
		first = args[ 0 ];

	// Set context from what may come in as undefined or a jQuery collection or a node
	// Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
	// also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
	context = context || document;
	context = !context.nodeType && context[0] || context;
	context = context.ownerDocument || context;

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		// Mark cacheable and look for a hit
		cacheable = true;
		fragment = jQuery.fragments[ first ];
		cachehit = fragment !== undefined;
	}

	if ( !fragment ) {
		fragment = context.createDocumentFragment();
		jQuery.clean( args, context, fragment, scripts );

		// Update the cache, but only store false
		// unless this is a second parsing of the same content
		if ( cacheable ) {
			jQuery.fragments[ first ] = cachehit && fragment;
		}
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			l = insert.length,
			parent = this.length === 1 && this[0].parentNode;

		if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
			insert[ original ]( this[0] );
			return this;
		} else {
			for ( ; i < l; i++ ) {
				elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			clone;

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
			safe = context === document && safeFragment,
			ret = [];

		// Ensure that context is a document
		if ( !context || typeof context.createDocumentFragment === "undefined" ) {
			context = document;
		}

		// Use the already-created safe fragment if context permits
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Ensure a safe container in which to render the html
					safe = safe || createSafeFragment( context );
					div = context.createElement("div");
					safe.appendChild( div );

					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Go to html and back, then peel off extra wrappers
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					depth = wrap[0];
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						hasBody = rtbody.test(elem);
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;

					// Take out of fragment container (we need a fresh div each time)
					div.parentNode.removeChild( div );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				jQuery.merge( ret, elem );
			}
		}

		// Fix #11356: Clear elements from safeFragment
		if ( div ) {
			elem = div = safe = null;
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					fixDefaultChecked( elem );
				} else if ( typeof elem.getElementsByTagName !== "undefined" ) {
					jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
				}
			}
		}

		// Append elements to a provided document fragment
		if ( fragment ) {
			// Special handling of each script element
			handleScript = function( elem ) {
				// Check if we consider it executable
				if ( !elem.type || rscriptType.test( elem.type ) ) {
					// Detach the script and store it in the scripts array (if provided) or the fragment
					// Return truthy to indicate that it has been handled
					return scripts ?
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
						fragment.appendChild( elem );
				}
			};

			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				// Check if we're done after handling an executable script
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
					// Append to fragment and handle embedded scripts
					fragment.appendChild( elem );
					if ( typeof elem.getElementsByTagName !== "undefined" ) {
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

						// Splice the scripts into ret after their former ancestor and advance our index beyond them
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						i += jsTags.length;
					}
				}
			}
		}

		return ret;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( elem.removeAttribute ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						jQuery.deletedIds.push( id );
					}
				}
			}
		}
	}
});
// Limit scope pollution from any deprecated API
(function() {

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
	browser.webkit = true;
} else if ( browser.webkit ) {
	browser.safari = true;
}

jQuery.browser = browser;

jQuery.sub = function() {
	function jQuerySub( selector, context ) {
		return new jQuerySub.fn.init( selector, context );
	}
	jQuery.extend( true, jQuerySub, this );
	jQuerySub.superclass = this;
	jQuerySub.fn = jQuerySub.prototype = this();
	jQuerySub.fn.constructor = jQuerySub;
	jQuerySub.sub = this.sub;
	jQuerySub.fn.init = function init( selector, context ) {
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
			context = jQuerySub( context );
		}

		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	};
	jQuerySub.fn.init.prototype = jQuerySub.fn;
	var rootjQuerySub = jQuerySub(document);
	return jQuerySub;
};

})();
var curCSS, iframe, iframeDoc,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
	elemdisplay = {},

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

	eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem, display,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {
			display = curCSS( elem, "display" );

			if ( !values[ index ] && display !== "none" ) {
				jQuery._data( elem, "olddisplay", display );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state, fn2 ) {
		var bool = typeof state === "boolean";

		if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
			return eventsToggle.apply( this, arguments );
		}

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, numeric, extra ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( numeric || extra !== undefined ) {
			num = parseFloat( val );
			return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: To any future maintainer, we've window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	curCSS = function( elem, name ) {
		var ret, width, minWidth, maxWidth,
			computed = window.getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			ret = computed[ name ];
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	curCSS = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			// we use jQuery.css instead of curCSS here
			// because of the reliableMarginRight CSS hook!
			val += jQuery.css( elem, extra + cssExpand[ i ], true );
		}

		// From this point on we use curCSS for maximum performance (relevant in animations)
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		valueIsBorderBox = true,
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox
		)
	) + "px";
}


// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	if ( elemdisplay[ nodeName ] ) {
		return elemdisplay[ nodeName ];
	}

	var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
		display = elem.css("display");
	elem.remove();

	// If the simple way fails,
	// get element's real default display by attaching it to a temp iframe
	if ( display === "none" || display === "" ) {
		// Use the already-created iframe if possible
		iframe = document.body.appendChild(
			iframe || jQuery.extend( document.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			})
		);

		// Create a cacheable copy of the iframe document on first call.
		// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
		// document to it; WebKit & Firefox won't allow reusing the iframe document.
		if ( !iframeDoc || !iframe.createElement ) {
			iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
			iframeDoc.write("<!doctype html><html><body>");
			iframeDoc.close();
		}

		elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

		display = curCSS( elem, "display" );
		document.body.removeChild( iframe );
	}

	// Store the correct default display
	elemdisplay[ nodeName ] = display;

	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, "display" ) ) ) {
					return jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					});
				} else {
					return getWidthOrHeight( elem, name, extra );
				}
			}
		},

		set: function( elem, value, extra ) {
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
				style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						return curCSS( elem, "marginRight" );
					}
				});
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						var ret = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i,

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ],
				expanded = {};

			for ( i = 0; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rselectTextarea = /^(?:select|textarea)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var // Document location
	ajaxLocation,
	// Document location segments
	ajaxLocParts,

	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
			i = 0,
			length = dataTypes.length;

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var selection,
		list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters );

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	// Don't do a request if no elements are being requested
	if ( !this.length ) {
		return this;
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// Request the remote document
	jQuery.ajax({
		url: url,

		// if "type" variable is undefined, then "GET" method will be used
		type: type,
		dataType: "html",
		data: params,
		complete: function( jqXHR, status ) {
			if ( callback ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			}
		}
	}).done(function( responseText ) {

		// Save response for use in complete callback
		response = arguments;

		// See if a selector was specified
		self.html( selector ?

			// Create a dummy div to hold the results
			jQuery("<div>")

				// inject the contents of the document in, removing the scripts
				// to avoid any 'Permission Denied' errors in IE
				.append( responseText.replace( rscript, "" ) )

				// Locate the specified elements
				.find( selector ) :

			// If not, just inject the full result
			responseText );

	});

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // ifModified key
			ifModifiedKey,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || strAbort;
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ ifModifiedKey ] = modified;
					}
					modified = jqXHR.getResponseHeader("Etag");
					if ( modified ) {
						jQuery.etag[ ifModifiedKey ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.always( tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();

		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ],
		converters = {},
		i = 0;

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
var oldCallbacks = [],
	rquestion = /\?/,
	rjsonp = /(=)\?(?=&|$)|\?\?/,
	nonce = jQuery.now();

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		data = s.data,
		url = s.url,
		hasCallback = s.jsonp !== false,
		replaceInUrl = hasCallback && rjsonp.test( url ),
		replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
			!( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
			rjsonp.test( data );

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		overwritten = window[ callbackName ];

		// Insert callback into url or form data
		if ( replaceInUrl ) {
			s.url = url.replace( rjsonp, "$1" + callbackName );
		} else if ( replaceInData ) {
			s.data = data.replace( rjsonp, "$1" + callbackName );
		} else if ( hasCallback ) {
			s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});
var xhrCallbacks,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									try {
										responses.text = xhr.responseText;
									} catch( _ ) {
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback, 0 );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit, prevScale,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						prevScale = scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

						// Update scale, tolerating zeroes from tween.cur()
						scale = tween.cur() / target;

					// Stop looping if we've hit the mark or scale is unchanged
					} while ( scale !== 1 && scale !== prevScale );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	}, 0 );
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		index = 0,
		tweenerIndex = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				percent = 1 - ( remaining / animation.duration || 0 ),
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end, easing ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			anim: animation,
			queue: animation.opts.queue,
			elem: elem
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	var index, prop, value, length, dataShow, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery.removeData( elem, "fxshow", true );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing any value as a 4th parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, false, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ||
			// special check for .toggle( handler, handler, ... )
			( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations resolve immediately
				if ( empty ) {
					anim.stop( true );
				}
			};

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.interval = 13;

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
var rroot = /^(?:body|html)$/i;

jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var box, docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, top, left,
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	if ( (body = doc.body) === elem ) {
		return jQuery.offset.bodyOffset( elem );
	}

	docElem = doc.documentElement;

	// Make sure we're not dealing with a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return { top: 0, left: 0 };
	}

	box = elem.getBoundingClientRect();
	win = getWindow( doc );
	clientTop  = docElem.clientTop  || body.clientTop  || 0;
	clientLeft = docElem.clientLeft || body.clientLeft || 0;
	scrollTop  = win.pageYOffset || docElem.scrollTop;
	scrollLeft = win.pageXOffset || docElem.scrollLeft;
	top  = box.top  + scrollTop  - clientTop;
	left = box.left + scrollLeft - clientLeft;

	return { top: top, left: left };
};

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.body;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					 top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, value, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

window.Granite = window.Granite || {};

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of Sling-related utilities.
 * @static
 * @singleton
 * @class Granite.Sling
 */
Granite.Sling = {

        /**
         * The selector for infinite hierarchy depth when retrieving
         * repository content.
         * @static
         * @final
         * @type String
         */
        SELECTOR_INFINITY: ".infinity",

        /**
         * The parameter name for the used character set.
         * @static
         * @final
         * @type String
         */
        CHARSET: "_charset_",

        /**
         * The parameter name for the status.
         * @static
         * @final
         * @type String
         */
        STATUS: ":status",

        /**
         * The parameter value for the status type "browser".
         * @static
         * @final
         * @type String
         */
        STATUS_BROWSER: "browser",

        /**
         * The parameter name for the operation.
         * @static
         * @final
         * @type String
         */
        OPERATION: ":operation",

        /**
         * The parameter value for the delete operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_DELETE: "delete",

        /**
         * The parameter value for the move operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_MOVE: "move",

        /**
         * The parameter name suffix for deleting.
         * @static
         * @final
         * @type String
         */
        DELETE_SUFFIX: "@Delete",

        /**
         * The parameter name suffix for setting a type hint.
         * @static
         * @final
         * @type String
         */
        TYPEHINT_SUFFIX: "@TypeHint",

        /**
         * The parameter name suffix for copying.
         * @static
         * @final
         * @type String
         */
        COPY_SUFFIX: "@CopyFrom",

        /**
         * The parameter name suffix for moving.
         * @static
         * @final
         * @type String
         */
        MOVE_SUFFIX: "@MoveFrom",

        /**
         * The parameter name for the ordering.
         * @static
         * @final
         * @type String
         */
        ORDER: ":order",

        /**
         * The parameter name for the replace flag.
         * @static
         * @final
         * @type String
         */
        REPLACE: ":replace",

        /**
         * The parameter name for the destination flag.
         * @static
         * @final
         * @type String
         */
        DESTINATION: ":dest",

        /**
         * The parameter name for the save parameter prefix.
         * @static
         * @final
         * @type String
         */
        SAVE_PARAM_PREFIX: ":saveParamPrefix",

        /**
         * The parameter name for input fields that should
         * be ignored by Sling.
         * @static
         * @final
         * @type String
         */
        IGNORE_PARAM: ":ignore",

        /**
         * The parameter name for login requests.
         * @static
         * @final
         * @type String
         */
        REQUEST_LOGIN_PARAM: "sling:authRequestLogin",

        /**
         * Login URL
         * @static
         * @final
         * @type String
         */
        LOGIN_URL: "/system/sling/login.html",

        /**
         * Logout URL
         * @static
         * @final
         * @type String
         */
        LOGOUT_URL: "/system/sling/logout.html"
};

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */
(function (Granite, $) {
    /**
     * A helper class providing a set of general utilities.
     * @static
     * @singleton
     * @class Granite.Util
     */
    Granite.Util = (function() {

        var self = {

            /**
             * Replaces occurrences of <code>{n}</code> in the specified text with
             * the texts from the snippets.
             * <p>Example 1 (single snippet):<pre><code>
    var text = Granite.Util.patchText("{0} has signed in.", "Jack");
               </code></pre>Result 1:<pre><code>
    Jack has signed in.
               </code></pre></p>
             * <p>Example 2 (multiple snippets):<pre><code>
    var text = "{0} {1} has signed in from {2}.";
    text = Granite.Util.patchText(text, ["Jack", "McFarland", "10.0.0.99"]);
               </code></pre>Result 2:<pre><code>
    Jack McFarland has signed in from 10.0.0.99.
               </code></pre></p>
             * @static
             * @param {String} text The text
             * @param {String/String[]} snippets The text(s) replacing
             *        <code>{n}</code>
             * @return {String} The patched text
             */
            patchText: function(text, snippets) {
                if (snippets) {
                    if (!$.isArray(snippets)) {
                        text = text.replace("{0}", snippets);
                    } else {
                        for (var i=0; i < snippets.length; i++) {
                            text = text.replace(("{" + i + "}"), snippets[i]);
                        }
                    }
                }
                return text;
            },

            /**
             * Returns the top most accessible window. Check {@link setIFrameMode} to avoid security exception message
             * on WebKit browsers if this method is called in an iFrame included in a window from different domain.
             * @static
             * @return {Window} The top window
             */
            getTopWindow: function() {
                var win = window;
                if( this.iFrameTopWindow ) {
                    return this.iFrameTopWindow;
                }
                try {
                    // try to access parent
                    // win.parent.location.href throws an exception if not authorized (e.g. different location in a portlet)
                    while(win.parent && win !== win.parent && win.parent.location.href) {
                        win = win.parent;
                    }
                } catch( error) {}
                return win;
            },

            /**
             * Allows to define if Granite.Util is running in an iFrame and parent window is in another domain
             * (and optionally define what would be the top window in that case.
             * This is necessary to use {@link getTopWindow} in a iFrame on WebKit based browsers because
             * {@link getTopWindow} iterates on parent windows to find the top one which triggers a security exception
             * if one parent window is in a different domain. Exception cannot be caught but is not breaking the JS
             * execution.
             * @param {Object} topWindow (optional) The iFrame top window. Must be running on the same host to avoid
             * security exception. Defaults to window.
             */
            setIFrameMode: function(topWindow) {
                this.iFrameTopWindow = topWindow || window;
            },

            /**
             * Applies default properties if inexistent inzo the base object.
             * Child objects are merged recursively.
             * REMARK: 
             *   - objects are recursively merged
             *   - simple type obejct properties are copied over the base
             *   - arrays are cloned and override the base (no value merging)
             * 
             * @static
             * @param {Object} base object
             * @param {Object} pass objects to be copied onto the base
             * @return {Object} The base object with defaults
             */
            applyDefaults: function() {
                var override, base = arguments[0] || {};

                for (var i=1; i < arguments.length; i++) {
                    override = arguments[i];

                    for (var name in override) {
                        var value = override[name];

                        if (override.hasOwnProperty(name) && value) {

                            if (typeof value === "object" && !(value instanceof Array)) {
                                // nested object
                                base[name] = self.applyDefaults(base[name], value);
                            } else if (value instanceof Array) {
                                //override array
                                base[name] = value.slice(0);
                            } else {
                                // simple type
                                base[name] = value;
                            }
                        }
                        
                    }
                }

                return base;
            },

            /**
             * Get keycode from event
             * @param event Event
             * @returns {Number} Keycode
             */
            getKeyCode: function(event) {
                return event.keyCode ? event.keyCode : event.which;
            }

        };

        return self;

    }());

}(Granite, jQuery));
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

(function (Granite, util, sling, $) {

    /**
     * A helper class providing a set of HTTP-related utilities.
     * @static
     * @singleton
     * @class Granite.HTTP
     */
    Granite.HTTP = (function() {
        /**
         * The context path used on the server.
         * May only be set by {@link #detectContextPath}.
         * @private
         * @type String
         */
        var contextPath = null,

        /**
         * The regular expression to detect the context path used
         * on the server using the URL of this script.
         * @private
         * @final
         * @type RegExp
         */
            SCRIPT_URL_REGEXP = /^(?:http|https):\/\/[^\/]+(\/[^\/]+)\/(?:etc|libs|apps)\/.*\.js(\?.*)?$/,

        /**
         * The regular expression to detect unescaped special characters in a path.
         * @private
         * @final
         * @type RegExp
         */
            ENCODE_PATH_REGEXP = /[^1\w-\.!~\*'\(\)\/%;:@&=\$,]/,

        /**
         * Indicates after a session timeout if a refresh has already been triggered
         * in order to avoid multiple alerts.
         * @private
         * @type String
         */
            loginRedirected = false,

            self = {};

        /**
         * Returns the scheme and authority (user, hostname, port) part of
         * the specified URL or an empty string if the URL does not include
         * that part.
         * @static
         * @param {String} url The URL
         * @return {String} The scheme and authority part
         */
        self.getSchemeAndAuthority = function (url) {
            var end;

            try {
                if (url.indexOf("://") == -1) return ""; // e.g. url was /en.html
                end = url.indexOf("/", url.indexOf("://") + 3);

                return (end == -1) ?
                    url :   // e.g. url was http://www.day.com
                    url.substring(0, end);  // e.g. url was http://www.day.com/en.html
            }
            catch (e) {
                return "";
            }
        };

        /**
         * Returns the context path used on the server.
         * @static
         * @return {String} The context path
         */
        self.getContextPath = function () {
            return contextPath;
        };

        /**
         * Detects the context path used on the server.
         * @private
         * @static
         */
        self.detectContextPath = function () {
            try {
                if (window.CQURLInfo) {
                    contextPath = CQURLInfo.contextPath || "";
                } else {
                    var scripts = document.getElementsByTagName("script");
                    for (var i = 0; i < scripts.length; i++) {
                        // in IE the first script is not the expected widgets js: loop
                        // until it is found
                        var result = SCRIPT_URL_REGEXP.exec(scripts[i].src);
                        if (result) {
                            contextPath = result[1];
                            return;
                        }
                    }
                    contextPath = "";
                }
            } catch (e) {
            }
        };

        /**
         * Makes sure the specified relative URL starts with the context path
         * used on the server. If an absolute URL is passed, it will be returned
         * as-is.
         * @static
         * @param {String} url The URL
         * @return {String} The externalized URL
         */
        self.externalize = function (url) {
            try {
                if (url.indexOf("/") == 0 && contextPath &&
                    url.indexOf(contextPath + "/") != 0) {
                    url = contextPath + url;
                }
            }
            catch (e) {
            }
            return url;
        };

        /**
         * Removes scheme, authority and context path from the specified
         * absolute URL if it has the same scheme and authority as the
         * specified document (or the current one). If a relative URL is passed,
         * the context path will be stripped if present.
         * @static
         * @param {String} url The URL
         * @param {String} doc (optional) The document
         * @return {String} The internalized URL
         */
        self.internalize = function (url, doc) {
        	if (url.charAt(0) == '/') {
        		if (contextPath) {
        			return url.substring(contextPath.length);
        		} else {
        			return url;
        		}
        	}
        	
        	if (!doc) doc = document;
            var docHost = self.getSchemeAndAuthority(doc.location.href);
            var urlHost = self.getSchemeAndAuthority(url);
            if (docHost == urlHost) {
                return url.substring(urlHost.length + (contextPath ? contextPath.length : 0));
            }
            else {
                return url;
            }
        };

        /**
         * Removes all parts but the path from the specified URL.
         * <p>Examples:<pre><code>
         /x/y.sel.html?param=abc => /x/y
         </code></pre>
         * <pre><code>
         http://www.day.com/foo/bar.html => /foo/bar
         </code></pre><p>
         * @static
         * @param {String} url The URL, may be empty. If empty <code>window.location.href</code> is taken.
         * @return {String} The path
         */
        self.getPath = function (url) {

            if (!url) {
                if (window.CQURLInfo && CQURLInfo.requestPath) {
                    return CQURLInfo.requestPath;
                } else {
                    url = window.location.pathname;
                }
            } else {
                url = self.removeParameters(url);
                url = self.removeAnchor(url);
            }

            url = self.internalize(url);
            var i = url.indexOf(".", url.lastIndexOf("/"));
            if (i != -1) {
                url = url.substring(0, i);
            }
            return url;
        };

        /**
         * Removes the anchor from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without anchor
         */
        self.removeAnchor = function (url) {
            if (url.indexOf("#") != -1) {
                return url.substring(0, url.indexOf("#"));
            }
            return url;
        };

        /**
         * Removes all parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without parameters
         */
        self.removeParameters = function (url) {
            if (url.indexOf("?") != -1) {
                return url.substring(0, url.indexOf("?"));
            }
            return url;
        };

        /**
         * Encodes the path of the specified URL if it is not already encoded.
         * Path means the part of the URL before the first question mark or
         * hash sign.<br>
         * See {@link #encodePath} for details about the encoding.<br>
         * Sample:<br>
         * <code>/x/y+z.png?path=/x/y+z >> /x/y%2Bz.png?path=x/y+z</code><br>
         * Note that the sample would not work because the "+" in the request
         * parameter would be interpreted as a space. Parameters must be encoded
         * separately.
         * @param {String} url The URL to encoded
         * @return {String} The encoded URL
         */
        self.encodePathOfURI = function (url) {
            var parts, delim;
            if (url.indexOf("?") != -1) {
                parts = url.split("?");
                delim = "?";
            }
            else if (url.indexOf("#") != -1) {
                parts = url.split("#");
                delim = "#";
            }
            else {
                parts = [url];
            }
            if (ENCODE_PATH_REGEXP.test(parts[0])) {
                parts[0] = self.encodePath(parts[0]);
            }
            return parts.join(delim);
        };

        /**
         * Encodes the specified path using encodeURI. Additionally <code>+</code>,
         * <code>#</code> and <code>?</code> are encoded.<br>
         * The following characters are not encoded:<br>
         * <code>0-9 a-z A-Z</code><br>
         * <code>- _ . ! ~ * ( )</code><br>
         * <code>/ : @ & =</code><br>
         * @param {String} path The path to encode
         * @return {String} The encoded path
         */
       self.encodePath = function (path) {
            // ensure IPV6 address square brackets are not encoded - see bug #34844
            path = encodeURI(path).replace(/%5B/g, '[').replace(/%5D/g, ']');
            path = path.replace(/\+/g, "%2B");
            path = path.replace(/\?/g, "%3F");
            path = path.replace(/;/g, "%3B");
            path = path.replace(/#/g, "%23");
            path = path.replace(/=/g, "%3D");
            path = path.replace(/\$/g, "%24");
            path = path.replace(/,/g, "%2C");
            path = path.replace(/'/g, "%27");
            path = path.replace(/"/g, "%22");
            return path;
       };

        /**
        * Returns if the redirect to the login page has already been triggered.
        * @return {Boolean}
        */
        self.handleLoginRedirect = function () {
            if (!loginRedirected) {
                loginRedirected = true;
                alert(Granite.I18n.get("Your request could not be completed because you have been signed out."));
                var l = util.getTopWindow().document.location;
                l.href = self.externalize(sling.LOGIN_URL) +
                    "?resource=" + l.pathname + encodeURIComponent(l.search) +
                    l.hash;
            }
        };

        /**
        * Gets the XHR hooked URL if called in a portlet context
        * @param {String} url The URL to get
        * @param {String} method The method to use to retrieve the XHR hooked URL
        * @param {Object} params The parameters
        * @return {String} The XHR hooked URL if available, the provided URL otherwise
        */
        self.getXhrHook = function (url, method, params) {
            method = method || "GET";
            if (window.G_XHR_HOOK && $.isFunction(G_XHR_HOOK)) {
                var p = {
                    "url": url,
                    "method": method
                };
                if (params) {
                    p["params"] = params;
                }
                return G_XHR_HOOK(p);
            }
            return null;
        };

        /**
         * Evaluates and returns the body of the specified response object.
         * Alternatively, a URL can be specified, in which case it will be
         * requested using a synchornous {@link #get} in order to acquire
         * the response object.
         * @static
         * @param {Object/String} response The response object or URL
         * @return {Object} The evaluated response body
         * @since 5.3
         */
        self.eval = function(response) {
            if (typeof response != "object") {
                response = $.ajax({
                    url: response,
                    type: 'get',
                    async: false
                });
            }
            try {
                // support responseText for backward compatibility (pre 5.3)
                return eval("(" + (response.body ? response.body :
                    response.responseText) + ")");
            } catch (e) {
            }
            return null;
        };

        return self;
    }());

}(Granite, Granite.Util, Granite.Sling, jQuery));

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

(function (Granite, util, http, $) {
    /**
     * A helper class providing a set of utilities related to internationalization (i18n).
     * @static
     * @singleton
     * @class Granite.I18n
     */
    Granite.I18n = (function() {

        /**
         * The map where the dictionaries are stored under their locale.
         * @private
         * @type Object
         */
        var dicts = {},

        /**
         * The initialization state of the internationalization.
         * @private
         * @type Boolean
         */
            initialized = false,

        /**
         * The prefix for the URL used to request dictionaries from the server.
         * @private
         * @type String
         */
            urlPrefix = "resources/dict.",

        /**
         * The suffix for the URL used to request dictionaries from the server.
         * @private
         * @type String
         */
            urlSuffix = ".json",

        /**
         * The current locale as a String or a function that returns the locale as a string.
         * @private
         * @static
         * @type String
         */
            currentLocale = "en",

        /**
         * If the current locale represents pseudo translations.
         * In that case the dictionary is expected to provide just a special
         * translation pattern to automatically convert all original strings.
         */
            pseudoTranslations = false,

            languages = null,

            self = {};

        /**
         * The default locale (en).
         * @static
         * @final
         * @type String
         */
        self.LOCALE_DEFAULT = "en";

        /**
         * Language code for pseudo translations.
         * @static
         * @final
         * @type String
         */
        self.PSEUDO_LANGUAGE = "zz";

        /**
         * Dictionary key for pseudo translation pattern.
         * @static
         * @final
         * @type String
         */
        self.PSEUDO_PATTERN_KEY = "_pseudoPattern_";

        /**
         * Initializes I18n with the given config options:
         * <ul>
         * <li>locale: the current locale (defaults to "en")</li>
         * <li>urlPrefix: the prefix for the URL used to request dictionaries from
         * the server (defaults to "/libs/cq/i18n/dict.")</li>
         * <li>urlSuffix: the suffix for the URL used to request dictionaries from
         * the server (defaults to ".json")</li>
         * </ul>
         * Sample config. The dictioniary would be requested from
         * "/apps/i18n/dict.fr.json":
         <code><pre>{
         "locale": "fr",
         "urlPrefix": "/apps/i18n/dict.",
         "urlSuffix": ".json"
         }</pre></code>
         * @param {Object} config The config
         */
        self.init = function (config) {
            if (!config) {
                config = new Object();
            }
            if (config.locale) {
                this.setLocale(config.locale);
            }
            urlPrefix = config.urlPrefix || urlPrefix;
            urlSuffix = config.urlSuffix || urlSuffix;
            initialized = true;
        };

        /**
         * Sets the current locale.
         * @static
         * @param {String/Function} locale The locale or a function that returns the locale as a string
         */
        self.setLocale = function (locale) {
            currentLocale = locale;
        };

        /**
         * Returns the current locale or the default locale if none is defined.
         * @static
         * @return {String} The locale
         */
        self.getLocale = function () {
            if(currentLocale && $.isFunction(currentLocale)) {
                // execute function first time only and store result in currentLocale
                currentLocale = currentLocale();
            }
            return currentLocale;
        };

        /**
         * Sets the prefix for the URL used to request dictionaries from
         * the server. The locale and URL suffix will be appended.
         * @static
         * @param {String} prefix The URL prefix
         */
        self.setUrlPrefix = function (prefix) {
            urlPrefix = prefix;
        };

        /**
         * Sets the suffix for the URL used to request dictionaries from
         * the server. It will be appended to the URL prefix and locale.
         * @static
         * @param {String} suffix The URL suffix
         */
        self.setUrlSuffix = function (suffix) {
            urlSuffix = suffix;
        };

        /**
         * Returns the dictionary for the specified locale. This method
         * will request the dictionary using the URL prefix, the locale,
         * and the URL suffix. If no locale is specified, the current
         * locale is used.
         * @static
         * @param {String} locale (optional) The locale
         * @return {Object} The dictionary
         */
        self.getDictionary = function (locale) {
            locale = locale || self.getLocale() || Granite.I18n.LOCALE_DEFAULT;
            if (!dicts[locale]) {
                pseudoTranslations = (locale.indexOf(self.PSEUDO_LANGUAGE) == 0);

                var url = urlPrefix + locale + urlSuffix;
                try {
                    var response = $.ajax(url, {
                        async: false,
                        dataType: "json"
                    });
                    dicts[locale] = $.parseJSON(response.responseText);
                } catch (e) {}
                if (!dicts[locale]) {
                    dicts[locale] = {};
                }
            }
            return dicts[locale];
        };

        /**
         * Translates the specified text into the current language.
         * @static
         * @param {String} text The text to translate
         * @param {String[]} snippets The snippets replacing <code>{n}</code> (optional)
         * @param {String} note A hint for translators (optional)
         * @return {String} The translated text
         */
        self.get = function (text, snippets, note) {
            var dict, newText, lookupText;
            if (initialized) {
                dict = self.getDictionary();
            }
            // note that pseudoTranslations is initialized in the getDictionary() call above
            lookupText = pseudoTranslations ? self.PSEUDO_PATTERN_KEY :
                note ? text + " ((" + note + "))" :
                    text;
            if (dict) {
                newText = dict[lookupText];
            }
            if (!newText) {
                newText = text;
            }
            if (pseudoTranslations) {
                newText = newText.replace("{string}", text).replace("{comment}", note ? note : "");
            }
            return util.patchText(newText, snippets);
        };

        /**
         * Translates the specified text into the current language. Use this
         * method to translate String variables, e.g. data from the server.
         * @static
         * @param {String} text The text to translate
         * @param {String} note A hint for translators (optional)
         * @return {String} The translated text
         */
        self.getVar = function (text, note) {
            if (!text) {
                return null;
            }
            return self.get(text, null, note);
        };

        /**
         * Returns the available languages, including a "title" property with a display name:
         * for instance "German" for "de" or "German (Switzerland)" for "de_ch".
         * @static
         * @return {Object} An object with language codes as keys and an object with "title",
         *                  "language", "country" and "defaultCountry" members.
         */
        self.getLanguages = function () {
            if (!languages) {
                try {
                    // use overlay servlet so customers can define /apps/wcm/core/resources/languages
                    var json = http.eval("/libs/wcm/core/resources/languages.overlay.infinity.json"); // TODO: broken!!!
                    $.each(json, function(name, lang) {
                        lang.title = self.getVar(lang.language);
                        if (lang.title && lang.country && lang.country != "*") {
                            lang.title += " ("+self.getVar(lang.country)+")";
                        }
                    });
                    languages = json;
                } catch (e) {
                    languages = {};
                }
            }
            return languages;
        };

        /**
         * Parses a language code string such as "de_CH" and returns an object with
         * language and country extracted. The delimiter can be "_" or "-".
         * @static
         * @param {String} langCode a language code such as "de" or "de_CH" or "de-ch"
         * @return {Object} an object with "code" ("de_CH"), "language" ("de") and "country" ("CH")
         *                  (or null if langCode was null)
         */
        self.parseLocale = function (langCode) {
            if (!langCode) {
                return null;
            }
            var pos = langCode.indexOf("_");
            if (pos < 0) {
                pos = langCode.indexOf("-");
            }

            var language, country;
            if (pos < 0) {
                language = langCode;
                country = null;
            } else {
                language = langCode.substring(0, pos);
                country = langCode.substring(pos + 1);
            }
            return {
                code: langCode,
                language: language,
                country: country
            };
        };

        return self;

    }());

}(Granite, Granite.Util, Granite.HTTP, jQuery));
/*
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2012 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * Implements the "Adobe Dynamic Touch Indicator" that tracks touch events and displays a visual indicator for
 * screen sharing and presentation purposes.
 *
 * To enable it call <code>Granite.TouchIndicator.init()</code> e.g. on document ready:
 * <pre><code>

 Granite.$(document).ready(function() {
     Granite.TouchIndicator.init();
 });

 </code></pre>
 *
 * AdobePatentID="2631US01"
 */
(function (Granite, $) {

    var touchIndicator = function() {

        var CSS = {
            "visibility": "hidden",
            "position": "absolute", // fixed would be better, but flickers on ipad while scrolling
            "width": "30px",
            "height": "30px",
            "-webkit-border-radius": "20px",
            "border-radius": "20px",
            "border": "5px solid orange",
            "-webkit-user-select": "none",
            "user-select": "none",
            "opacity": "0.5",
            "z-index": "2000",
            "pointer-events": "none"
        };

        var used = {};

        var unused = [];

        return {
            debugWithMouse: false,

            init: function() {
                var self = this;

                $(document).on("touchstart.touchindicator touchmove.touchindicator touchend.touchindicator", function(e) {
                    var touches = e.originalEvent.touches;
                    self.update(touches);
                    return true;
                });

                if (this.debugWithMouse) {
                    $(document).on("mousemove.touchindicator", function(e){
                        e.identifer = "fake";
                        self.update([e]);
                        return true;
                    });
                }
            },

            update: function(touches) {
                // go over all touch events present in the array
                var retained = {};
                for (var i = 0; i<touches.length; i++) {
                    var touch = touches[i];
                    var id = touch.identifier;

                    // check if we already have a indicator with the correct id
                    var indicator = used[id];
                    if (!indicator) {
                        // if not, check if we have an unused one
                        indicator = unused.pop();

                        // if not, create a new one and append it to the dom
                        if (!indicator) {
                            indicator = $("<div></div>").css(CSS);
                            $("body").append(indicator);
                        }
                    }

                    retained[id] = indicator;
                    indicator.offset({
                        left: touch.pageX - 20,
                        top: touch.pageY - 20
                    });
                    indicator.css("visibility", "visible");
                }

                // now hide all unused ones and stuff them in the unused array
                for (id in used) {
                    if (used.hasOwnProperty(id) && !retained[id]) {
                        indicator = used[id];
                        indicator.css("visibility", "hidden");
                        unused.push(indicator);
                    }
                }
                used = retained;
            }
        }
    };
    Granite.TouchIndicator = new touchIndicator();

}(Granite, jQuery));

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */
(function (Granite, util, http, $) {

    /**
     * A tool to determine whether any opt-out cookie is set and whether a given cookie name
     * is white-listed. The opt-out and white-list cookie names are determined by a server
     * side configuration (com.adobe.granite.security.commons.OptOutService) and provided to
     * this tool by an optionally included component (/libs/granite/security/components/optout)
     * which provides a global JSON object named <code>GraniteOptOutConfig</code>.
     *
     * @static
     * @singleton
     * @class Granite.OptOutUtil
     */
    Granite.OptOutUtil = (function () {

        var self = {};

        /**
         * Contains the names of cookies the presence of which indicates the user has opted out.
         * @private
         * @type Array
         */
        var optOutCookieNames = [];

        /**
         * Contains the names of cookies which may still be set in spite of the user having opted out.
         * @private
         * @type Array
         */
        var whitelistedCookieNames = [];

        /**
         * Initializes this tool with an opt-out configuration. The following options are supported:
         * <ul>
         *     <li>cookieNames: an array of cookie names representing opt-out cookies. Defaults to empty.</li>
         *     <li>whitelistCookieNames: an array of cookies representing white-listed cookies. Defaults to empty.</li>
         * </ul>
         * Sample config:
         * <code>
         *     <pre>
         *         {
         *         "cookieNames":["omniture_optout","cq-opt-out"],
         *         "whitelistCookieNames":["someAppCookie", "anotherImportantAppCookie"]
         *         }
         *     </pre>
         * </code>
         * @param config The opt-out configuration
         */
        self.init = function (config) {
            if (config) {
                optOutCookieNames = config.cookieNames
                        ? config.cookieNames : optOutCookieNames;
                whitelistedCookieNames = config.whitelistCookieNames
                        ? config.whitelistCookieNames : whitelistedCookieNames;
            }
        };

        /**
         * Returns the array of configured cookie names representing opt-out cookies.
         * @static
         * @return {Array} The cookie names
         */
        self.getCookieNames = function () {
            return optOutCookieNames;
        };

        /**
         * Returns the array of configured cookie names representing white-listed cookies.
         * @static
         * @return {Array} The cookie names
         */
        self.getWhitelistCookieNames = function () {
            return whitelistedCookieNames;
        };

        /**
         * Determines whether the user (browser) has elected to opt-out. This is indicated by the presence of
         * one of the cookies retrieved through #getCookieNames().
         * @return {Boolean} True if an opt-cookie was found in the browser's cookies.
         */
        self.isOptedOut = function () {
            var browserCookies = document.cookie.split(";");
            for (var i = 0; i < browserCookies.length; i++) {
                var cookie = browserCookies[i];
                var cookieName = $.trim(cookie.split("=")[0]);
                if ($.inArray(cookieName, self.getCookieNames()) > -1) {
                    return true;
                }
            }

            return false;
        };

        /**
         * Determines whether the given <code>cookieName</code> may be used to set a cookie. This is the case
         * if either opt-out is inactive (#isOptedOut() == false) or it is active and the give cookie name was
         * found in the white-list (#getWhitelistCookieNames()).
         * @param cookieName The name of the cookie to check.
         * @return {Boolean} True if a cookie of this name may be used with respect to the opt-out status.
         */
        self.maySetCookie = function (cookieName) {
            return !(self.isOptedOut() && $.inArray(cookieName, self.getWhitelistCookieNames()) === -1);
        };

        return self;

    }());

}(Granite, Granite.Util, Granite.HTTP, jQuery));
/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */


//------------------------------------------------------------------------------
// Initialize the Granite utils library

Granite.OptOutUtil.init(window.GraniteOptOutConfig);
Granite.HTTP.detectContextPath();

//todo: user language (not yet available)
//Granite.I18n.init({locale: [[Granite.User]].getLanguage()});
Granite.I18n.init();

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

(function ($, window, undefined) {

    var http;

    // namespacing
    window.Granite = window.Granite || {};
    window.Granite.$ = window.Granite.$ || $;

    // for deprecated "shared" support (GRANITE-1602)
    window._g = window._g || {};
    window._g.$ = window._g.$ || $;

    //grab Granite.HTTP
    http = Granite.HTTP;

    $.ajaxSetup({ // necessary global modifications for ajax calls 
        externalize: true,
        encodePath: true,
        hook: true,
        beforeSend: function (jqXHR, s) { // s: settings provided by the ajax call or default values
            if (typeof G_IS_HOOKED == "undefined" || !G_IS_HOOKED(s.url)) {
                if (s.externalize) { // add context to calls
                    s.url = http.externalize(s.url);
                }
                if (s.encodePath) {
                    s.url = http.encodePathOfURI(s.url);
                }
            }
            if (s.hook) { // portlet XHR hook
                var hook = http.getXhrHook(s.url, s.type, s.data);
                if (hook) {
                    s.url = hook.url;
                    if (hook.params) {
                        if (s.type.toUpperCase() == 'GET') {
                            s.url += '?' + $.param(hook.params);
                        } else {
                            s.data = $.param(hook.params);
                        }
                    }
                }
            }
        },
        statusCode: {
            403: function(jqXHR) {
                if (jqXHR.getResponseHeader("X-Reason") === "Authentication Failed") {
                    // login session expired: redirect to login page
                    http.handleLoginRedirect();
                }
            }
        }
    });

    $.ajaxSettings.traditional = true;
    
}(jQuery, this));
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

// map $CQ to Granite jQuery
window.$CQ = _g.$;


/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * The <code>_g</code> library contains all Granite component classes and utilities.
 * @static
 * @granite-class _g
 */
window._g = window._g || {};

// namespace
_g.shared = {};

// debug console
if (window.console === undefined) {
    window.console = {log:function(m){}};
}

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of HTTP-related utilities.
 * @static
 * @singleton
 * @class CQ.shared.HTTP
 * @deprecated use Granite.HTTP and Granite.$#ajax instead
 */
_g.shared.HTTP = new function() {
    /**
     * Creates an empty response object.
     * @private
     * @static
     * @return {Object} The response object
     */
    var createResponse = function() {
        var response = new Object();
        response.headers = new Object();
        response.body = new Object();
        return response;
    };

    var getResponseFromXhr = function(request) {
        if (!request) return null;
        var response = createResponse();
        response.body = request.responseText;
        response.headers[_g.HTTP.HEADER_STATUS] = request.status;
        // set properties for backward compatibility (pre 5.3)
        response.responseText = request.responseText;
        response.status = request.status;
        return response;
    };

    return {
        /**
         * The extension for HTML files.
         * @static
         * @final
         * @type String
         */
        EXTENSION_HTML: ".html",

        /**
         * The extension for JSON files.
         * @static
         * @final
         * @type String
         */
        EXTENSION_JSON: ".json",

        /**
         * The extension for resources.
         * @private
         * @static
         * @final
         * @type String
         */
        EXTENSION_RES: ".res",

        /**
         * The Status header.
         * @static
         * @final
         * @type String
         */
        HEADER_STATUS: "Status",

        /**
         * The Message header.
         * @static
         * @final
         * @type String
         */
        HEADER_MESSAGE: "Message",

        /**
         * The Location header.
         * @static
         * @final
         * @type String
         */
        HEADER_LOCATION: "Location",

        /**
         * The Path header.
         * @static
         * @final
         * @type String
         */
        HEADER_PATH: "Path",

        /**
         * The parameter name for no caching.
         * @static
         * @final
         * @type String
         */
        PARAM_NO_CACHE: "cq_ck",

        /**
         * Requests the specified URL from the server using GET. The request
         * will be synchronous, unless a callback function is specified.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameters:<ul>
         *        <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
         *        <li><b>success</b> : Boolean<div class="sub-desc">True if the request succeeded.</div></li>
         *        <li><b>response</b> : Object<div class="sub-desc">The response object.</div></li>
         *        </ul>
         * @param {Object} scope The scope for the callback (optional)
         * @param {Boolean} suppressForbiddenCheck Suppress the check if the session has timed out (optional)
         * @return {Mixed} The response object or, if the
         *         request is asynchronous, the transaction ID
         */
        get: function(url, callback, scope, suppressForbiddenCheck) {
            url = _g.HTTP.getXhrHookedURL(_g.HTTP.externalize(url, true));

            if (callback != undefined) {
                return _g.$.ajax({
                    type: "GET",
                    url: url,
                    externalize: false,
                    encodePath: false,
                    hook: false,
                    complete: function(request, textStatus) {
                        var response = getResponseFromXhr(request);
                        if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(response);
                        callback.call(scope || this,
                                this,
                                textStatus == "success",
                                response);
                    }
                });
            } else {
                try {
                    var request = _g.$.ajax({
                        type: "GET",
                        url: url,
                        async: false,
                        externalize: false,
                        encodePath: false,
                        hook: false
                    });
                    var response = getResponseFromXhr(request);
                    if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(response);
                    return response;
                } catch (e) {
                    return null;
                }
            }
        },

        /**
         * Requests the specified URL from the server using POST. The request
         * will be synchronous, unless a callback function is specified.
         * The returned response object looks like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameters:<ul>
         *        <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
         *        <li><b>success</b> : Boolean<div class="sub-desc">True if the request succeeded.</div></li>
         *        <li><b>xhr</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
         *        See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
         *        accessing elements of the response.</div></li>
         *        <li><b>response</b> : Object<div class="sub-desc">The response object.<br>
         *        <i>Added in CQ 5.3</i></div></li>
         *        </ul>
         * @param {Object} params The parameters
         * @param {Object} scope The scope for the callback
         * @param {Boolean} suppressErrorMsg Suppress the error msg notification
         * @param {Boolean} suppressForbiddenCheck Suppress the check if the session has timed out (optional)
         * @return {Mixed} The response object or, if the request is
         *         asynchronous, the transaction ID
         */
        post: function(url, callback, params, scope, suppressErrorMsg, suppressForbiddenCheck) {
            url = _g.HTTP.externalize(url, true);

            var hook = _g.HTTP.getXhrHook(url, "POST", params);
            if (hook) {
                url = hook.url;
                params = hook.params;
            }

            if (callback != undefined) {
                return _g.$.ajax({
                    type: "POST",
                    url: url,
                    data: params,
                    externalize: false,
                    encodePath: false,
                    hook: false,
                    complete: function(request, textStatus) {
                        var response = _g.HTTP.buildPostResponseFromHTML(request.responseText);
                        if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(request);
                        callback.call(scope || this,
                                this,
                                textStatus == "success",
                                response);
                    }
                });
            } else {
                try {
                    var request = _g.$.ajax({
                        type: "POST",
                        url: url,
                        data: params,
                        async: false,
                        externalize: false,
                        encodePath: false,
                        hook: false
                    });
                    var response = _g.HTTP.buildPostResponseFromHTML(request.responseText);
                    if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(request);
                    return response;
                } catch (e) {
                    return null;
                }
            }
        },

        /**
         * Returns the value of the parameter with the specified name
         * in the URL. Only the first value will be considered.
         * Values will be URL-decoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @return {String} The value
         */
        getParameter: function(url, name) {
            var params = _g.HTTP.getParameters(url, name);
            return params != null ? params[0] : null;
        },

        /**
         * Returns the values of the parameters with the specified name
         * in the URL. Values will be URL-decoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @return {String[]} The values
         */
        getParameters: function(url, name) {
            var values = [];
            if (!name) {
                return null;
            }
            name = encodeURIComponent(name);
            if (url.indexOf("?") == -1) {
                return null;
            }
            var query = url.substring(url.indexOf("?") + 1);
            if (query.indexOf(name) == -1) {
                return null;
            }
            var queryPts = query.split("&");
            for (var i = 0; i < queryPts.length; i++) {
                var paramPts = queryPts[i].split("=");
                if (paramPts[0] == name) {
                    values.push(paramPts.length > 1 ? decodeURIComponent(paramPts[1]) : "");
                }
            }
            return values.length > 0 ? values : null;
        },

        /**
         * Adds a parameter to the specified URL. The parameter name and
         * value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String/String[]} value The value of the parameter.
         *        Since 5.3, an array of strings can be passed
         * @return {String} The URL with the new parameter
         */
        addParameter: function(url, name, value) {
            if (value && value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    url = _g.HTTP.addParameter(url, name, value[i]);
                }
                return url;
            }
            var separator = url.indexOf("?") == -1 ? "?" : "&";
            var hashIdx = url.indexOf("#");
            if (hashIdx < 0) {
                return url + separator + encodeURIComponent(name) + "=" + encodeURIComponent(value);
            } else {
                var hash = url.substring(hashIdx);
                url = url.substring(0, hashIdx);
                return url + separator + encodeURIComponent(name) + "=" + encodeURIComponent(value) + hash;
            }
        },

        /**
         * Overwrites a parameter in the specified URL. The parameter name
         * and value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String} value The value of the parameter
         * @return {String} The URL with the new parameter
         */
        setParameter: function(url, name, value) {
            url = _g.HTTP.removeParameter(url, name);
            return _g.HTTP.addParameter(url, name, value);
        },

        /**
         * Removes a parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter to remove
         * @return {String} The URL without the parameter
         */
        removeParameter: function(url, name) {
            var pattern0 = "?" + encodeURIComponent(name) + "=";
            var pattern1 = "&" + encodeURIComponent(name) + "=";
            var pattern;
            if (url.indexOf(pattern0) != -1) {
                pattern = pattern0;
            }
            else if (url.indexOf(pattern1) != -1) {
                pattern = pattern1;
            }
            else {
                return url;
            }

            var indexCutStart = url.indexOf(pattern);
            var begin = url.substring(0, indexCutStart);

            var indexCutEnd = url.indexOf("&", indexCutStart + 1);
            var end = "";
            if (indexCutEnd != -1) {
                end = url.substring(indexCutEnd);
                if (end.indexOf("&") == 0) {
                    end = end.replace("&", "?");
                }
            }
            return begin + end;
        },

        /**
         * Removes all parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without parameters
         */
        removeParameters: Granite.HTTP.removeParameters,

        /**
         * Adds the specified selector to an URL.
         * @param {String} url The URL. The URL must contain a extension and
         *                 must not contain a suffix (x.json/a/b). Anchor and
         *                 request parameters are supported.
         * @param {String} selector The name of the selector to insert
         * @param {Number} index (optional) The index of the selector. If it is "-1"
         *                 or bigger than the number of the existing selectors
         *                 the selector will be appended. Defaults to "0".
         * @return {String} The updated URL
         * @since 5.3
         */
        addSelector: function(url, selector, index) {
            if (!index) index = 0;

            // url:  /x/y.z.json?a=1#b
            // post: ?a=1#b
            // path: /x
            // main: y.z.json
            var post = ""; // string of parameters and anchor
            var pIndex = url.indexOf("?");
            if (pIndex == -1) pIndex = url.indexOf("#");
            if (pIndex != -1) {
                post = url.substring(pIndex);
                url = url.substring(0, pIndex);
            }
            var sIndex = url.lastIndexOf("/");
            var main = url.substring(sIndex); // name, selectors and extension
            if (main.indexOf("." + selector + ".") == -1) {
                var path = url.substring(0, sIndex);
                var obj = main.split(".");
                var newMain = "";
                var delim = "";
                if (index > obj.length - 2 || index == -1) {
                    // insert at last position
                    index = obj.length - 2;
                }
                for (var i = 0; i < obj.length; i++) {
                    newMain += delim + obj[i];
                    delim = ".";
                    if (index == i) {
                        newMain += delim + selector;
                    }
                }
                return path + newMain + post;
            }
            else {
                return url;
            }
        },

        /**
         * Replaces the selector at the given index position. If no selector exists
         * at the index position, no change is made to the URL.
         *
         * @param {String} url The URL.
         * @param {String} selector The value with which to replace the selector.
         * @param {Number} index The index of the selector to set/replace.
         * @return {String} The URL with the selector replaced.
         * @since 5.4
         */
        setSelector: function(url, selector, index) {

            var post = "";
            var pIndex = url.indexOf("?");
            if (pIndex == -1) pIndex = url.indexOf("#");
            if (pIndex != -1) {
                post = url.substring(pIndex);
                url = url.substring(0, pIndex);
            }

            var selectors = _g.HTTP.getSelectors(url);
            var ext = url.substring(url.lastIndexOf("."));
            // cut extension
            url = url.substring(0, url.lastIndexOf("."));
            // cut selectors
            var fragment = (selectors.length > 0) ? url.replace("." + selectors.join("."), "") : url;

            if (selectors.length > 0) {
                for (var i = 0; i < selectors.length; i++) {
                    if (index == i) {
                        fragment += "." + selector;
                    } else {
                        fragment += "." + selectors[i]
                    }
                }
            } else {
                fragment += "." + selector;
            }

            return fragment + ext + post;
        },

        /**
         * Adds the specified selectors to an URL.
         * @param {String} url The URL. The URL must contain a extension and
         *                 must not contain a suffix (x.json/a/b). Anchor and
         *                 request parameters are supported.
         * @param {String[]} selectors The name of the selectors to insert
         * @return {String} The updated URL
         * @since 5.5
         */
        addSelectors: function(url, selectors) {
            var res = url;
            if( url && selectors && selectors.length) {
                for(var i=0;i< selectors.length;i++) {
                    res = _g.HTTP.addSelector(res, selectors[i], i);
                }
            }
            return res;
        },

        /**
         * Returns the anchor part of the URL.
         * @static
         * @param {String} url The URL
         * @return {String} The anchor
         */
        getAnchor: function(url) {
            if (url.indexOf("#") != -1) {
                return url.substring(url.indexOf("#") + 1);
            }
            return "";
        },

        /**
         * Sets the anchor of the specified URL.
         * @static
         * @param {String} url The URL
         * @param {String} anchor The anchor
         * @return {String} The URL with anchor
         */
        setAnchor: function(url, anchor) {
            return _g.HTTP.removeAnchor(url) + "#" + anchor;
        },

        /**
         * Removes the anchor from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without anchor
         */
        removeAnchor: Granite.HTTP.removeAnchor,

        /**
         * Prevents caching by adding a timestamp to the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL with timestamp
         */
        noCaching: function(url) {
            return _g.HTTP.setParameter(url, _g.HTTP.PARAM_NO_CACHE, new Date().valueOf());
        },

        /**
         * Builds a response object using the specified node and its child nodes.
         * The content of each node with an ID will be set as a response header.
         * @private
         * @static
         * @param {Node} node The content document or the node to parse
         * @param {Object} response The response object to use (optional)
         * @return {Object} The response object
         */
        buildPostResponseFromNode: function(node, response) {
            if (!node) {
                return null;
            }
            if (response == undefined) {
                response = createResponse();
            }

            for (var i = 0; i < node.childNodes.length; i++) {
                var child = node.childNodes[i];
                if (child.tagName) {
                    if (child.id) {
                        if (child.href) {
                            response.headers[child.id] = child.href;
                        }
                        else {
                            response.headers[child.id] = child.innerHTML;
                        }
                    }
                    response = _g.HTTP.buildPostResponseFromNode(child, response);
                }
            }
            return response;
        },

        /**
         * Builds a response object using the specified HTML string. The
         * content of each node with an ID will be set as a response header.
         * @private
         * @static
         * @param {String} html The HTML string
         * @return {Object} The response object
         */
        buildPostResponseFromHTML: function(html) {
            var response = createResponse();
            try {
                if (html.responseText != undefined) {
                    html = html.responseText;
                } else if (typeof html != "string") {
                    html = html.toString();
                }
                var div = document.createElement("div");
                div.innerHTML = html;
                response = _g.HTTP.buildPostResponseFromNode(div, response);
                div = null;
            } catch (e) {
            }
            return response;
        },

        /**
         * Returns the value of the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @return {String} The value of the cookie
         */
        getCookie: function(name) {
            var cname = encodeURIComponent(name) + "=";
            var dc = document.cookie;
            if (dc.length > 0) {
                var begin = dc.indexOf(cname);
                if (begin != -1) {
                    begin += cname.length;
                    var end = dc.indexOf(";", begin);
                    if (end == -1) end = dc.length;
                    return decodeURIComponent(dc.substring(begin, end));
                }
            }
            return null;
        },

        /**
         * Sets the value of the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @param {String} value The value of the cookie
         * @param {String} path (optional) The server path the cookie applies to
         * @param {Number} days (optional) The number of days the cookie will live
         * @param {String} domain (optional) The server domain
         * @param {Boolean} secure (optional) True if the
         *        connection is secure
         * @return {String} The value of the cookie
         */
        setCookie: function(name, value, path, days, domain, secure) {
            if (typeof(days) != "number") days = 7;
            var date;
            if (days > 0) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            } else {
                date = new Date(0);
            }
            document.cookie = encodeURIComponent(name) + "=" +
                    encodeURIComponent(value) + "; " +
                    (days != 0 ? "expires=" + date.toGMTString() + "; " : "") +
                    (domain ? "domain=" + domain + "; " : "") +
                    (path ? "path=" + path : "") +
                    (secure ? "; secure" : "");
            return value;
        },

        /**
         * Clears the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @param {String} path (optional) The server path the cookie applies to
         * @param {String} domain (optional) The server domain
         * @param {Boolean} secure (optional) True if the
         *        connection is secure
         */
        clearCookie : function(name, path, domain, secure) {
            _g.HTTP.setCookie(name, "null", path || "", -1, domain || "", secure || "");
        },

        /**
         * Returns the scheme and authority (user, hostname, port) part of
         * the specified URL or an empty string if the URL does not include
         * that part.
         * @static
         * @param {String} url The URL
         * @return {String} The scheme and authority part
         */
        getSchemeAndAuthority: Granite.HTTP.getSchemeAndAuthority,

        /**
         * Returns the context path used on the server.
         * @static
         * @return {String} The context path
         * @since 5.3
         */
        getContextPath: Granite.HTTP.getContextPath,

        /**
         * Makes sure the specified relative URL starts with the context path
         * used on the server. If an absolute URL is passed, it will be returned
         * as-is.
         * @static
         * @param {String} url The URL
         * @param {boolean} encode true to encode the path of the URL (optional)
         * @return {String} The externalized URL
         * @since 5.3
         */
        externalize: function(url, encode) {
            // check if URL is already XHR_HOOKED and assume that the externalization has
            // already been applied if so (externalizing an already hooked URL will break
            // it in several/most cases!)
            if ((typeof G_IS_HOOKED != "undefined") && G_IS_HOOKED(url)) {
                return url;
            }
            if (encode) url = _g.HTTP.encodePathOfURI(url);

            // Granite.HTTP.externalize does nor hooked check nor encoding
            url = Granite.HTTP.externalize(url);

            return url;
        },

        /**
         * Removes scheme, authority and context path from the specified
         * absolute URL if it has the same scheme and authority as the
         * specified document (or the current one).
         * @static
         * @param {String} url The URL
         * @param {String} doc (optional) The document
         * @return {String} The internalized URL
         */
        internalize: Granite.HTTP.internalize,

        /**
         * Removes all parts but the path from the specified URL.
         * <p>Examples:<pre><code>
         /x/y.sel.html?param=abc => /x/y
         </code></pre>
         * <pre><code>
         http://www.day.com/foo/bar.html => /foo/bar
         </code></pre><p>
         * @static
         * @param {String} url The URL, may be empty. If empty <code>window.location.href</code> is taken.
         * @return {String} The path
         * @since 5.3
         */
        getPath: Granite.HTTP.getPath,

        /**
         * Returns the current request suffix as provided by CQURLInfo.suffix.
         *
         * @static
         * @return {String} The suffix
         *
         * @since 5.5
         */
        getSuffix: function() {
            if (window.CQURLInfo && CQURLInfo.suffix) {
                return CQURLInfo.suffix;
            }
            return null;
        },

        /**
         * Returns an array with the selectors present in the given url.
         * If no selectors are present, an empty array is returned.
         * @static
         * @param {String} url The URL, optional. If no url is provided, the
         *                     selectors as provided by CQURLInfo.selectors
         *                     are taken, with a fallback to window.location.href.
         * @return {Array} An array containing the selectors or an empty
         *                 array if none were found.
         * @since 5.4
         */
        getSelectors: function(url) {

            if (!url && window.CQURLInfo) {
                if (CQURLInfo.selectors) {
                    return CQURLInfo.selectors;
                }
            }

            var selectors = [];

            url = url || window.location.href;

            url = _g.HTTP.removeParameters(url);
            url = _g.HTTP.removeAnchor(url);

            var fragment = url.substring(url.lastIndexOf("/"));
            if (fragment) {
                var split = fragment.split(".");
                if (split.length > 2) {
                    for (var i = 0; i < split.length; i++) {
                        // don't add node name and extension as selectors
                        if (i > 0 && i < split.length - 1) {
                            selectors.push(split[i]);
                        }
                    }
                }
            }

            return selectors;
        },

        /**
         * Returns the extension of an URL. This is the string
         * after the last dot until the end of the url without
         * any request parameters, anchors or suffix, for
         * example "html".
         *
         * @param {String} url The URL
         * @return {String} The URL extension (without the dot)
         *                  or an empty string if no was found.
         * @since 5.4
         */
        getExtension: function(url) {

            if (!url && window.CQURLInfo) {
                if (CQURLInfo.extension) {
                    return CQURLInfo.extension;
                }
            }

            url = url || window.location.href;

            // strip things from the end
            url = _g.HTTP.removeParameters(url);
            url = _g.HTTP.removeAnchor(url);

            // extension is everything after the last dot
            var pos = url.lastIndexOf(".");
            if (pos < 0) {
                return "";
            }

            // do not include the dot
            url = url.substring(pos + 1);

            // remove suffix if present
            pos = url.indexOf("/");
            if (pos < 0) {
                return url;
            }

            return url.substring(0, pos);
        },

        /**
         * Encodes the path of the specified URL if it is not already encoded.
         * Path means the part of the URL before the first question mark or
         * hash sign.<br>
         * See {@link #encodePath} for details about the encoding.<br>
         * Sample:<br>
         * <code>/x/y+z.png?path=/x/y+z >> /x/y%2Bz.png?path=x/y+z</code><br>
         * Note that the sample would not work because the "+" in the request
         * parameter would be interpreted as a space. Parameters must be encoded
         * separately.
         * @param {String} url The URL to encoded
         * @return {String} The encoded URL
         * @since 5.3
         */
        encodePathOfURI: Granite.HTTP.encodePathOfURI,

        /**
         * Encodes the specified path using encodeURI. Additionally <code>+</code>,
         * <code>#</code> and <code>?</code> are encoded.<br>
         * The following characters are not encoded:<br>
         * <code>0-9 a-z A-Z</code><br>
         * <code>- _ . ! ~ * ( )</code><br>
         * <code>/ : @ & =</code><br>
         * @param {String} path The path to encode
         * @return {String} The encoded path
         * @since 5.3
         */
        encodePath: Granite.HTTP.encodePath,

        /**
         * Evaluates and returns the body of the specified response object.
         * Alternatively, a URL can be specified, in which case it will be
         * requested using a synchornous {@link #get} in order to acquire
         * the response object.
         * @static
         * @param {Object/String} response The response object or URL
         * @return {Object} The evaluated response body
         * @since 5.3
         */
        eval: Granite.HTTP.eval,

        /**
         * Checks whether the specified status code is OK.
         * @static
         * @param {Number} status The status code
         * @return {Boolean} True if the status is OK, else false
         */
        isOkStatus: function(status) {
            try {
                return (new String(status).indexOf("2") == 0);
            } catch (e) {
                return false;
            }
        },

        /**
         * Checks if the specified response is OK.
         * The response object is expected to look like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {Object} response The response object
         * @return {Boolean} True if the response is OK, else false
         */
        isOk: function(response) {
            try {
                return _g.HTTP.isOkStatus(
                        response.headers[_g.HTTP.HEADER_STATUS]);
            } catch (e) {
                return false;
            }
        },

        /**
         * <p>Returns if the specified response is of status 403/forbidden. If the
         * status is 403 and <code>suppressLogin</code> is undefined the document
         * is redirected to the login page.</p>
         * <p>The status is expected to be found in the "status" property of the
         * response: <code>{ "status": 403 }</code></p>
         * @param {Object} response The response
         * @param {Boolean} suppressLogin <code>true</code> to not redirect to the login page
         * @return {Boolean} <code>true</code> if the status is 403
         */
        handleForbidden: function(response, suppressLogin) {
            try {
                if (response[_g.HTTP.HEADER_STATUS.toLowerCase()] == 403) {
                    Granite.HTTP.handleLoginRedirect();
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        },

        /**
         * Gets the XHR hooked URL if called in a portlet context
         * @param {String} url The URL to get
         * @param {String} method The method to use to retrieve the XHR hooked URL
         * @param {Object} params The parameters
         * @return {String} The XHR hooked URL if available, the provided URL otherwise
         */
        getXhrHook: Granite.HTTP.getXhrHook,

        /**
         * Gets the XHR hooked URL if called in a portlet context
         * @param {String} url The URL to get
         * @param {String} method The method to use to retrieve the XHR hooked URL
         * @param {Object} params The parameters
         * @return {String} The XHR hooked URL if available, the provided URL otherwise
         */
        getXhrHookedURL: function(url, method, params) {
            var hook = _g.HTTP.getXhrHook(url, method, params);
            if (hook) {
                return hook.url;
            }
            return url;
        },

        /**
         * Reloads the XHR hook (portlet context)
         * @static
         * @param {String} url The URL
         * @return {String} Updated URL if reload hook function exists
         */
        reloadHook: function(url) {
            if (typeof G_RELOAD_HOOK != "undefined" && _g.$.isFunction(G_RELOAD_HOOK)) {
                if (CQURLInfo.selectorString != "") {
                    url = _g.HTTP.addSelector(url, CQURLInfo.selectorString);
                }
                url = G_RELOAD_HOOK(url) || url;
            }
            return url;
        }

    }
};

// shortcut
_g.HTTP = _g.shared.HTTP;

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of general utilities.
 * @static
 * @singleton
 * @class CQ.shared.Util
 * @granite-class _g.Util
 * @deprecated
 */
_g.shared.Util = new function() {
    return {
        /**
         * Reloads the window or replaces its location with the specified URL.
         * If no window is specified, the current window will be used.
         * @static
         * @param {Window} win (optional) The window to reload
         * @param {String} url (optional) The URL
         * @param {String} preventHistory (optional) Prevent history
         */
        reload: function(win, url, preventHistory) {
            if (!win) win = window;
            if (!url) {
                url = _g.HTTP.noCaching(win.location.href);
            }
            url = _g.HTTP.reloadHook(url);

            if (preventHistory) {
                win.location.replace(url);
            } else {
                win.location.href = url;
            }
        },

        /**
         * Loads the specified URL in the current window.
         * @static
         * @param {String} url The URL
         * @param {String} preventHistory (optional) Prevent history
         */
        load: function(url, preventHistory) {
            _g.Util.reload(window, url, preventHistory);
        },

        /**
         * Opens a new window with the specified URL.
         * If no window is specified, the current window will be used.
         * @static
         * @param {String} url The URL
         * @param {Window} win (optional) The window to reload
         * @param {String} name (optional) New window name
         * @param {String} options (optional) New window options
         * @return {Object} New window
         */
        open: function(url, win, name, options) {
            if (!win) win = window;
            if (!url) {
                return;
            }
            url = _g.HTTP.reloadHook(url);

            if (!name) {
                name = "";
            }
            if (!options) {
                options = "";
            }

            return win.open(url, name, options);
        },

        /**
         * Converts certain characters (&, <, >, and ") to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode
         * @return {String} The encoded text
         */
        htmlEncode : function(value) {
            return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        },

        /**
         * Converts certain characters (&, <, >, and ") from their HTML character equivalents.
         * @param {String} value The string to decode
         * @return {String} The decoded text
         */
        htmlDecode : function(value) {
            return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        },

        /**
         * Truncates a string and add an ellipsis ('...') to the end if it exceeds the specified length
         * @param {String}  value  The string to truncate
         * @param {Number}  length The maximum length to allow before truncating
         * @param {Boolean} word   True to try to find a common work break
         * @return {String} The converted text
         */
        ellipsis : function(value, length, word) {
            if (value && value.length > length) {
                if (word) {
                    var vs = value.substr(0, length - 2);
                    var index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'), vs.lastIndexOf(';'));
                    if (index == -1 || index < (length - 15)) {
                        return value.substr(0, length - 3) + "...";
                    } else {
                        return vs.substr(0, index) + "...";
                    }
                } else {
                    return value.substr(0, length - 3) + "...";
                }
            }
            return value;
        },

                /**
         * Replaces occurrences of <code>{n}</code> in the specified text with
         * the texts from the snippets.
         * <p>Example 1 (single snippet):<pre><code>
var text = CQ.shared.Util.patchText("{0} has signed in.", "Jack");
           </code></pre>Result 1:<pre><code>
Jack has signed in.
           </code></pre></p>
         * <p>Example 2 (multiple snippets):<pre><code>
var text = "{0} {1} has signed in from {2}.";
text = CQ.shared.Util.patchText(text, ["Jack", "McFarland", "10.0.0.99"]);
           </code></pre>Result 2:<pre><code>
Jack McFarland has signed in from 10.0.0.99.
           </code></pre></p>
         * @static
         * @param {String} text The text
         * @param {String/String[]} snippets The text(s) replacing
         *        <code>{n}</code>
         * @return {String} The patched text
         */
        patchText: Granite.Util.patchText,

        /**
         * Evaluates and returns the response text of the specified response
         * object.
         * @static
         * @param {Object} response The response object
         * @return {Object} The evaluated object
         * @deprecated Use {@link CQ.shared.HTTP#eval} instead
         */
        eval: function(response) {
            return _g.HTTP.eval(response);
        },

        /**
         * Returns the top most accessible window.
         * @static
         * @return {Window} The top window
         * @since 5.5
         */
        getTopWindow: Granite.Util.getTopWindow,

        /**
        * Allows to define if Granite.Util is running in an iFrame and parent window is in another domain
        * (and optionally define what would be the top window in that case.
        * This is necessary to use {@link getTopWindow} in a iFrame on WebKit based browsers because
        * {@link getTopWindow} iterates on parent windows to find the top one which triggers a security exception
        * if one parent window is in a different domain. Exception cannot be caught but is not breaking the JS
        * execution.
        * @param {Object} topWindow (optional) The iFrame top window. Must be running on the same host to avoid
        * security exception. Defaults to window.
        */
        setIFrameMode: Granite.Util.setIFrameMode

    }

};

// shortcut
_g.Util = _g.shared.Util;

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of Sling-related utilities.
 * @static
 * @singleton
 * @class CQ.Sling
 * @deprecated use Granite.Sling instead
 */
_g.shared.Sling = function() {

    return {

        /**
         * The selector for infinite hierarchy depth when retrieving
         * repository content.
         * @static
         * @final
         * @type String
         */
        SELECTOR_INFINITY: Granite.Sling.SELECTOR_INFINITY,

        /**
         * The parameter name for the used character set.
         * @static
         * @final
         * @type String
         */
        CHARSET: Granite.Sling.CHARSET,

        /**
         * The parameter name for the status.
         * @static
         * @final
         * @type String
         */
        STATUS: Granite.Sling.STATUS,

        /**
         * The parameter value for the status type "browser".
         * @static
         * @final
         * @type String
         */
        STATUS_BROWSER: Granite.Sling.STATUS_BROWSER,

        /**
         * The parameter name for the operation.
         * @static
         * @final
         * @type String
         */
        OPERATION: Granite.Sling.OPERATION,

        /**
         * The parameter value for the delete operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_DELETE: Granite.Sling.OPERATION_DELETE,

        /**
         * The parameter value for the move operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_MOVE: Granite.Sling.OPERATION_MOVE,

        /**
         * The parameter name suffix for deleting.
         * @static
         * @final
         * @type String
         */
        DELETE_SUFFIX: Granite.Sling.DELETE_SUFFIX,

        /**
         * The parameter name suffix for setting a type hint.
         * @static
         * @final
         * @type String
         */
        TYPEHINT_SUFFIX: Granite.Sling.TYPEHINT_SUFFIX,

        /**
         * The parameter name suffix for copying.
         * @static
         * @final
         * @type String
         */
        COPY_SUFFIX: Granite.Sling.COPY_SUFFIX,

        /**
         * The parameter name suffix for moving.
         * @static
         * @final
         * @type String
         */
        MOVE_SUFFIX: Granite.Sling.MOVE_SUFFIX,

        /**
         * The parameter name for the ordering.
         * @static
         * @final
         * @type String
         */
        ORDER: Granite.Sling.ORDER,

        /**
         * The parameter name for the replace flag.
         * @static
         * @final
         * @type String
         */
        REPLACE: Granite.Sling.REPLACE,

        /**
         * The parameter name for the destination flag.
         * @static
         * @final
         * @type String
         */
        DESTINATION: Granite.Sling.DESTINATION,

        /**
         * The parameter name for the save parameter prefix.
         * @static
         * @final
         * @type String
         */
        SAVE_PARAM_PREFIX: Granite.Sling.SAVE_PARAM_PREFIX,

        /**
         * The parameter name for input fields that should
         * be ignored by Sling.
         * @static
         * @final
         * @type String
         */
        IGNORE_PARAM: Granite.Sling.IGNORE_PARAM,

        /**
         * The parameter name for login requests.
         * @static
         * @final
         * @type String
         */
        REQUEST_LOGIN_PARAM: Granite.Sling.REQUEST_LOGIN_PARAM,

        /**
         * Login URL
         * @static
         * @final
         * @type String
         */
        LOGIN_URL: Granite.Sling.LOGIN_URL,

        /**
         * Logout URL
         * @static
         * @final
         * @type String
         */
        LOGOUT_URL: Granite.Sling.LOGOUT_URL,

        /**
         * Detects and processes binary repository data returned by Sling
         * and does some preparsing on it for more easy data handling.
         * @static
         * @param {Object} value The repository data to check
         * @return {Object} The processed repository data
         */
        processBinaryData: function(value) {
            if (value && value[":jcr:data"] != undefined) {
                // value is a binary
                var o = new Object();
                o.size = value[":jcr:data"];
                o.type = value["jcr:mimeType"];
                o.date = value["jcr:lastModified"];
                value = o;
            }
            return value;
        },

        /**
         * Returns the content path for the data.
         * @static
         * @param {String} relPath The relative path to resolve
         * @param {String} absPath The absolute path to resovle against
         * @param {Boolean} allowParentPaths Indicates parent paths (../) should be processed at the start of the
         * relative path
         * @return {String} The absolute path path
         */
        getContentPath: function(relPath, absPath, allowParentPaths) {
            var path = absPath;
            if (path.lastIndexOf(".") > path.lastIndexOf("/")) {
                // remove selectors and extension from absPath:
                // /content/foo.bar.html >> /content/foo
                path = path.substr(0, path.indexOf(".", path.lastIndexOf("/")));
            }
            if (relPath) {
                if (relPath.indexOf("/") == 0) {
                    path = relPath;
                } else {
                    if (allowParentPaths) {
                        while (relPath.indexOf("../") == 0) {
                            relPath = relPath.substring(3);
                            path = path.substring(0, path.lastIndexOf("/"));
                        }
                    }
                    relPath = relPath.replace("./", "");
                    path = path + "/" + relPath;
                }
            }
            return path;
        }
    };

}();

// shortcut
_g.Sling = _g.shared.Sling;

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * Provides static utilities for XSS management.
 * @static
 * @singleton
 * @since 5.4
 * @class CQ.shared.XSS
 * @granite-class _g.XSS
 * @deprecated
 */
_g.shared.XSS = new function() {
    return {
        /**
         * Get XSS property name from a provided property name
         *
         * @static
         * @param  {String} propertyName Property name
         * @return {String} XSS property name
         */
        getXSSPropertyName: function(propertyName) {
            if (!propertyName) {
                return '';
            }
            if (_g.XSS.KEY_REGEXP.test(propertyName)) {
                return propertyName;
            }
            return propertyName += _g.XSS.KEY_SUFFIX;
        },

        /**
         * Get XSS property value from provided property name and json record
         *
         * @static
         * @param  {Object} rec          Object containing the properties and their values
         * @param  {String} propertyName Property name
         * @param  {Number} ellipsisLimit Maximum number of characters
         * @return {String} XSS property value if it exists, non protected value otherwise
         */
        getXSSRecordPropertyValue: function(rec, propertyName, ellipsisLimit) {
            var value = '';
            if (rec && propertyName) {
                var xssPropValue = rec.get(this.getXSSPropertyName(propertyName));
                if (xssPropValue) {
                    value = xssPropValue;
                } else {
                    value = rec.get(propertyName);
                }

                if (ellipsisLimit && !isNaN(ellipsisLimit)) {
                    value = _g.Util.ellipsis(value, ellipsisLimit, true);
                }
            }
            return value;
        },

        /**
         * Get XSS property value from provided property name and table
         *
         * @static
         * @param  {Object} table         Object containing the properties and their values
         * @param  {String} propertyName  Property name
         * @param  {Number} ellipsisLimit Maximum number of characters
         * @return {String} XSS property value
         */
        getXSSTablePropertyValue: function(table, propertyName, ellipsisLimit) {
            var value = '';
            if (table && propertyName) {
                var xssPropValue = table[this.getXSSPropertyName(propertyName)];
                if (xssPropValue) {
                    value = xssPropValue;
                } else {
                    value = table[propertyName];
                }

                if (ellipsisLimit && !isNaN(ellipsisLimit)) {
                    value = _g.Util.ellipsis(value, ellipsisLimit, true);
                }
            }
            return value;
        },

        /**
         * XSS value renderer
         *
         * @static
         * @param  {String} val  Value to protect
         * @return {String} XSS protected value
         */
        getXSSValue: function(val) {
            if (val) {
                // There is a value to display, which we encode
                return _g.Util.htmlEncode(val);
            } else {
                // There was no value to display
                return '';
            }
        },

        /**
         * Update configuration object's property name if XSS is enabled for it
         *
         * @static
         * @param {Object}  cfg          Configuration object
         * @param {String}  propertyName Property name of the provided configuration object
         */
        updatePropertyName: function(cfg, propertyName) {
            if (!cfg || !propertyName || !cfg[propertyName]) {
                return;
            }
            if (cfg['xssProtect'] && !cfg['xssKeepPropName']) {
                cfg[propertyName] = this.getXSSPropertyName(cfg[propertyName]);
            }
        },

        /**
         * XSS property renderer
         *
         * @static
         * @param  {String} val  Value to display if XSS would not have been requested or is not available
         * @param  {Object} meta Field metadata
         * @param  {Object} cfg  Field configuration
         * @param  {Object} rec  Record containing information
         * @return {String} XSS property value
         */
        xssPropertyRenderer: function(val, meta, rec, cfg) {
            if (cfg && cfg['dataIndex'] && rec && rec.data && rec.data[this.getXSSPropertyName(cfg['dataIndex'])]) {
                // The record contains the XSS property equivalent
                val = rec.data[this.getXSSPropertyName(cfg['dataIndex'])];
                if (cfg['ellipsisLimit'] && !isNaN(cfg['ellipsisLimit'])) {
                    val = _g.Util.ellipsis(val, cfg['ellipsisLimit'], true);
                }
                return val;
            } else if (val) {
                // The record does not contain the XSS property equivalent
                return val;
            } else {
                // There was no value to display
                return '';
            }
        }
    }
};

// shortcut
_g.XSS = _g.shared.XSS;

/**
 * Key suffix for XSS property name
 * @static
 * @final
 * @type String
 */
_g.XSS.KEY_SUFFIX = "_xss";

/**
 * Key regular expression to test if a property name already ends with XSS suffix
 * @private
 * @static
 * @final
 * @type Object
 */
_g.XSS.KEY_REGEXP = new RegExp(_g.XSS.KEY_SUFFIX + "$");

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of utilities related to internationalization
 * (i18n). Note: for cq localization, make sure to use CQ.I18n.get().
 * @static
 * @singleton
 * @class CQ.I18n
 * @granite-class _g.I18n
 * @deprecated use Granite.I18n instead
 */
_g.shared.I18n = Granite.I18n;//function() {

// shortcut
_g.I18n = _g.shared.I18n;

_g.shared.I18n.getMessage = Granite.I18n.get;
_g.shared.I18n.getVarMessage = Granite.I18n.getVar;

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of String related utilities.
 * @static
 * @singleton
 * @since 5.5
 * @class CQ.shared.String
 * @granite-class _g.String
 * @deprecated
 */
_g.shared.String = new function() {

    return {

        /**
         * Check to see if the the str starts with the prefix.
         * The comparison is case sensitive.
         * @static
         * @param {String} str The string to check.
         * @param {String} prefix The prefix to find.
         * @return {Boolean} if the str starts with the prefix
         * return true, otherwise false.
         */
        startsWith: function( str, prefix ) {
            if (str == null || prefix == null) {
                return str == null && prefix == null;
            }

            if (prefix.length > str.length) {
                return false;
            }

            // ensure we are dealing with the string form of this object
            var sMatch = str.toString();
            var sSearch	= prefix.toString();

            return (sMatch.indexOf(sSearch) == 0);
        },

        /**
         * Check to see if the the str ends with the suffix.
         * The comparison is case sensitive.
         * @static
         * @param {String} str The string to check.
         * @param {String} suffix The suffix to find.
         * @return {Boolean} if the str ends with the suffix
         * return true, otherwise false.
         */
        endsWith: function( str, suffix ) {

            if (str == null || suffix == null) {
                return str == null && suffix == null;
            }

            if (suffix.length > str.length) {
                return false;
            }

            // ensure we are dealing with the string form of this object
            str = str.toString();
            suffix	= suffix.toString();

            return (str.lastIndexOf(suffix) == (str.length - suffix.length));
        },

        /**
         * Check to see if the the str contains the searchStr.
         * The comparison is case sensitive.
         * @static
         * @param {String} str The string to check.
         * @param {String} searchStr The prefix to find.
         * @return {Boolean} if the str ends with the suffix
         * return true, otherwise false.
         */
        contains: function( str, searchStr ) {

            if (str == null || searchStr == null) {
                return false;
            }

            // ensure we are dealing with the string form of this object
            str = str.toString();
            searchStr = searchStr.toString();

            return (str.indexOf(searchStr) >= 0);
        }
    }
};

// shortcut
_g.String = _g.shared.String;

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * @class _g.shared.ClientSidePersistence
 * The _g.shared.ClientSidePersistence is a class providing method to persist a map of pairs (key/value).
 * @constructor
 * Creates a new ClientSidePersistence object.
 */
_g.shared.ClientSidePersistence = function(cfg) {
    var session = {
        /**
         * @cfg {String} PERSISTENCE_NAME
         * Persistence global key name
         * @final
         * @private
         */
        PERSISTENCE_NAME: _g.shared.ClientSidePersistence.decoratePersistenceName("ClientSidePersistence"),

        /**
         * @cfg {Object} config
         * Default configuration of ClientSidePersistence
         */
        config: {},

        /**
         * @property {Object} cache
         * Client side persistence cache object
         * @private
         */
        cache: null,

        /**
         * Returns current ClientSidePersistence mode
         * @return {Object} Current ClientSidePersistence mode (see {@link #config})
         */
        getMode: function() {
            return this.config.mode;
        },

        /**
         * Returns window object used by ClientSidePersistence
         * @return {Object} window object used by ClientSidePersistence
         */
        getWindow: function() {
            return this.config['window'] || _g.shared.Util.getTopWindow();
        },

        /**
         * Prints actual ClientSidePersistence content restricted to specified container name (if specified) and to used mode
         * @private
         * @return
         */
        debug: function() {
            if (console) {
                var map = this.getMap();
                var debugInfo = "[ClientSidePersistence -> mode=" + this.getMode().name + ", container=" + (this.config.container || '') + "]\n";
                var count = 0;
                var containerRE = new RegExp('^' + this.config.container + '/');

                for (var idx = 0, keys = Object.keys(map).sort(), last = null; idx < keys.length; idx++) {
                    var key = keys[idx];

                    if (this.config.container && (typeof(key) == 'string') && !key.match(containerRE)) {
                        continue;
                    }

                    var value = map[key];
                    debugInfo += "-[" + ++count + "]-> '" + key.replace(containerRE, '') + "' = '" + decodeURIComponent(value) + "'\n";
                }

                if (!count) {
                    debugInfo += "(container is empty)";
                }

                console.log(debugInfo);
            }
        },

        /**
         * Returns user provided key with container name (if it's specified)
         * @param {String} key
         * @private
         * @return {String} user provided key with container name
         */
        keyName: function(key) {
            return (this.config.container ? (this.config.container + '/') : '') + key;
        },

        /**
         * Returns the list of all the keys contained into the persistence
         * @return {String[]} list of the keys
         */
        getKeys: function() {
            var map = this.getMap();
            var keys = [];
            if( map ) {
                for ( var k in map ) {
                    if ( this.config.container ) {
                        if (k.indexOf(this.config.container + '/') == 0 ) {
                            var key = k.substring( this.config.container.length + 1 );
                            keys.push(key);
                        }
                    } else {
                        keys.push(k);
                    }
                }

            }
            return keys;
        },

        /**
         * Returns the value of the given key.
         * @param {String} key
         * @return {String} value of a given key
         */
        get: function(key) {
            var value = this.getMap()[this.keyName(key)];
            return value ? decodeURIComponent(value) : value;
        },

        /**
         * Sets the value of the given key.
         * @param {String} key
         * @param {String} value
         */
        set: function(key, value) {
            key = (typeof key === 'string') ? key.replace(/:=/g, '') : '';
            var eventData = {'key' : key};
            key = this.keyName(key);

            if (!key.length) {
                return;
            }

            var result = [];
            var map = this.getMap();
            eventData.action = map[key] ? "update": "set";

            if (value) {
                map[key] = encodeURIComponent(value);
            } else {
                eventData.action = "remove";
                delete map[key];
            }

            for (var entry in map) {
                result.push(entry + ':=' + map[entry]);
            }

            this.cache = map;
            this.write(result.join('|'));

            _g.$.extend(eventData, {
                'value': value,
                'mode': this.getMode().name,
                'container': this.config.container
            });

            _g.$(_g.shared.ClientSidePersistence).trigger(_g.shared.ClientSidePersistence.EVENT_NAME, eventData);
        },

        /**
         * Returns object containing a map of key/value pairs
         * @private
         * @return {Object} map of key/value pairs
         */
        getMap: function() {
            if (!this.cache || !this.config.useCache) {
                var data = this.read().split('|');
                var result = {};

                for (var idx = 0; idx < data.length; idx++) {
                    var chunks = data[idx].split(':=');
                    var key = chunks[0];

                    if (key && key.length) {
                        result[key] = chunks[1] || '';
                    }
                }

                this.cache = result;
            }

            return this.cache;
        },

        /**
         * Removes key from the persistence
         * @param {String} key
         * @return
         */
        remove: function(key) {
            this.set(key);
        },

        /**
         * Clears the whole content of persistence object
         * @return
         */
        clearMap: function() {
            this.write();
        },

        /**
         * Reads the whole content of persistence object
         * @private
         * @return {String} content of persistence object
         */
        read: function() {
            return this.config.mode.read(this) || '';
        },

        /**
         * Stores user provided data in persistence object
         * @param {String} data
         * @private
         * @return
         */
        write: function(data) {
            this.config.mode.write(this, data || '');
        }
    };

    /* applies user provided config on top of default configuration */
    _g.$.extend(session.config, _g.shared.ClientSidePersistence.getDefaultConfig(), cfg);

    if (session.config.useContainer === false) {
        session.config.container = null;
    }

    /* check if sessionStorage is supported and switch to localStorage otherwise */
    if ((session.config.mode === _g.shared.ClientSidePersistence.MODE_SESSION) && (!window.sessionStorage || !window.sessionStorage.getItem || !window.sessionStorage.setItem)) {
        session.config.mode = _g.shared.ClientSidePersistence.MODE_LOCAL;
    }

    /* check if localStorage is supported and switch to window.name otherwise */
    if ((session.config.mode === _g.shared.ClientSidePersistence.MODE_LOCAL) && (!window.localStorage || !window.localStorage.getItem || !window.localStorage.setItem)) {
        session.config.mode = _g.shared.ClientSidePersistence.MODE_WINDOW;
    }

    return session;
};

/**
 * @cfg {String} EVENT_NAME
 * Event name triggered while setting/updating key in ClientSidePersistence
 * @final
 * @private
 */
_g.shared.ClientSidePersistence.EVENT_NAME = 'ClientSidePersistence';

/**
 * window.sessionStorage implementation for ClientSidePersistence
 */
_g.shared.ClientSidePersistence.MODE_SESSION = {
    /**
     * @property {String} name
     * Name of MODE_SESSION storage implementation
     */
    name: 'session',

    /**
     * Reads the whole content of persistence object (using window.sessionStorage)
     * @param {ClientSidePersistence} self
     * @return content of persistence object
     */
    read: function(self) {
        return self.getWindow().sessionStorage.getItem(self.PERSISTENCE_NAME);
    },

    /**
     * Stores user provided data in persistence object (using window.sessionStorage)
     * @param {ClientSidePersistence} self
     * @param {String} value
     * @return
     */
    write: function(self, value) {
        if (Granite.OptOutUtil.isOptedOut()) return;
        try {
            self.getWindow().sessionStorage.setItem(self.PERSISTENCE_NAME, value);
        } catch(error) {
            //could not deal with the setItem
            return;
        }
    }
};

/**
 * window.localStorage implementation for ClientSidePersistence
 */
_g.shared.ClientSidePersistence.MODE_LOCAL = {
    /**
     * @property {String} name
     * Name of MODE_LOCAL storage implementation
     */
    name: 'local',

    /**
     * Reads the whole content of persistence object (using window.localStorage)
     * @param {ClientSidePersistence} self
     * @return content of persistence object
     */
    read: function(self) {
        return self.getWindow().localStorage.getItem(self.PERSISTENCE_NAME);
    },

    /**
     * Stores user provided data in persistence object (using window.localStorage)
     * @param {ClientSidePersistence} self
     * @param {String} value
     * @return
     */
    write: function(self, value) {
        if (Granite.OptOutUtil.isOptedOut()) return;
        try {
            self.getWindow().localStorage.setItem(self.PERSISTENCE_NAME, value);
        } catch(error) {
            //could not deal with the setItem
            return;
        }
    }
};

_g.shared.ClientSidePersistence.decoratePersistenceName = function(name) {
    return name;
};

/**
 * window.name implementation for ClientSidePersistence
 */
_g.shared.ClientSidePersistence.MODE_WINDOW = {
    /**
     * @property {String} name
     * Name of MODE_WINDOW storage implementation
     */
    'name': 'window',

    /**
     * Reads the whole content of persistence object (using window.name)
     * @param {ClientSidePersistence} self
     * @return content of persistence object
     */
    read: function(self) {
        return self.getWindow().name;
    },

    /**
     * Stores user provided data in persistence object (using window.name)
     * @param {ClientSidePersistence} self
     * @param {String} value
     * @return
     */
    write: function(self, value) {
        if (Granite.OptOutUtil.isOptedOut()) return;
        self.getWindow().name = value;
    }
};

/**
 * document.cookie implementation for ClientSidePersistence
 */
_g.shared.ClientSidePersistence.MODE_COOKIE = {
    /**
     * @property {String} COOKIE_NAME
     * Cookie key name used by MODE_COOKIE persistence mode
     */
    COOKIE_NAME: _g.shared.ClientSidePersistence.decoratePersistenceName("SessionPersistence"),

    /**
     * @property {String} name
     * Name of MODE_COOKIE storage implementation
     */
    name: 'cookie',

    /**
     * Reads the whole content of persistence object (using document.cookie)
     * @param {ClientSidePersistence} self
     * @return content of persistence object
     */
    read: function(self) {
        return _g.shared.ClientSidePersistence.CookieHelper.read(this.COOKIE_NAME);
    },

    /**
     * Stores or clears user provided data in persistence object (using document.cookie)
     * @param {ClientSidePersistence} self
     * @param {String} value (optional)
     * @return
     */
    write: function(self, value) {
        if (Granite.OptOutUtil.isOptedOut() && !Granite.OptOutUtil.maySetCookie(this.COOKIE_NAME)) return;
        if (!value) {
            _g.shared.ClientSidePersistence.CookieHelper.erase(this.COOKIE_NAME);
        } else {
            _g.shared.ClientSidePersistence.CookieHelper.set(this.COOKIE_NAME, value, 365 /* days */);
        }
    }
};

/*
 * ClientSidePersistence default config
 */
_g.shared.ClientSidePersistence.getDefaultConfig = function() {
    return {
        /**
         * @property {Object} window
         * Defines which window object should be used by ClientSidePersistence
         */
        window: _g.shared.Util.getTopWindow(),

        /**
         * @property {Boolean} useCache
         * Determines if ClientSidePersistence should use internal cache
         */
        useCache: false,

        /**
         * @property {String} container
         * Container name where key/values will be stored (by default it's null)
         */
        container: null,

        /**
         * @property {Object} mode
         * Defines which mode should be used (available modes are {@link _g.shared.ClientSidePersistence.MODE_SESSION MODE_SESSION},
         * {@link _g.shared.ClientSidePersistence.MODE_LOCAL MODE_LOCAL}, {@link _g.shared.ClientSidePersistence.MODE_WINDOW MODE_WINDOW}
         * and {@link _g.shared.ClientSidePersistence.MODE_COOKIE MODE_COOKIE})
         */
        mode: _g.shared.ClientSidePersistence.MODE_LOCAL
    };
};

/**
 * Cookie helper class.
 * @class _g.shared.ClientSidePersistence.CookieHelper
 * @singleton
 */
_g.shared.ClientSidePersistence.CookieHelper = {
    /**
     * Sets a cookie.
     * @param {String} name
     * @param {String} value
     * @param {Number} days
     */
    set: function(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        if (value) {
            value = encodeURIComponent(value);
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    /**
     * Returns the value of the cookie of the given name.
     * @param {String} name
     * @return {String} value of a given name (can be null)
     */
    read: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                var value = c.substring(nameEQ.length, c.length);
                return value ? decodeURIComponent(value) : null;
            }
        }
        return null;
    },

    /**
     * Removes the cookie of the given name.
     * @param {String} name
     */
    erase: function(name) {
        _g.shared.ClientSidePersistence.CookieHelper.set(name, "", -1);
    }
};

/*
 * Clears client side persistence using all implemented modes
 */
_g.shared.ClientSidePersistence.clearAllMaps = function() {
    var modes = [
        _g.shared.ClientSidePersistence.MODE_COOKIE,
        _g.shared.ClientSidePersistence.MODE_LOCAL,
        _g.shared.ClientSidePersistence.MODE_SESSION,
        _g.shared.ClientSidePersistence.MODE_WINDOW
    ];

    _g.$.each(modes, function(id, mode) {
        var persistence = new _g.shared.ClientSidePersistence({'mode': mode});
        persistence.clearMap();
    });
};

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

//------------------------------------------------------------------------------
// Initialize the Granite shared library

//todo: user language (not yet available)
//_g.I18n.init({locale: _g.User.getLanguage()});
_g.I18n.init();

/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */


/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * The <code>CQ</code> library contains all CQ component classes and utilities.
 * @static
 */
window.CQ = window.CQ || {};

// map CQ.shared to Granite shared
CQ.shared = _g.shared;

// shortcuts
CQ.Sling = CQ.shared.Sling;
CQ.I18n = CQ.shared.I18n;

// map constants for portlet support
G_XHR_HOOK = typeof CQ_XHR_HOOK != "undefined" ? CQ_XHR_HOOK : undefined;
G_RELOAD_HOOK = typeof CQ_RELOAD_HOOK != "undefined" ? CQ_RELOAD_HOOK : undefined;
G_IS_HOOKED = typeof CQ_IS_HOOKED != "undefined" ? CQ_IS_HOOKED : undefined;
G_CONTENT_PATH = typeof CQ_CONTENT_PATH != "undefined" ? CQ_CONTENT_PATH : undefined;

/**
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of form related utilities.
 * @static
 * @singleton
 * @class CQ.shared.Form
 */
CQ.shared.Form = function() {

    /**
     * Returns an associative array mapping ids to label nodes.
     * @private
     * @return {Object} For instance:
     *      {
     *          id1: labelNode1,
     *          id2: labelNode2,
     *          ...
     *      }
     */
    var getDocumentLabelMap = function() {
        var labelMap = new Object();
        var labelNodes = document.getElementsByTagName("label");
        for (var i = 0; i < labelNodes.length; i++) {
            var forId = labelNodes[i].htmlFor;  // buggy IE can't handle getAttribute("for")
            if (forId) {
                labelMap[forId] = labelNodes[i];
            }
        }
        return labelMap;
    };

    /**
     * Given a <label> node (perhaps one containing <input> or <select> children), return the text
     * content (excluding any <input> or <select> content).
     * @private
     * @return {String} The text content of all non-<input> and non-<select> descendants.
     */
    var getLabelNodeTextContent = function(node) {
        var text = "";
        var walkTree = function(node) {
            if (node.nodeType == 3) { // text node
                text += node.nodeValue;
            }
            if (node.nodeName.toLowerCase() == "select"
                || node.nodeName.toLowerCase() == "input"
                || node.nodeName.toLowerCase() == "textarea"
                || node.nodeName.toLowerCase() == "button") {
                // don't walk into fields if they're children of the label
                return;
            }
            for (var i = 0; node.childNodes && i < node.childNodes.length; i++) {
                walkTree(node.childNodes[i]);
            }
        };
        walkTree(node);
        return text;
    };

    /**
     * Given an indexed id, return the id for the parent section (the id with the index stripped off).
     * @private
     */
    var getSectionIdForIndexedId = function(id) {
        return id.replace(/-\d+$/, "");
    };

    /**
     * <p>Return the label text (as a <code>String</code>) for a particular <code>id</code>.  When a label
     * can't be found, return the id itself as a fall-back.</p>
     * <p>Note: Public callers can ignore the <code>documentLabelMap</code> parameter (it's used internally
     * as a caching mechanism).</p>
     * @param {String} id The id which the target <code>&lt;label&gt;</code> refers to.
     * @return {String} The label text.
     */
    var getLabelForId = function(id, documentLabelMap) {
        if (!documentLabelMap) {
            documentLabelMap = getDocumentLabelMap();
        }

        if (documentLabelMap[id]) {
            return getLabelNodeTextContent(documentLabelMap[id]);
        }
        return null;
    };

    /**
     * Locate the default values for the given node. Supported nodes
     * include, <code>input</code>, <code>textarea</code>, <code>option</code>.
     *
     * @private
     * @param {HTMLElement} node The element which to locate the default value for.
     * @return {String} the default value for the given node.
     */
    var getDefaultValue = function(node) {
        var defaultValue;
        var nodeName = node.nodeName.toLowerCase();
        var nodeType = hasAttribute(node, "type") ? node.getAttribute("type") : undefined;

        if (nodeName == "input") {
            if (nodeType == "radio" || nodeType == "checkbox") {
                if (hasAttribute(node, "checked")) {
                    defaultValue = node.getAttribute("value");
                }
            } else if (node.type == "text") {
                defaultValue = node.defaultValue;
                // support elements like hidden, reset, submit
            } else {
                defaultValue = node.value;
            }
        } else if (nodeName == "textarea") {
            defaultValue = node.value;
        } else if (nodeName == "option" && hasAttribute(node, "selected")) {
            defaultValue = node.getAttribute("value");
        }

        return defaultValue;
    };

    /**
     * Helper function to get around IE7 not supporting hasAttribute.
     * @private
     * @param {HTMLElement} el the html element
     * @param {String} attr the attribute to test for.
     */
    var hasAttribute = function(el, attr) {
        if (el == null) {
            return false;
        }

        // IE8 issue with attributes being not null but empty string
        return ($CQ(el).attr(attr) != undefined);
    };

    return {

        /**
         * Searches an array for an object with a particular property of a particular value.
         * @return {Object} the first object which matches, or null if no objects match.
         */
        searchArray: function(arr, testProperty, testValue) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][testProperty] && arr[i][testProperty] == testValue) {
                    return arr[i];
                }
            }
            return null;
        },

        /**
         * <p>Return the label text for an <code>&lt;input&gt;</code> or <code>&lt;select&gt;</code>.  When a
         * label can't be found, the element's name attribute is used as a fall-back.</p>
         * <p>Note: Public callers can ignore the <code>documentLabelMap</code> parameter (it's used internally
         * as a caching mechanism).</p>
         * @param {HTMLElement} fieldNode The <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code> or
         * <code>&lt;textArea&gt;</code> node.
         * @return {String} The label text.
         */
        getLabelForField: function(fieldNode, documentLabelMap) {
            if (!documentLabelMap) {
                documentLabelMap = getDocumentLabelMap();
            }

            var id = fieldNode.getAttribute("id");
            if (id && documentLabelMap[id]) {
                return getLabelNodeTextContent(documentLabelMap[id]);
            }

            var parent = fieldNode.parentNode;
            while (parent) {
                if (parent.nodeName.toLowerCase() == "label") {
                    return getLabelNodeTextContent(parent);
                }
                parent = parent.parentNode;
            }

            // No label found; we'll have to live with the name:
            return fieldNode.getAttribute("name");
        },

        /**
         * Get a list of fields in the document.
         * @return {Array} Each object in the array represents a field.  Each field contains:
         * <div class="mdetail-params"><ul)
         *   <li><code>text</code> : String<div class="sub-desc">The label to display (usually the field's caption).</div></li>
         *   <li><code>value</code> : String<div class="sub-desc">The name of the field.</div></li>
         *   <li><code>enumeration</code> : Array|null<div class="sub-desc">For enumerated fields, a nested array of text/value pairs.</div></li>
         * </ul></div>
         */
        getFields: function() {

            var documentLabelMap = getDocumentLabelMap();

            var fields = [];

            var visitNamedNode = function(node, inLocalNode) {
                var name = node.getAttribute("name");
                var nodeType = node.nodeName.toLowerCase();
                var field;

                if (nodeType == "input" || nodeType == "textarea") {
                    var controlType = hasAttribute(node, "type") ? node.getAttribute("type").toLowerCase() : "text";
                    if (controlType == "button" || controlType == "submit" || controlType == "reset") {
                        return;
                    }

                    // Fetch (or create) the field record:
                    //
                    field = CQ.shared.Form.searchArray(fields, "value", name);
                    if (!field) {
                        fields.push({
                            "text": CQ.shared.Form.getLabelForField(node, documentLabelMap),
                            "value": name,      // for Selection.setOptions()
                            "name": name,       // for everyone else
                            "enumeration": undefined,
                            "local": inLocalNode,
                            "type": nodeType,
                            "defaultValue": getDefaultValue(node),
                            "node": node
                        });
                        field = fields[fields.length-1];
                    }

                    // See if we're an enumeration.  Note that Sidekick-authored checkboxes are always
                    // enumerations, even when they appear singly.
                    //
                    if (controlType == "radio" || (field.local && controlType == "checkbox")) {
                        if (!field.enumeration) {
                            // This is the first one we've found of this group; promote the label to the
                            // section label
                            var inputId = node.getAttribute("id");
                            if (inputId) {
                                var sectionId = getSectionIdForIndexedId(inputId);
                                var sectionLabel = getLabelForId(sectionId, documentLabelMap);
                                field.text = (sectionLabel ? sectionLabel : name);
                            } else {
                                field.text = name;
                            }
                            field.enumeration = [];
                        }
                        field.enumeration.push({
                            "text": CQ.shared.Form.getLabelForField(node, documentLabelMap),
                            "value": node.getAttribute("value"),
                            "defaultValue": getDefaultValue(node),
                            "node": node
                        });
                    }
                } else if (nodeType == "select") {
                    // Create the field record:
                    //
                    fields.push({
                        "text": CQ.shared.Form.getLabelForField(node, documentLabelMap),
                        "value": name,              // for Selection.setOptions()
                        "name": name,               // for everyone else
                        "enumeration": [],
                        "local": inLocalNode,
                        "type": nodeType,
                        "defaultValue": undefined,  // defaultValues are on the options, not select element
                        "node": node
                    });
                    field = fields[fields.length-1];

                    // Add the options to the field's enumeration:
                    //
                    var optionNodes = node.getElementsByTagName("option");
                    for (var i = 0; i < optionNodes.length; i++) {
                        field.enumeration.push({
                            "text": optionNodes[i].innerHTML,
                            "value": optionNodes[i].getAttribute("value"),
                            "defaultValue": getDefaultValue(optionNodes[i]),
                            "node": optionNodes[i]
                        });
                    }
                }
            };

            var walkTree = function(node, inLocalNode) {
                if (node.nodeName.toLowerCase() == "div" && $CQ(node).hasClass("section")) {
                    inLocalNode = true;
                }

                if (node.getAttribute && node.getAttribute("name")) {
                    visitNamedNode(node, inLocalNode);
                }

                for (var i = 0; node.childNodes && i < node.childNodes.length; i++) {
                    var child = node.childNodes[i];
                    if (child.nodeType == 1) { // if element
                        walkTree(child, inLocalNode);
                    }
                }
            };

            walkTree(document, false);
            return fields;
        }
    }
}();

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * A helper class providing information about a CQ user.
 * @class CQ.shared.User
 * @singleton
 */
CQ.shared.User = function(infoData) {
    return  {
        /**
         * @property {Object} data
         * The user data.
         * @private
         */
        data: null,

        /**
         * @property {String} language
         * Resolved language read from preferences
         * @private
         */
        language: null,

        /**
         * @property {String} userPropsPath
         * The path where user properties may be requested from.
         * @private
         */
        userPropsPath: null,

        /**
         * Assembles the url to request the user properties from.
         * Apply default if no path has been set.
         * @private
         */
        getUserPropsUrl: function() {
            if(!this.userPropsPath) {
                this.userPropsPath = CQ.shared.User.PROXY_URI;
            }
            return this.userPropsPath;
        },

        /**
         * Loads the data.
         * @private
         */
        load: function() {
            var url = this.getUserPropsUrl();
            url = CQ.shared.HTTP.noCaching(url);
            var response = CQ.shared.HTTP.get(url);
            if (CQ.shared.HTTP.isOk(response)) {
                this.data = CQ.shared.Util.eval(response);
            }
        },

        /**
         * Instantly initializes the user via a request to server or the provided infoData if it has not already been initialized.
         * @param {Object} infoData (optional) Data to initialize the user with
         * @param {Boolean} force  (otpional) True to force initialization (in case of second initialization)
         * @return {Object} The initialization data
         */
        init: function(infoData, force) {
            if( !this.initialized || force) {
                if (infoData) {
                    // this is not used yet
                    this.data = infoData;
                } else {
                    this.load();
                }
                this.initialized = true;
            }
            return this.data;
        },

        /**
         * Initializes the user via a request to server only when user is used for the first time.
         */
        lazyInit: function() {
            this.lazyLoad = function() {
                this.load();
                this.initialized = true;
            }
        },

        /**
         * Returns if the user has been initialized.
         * @return {Boolean} True if initialized, false otherwise.
         */
        isInitialized: function() {
            return this.initialized;
        },

        /**
         * Returns the language selected by the user.
         * @return {String} The language
         */
        getLanguage: function() {
            if( !this.isInitialized() && this.lazyLoad ) {
                this.lazyLoad.call(this);
            }

            this.language = this.data &&
                this.data["preferences"] &&
                this.data["preferences"]["language"] ?
                this.data["preferences"]["language"] :
                "en";
            return this.language;
        }

    }

}();

/**
 * The URI to retrieve the user info from (defaults to <code>"/libs/cq/security/userinfo.json"</code>).
 * @static
 * @final
 * @type String
 */
CQ.shared.User.PROXY_URI = CQ.shared.HTTP.externalize("resources/userinfo" + CQ.shared.HTTP.EXTENSION_JSON);
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
//------------------------------------------------------------------------------
// Initialize the CQ shared library

CQ.shared.User.lazyInit();

CQ.shared.I18n.init({
    locale: function() { return CQ.shared.User.getLanguage();},
    urlPrefix: "resources/dict."
});

/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */
(function(jQuery, $) {
/*global window, jQuery */
(function($) {
    // Default configuration properties.
    var defaults = {
        vertical: false,
        rtl: false,
        start: 1,
        offset: 1,
        size: null,
        scroll: 3,
        visible: null,
        animation: 'normal',
        easing: 'swing',
        auto: 0,
        wrap: null,
        initCallback: null,
        setupCallback: null,
        reloadCallback: null,
        itemLoadCallback: null,
        itemFirstInCallback: null,
        itemFirstOutCallback: null,
        itemLastInCallback: null,
        itemLastOutCallback: null,
        itemVisibleInCallback: null,
        itemVisibleOutCallback: null,
        animationStepCallback: null,
        buttonNextHTML: '<div></div>',
        buttonPrevHTML: '<div></div>',
        buttonNextEvent: 'click',
        buttonPrevEvent: 'click',
        buttonNextCallback: null,
        buttonPrevCallback: null,
        itemFallbackDimension: null
    }, windowLoaded = false;

    $(window).bind('load.jcarousel', function() { windowLoaded = true; });

    /**
     * The jCarousel object.
     *
     * @constructor
     * @class jcarousel
     * @param {HTMLElement} e The element to create the carousel for.
     * @param {Object} o A set of key/value pairs to set as configuration properties.
     * @cat Plugins/jCarousel
     */
    $.jcarousel = function(e, o) {
        this.options    = $.extend({}, defaults, o || {});

        this.locked          = false;
        this.autoStopped     = false;

        this.container       = null;
        this.clip            = null;
        this.list            = null;
        this.buttonNext      = null;
        this.buttonPrev      = null;
        this.buttonNextState = null;
        this.buttonPrevState = null;

        // Only set if not explicitly passed as option
        if (!o || o.rtl === undefined) {
            this.options.rtl = ($(e).attr('dir') || $('html').attr('dir') || '').toLowerCase() == 'rtl';
        }

        this.wh = !this.options.vertical ? 'width' : 'height';
        this.lt = !this.options.vertical ? (this.options.rtl ? 'right' : 'left') : 'top';

        // Extract skin class
        var skin = '', split = e.className.split(' ');

        for (var i = 0; i < split.length; i++) {
            if (split[i].indexOf('jcarousel-skin') != -1) {
                $(e).removeClass(split[i]);
                skin = split[i];
                break;
            }
        }

        if (e.nodeName.toUpperCase() == 'UL' || e.nodeName.toUpperCase() == 'OL') {
            this.list      = $(e);
            this.clip      = this.list.parents('.jcarousel-clip');
            this.container = this.list.parents('.jcarousel-container');
        } else {
            this.container = $(e);
            this.list      = this.container.find('ul,ol').eq(0);
            this.clip      = this.container.find('.jcarousel-clip');
        }

        if (this.clip.size() === 0) {
            this.clip = this.list.wrap('<div></div>').parent();
        }

        if (this.container.size() === 0) {
            this.container = this.clip.wrap('<div></div>').parent();
        }

        if (skin !== '' && this.container.parent()[0].className.indexOf('jcarousel-skin') == -1) {
            this.container.wrap('<div class=" '+ skin + '"></div>');
        }

        this.buttonPrev = $('.jcarousel-prev', this.container);

        if (this.buttonPrev.size() === 0 && this.options.buttonPrevHTML !== null) {
            this.buttonPrev = $(this.options.buttonPrevHTML).appendTo(this.container);
        }

        this.buttonPrev.addClass(this.className('jcarousel-prev'));

        this.buttonNext = $('.jcarousel-next', this.container);

        if (this.buttonNext.size() === 0 && this.options.buttonNextHTML !== null) {
            this.buttonNext = $(this.options.buttonNextHTML).appendTo(this.container);
        }

        this.buttonNext.addClass(this.className('jcarousel-next'));

        this.clip.addClass(this.className('jcarousel-clip')).css({
            position: 'relative'
        });

        this.list.addClass(this.className('jcarousel-list')).css({
            overflow: 'hidden',
            position: 'relative',
            top: 0,
            margin: 0,
            padding: 0
        }).css((this.options.rtl ? 'right' : 'left'), 0);

        this.container.addClass(this.className('jcarousel-container')).css({
            position: 'relative'
        });

        if (!this.options.vertical && this.options.rtl) {
            this.container.addClass('jcarousel-direction-rtl').attr('dir', 'rtl');
        }

        var di = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
        var li = this.list.children('li');

        var self = this;

        if (li.size() > 0) {
            var wh = 0, j = this.options.offset;
            li.each(function() {
                self.format(this, j++);
                wh += self.dimension(this, di);
            });

            this.list.css(this.wh, (wh + 100) + 'px');

            // Only set if not explicitly passed as option
            if (!o || o.size === undefined) {
                this.options.size = li.size();
            }
        }

        // For whatever reason, .show() does not work in Safari...
        this.container.css('display', 'block');

        this.funcNext   = function() { self.next(); };
        this.funcPrev   = function() { self.prev(); };
        this.funcResize = function() {
            if (self.resizeTimer) {
                clearTimeout(self.resizeTimer);
            }

            self.resizeTimer = setTimeout(function() {
                self.reload();
            }, 100);
        };

        if (this.options.initCallback !== null) {
            this.options.initCallback(this, 'init');
        }

        if (!windowLoaded && $.browser.safari) {
            this.buttons(false, false);
            $(window).bind('load.jcarousel', function() { self.setup(); });
        } else {
            this.setup();
        }
    };

    // Create shortcut for internal use
    var $jc = $.jcarousel;

    $jc.fn = $jc.prototype = {
        jcarousel: '0.2.8'
    };

    $jc.fn.extend = $jc.extend = $.extend;

    $jc.fn.extend({
        /**
         * Setups the carousel.
         *
         * @method setup
         * @return undefined
         */
        setup: function() {
            this.first       = null;
            this.last        = null;
            this.prevFirst   = null;
            this.prevLast    = null;
            this.animating   = false;
            this.timer       = null;
            this.resizeTimer = null;
            this.tail        = null;
            this.inTail      = false;

            if (this.locked) {
                return;
            }

            this.list.css(this.lt, this.pos(this.options.offset) + 'px');
            var p = this.pos(this.options.start, true);
            this.prevFirst = this.prevLast = null;
            this.animate(p, false);

            $(window).unbind('resize.jcarousel', this.funcResize).bind('resize.jcarousel', this.funcResize);

            if (this.options.setupCallback !== null) {
                this.options.setupCallback(this);
            }
        },

        /**
         * Clears the list and resets the carousel.
         *
         * @method reset
         * @return undefined
         */
        reset: function() {
            this.list.empty();

            this.list.css(this.lt, '0px');
            this.list.css(this.wh, '10px');

            if (this.options.initCallback !== null) {
                this.options.initCallback(this, 'reset');
            }

            this.setup();
        },

        /**
         * Reloads the carousel and adjusts positions.
         *
         * @method reload
         * @return undefined
         */
        reload: function() {
            if (this.tail !== null && this.inTail) {
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + this.tail);
            }

            this.tail   = null;
            this.inTail = false;

            if (this.options.reloadCallback !== null) {
                this.options.reloadCallback(this);
            }

            if (this.options.visible !== null) {
                var self = this;
                var di = Math.ceil(this.clipping() / this.options.visible), wh = 0, lt = 0;
                this.list.children('li').each(function(i) {
                    wh += self.dimension(this, di);
                    if (i + 1 < self.first) {
                        lt = wh;
                    }
                });

                this.list.css(this.wh, wh + 'px');
                this.list.css(this.lt, -lt + 'px');
            }

            this.scroll(this.first, false);
        },

        /**
         * Locks the carousel.
         *
         * @method lock
         * @return undefined
         */
        lock: function() {
            this.locked = true;
            this.buttons();
        },

        /**
         * Unlocks the carousel.
         *
         * @method unlock
         * @return undefined
         */
        unlock: function() {
            this.locked = false;
            this.buttons();
        },

        /**
         * Sets the size of the carousel.
         *
         * @method size
         * @return undefined
         * @param s {Number} The size of the carousel.
         */
        size: function(s) {
            if (s !== undefined) {
                this.options.size = s;
                if (!this.locked) {
                    this.buttons();
                }
            }

            return this.options.size;
        },

        /**
         * Checks whether a list element exists for the given index (or index range).
         *
         * @method get
         * @return bool
         * @param i {Number} The index of the (first) element.
         * @param i2 {Number} The index of the last element.
         */
        has: function(i, i2) {
            if (i2 === undefined || !i2) {
                i2 = i;
            }

            if (this.options.size !== null && i2 > this.options.size) {
                i2 = this.options.size;
            }

            for (var j = i; j <= i2; j++) {
                var e = this.get(j);
                if (!e.length || e.hasClass('jcarousel-item-placeholder')) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Returns a jQuery object with list element for the given index.
         *
         * @method get
         * @return jQuery
         * @param i {Number} The index of the element.
         */
        get: function(i) {
            return $('>.jcarousel-item-' + i, this.list);
        },

        /**
         * Adds an element for the given index to the list.
         * If the element already exists, it updates the inner html.
         * Returns the created element as jQuery object.
         *
         * @method add
         * @return jQuery
         * @param i {Number} The index of the element.
         * @param s {String} The innerHTML of the element.
         */
        add: function(i, s) {
            var e = this.get(i), old = 0, n = $(s);

            if (e.length === 0) {
                var c, j = $jc.intval(i);
                e = this.create(i);
                while (true) {
                    c = this.get(--j);
                    if (j <= 0 || c.length) {
                        if (j <= 0) {
                            this.list.prepend(e);
                        } else {
                            c.after(e);
                        }
                        break;
                    }
                }
            } else {
                old = this.dimension(e);
            }

            if (n.get(0).nodeName.toUpperCase() == 'LI') {
                e.replaceWith(n);
                e = n;
            } else {
                e.empty().append(s);
            }

            this.format(e.removeClass(this.className('jcarousel-item-placeholder')), i);

            var di = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
            var wh = this.dimension(e, di) - old;

            if (i > 0 && i < this.first) {
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - wh + 'px');
            }

            this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) + wh + 'px');

            return e;
        },

        /**
         * Removes an element for the given index from the list.
         *
         * @method remove
         * @return undefined
         * @param i {Number} The index of the element.
         */
        remove: function(i) {
            var e = this.get(i);

            // Check if item exists and is not currently visible
            if (!e.length || (i >= this.first && i <= this.last)) {
                return;
            }

            var d = this.dimension(e);

            if (i < this.first) {
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + d + 'px');
            }

            e.remove();

            this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) - d + 'px');
        },

        /**
         * Moves the carousel forwards.
         *
         * @method next
         * @return undefined
         */
        next: function() {
            if (this.tail !== null && !this.inTail) {
                this.scrollTail(false);
            } else {
                this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'last') && this.options.size !== null && this.last == this.options.size) ? 1 : this.first + this.options.scroll);
            }
        },

        /**
         * Moves the carousel backwards.
         *
         * @method prev
         * @return undefined
         */
        prev: function() {
            if (this.tail !== null && this.inTail) {
                this.scrollTail(true);
            } else {
                this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'first') && this.options.size !== null && this.first == 1) ? this.options.size : this.first - this.options.scroll);
            }
        },

        /**
         * Scrolls the tail of the carousel.
         *
         * @method scrollTail
         * @return undefined
         * @param b {Boolean} Whether scroll the tail back or forward.
         */
        scrollTail: function(b) {
            if (this.locked || this.animating || !this.tail) {
                return;
            }

            this.pauseAuto();

            var pos  = $jc.intval(this.list.css(this.lt));

            pos = !b ? pos - this.tail : pos + this.tail;
            this.inTail = !b;

            // Save for callbacks
            this.prevFirst = this.first;
            this.prevLast  = this.last;

            this.animate(pos);
        },

        /**
         * Scrolls the carousel to a certain position.
         *
         * @method scroll
         * @return undefined
         * @param i {Number} The index of the element to scoll to.
         * @param a {Boolean} Flag indicating whether to perform animation.
         */
        scroll: function(i, a) {
            if (this.locked || this.animating) {
                return;
            }

            this.pauseAuto();
            this.animate(this.pos(i), a);
        },

        /**
         * Prepares the carousel and return the position for a certian index.
         *
         * @method pos
         * @return {Number}
         * @param i {Number} The index of the element to scoll to.
         * @param fv {Boolean} Whether to force last item to be visible.
         */
        pos: function(i, fv) {
            var pos  = $jc.intval(this.list.css(this.lt));

            if (this.locked || this.animating) {
                return pos;
            }

            if (this.options.wrap != 'circular') {
                i = i < 1 ? 1 : (this.options.size && i > this.options.size ? this.options.size : i);
            }

            var back = this.first > i;

            // Create placeholders, new list width/height
            // and new list position
            var f = this.options.wrap != 'circular' && this.first <= 1 ? 1 : this.first;
            var c = back ? this.get(f) : this.get(this.last);
            var j = back ? f : f - 1;
            var e = null, l = 0, p = false, d = 0, g;

            while (back ? --j >= i : ++j < i) {
                e = this.get(j);
                p = !e.length;
                if (e.length === 0) {
                    e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                    c[back ? 'before' : 'after' ](e);

                    if (this.first !== null && this.options.wrap == 'circular' && this.options.size !== null && (j <= 0 || j > this.options.size)) {
                        g = this.get(this.index(j));
                        if (g.length) {
                            e = this.add(j, g.clone(true));
                        }
                    }
                }

                c = e;
                d = this.dimension(e);

                if (p) {
                    l += d;
                }

                if (this.first !== null && (this.options.wrap == 'circular' || (j >= 1 && (this.options.size === null || j <= this.options.size)))) {
                    pos = back ? pos + d : pos - d;
                }
            }

            // Calculate visible items
            var clipping = this.clipping(), cache = [], visible = 0, v = 0;
            c = this.get(i - 1);
            j = i;

            while (++visible) {
                e = this.get(j);
                p = !e.length;
                if (e.length === 0) {
                    e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                    // This should only happen on a next scroll
                    if (c.length === 0) {
                        this.list.prepend(e);
                    } else {
                        c[back ? 'before' : 'after' ](e);
                    }

                    if (this.first !== null && this.options.wrap == 'circular' && this.options.size !== null && (j <= 0 || j > this.options.size)) {
                        g = this.get(this.index(j));
                        if (g.length) {
                            e = this.add(j, g.clone(true));
                        }
                    }
                }

                c = e;
                d = this.dimension(e);
                if (d === 0) {
                    throw new Error('jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...');
                }

                if (this.options.wrap != 'circular' && this.options.size !== null && j > this.options.size) {
                    cache.push(e);
                } else if (p) {
                    l += d;
                }

                v += d;

                if (v >= clipping) {
                    break;
                }

                j++;
            }

             // Remove out-of-range placeholders
            for (var x = 0; x < cache.length; x++) {
                cache[x].remove();
            }

            // Resize list
            if (l > 0) {
                this.list.css(this.wh, this.dimension(this.list) + l + 'px');

                if (back) {
                    pos -= l;
                    this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - l + 'px');
                }
            }

            // Calculate first and last item
            var last = i + visible - 1;
            if (this.options.wrap != 'circular' && this.options.size && last > this.options.size) {
                last = this.options.size;
            }

            if (j > last) {
                visible = 0;
                j = last;
                v = 0;
                while (++visible) {
                    e = this.get(j--);
                    if (!e.length) {
                        break;
                    }
                    v += this.dimension(e);
                    if (v >= clipping) {
                        break;
                    }
                }
            }

            var first = last - visible + 1;
            if (this.options.wrap != 'circular' && first < 1) {
                first = 1;
            }

            if (this.inTail && back) {
                pos += this.tail;
                this.inTail = false;
            }

            this.tail = null;
            if (this.options.wrap != 'circular' && last == this.options.size && (last - visible + 1) >= 1) {
                var m = $jc.intval(this.get(last).css(!this.options.vertical ? 'marginRight' : 'marginBottom'));
                if ((v - m) > clipping) {
                    this.tail = v - clipping - m;
                }
            }

            if (fv && i === this.options.size && this.tail) {
                pos -= this.tail;
                this.inTail = true;
            }

            // Adjust position
            while (i-- > first) {
                pos += this.dimension(this.get(i));
            }

            // Save visible item range
            this.prevFirst = this.first;
            this.prevLast  = this.last;
            this.first     = first;
            this.last      = last;

            return pos;
        },

        /**
         * Animates the carousel to a certain position.
         *
         * @method animate
         * @return undefined
         * @param p {Number} Position to scroll to.
         * @param a {Boolean} Flag indicating whether to perform animation.
         */
        animate: function(p, a) {
            if (this.locked || this.animating) {
                return;
            }

            this.animating = true;

            var self = this;
            var scrolled = function() {
                self.animating = false;

                if (p === 0) {
                    self.list.css(self.lt,  0);
                }

                if (!self.autoStopped && (self.options.wrap == 'circular' || self.options.wrap == 'both' || self.options.wrap == 'last' || self.options.size === null || self.last < self.options.size || (self.last == self.options.size && self.tail !== null && !self.inTail))) {
                    self.startAuto();
                }

                self.buttons();
                self.notify('onAfterAnimation');

                // This function removes items which are appended automatically for circulation.
                // This prevents the list from growing infinitely.
                if (self.options.wrap == 'circular' && self.options.size !== null) {
                    for (var i = self.prevFirst; i <= self.prevLast; i++) {
                        if (i !== null && !(i >= self.first && i <= self.last) && (i < 1 || i > self.options.size)) {
                            self.remove(i);
                        }
                    }
                }
            };

            this.notify('onBeforeAnimation');

            // Animate
            if (!this.options.animation || a === false) {
                this.list.css(this.lt, p + 'px');
                scrolled();
            } else {
                var o = !this.options.vertical ? (this.options.rtl ? {'right': p} : {'left': p}) : {'top': p};
                // Define animation settings.
                var settings = {
                    duration: this.options.animation,
                    easing:   this.options.easing,
                    complete: scrolled
                };
                // If we have a step callback, specify it as well.
                if ($.isFunction(this.options.animationStepCallback)) {
                    settings.step = this.options.animationStepCallback;
                }
                // Start the animation.
                this.list.animate(o, settings);
            }
        },

        /**
         * Starts autoscrolling.
         *
         * @method auto
         * @return undefined
         * @param s {Number} Seconds to periodically autoscroll the content.
         */
        startAuto: function(s) {
            if (s !== undefined) {
                this.options.auto = s;
            }

            if (this.options.auto === 0) {
                return this.stopAuto();
            }

            if (this.timer !== null) {
                return;
            }

            this.autoStopped = false;

            var self = this;
            this.timer = window.setTimeout(function() { self.next(); }, this.options.auto * 1000);
        },

        /**
         * Stops autoscrolling.
         *
         * @method stopAuto
         * @return undefined
         */
        stopAuto: function() {
            this.pauseAuto();
            this.autoStopped = true;
        },

        /**
         * Pauses autoscrolling.
         *
         * @method pauseAuto
         * @return undefined
         */
        pauseAuto: function() {
            if (this.timer === null) {
                return;
            }

            window.clearTimeout(this.timer);
            this.timer = null;
        },

        /**
         * Sets the states of the prev/next buttons.
         *
         * @method buttons
         * @return undefined
         */
        buttons: function(n, p) {
            if (n == null) {
                n = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'first') || this.options.size === null || this.last < this.options.size);
                if (!this.locked && (!this.options.wrap || this.options.wrap == 'first') && this.options.size !== null && this.last >= this.options.size) {
                    n = this.tail !== null && !this.inTail;
                }
            }

            if (p == null) {
                p = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'last') || this.first > 1);
                if (!this.locked && (!this.options.wrap || this.options.wrap == 'last') && this.options.size !== null && this.first == 1) {
                    p = this.tail !== null && this.inTail;
                }
            }

            var self = this;

            if (this.buttonNext.size() > 0) {
                this.buttonNext.unbind(this.options.buttonNextEvent + '.jcarousel', this.funcNext);

                if (n) {
                    this.buttonNext.bind(this.options.buttonNextEvent + '.jcarousel', this.funcNext);
                }

                this.buttonNext[n ? 'removeClass' : 'addClass'](this.className('jcarousel-next-disabled')).attr('disabled', n ? false : true);

                if (this.options.buttonNextCallback !== null && this.buttonNext.data('jcarouselstate') != n) {
                    this.buttonNext.each(function() { self.options.buttonNextCallback(self, this, n); }).data('jcarouselstate', n);
                }
            } else {
                if (this.options.buttonNextCallback !== null && this.buttonNextState != n) {
                    this.options.buttonNextCallback(self, null, n);
                }
            }

            if (this.buttonPrev.size() > 0) {
                this.buttonPrev.unbind(this.options.buttonPrevEvent + '.jcarousel', this.funcPrev);

                if (p) {
                    this.buttonPrev.bind(this.options.buttonPrevEvent + '.jcarousel', this.funcPrev);
                }

                this.buttonPrev[p ? 'removeClass' : 'addClass'](this.className('jcarousel-prev-disabled')).attr('disabled', p ? false : true);

                if (this.options.buttonPrevCallback !== null && this.buttonPrev.data('jcarouselstate') != p) {
                    this.buttonPrev.each(function() { self.options.buttonPrevCallback(self, this, p); }).data('jcarouselstate', p);
                }
            } else {
                if (this.options.buttonPrevCallback !== null && this.buttonPrevState != p) {
                    this.options.buttonPrevCallback(self, null, p);
                }
            }

            this.buttonNextState = n;
            this.buttonPrevState = p;
        },

        /**
         * Notify callback of a specified event.
         *
         * @method notify
         * @return undefined
         * @param evt {String} The event name
         */
        notify: function(evt) {
            var state = this.prevFirst === null ? 'init' : (this.prevFirst < this.first ? 'next' : 'prev');

            // Load items
            this.callback('itemLoadCallback', evt, state);

            if (this.prevFirst !== this.first) {
                this.callback('itemFirstInCallback', evt, state, this.first);
                this.callback('itemFirstOutCallback', evt, state, this.prevFirst);
            }

            if (this.prevLast !== this.last) {
                this.callback('itemLastInCallback', evt, state, this.last);
                this.callback('itemLastOutCallback', evt, state, this.prevLast);
            }

            this.callback('itemVisibleInCallback', evt, state, this.first, this.last, this.prevFirst, this.prevLast);
            this.callback('itemVisibleOutCallback', evt, state, this.prevFirst, this.prevLast, this.first, this.last);
        },

        callback: function(cb, evt, state, i1, i2, i3, i4) {
            if (this.options[cb] == null || (typeof this.options[cb] != 'object' && evt != 'onAfterAnimation')) {
                return;
            }

            var callback = typeof this.options[cb] == 'object' ? this.options[cb][evt] : this.options[cb];

            if (!$.isFunction(callback)) {
                return;
            }

            var self = this;

            if (i1 === undefined) {
                callback(self, state, evt);
            } else if (i2 === undefined) {
                this.get(i1).each(function() { callback(self, this, i1, state, evt); });
            } else {
                var call = function(i) {
                    self.get(i).each(function() { callback(self, this, i, state, evt); });
                };
                for (var i = i1; i <= i2; i++) {
                    if (i !== null && !(i >= i3 && i <= i4)) {
                        call(i);
                    }
                }
            }
        },

        create: function(i) {
            return this.format('<li></li>', i);
        },

        format: function(e, i) {
            e = $(e);
            var split = e.get(0).className.split(' ');
            for (var j = 0; j < split.length; j++) {
                if (split[j].indexOf('jcarousel-') != -1) {
                    e.removeClass(split[j]);
                }
            }
            e.addClass(this.className('jcarousel-item')).addClass(this.className('jcarousel-item-' + i)).css({
                'float': (this.options.rtl ? 'right' : 'left'),
                'list-style': 'none'
            }).attr('jcarouselindex', i);
            return e;
        },

        className: function(c) {
            return c + ' ' + c + (!this.options.vertical ? '-horizontal' : '-vertical');
        },

        dimension: function(e, d) {
            var el = $(e);

            if (d == null) {
                return !this.options.vertical ?
                       (el.outerWidth(true) || $jc.intval(this.options.itemFallbackDimension)) :
                       (el.outerHeight(true) || $jc.intval(this.options.itemFallbackDimension));
            } else {
                var w = !this.options.vertical ?
                    d - $jc.intval(el.css('marginLeft')) - $jc.intval(el.css('marginRight')) :
                    d - $jc.intval(el.css('marginTop')) - $jc.intval(el.css('marginBottom'));

                $(el).css(this.wh, w + 'px');

                return this.dimension(el);
            }
        },

        clipping: function() {
            return !this.options.vertical ?
                this.clip[0].offsetWidth - $jc.intval(this.clip.css('borderLeftWidth')) - $jc.intval(this.clip.css('borderRightWidth')) :
                this.clip[0].offsetHeight - $jc.intval(this.clip.css('borderTopWidth')) - $jc.intval(this.clip.css('borderBottomWidth'));
        },

        index: function(i, s) {
            if (s == null) {
                s = this.options.size;
            }

            return Math.round((((i-1) / s) - Math.floor((i-1) / s)) * s) + 1;
        }
    });

    $jc.extend({
        /**
         * Gets/Sets the global default configuration properties.
         *
         * @method defaults
         * @return {Object}
         * @param d {Object} A set of key/value pairs to set as configuration properties.
         */
        defaults: function(d) {
            return $.extend(defaults, d || {});
        },

        intval: function(v) {
            v = parseInt(v, 10);
            return isNaN(v) ? 0 : v;
        },

        windowLoaded: function() {
            windowLoaded = true;
        }
    });

    /**
     * Creates a carousel for all matched elements.
     *
     * @example $("#mycarousel").jcarousel();
     * @before <ul id="mycarousel" class="jcarousel-skin-name"><li>First item</li><li>Second item</li></ul>
     * @result
     *
     * <div class="jcarousel-skin-name">
     *   <div class="jcarousel-container">
     *     <div class="jcarousel-clip">
     *       <ul class="jcarousel-list">
     *         <li class="jcarousel-item-1">First item</li>
     *         <li class="jcarousel-item-2">Second item</li>
     *       </ul>
     *     </div>
     *     <div disabled="disabled" class="jcarousel-prev jcarousel-prev-disabled"></div>
     *     <div class="jcarousel-next"></div>
     *   </div>
     * </div>
     *
     * @method jcarousel
     * @return jQuery
     * @param o {Hash|String} A set of key/value pairs to set as configuration properties or a method name to call on a formerly created instance.
     */
    $.fn.jcarousel = function(o) {
        if (typeof o == 'string') {
            var instance = $(this).data('jcarousel'), args = Array.prototype.slice.call(arguments, 1);
            return instance[o].apply(instance, args);
        } else {
            return this.each(function() {
                var instance = $(this).data('jcarousel');
                if (instance) {
                    if (o) {
                        $.extend(instance.options, o);
                    }
                    instance.reload();
                } else {
                    $(this).data('jcarousel', new $jc(this, o));
                }
            });
        }
    };

})(jQuery);
})(window.$CQ || window.$ || function() { throw new Error("jQuery is not defined") }(), window.$CQ || window.$);

//     Underscore.js 1.3.3
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.3';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      rand = Math.floor(Math.random() * (index + 1));
      shuffled[index] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, val, context) {
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      if (a === void 0) return 1;
      if (b === void 0) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj)                                     return [];
    if (_.isArray(obj))                           return slice.call(obj);
    if (_.isArguments(obj))                       return slice.call(obj);
    if (obj.toArray && _.isFunction(obj.toArray)) return obj.toArray();
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var results = [];
    // The `isSorted` flag is irrelevant if the array only contains two elements.
    if (array.length < 3) isSorted = true;
    _.reduce(initial, function (memo, value, index) {
      if (isSorted ? _.last(memo) !== value || !memo.length : !_.include(memo, value)) {
        memo.push(value);
        results.push(array[index]);
      }
      return memo;
    }, []);
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1), true);
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        result = func.apply(context, args);
      }
      whenDone();
      throttling = true;
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var result = {};
    each(_.flatten(slice.call(arguments, 1)), function(key) {
      if (key in obj) result[key] = obj[key];
    });
    return result;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return _.isNumber(obj) && isFinite(obj);
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\': '\\',
    "'": "'",
    'r': '\r',
    'n': '\n',
    't': '\t',
    'u2028': '\u2028',
    'u2029': '\u2029'
  };

  for (var p in escapes) escapes[escapes[p]] = p;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults(settings || {}, _.templateSettings);

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
      .replace(escaper, function(match) {
        return '\\' + escapes[match];
      })
      .replace(settings.escape || noMatch, function(match, code) {
        return "'+\n_.escape(" + unescape(code) + ")+\n'";
      })
      .replace(settings.interpolate || noMatch, function(match, code) {
        return "'+\n(" + unescape(code) + ")+\n'";
      })
      .replace(settings.evaluate || noMatch, function(match, code) {
        return "';\n" + unescape(code) + "\n;__p+='";
      }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __p='';" +
      "var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" +
      source + "return __p;\n";

    var render = new Function(settings.variable || 'obj', '_', source);
    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for build time
    // precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' +
      source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics</code> library contains all analytics component classes and utilities.
 * @static
 * @class CQ_Analytics
 */

if( !window.CQ_Analytics ) {
    window.CQ_Analytics = {};
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.Operator</code> object is a singleton providing the most common operator names and
 * utils around the operators.
 * @singleton
 * @class CQ_Analytics.Operator
 */
CQ_Analytics.Operator = (function() {
    return function () {
    };
})();

/**
 * Operator "is".
 * @static
 * @type String
 */
CQ_Analytics.Operator.IS = "is";

/**
 * Operator "equals".
 * @static
 * @type String
 */
CQ_Analytics.Operator.EQUALS = "equals";

/**
 * Operator "not equals".
 * @static
 * @type String
 */
CQ_Analytics.Operator.NOT_EQUAL = "notequal";

/**
 * Operator "greater than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.GREATER = "greater";

/**
 * Operator "equals or greater than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.GREATER_OR_EQUAL = "greaterorequal";

/**
 * Operator "older than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.OLDER = "older";

/**
 * Operator "equals or older than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.OLDER_OR_EQUAL = "olderorequal";

/**
 * Operator "less than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.LESS = "less";

/**
 * Operator "equals or less than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.LESS_OR_EQUAL = "lessorequal";

/**
 * Operator "younger than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.YOUNGER = "younger";

/**
 * Operator "equals or younger than".
 * @static
 * @type String
 */
CQ_Analytics.Operator.YOUNGER_OR_EQUAL = "youngerorequal";

/**
 * Operator "contains".
 * @static
 * @type String
 */
CQ_Analytics.Operator.CONTAINS = "contains";

/**
 * Operator "begins with".
 * @static
 * @type String
 */
CQ_Analytics.Operator.BEGINS_WITH = "beginswith";

/**
 * The <code>CQ_Analytics.OperatorActions</code> object is a singleton providing utilities to resolve operations
 * containing operators (type of <code>CQ_Analytics.Operators</code>).
 */
CQ_Analytics.OperatorActions = function() {
    var mapping = {};

    var addOperator = function(name, text, operation) {
        mapping[name] = [text, operation];
    };

    addOperator(CQ_Analytics.Operator.EQUALS, "equals", "==");
    addOperator(CQ_Analytics.Operator.IS, "is", "==");

    addOperator(CQ_Analytics.Operator.NOT_EQUAL, "is not equal to", "!=");

    addOperator(CQ_Analytics.Operator.GREATER, "is greater than", ">");
    addOperator(CQ_Analytics.Operator.GREATER_OR_EQUAL, "is equal to or greater than", ">=");

    addOperator(CQ_Analytics.Operator.OLDER, "is older than", ">");
    addOperator(CQ_Analytics.Operator.OLDER_OR_EQUAL, "is equal to or older than", ">=");

    addOperator(CQ_Analytics.Operator.LESS, "is less than", "<");
    addOperator(CQ_Analytics.Operator.LESS_OR_EQUAL, "is equal to or less than", "<=");

    addOperator(CQ_Analytics.Operator.YOUNGER, "is younger than", "<");
    addOperator(CQ_Analytics.Operator.YOUNGER_OR_EQUAL, "is equal to or younger than", "<=");

    addOperator(CQ_Analytics.Operator.CONTAINS, "contains", function(s1, s2) {
        if (s1) {
            if (s2) {
                s1 = "" + s1;
                s2 = "" + s2;
                return s1.toLowerCase().indexOf(s2.toLowerCase()) != -1;
            }
            return true;
        }
        return false;
    });

    addOperator(CQ_Analytics.Operator.BEGINS_WITH, "begins with", function(s1, s2) {
        if (s1) {
            if (s2) {
                s1 = "" + s1;
                s2 = "" + s2;
                return s1.toLowerCase().indexOf(s2.toLowerCase()) == 0;
            }
            return true;
        }
        return false;
    });

    var getByIndex = function(op, index) {
        if (mapping[op] && mapping[op][index]) {
            return mapping[op][index];
        }
        return "";
    };

    var escapeQuote = function(str) {
        if (str) {
            str = str.replace(new RegExp("\\'", "ig"), str);
        }
        return str;
    };

    return {
        /**
         * Returns operator friendly name.
         * @param {CQ_Analytics.Operator} operator
         * @return {String} text if defined, empty string otherwise.
         */
        getText: function(operator) {
            return getByIndex(operator, 0);
        },

        /**
         * Set operator friendly name.
         * @param {CQ_Analytics.Operator} operator
         * @param {String} newText The next text
         */
        setText: function(operator, newText) {
            if (mapping[operator] && mapping[operator][0]) {
                mapping[operator][0] = newText;
            }
        },

        /**
         * Returns operator operation, which can be either:<ul>
         * <li>String: mathematical JS operator like ==, <, <=, > ... </li>
         * <li>Function: function requiring 2 parameters, the 2 values to operate and which returns true if operation
         * success, false otherwise.
         * Example: contains operator function.<code>
         function(s1, s2) {
        if (s1) {
            if (s2) {
                s1 = "" + s1;
                s2 = "" + s2;
                return s1.toLowerCase().indexOf(s2.toLowerCase()) != -1;
            }
            return true;
        }
        return false;
    }
         * </code></li>
         * </ul>
         * @param {CQ_Analytics.Operator} operator
         * @return {String/Function} Operator string or function if operator is defined, empty string otherwise.
         */
        getOperation: function(operator) {
            return getByIndex(operator, 1);
        },

        /**
         * Operates a property value and a value with an operator. Sample: <code>
           var obj = {};
           obj["age"] = 30;
           CQ_Analytics.OperatorActions.operate(obj, "age", CQ_Analytics.Operator.IS, "30", "parseInt"); //returns true
           CQ_Analytics.OperatorActions.operate(obj, "age", CQ_Analytics.Operator.GREATER_THAN, "40", "parseInt"); //returns false
         * </code>
         *
         * @param {Object} object Value container.
         * @param {String} property Name of the propert to operate.
         * @param {CQ_Analytics.Operator} operator
         * @param {String} value The second value of the operation
         * @param {String} valueFormat (optional) An optional value formatter (parseInt, parseFloat, toString...)
         * @return {Boolean} true if operation success, false otherwise.
         */
        operate: function(object, property, operator, value, valueFormat) {
            try {
                if (object && object[property]) {
                    var toEval = "";
                    var op = this.getOperation(operator);
                    op = op ? op : operator;
                    var objectValue = CQ.shared.XSS.getXSSTablePropertyValue(object, property);
                    if (typeof op == "function") {
                        return op.call(this, objectValue, value, valueFormat);
                    } else {
                        if (valueFormat) {
                            toEval = valueFormat + "('" + objectValue + "') " + op + " " + valueFormat + "('" + value + "')";
                        } else {
                            var s1 = escapeQuote(objectValue);
                            var s2 = escapeQuote(value);
                            toEval = "'" + s1 + "' " + op + " '" + s2 + "'";
                        }
                        var b = eval(toEval);
                        return b;
                    }

                }
            } catch(e) {
                //console.log("Error in Operator resolution", e, toEval);
            }
            return false;
        }
    };
}();
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * A helper class providing a set of utility methods.
 * <br>
 * @class CQ_Analytics.Utils
 */
CQ_Analytics.Utils = new function() {
    return {
        /**
         * Attaches an event handler while properly considering (aka chaining) an existing one
         * @static
         * @param {Object} event Event
         * @param {Function} func Function
         */
        registerDocumentEventHandler: function(event, func) {
            var oldHandler = window.document[event];
            if (typeof window.document[event] != 'function') {
                window.document[event] = func;
            } else {
                // chain old with new func
                window.document[event] = function(e) {
                    if (oldHandler) {
                        oldHandler(e);
                    }
                    func(e);
                };
            }
        },

        /**
         * Creates a event wraping function of a parameter function. Available parameters are:<ul>
         *        <li><b>event</b> : Object<div class="sub-desc">Event</div></li>
         *        <li><b>keyCode</b> : Number<div class="sub-desc">Key code</div></li>
         *        </ul>
         * @static
         * @param {Function} func The function to wrap
         * @return {Function} Wrapping function
         */
        eventWrapper: function(func) {
            return function(e) {
                var keyCode, event;
                if (document.all) {
                    keyCode = window.event.keyCode;
                    event = window.event;
                } else {
                    keyCode = (typeof(e.which) != 'undefined') ? e.which : 0;
                    event = e;
                }
                if (event) {
                    func(event, keyCode);
                }
            };
        },

        /**
         * Loads the HTML returned by a GET request into a DOM element.
         * @static
         * @param {String} url URL to request
         * @param {String} elemId Id of the DOM element where HTML is inserted.
         */
        loadElement: function(url, elemId) {
            $CQ("#" + elemId).load(url);
        },

        /**
         * Loads the HTML returned by a GET request into a DOM element. Teasers smooth loading.
         * @static
         * @param {String} url URL to request
         * @param {String} elemId Id of the DOM element where HTML is inserted.
         */
        loadTeaserElement: function(url, elemId) {
            var hbckup = $CQ("#" + elemId).css("height");
            var h = $CQ("#" + elemId).height();
            if (h > 0) {
                //force height to avoid flickering
                $CQ("#" + elemId).css("height", h);
            }

            var showTeaser = function(text) {
                if (text && text != "") {
                    var toInject = $CQ(text).css("display", "none");
                    $CQ("#" + elemId).append(toInject);
                    toInject.fadeIn(/*"fast", */function() {
                        if (hbckup && hbckup != "0px") {
                            $CQ("#" + elemId).css("height", hbckup);
                        }
                    });
                } else {
                    if (hbckup && hbckup != "0px") {
                        $CQ("#" + elemId).css("height", hbckup);
                    }
                }
            };

            var cacheTeaser = function(url, text) {
                if (!CQ_Analytics.Utils.teasersCache) {
                    CQ_Analytics.Utils.teasersCache = {};
                }

                CQ_Analytics.Utils.teasersCache[url] = text;
            };


            var handleTeaser = function() {
                if (CQ_Analytics.Utils.teasersCache && CQ_Analytics.Utils.teasersCache[url]) {
                    showTeaser(CQ_Analytics.Utils.teasersCache[url]);
                } else {
                    CQ_Analytics.Utils.teasersLoading = CQ_Analytics.Utils.teasersLoading || {};
                    //teaser might be alreading being loaded
                    if( CQ_Analytics.Utils.teasersLoading[url]) {
                        //"come back" in some few ms
                        window.setTimeout(function() {
                            CQ_Analytics.Utils.loadTeaserElement(url, elemId);
                        }, 100);
                    } else {
                        CQ_Analytics.Utils.teasersLoading[url] = true;
                        loadTeaser();
                    }
                }
            };

            var loadTeaser = function() {
                // the WCM mode might have been changed using a parameter, in such cases
                // we need to proxy the parameter to the teaser paragraph to avoid JS
                // errors that originate from the parameter rendered in the wrong mode
                // (for example, rendered for edit mode when the WCM mode is actually
                // disabled); also ensure that a "overridden URL" (for example, provided
                // by the portal adapter) takes precedence over the actual URL
                var requestURL = url;
                var baseUrl = location.href;
                if (typeof CQ_CONTENT_PATH != "undefined") {
                    baseUrl = CQ_CONTENT_PATH;
                }
                var wcmMode = CQ.shared.HTTP.getParameter(baseUrl, "wcmmode");
                if (wcmMode) {
                    requestURL += (requestURL.indexOf("?") > 0 ? "&" : "?") + "wcmmode=" + wcmMode;
                }

                CQ.shared.HTTP.get(requestURL, function(o, success, response) {
                    if (success) {
                        var text = response.body;
                        if (text) {
                            //filter response because following fadeOut cannot be applied to
                            //empty text nodes
                            text = text.replace(new RegExp("\\n", "ig"), "");
                            text = text.replace(new RegExp("\\r", "ig"), "");

                            cacheTeaser(url, text);

                            delete CQ_Analytics.Utils.teasersLoading[url];

                            handleTeaser();
                        }
                    } else {
                        cacheTeaser(url, "");
                    }
                });
            };

            var length = $CQ("#" + elemId).children().length;
            if (length > 0) {
                var item = 0;
                $CQ("#" + elemId).children().fadeOut(/*"fast",*/ function() {
                    var child = $CQ(this);
                    window.setTimeout(function() {
                        child.remove();
                        item ++;
                        if (item >= length) {
                            handleTeaser();
                        }
                    }, 50);
                });
            } else {
                handleTeaser();
            }


        },

        /**
         * Clears in the inner HTML content of a DOM element.
         * @static
         * @param {String} elemId Id of the DOM element to clear.
         */
        clearElement: function(elemId) {
            if (elemId) {
                $CQ("#" + elemId).html("");
            }
        },

        /**
         * Checks whether or not the specified object exists in the array.
         * @static
         * @param {Object} o The object to check for
         * @return {Number} The index of o in the array (or -1 if it is not found)
         */
            //Copied from CQ.Ext
        indexOf : function(array, o) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] == o) {
                    return i;
                }
            }
            return -1;
        },

        /**
         * Requests the specified URL from the server using GET. The request
         * will be synchronous, unless a callback function is specified.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameter:<ul>
         *        <li><b>xhr</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
         *        See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
         *        accessing elements of the response.</div></li>
         *        </ul>
         */
        load: function(url, callback, scope) {
            return CQ.shared.HTTP.get(url, callback, scope);
        },

        /**
         * Requests the specified URL from the server using POST. The request
         * will be synchronous, unless a callback function is specified.
         * The returned response object looks like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameter:<ul>
         *        <li><b>xhr</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
         *        See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
         *        accessing elements of the response.</div></li>
         *        </ul>
         * @param {Object} params The parameters
         * @param {Object} scope The scope
         */
        post: function(url, callback, params, scope) {
            return CQ.shared.HTTP.post(url, callback, params, scope);
        },

        /**
         * Returns the current page path.
         * @static
         * @return {String} Page path
         */
        getPagePath: function() {
            return CQ.shared.HTTP.getPath();
        },

        /**
         * Removes all parts but the path from the specified URL.
         * <p>Examples:<pre><code>
         /x/y.sel.html?param=abc => /x/y
         </code></pre>
         * <pre><code>
         http://www.day.com/foo/bar.html => /foo/bar
         </code></pre><p>
         * @static
         * @param {String} url The URL
         * @return {String} The path
         */
        getPath: function(url) {
            return CQ.shared.HTTP.getPath(url);
        },

        /**
         * Adds a parameter to the specified URL. The parameter name and
         * value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String/String[]} value The value of the parameter.
         *        Since 5.3, an array of strings can be passed
         * @return {String} The URL with the new parameter
         */
        addParameter: function(url, name, value) {
            return CQ.shared.HTTP.addParameter(url, name, value);
        },

        /**
         * Removes all parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without parameters
         */
        removeParameters: function(url) {
            return CQ.shared.HTTP.removeParameters(url);
        },

        /**
         * Removes the anchor from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without anchor
         * Copied from CQ.HTTP
         */
        removeAnchor: function(url) {
            return CQ.shared.HTTP.removeAnchor(url);
        },

        /**
         * Returns the scheme and authority (user, hostname, port) part of
         * the specified URL or an empty string if the URL does not include
         * that part.
         * @static
         * @param {String} url The URL
         * @return {String} The scheme and authority part
         */
            //Copied from CQ.HTTP
        getSchemeAndAuthority: function(url) {
            return CQ.shared.HTTP.getSchemeAndAuthority(url);
        },

        /**
         * Removes scheme, authority and context path from the specified
         * absolute URL if it has the same scheme and authority as the
         * specified document (or the current one).
         * @static
         * @param {String} url The URL
         * @param {String} doc (optional) The document
         * @return {String} The internalized URL
         */
        internalize: function(url, doc) {
            return CQ.shared.HTTP.internalize(doc);
        },

        /**
         * Makes sure the specified relative URL starts with the context path
         * used on the server. If an absolute URL is passed, it will be returned
         * as-is.
         * @static
         * @param {String} url The URL
         * @param {boolean} encode true to encode the path of the URL (optional)
         * @return {String} The externalized URL
         * @since 5.3
         */
        externalize: function(url, encode) {
            return CQ.shared.HTTP.externalize(url, encode);
        },

        /**
         * Encodes the path of the specified URL if it is not already encoded.
         * Path means the part of the URL before the first question mark or
         * hash sign.<br>
         * See {@link CQ.shared.HTTP#encodePath} for details about the encoding.<br>
         * Sample:<br>
         * <code>/x/y+z.png?path=/x/y+z >> /x/y%2Bz.png?path=x/y+z</code><br>
         * Note that the sample would not work because the "+" in the request
         * parameter would be interpreted as a space. Parameters must be encoded
         * separately.
         * @static
         * @param {String} url The URL to encoded
         * @return {String} The encoded URL
         * @since 5.3
         */
        encodePathOfURI: function(url) {
            return CQ.shared.HTTP.encodePathOfURI(url);
        },

        /**
         * Encodes the specified path using encodeURI. Additionally <code>+</code>,
         * <code>#</code> and <code>?</code> are encoded.<br>
         * The following characters are not encoded:<br>
         * <code>0-9 a-z A-Z</code><br>
         * <code>- _ . ! ~ * ' ( )</code><br>
         * <code>; / : @ & = $ ,</code><br>
         * @static
         * @param {String} path The path to encode
         * @return {String} The encoded path
         * @since 5.3
         */
        encodePath: function(path) {
            return CQ.shared.HTTP.encodePath(path);
        },

        /**
         * Returns the context path used on the server.
         * @static
         * @return {String} The context path
         * @since 5.3
         */
        getContextPath: function() {
            return CQ.shared.HTTP.getContextPath();
        },

        /**
         * Detects the context path used on the server.
         * @private
         * @static
         * @since 5.3
         */
        detectContextPath: function() {
            return CQ.shared.HTTP.detectContextPath();
        },

        /**
         * Takes an object and converts it to an encoded URL. e.g. <code>CQ.Ext.urlEncode({foo: 1, bar: 2});</code>
         * would return "foo=1&bar=2".  Optionally, property values can be arrays, instead of keys and the resulting
         * string that's returned will contain a name/value pair for each array value.
         * @static
         * @param {Object} o
         * @return {String}
         */
            //Copied from CQ.HTTP
        urlEncode : function(o) {
            if (!o) {
                return "";
            }
            if (typeof o == 'string') {
                return o;
            }
            var buf = [];
            for (var key in o) {
                var ov = o[key], k = encodeURIComponent(key);
                var type = typeof ov;
                if (type == 'undefined') {
                    buf.push(k, "=&");
                } else if (type != "function" && type != "object") {
                    buf.push(k, "=", encodeURIComponent(ov), "&");
                } else if (typeof ov == "array") {
                    if (ov.length) {
                        for (var i = 0, len = ov.length; i < len; i++) {
                            buf.push(k, "=", encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
                        }
                    } else {
                        buf.push(k, "=&");
                    }
                }
            }
            buf.pop();
            return buf.join("");
        },

        /**
         * Returns a base 16 encoded UID based on a timestamp and a random number.
         * @static
         * @return {String} UID
         */
        getUID: function() {
            //concatenate a timestamp + a 42 bits number ( 2^42- 1)
            var r = Math.floor(Math.random() * (Math.pow(2, 42) - 1));
            return this.getTimestamp().toString(16) + r.toString(16);
        },

        /**
         * Returns a timestamp.
         * @static
         * @return {Number} Timestamp
         */
        getTimestamp: function() {
            var d = new Date();
            return d.getTime();
        },

        /**
         * Inserts a string every x character into another string.
         * @static
         * @param {String} str Source string
         * @param {Number} every Inserts <b>every</b> x characters
         * @param {String} separator String to insert
         * @return {String} The string with inserted separators
         */
        insert: function(str, every, separator) {
            if (!str || isNaN(every) || !separator) return str;
            var res = "";
            var from = 0;
            var to = every;
            while (to < str.length) {
                res += str.substring(from, to) + separator;
                from += every;
                to += every;
            }
            if (from < str.length) {
                res += str.substring(from);
            }
            return res;
        },

        /**
         * @private
         */
        addListener: function () {
            if (window.addEventListener) {
                return function(el, eventName, fn, capture) {
                    el.addEventListener(eventName, fn, (capture));
                };
            } else if (window.attachEvent) {
                return function(el, eventName, fn, capture) {
                    el.attachEvent("on" + eventName, fn);
                };
            } else {
                return function() {
                };
            }
        },

        /**
         * @private
         */
        removeListener: function() {
            if (window.removeEventListener) {
                return function (el, eventName, fn, capture) {
                    el.removeEventListener(eventName, fn, (capture));
                };
            } else if (window.detachEvent) {
                return function (el, eventName, fn) {
                    el.detachEvent("on" + eventName, fn);
                };
            } else {
                return function() {
                };
            }
        }
    };
};

/**
 * A helper class providing a set of clickstream cloud rendering utility methods.
 * <br>
 * @class CQ_Analytics.ClickstreamcloudRenderingUtils
 */
CQ_Analytics.ClickstreamcloudRenderingUtils = new function() {
    return {
        /**
         * Creates a link DOM element.
         * @static
         * @param {String} text Text
         * @param {Function} func Onclick method
         * @param {Object} props Tag attributes
         * @return {Element} Link DOM element.
         */
        createLink: function(text, func, props, anchor) {
            var link = document.createElement("a");
            link.href = anchor;
            link.onclick = func;
            link.innerHTML = text;
            if (props) {
                for (var p in props) {
                    if (props.hasOwnProperty(p)) {
                        link[p] = props[p];
                    }
                }
            }
            return link;
        },

        /**
         * Creates a link DOM element.
         * @static
         * @param {String} text Text
         * @param {String} href Href
         * @param {Object} title Title
         * @return {Element} Link DOM element.
         */
        createStaticLink: function(text, href, title) {
            var link = document.createElement("a");
            link.href = href;
            link.innerHTML = text;
            link.title = title;
            link.alt = title;
            return link;
        },

        /**
         * Creates a span DOM element with format "property = value"
         * @static
         * @param {String} label Property label
         * @param {String} value Value
         * @param {String} cssClass CSS class name
         * @param {String} title Span title
         * @return {Element} Span DOM element.
         */
        createNameValue: function(label, value, cssClass, title) {
            var span = document.createElement("span");
            span.className = cssClass || "ccl-data";
            span.innerHTML = label + " = " + value;
            span.title = title;
            span.alt = title;
            return span;
        },

        /**
         * Creates a span DOM element
         * @static
         * @param {String} text Span inner HTML
         * @param {String} cssClass CSS class name
         * @param {String} title Span title
         * @return {Element} Span DOM element.
         */
        createText: function(text, cssClass, title) {
            var span = document.createElement("span");
            span.className = cssClass || "ccl-data";
            if (text && text.indexOf && (
                (text.indexOf("/home") != -1 && text.indexOf("/image") != -1)
                    || (text.indexOf("/") != -1 && text.indexOf(".png") != -1))) {
                //image
                span.innerHTML = "<img src=\"" + text + ".prof.thumbnail.png\" border=\"0\">";
            }
            else if (text && text.indexOf && text.indexOf("www.gravatar.com") != -1) {
                span.innerHTML = "<img src=\"" + text + "\">";
            }
            else {
                span.innerHTML = text;
            }
            span.title = title;
            span.alt = title;
            return span;
        },

        /**
         * Creates a span DOM element with format "property = value" and transforms
         * it to a text input field on click.
         * @static
         * @param {String} name Property label
         * @param {String} value Value
         * @return {Element} Span DOM element.
         */
        createEditablePropertySpan: function(name, value) {
            //TODO generalize css classes
            var onclick = "var editSpan = this.nextSibling; " +
                "this.style.display = 'none'; " +
                "editSpan.style.display = 'block';";
            var onblur = "var editSpan = this.parentNode; " +
                "var readSpan = this.parentNode.previousSibling;" +
                "var newValue = this.value;" +
                "editSpan.style.display = 'none'; " +
                "readSpan.innerHTML = '" + name + " = '+value; " +
                "readSpan.style.display = 'block';";
            var span = document.createElement("span");
            span.innerHTML = "<span class=\"ccl-data\" onclick=\"" + onclick + "\">" + name + " = " + value + "</span>";
            span.innerHTML += "<span class=\"ccl-data\" style=\"display: none;\">" + name + " = <input class=\"ccl-input\" type=\"text\" value=\"" + value + "\" onblur=\"" + onblur + "\"></span>";
            span.className = "ccl-data";
            return span;
        }
    }
};

/**
 * A helper class providing a set of ClientContext utility methods.
 * <br>
 * @class CQ_Analytics.ClientContextUtils
 * @since 5.5
 */
CQ_Analytics.ClientContextUtils = new function() {
    return {
        /**
         * Renders a store property value into the DOM. On store update, rendering will be updated.
         * @static
         * @param {String} id Id of the DOM element that will contain the property rendering
         * @param {String} storeName Name of the store
         * @param {String} propertyName Name of the property
         * @param {String} prefix (Optional) Fixed prefix to prepend to property value
         * @param {String} suffix (Optional) Fixed suffix to append to property value
         * @param {String} defaultValue (Optional) Default value to render if property is not in the store
         */
        renderStoreProperty: function(id, storeName, propertyName, prefix, suffix, defaultValue) {
            if (CQ_Analytics && CQ_Analytics.CCM) {
                CQ_Analytics.CCM.onReady(function() {
                    var init = function() {
                        var store = CQ_Analytics.StoreRegistry.getStore(storeName);
                        if (store) {
                            var renderer = function() {
                                var value = store.getProperty(propertyName) || defaultValue;
                                var el = $CQ("#" + id);

                                if (el.attr("contenteditable") &&
                                    /* test needed for IE7 */
                                    el.attr("contenteditable") != "inherit") return;

                                if (typeof(value) == "string" &&
                                    (
                                        (value.indexOf("/") == 0 &&
                                            (value.toLowerCase().indexOf(".png") != -1
                                                || value.toLowerCase().indexOf(".jpg") != -1
                                                || value.toLowerCase().indexOf(".gif") != -1)
                                            || value.toLowerCase().indexOf("http") == 0)
                                        )
                                    ) {
                                    if (!value || value == "") {
                                        el.children().remove();
                                        if( CQ_Analytics.isUIAvailable) {
                                            el.html(CQ.I18n.getMessage("No", null, "Ex: No address, No keywords") + " " + propertyName);
                                        } else {
                                            el.html("No " + propertyName);
                                        }
                                    } else {
                                        var url = "";
                                        if (el.parents(".cq-cc-thumbnail").length == 0 ||
                                            value.toLowerCase().indexOf("http") == 0 ||
                                            value.indexOf("/libs/wcm/mobile") == 0) {
                                            url = value.replace(new RegExp("&amp;", "g"), "&");
                                        } else {
                                            url = "/etc/clientcontext/shared/thumbnail/content.png";
                                            url = CQ.shared.HTTP.addParameter(url, "path", CQ_Analytics.Variables.replaceVariables(value));
                                        }
                                        url = CQ_Analytics.Variables.replaceVariables(url);
                                        if (el.find("div").css("background-image") != "url(" + url + ")") {
                                            if (store.fireEvent("beforepropertyrender", store, id) !== false) {
                                                //image
                                                el.html("");
                                                el.children().remove();
                                                $CQ("<div>")
                                                    .addClass("cq-cc-thumbnail-img")
                                                    .css("background-image", "url(" + CQ.shared.HTTP.externalize(url) + ")")
                                                    .appendTo(el);
                                                store.fireEvent("propertyrender", store, id);
                                            }
                                        }
                                    }
                                } else {
                                    value = CQ_Analytics.Variables.replaceVariables(value);
                                    if( CQ_Analytics.isUIAvailable) {
                                        value = (!value || value == "") ?
                                            CQ.I18n.getMessage("No", null, "Ex: No address, No keywords") + " " + propertyName :
                                            value = prefix + value + suffix;
                                    } else {
                                        value = (!value || value == "") ?
                                            "No " + propertyName :
                                            value = prefix + value + suffix;
                                    }
                                    if (el.html() != value) {
                                        if (store.fireEvent("beforepropertyrender", store, id) !== false) {
                                            el.html(value);
                                            store.fireEvent("propertyrender", store, id);
                                        }
                                    }
                                }
                            };

                            if (store.fireEvent("beforeinitialpropertyrender", store, id) !== false) {
                                renderer();

                                if (store.addListener) {
                                    store.addListener('update', function() {
                                        renderer();
                                    });
                                }

                                store.fireEvent("initialpropertyrender", store, id);
                            }
                        }
                    };

                    CQ_Analytics.ClientContextUtils.onStoreRegistered(storeName, init);
                });
            }
        },

        /**
         * Renders a store into the DOM. On store update, rendering will be updated. Rendering is done by calling the
         * <code>renderer</code> method of the store.
         * @static
         * @param {String} id Id of the DOM element that will contain the property rendering
         * @param {String} storeName Name of the store
         */
        renderStore: function(id, storeName) {
            if (CQ_Analytics && CQ_Analytics.CCM && id && storeName) {
                CQ_Analytics.CCM.onReady(function() {
                    var init = function() {
                        var store = CQ_Analytics.StoreRegistry.getStore(storeName);
                        if (store) {
                            store.divId = id;
                            var renderer = function() {
                                if (store.fireEvent("beforerender", store, store.divId) !== false) {
                                    store.renderer(store, store.divId);
                                    store.fireEvent("render", store, store.divId);
                                }
                            };

                            if (store.fireEvent("beforeinitialrender", store, id) !== false) {
                                renderer();

                                if (store.addListener) {
                                    store.addListener('update', function() {
                                        renderer();
                                    });
                                }

                                store.fireEvent("initialrender", store, id);
                            }
                        }
                    };

                    CQ_Analytics.ClientContextUtils.onStoreRegistered(storeName, init);
                });
            }
        },

        /**
         * Returns a list of options: list of stores registered in the {@link CQ_Analytics.StoreRegistry}.
         * @static
         * @return {Object[]} Computed options
         */
        storesOptionsProvider: function() {
            var options = [];
            var stores = CQ_Analytics.StoreRegistry.getStores();
            for (var name in stores) {
                options.push({
                    value: name
                });
            }
            return options;
        },

        /**
         * Returns a list of options: list of properties of a store.
         * @static
         * @param {String} storeName Name of the store
         * @param {Boolean} showValue (Optional) True to add value to the options (defaults to false)
         * @return {Object[]} Computed options
         */
        storePropertiesOptionsProvider: function(storeName, showValue) {
            var options = [];
            var store = CQ_Analytics.StoreRegistry.getStore(storeName);
            if (store) {
                var names = store.getPropertyNames();
                for (var i = 0; i < names.length; i++) {
                    var value = names[i];
                    if (!CQ.shared.XSS.KEY_REGEXP.test(value)) {
                        var o = {
                            value: value
                        };

                        if (showValue) {
                            o["text"] = value + " - " + store.getProperty(value);
                        }
                        options.push(o);
                    }
                }
            }
            return options;
        },

        /**
         * Executes a callback function when a store is registered.
         * @static
         * @param {String} storeName Name of the store
         * @param {Function} callback Function to execute
         */
        onStoreRegistered: function(storeName, callback) {
            if (callback) {
                var store = CQ_Analytics.StoreRegistry.getStore(storeName);
                if (store) {
                    callback.call(store, store);
                } else {
                    CQ_Analytics.CCM.addListener('storeregister', function(e, sessionstore) {
                        if (sessionstore.getName() == storeName) {
                            callback.call(sessionstore, sessionstore);
                        }
                    });
                }
            }
        },

        /**
         * Executes a callback function when a store is initialized. Some store might be initialized several times
         * (default init + asynchronous data loading): use delay parameter to try to get only one call of the callback.
         * A timeout is defined before every init event, next init event kills all previous calls. Latest one execute
         * the callback. WARNING: if time between 2 init events is bigger than timeout, callback is called several
         * times.
         * @static
         * @param {String} storeName Name of the store
         * @param {Function} callback Function to execute
         * @param {Boolean/Number} delay True to enable a default delay
         * (value is {@link #ClientContextUtils.DEFAULT_INIT_DELAY DEFAULT_INIT_DELAY} or a number of milliseconds (defaults
         * false).
         */
        onStoreInitialized: function(storeName, callback, delay) {
            if( delay === true) {
                delay = CQ_Analytics.ClientContextUtils.DEFAULT_INIT_DELAY;
            }

            var internal_callback = function() {
                var store = CQ_Analytics.StoreRegistry.getStore(storeName);
                if( store.DELAYED_INIT_TIMEOUT ) {
                    window.clearTimeout(store.DELAYED_INIT_TIMEOUT);
                    store.DELAYED_INIT_TIMEOUT = null;
                }

                if( delay > 0 ) {
                    store.DELAYED_INIT_TIMEOUT = window.setTimeout(function() {
                        store.DELAYED_INIT_TIMEOUT = null;
                        callback.call(store, "initialize", store);
                    }, delay);
                } else {
                    callback.call(store, "initialize", store);
                }
            };

            var store = CQ_Analytics.StoreRegistry.getStore(storeName);
            if (store) {
                if( store.isInitialized()) {
                    internal_callback.call(store);
                    store.addListener("initialize",function(event, store) {
                        internal_callback.call(store);
                    });
                } else {
                    store.addListener("initialize",function(event, store) {
                        internal_callback.call(store);
                    });
                }
            } else {
                    CQ_Analytics.CCM.addListener('storeregister', function(e, sessionstore) {
                        if (sessionstore.getName() == storeName) {
                            CQ_Analytics.ClientContextUtils.onStoreInitialized(storeName, callback, delay);
                        }
                    });
                }
        },

        /**
         * Inits the ClientContext.
         * @static
         * @param {String} ccPath ClientContext path
         * @param {String} pagePath Current page path
         */
        init: function(ccPath, pagePath) {
            CQ_Analytics.ClientContextMgr.PATH = ccPath;
            CQ_Analytics.ClientContextMgr.loadConfig(null, true);

            var url = CQ.shared.HTTP.externalize("resources/stores.init.js");
            url = CQ.shared.HTTP.addParameter(url, "path", pagePath);
            url = CQ.shared.HTTP.noCaching(url);
            //jquery will do the eval
            var res = CQ.shared.HTTP.get(url);
        },

        /**
         * Inits the ClientContext UI.
         * @static
         * @param {String} ccPath ClientContext path
         * @param {String} pagePath Current page path
         */
        initUI: function(ccPath, pagePath, editMode) {
            CQ_Analytics.ClientContextUI.create(ccPath, pagePath, editMode);
        }

    }
};

/**
 * Default init delay. See {@link #onStoreInitialized}.
 * @static
 * @type Number
 */
CQ_Analytics.ClientContextUtils.DEFAULT_INIT_DELAY = 200;

/**
 * A helper class providing a set of ClientContext utility methods to handle variables: a variable is a marker used
 * in a store property value to referenced the value of another property. Format: ${/storeName/propertyName}
 * <br>
 * @class CQ_Analytics.Variables
 * @since 5.5
 */
CQ_Analytics.Variables = new function() {
    return {
        /**
         * Returns if a value contains a variable of not.
         * @static
         * @param {String} value The value to test
         */
        containsVariable: function(value) {
            return CQ_Analytics.Variables.getVariables(value).length > 0;
        },

        /**
         * Returns the variables contained into a value.
         * @static
         * @param {String} value The value
         */
        getVariables: function(value) {
            if (!value || typeof(value) != "string") return [];
            var res = value.match(new RegExp("\\$\\{([\\w/]*)\\}", "ig"));
            return res ? res : [];
        },

        /**
         * Replaces the variables into a value by their corresponding values in the ClientContext and returns
         * the result.
         * @static
         * @param {String} value The value
         * @return {String} The result of the replacement
         */
        replaceVariables: function(value) {
            if (!value) return value;
            //keep history to avoid infinite loops
            var history = "";
            var res = value;
            var variables = CQ_Analytics.Variables.getVariables(value);
            while (variables.length > 0 && history.indexOf(variables.join()) == -1) {
                for (var i = 0; i < variables.length; i++) {
                    //current format should ${store/property}
                    //extract store/property
                    var vName = CQ_Analytics.Variables.getPropertyPath(variables[i]);
                    var v = CQ_Analytics.ClientContext.get(vName) || "";
                    res = CQ_Analytics.Variables.replace(res,vName,v);
                }
                history += variables.join();
                variables = CQ_Analytics.Variables.getVariables(res);
            }
            return res;
        },

        /**
         * Returns the path to the property contained in the provided variable.
         * @static
         * @param {String} variable The variable
         * @return The path to the property. Null if no path available.
         */
        getPropertyPath: function(variable) {
            if( !variable || variable.length < 2 ) return null;
            return variable.substring(2, variable.length - 1);
        },

        /**
         * Returns the name of the property contained in the provided variable.
         * @static
         * @param {String} variable The variable
         * @return The name of the property. Null if no property name available.
         */
        getPropertyName: function(variable) {
            var p = CQ_Analytics.Variables.getPropertyPath(variable);
            if( p ) {
                var s = p.split("/");
                if(s.length == 3) {
                    return s[2];
                }
            }
            return null;
        },

        /**
         * Returns the name of the store contained in the provided variable.
         * @static
         * @param {String} variable The variable
         * @return The name of the store. Null if no store name available.
         */
        getStoreName: function(variable) {
            var p = CQ_Analytics.Variables.getPropertyPath(variable);
            if( p ) {
                var s = p.split("/");
                if(s.length > 1) {
                    return s[1];
                }
            }
            return null;
        },

        /**
         * Replaces all instances of the variable <code>${key}</code> by <code>value</code>
         * in the provided <code>string</code> and returns the result.
         * @static
         * @param {String} string The string
         * @param {String} key The variable key
         * @param {String} value The replacement value
         * @return {String} The result of the replacement
         */
        replace: function(string, key, value) {
            return string.replace(new RegExp("\\\$\\{" + key + "\\}", "ig"), value);
        }
    }
};
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

CQ_Analytics.SessionPersistence = CQ.shared.ClientSidePersistence;
CQ_Analytics.Cookie = CQ.shared.ClientSidePersistence.CookieHelper;

/**
 * @class CQ_Analytics.Observable
 * An Observable adds the observable design pattern to an object: this object fires events and allows other objects to
 * listen to these events and react.
 * @constructor
 * Creates a new Observable.
 */
CQ_Analytics.Observable = function() {
    this.fireEvent = function(event) {
        if (event && this.listeners && !this.suppressEvents) {
            event = event.toLowerCase();
            var args = Array.prototype.slice.call(arguments, 0);

            // Listeners which refresh their WCM.editables remove themselves before refresh since
            // the refresh will replace them.  We therefore have to make a copy of the listeners
            // array or we'll skip some listeners as the array moves around underneath us.
            var listenersCopy = this.listeners.slice(0);

            for (var i = 0; i < listenersCopy.length; i++) {
                var l = listenersCopy[i];
                if (event == l.event) {
                    if (l.fireFn.apply(l.scope || this || window, args) === false) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
};

/**
 * Appends an event handler to the current Observable.
 * @param {String} event Event name.
 * @param {Function} fct The method the event invokes.
 * @param {Object} scope (optional) The scope in which to execute the handler
 * function. The handler function's "this" context.
 */
CQ_Analytics.Observable.prototype.addListener = function(event, fct, scope) {
    this.listeners = this.listeners || new Array();
    if (event && fct) {
        this.listeners.push({
            "event": event.toLowerCase(),
            "fireFn": fct,
            "scope": scope
        });
    }
};

/**
 * Removes an event handler from the current Observable.
 * @param {String} event Event name.
 * @param {Function} fct The method the event invokes.
 */
CQ_Analytics.Observable.prototype.removeListener = function(event, fct) {
    this.listeners = this.listeners || new Array();
    if (event && fct) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].event == event &&
                    this.listeners[i].fireFn == fct) {
                this.listeners.splice(i, 1);
            }
        }
    }
};

/**
 * Sets the value of the <tt>suppressEvents</tt> property
 * 
 * @param {Boolean} suppressEvents
 */
CQ_Analytics.Observable.prototype.setSuppressEvents = function(suppressEvents) {
	this.suppressEvents = suppressEvents;
}

/**
 * Array of listeners objects.
 * @private
 */
CQ_Analytics.Observable.prototype.listeners = null;

/**
 * Flag which controls suppression of event delivery
 * 
 * <p>If set to <tt>true</tt>, listeners will not be notified of events. Default to <tt>false</tt>.</p>
 * 
 * @private
 */
CQ_Analytics.Observable.prototype.suppressEvents = false;

if( !CQ_Analytics.StoreRegistry ) {
    /**
     * Registery that contain a list of {@link CQ_Analytics.SessionStore}.
     * <br>
     * @static
     * @singleton
     * @class CQ_Analytics.StoreRegistry
     * @since 5.5
     */
    CQ_Analytics.StoreRegistry = new function() {
        var stores = {};
        return {
            /**
             * Registers a store into the registery
             * @param {Array} store
             */
            register: function(store) {
                if( store["STORENAME"] ) {
                    stores[store.STORENAME] = store;
                }
            },

            /**
             * Returns all registered stores.
             * @return Object
             */
            getStores: function() {
                return stores;
            },

            /**
             * Returns the store of the given name.
             * @param {String} name
             * @return Object
             */
            getStore: function(name) {
                return stores[name];
            }
        }
    }();
}

/**
 * @class CQ_Analytics.SessionStore
 * @extends CQ_Analytics.Observable
 * A SessionStore is a container of properties/values.
 * @constructor
 * Creates a new SessionStore.
 */
CQ_Analytics.SessionStore = function() {};

CQ_Analytics.SessionStore.prototype = new CQ_Analytics.Observable();

/**
 * Sets the value of a property.
 * @param {String} name Property name.
 * @param {String} value Property value.
 */
CQ_Analytics.SessionStore.prototype.setProperty = function(name, value) {
    if (this.data == null) {
        this.init();
    }
    this.data[name] = value;
    this.fireEvent("update", name);
};

/**
 * Sets the value of multiple properties
 * @param {Object} values The key-value store of values to set
 */
CQ_Analytics.SessionStore.prototype.setProperties = function( properties ) {
	if (this.data == null) {
		this.init();
	}

    var names = [];

	for ( var name in properties ) {
		if ( properties.hasOwnProperty (name) ) {

            names.push(name);
			var value = properties[name];

            this.data[name] = value;
		}
	}

	if (names.length > 0) {
        this.fireEvent("update", names);
    }
};

CQ_Analytics.SessionStore.prototype.initialized = false;

/**
 * Initializes the store.
 */
CQ_Analytics.SessionStore.prototype.init = function() {
    this.initialized = true;
    this.fireEvent("initialize",this);
};

/**
 * Returns a store property friendly label.
 * @param {String} name Property name.
 * @return {String} the label.
 */
CQ_Analytics.SessionStore.prototype.getLabel = function(name) { return name; };

/**
 * Returns a store property in a link format.
 * @param {String} name Property name.
 * @return {String} the link value.
 */
CQ_Analytics.SessionStore.prototype.getLink = function(name) { return name; };

/**
 * Removes a property from the store.
 * @param {String} name Property name.
 */
CQ_Analytics.SessionStore.prototype.removeProperty = function(name) {
    if (this.data == null) {
        this.init();
    }
    if (this.data[name]) {
        delete this.data[name];
    }

    this.fireEvent("update", name);
};

/**
 * Returns all store property names.
 * @param {String[]} excluded (Optional) Array of excluded properties (not returned).
 * @return {String[]} Array of the property names.
 */
CQ_Analytics.SessionStore.prototype.getPropertyNames = function(excluded) {
    if (this.data == null) {
        this.init();
    }

    excluded = excluded ? excluded : [];

    var res = new Array();
    for (var p in this.data) {
        if (CQ_Analytics.Utils.indexOf(excluded, p) == -1) {
            res.push(p);
        }
    }
    return res;
};

/**
 * Returns the session store attached to the current object (returns this).
 * @return {CQ_Analytics.SessionStore} Session store.
 */
CQ_Analytics.SessionStore.prototype.getSessionStore = function() {
    return this;
};

/**
 * Clears the store.
 */
CQ_Analytics.SessionStore.prototype.clear = function() {
    this.data = null;
};

/**
 * Returns the store data.
 * @param {String[]} excluded Property names to exclude from the result.
 * @return {Object} Object containing the store data (obj["property"] = value).
 */
CQ_Analytics.SessionStore.prototype.getData = function(excluded) {
    if (this.data == null) {
        this.init();
    }

    if (excluded) {
        var ret = {};
        for (var p in this.data) {
            if (CQ_Analytics.Utils.indexOf(excluded, p) == -1) {
                ret[p] = this.data[p];
            }
        }
        return ret;
    } else {
        return this.data;
    }
};

/**
 * Resets the store: restores initial values.
 */
CQ_Analytics.SessionStore.prototype.reset = function() {
    if (this.data != null) {
        this.data = null;
        this.fireEvent("update");
    }
};

/**
 * Returns the value of a store property (XSS filtered value).
 * @param {String} name Property name.
 * @param {Boolean} raw Raw value, no XSS filtering
 * @return {String} the value.
 */
CQ_Analytics.SessionStore.prototype.getProperty = function(name, raw) {
    if (this.data == null) {
        this.init();
    }
    var value = this.data[name];
    if( !raw ) {
        var xssValue = CQ.shared.XSS.getXSSValue(value);
        return xssValue;
    }
    return value;
};

/**
 * Returns the store name.
 */
CQ_Analytics.SessionStore.prototype.getName = function() {
    return this.STORENAME;
};

/**
 * Adds an initial property to the store.
 * @param {String} name Property name.
 * @param {String} value Property value.
 */
CQ_Analytics.SessionStore.prototype.addInitProperty = function(name, value) {
    if (! this.initProperty) this.initProperty = {};
    this.initProperty[name] = value;
};

/**
 * Returns the value of an initial property.
 * @param {String} name Property name.
 * @return {String} The value.
 */
CQ_Analytics.SessionStore.prototype.getInitProperty = function(name) {
    return this.initProperty ? this.initProperty[name] : null;
};

/**
 * Loads initial properties from an object.
 * @param {Object} obj Object containing the initial store data (obj["property"] = value).
 * @param {Boolean} setValues True to set the value in the store IF property does is not already present
 */
CQ_Analytics.SessionStore.prototype.loadInitProperties = function(obj, setValues) {
    if (obj) {
        for (var p in obj) {
            this.addInitProperty(p, obj[p]);
            if( setValues && this.data && this.data[p] === undefined) {
                this.setProperty(p, obj[p]);
            }
        }
    }
};

/**
 * Returns true if the store is initialized. False otherwise.
 */
CQ_Analytics.SessionStore.prototype.isInitialized = function() {
    return this.initialized;
};

/**
 * @class CQ_Analytics.PersistedSessionStore
 * @extends CQ_Analytics.SessionStore
 * A PersistedSessionStore is a persisted container of properties/values. The persistence is done
 * with {@link CQ_Analytics.SessionPersistence}.
 * @constructor
 * Creates a new PersistedSessionStore.
 */
CQ_Analytics.PersistedSessionStore = function () {};

CQ_Analytics.PersistedSessionStore.prototype = new CQ_Analytics.SessionStore();
CQ_Analytics.PersistedSessionStore.prototype.STOREKEY = "key";

/**
 * Defines a property as non persited. By default all properties are persisted.
 * @param {String} name Property name
 */
CQ_Analytics.PersistedSessionStore.prototype.setNonPersisted = function(name) {
    if (!this.nonPersisted) this.nonPersisted = {};
    this.nonPersisted[name] = true;
};

CQ_Analytics.PersistedSessionStore.EXCLUDED_PROPERTIES_REGEX = "^generated*";

/**
 * Returns if a property in persisted or not.
 * @param {String} name Property name.
 * @return {Boolean} true if persisted, false otherwise.
 */
CQ_Analytics.PersistedSessionStore.prototype.isPersisted = function(name) {
    if (!this.nonPersisted) this.nonPersisted = {};
    return this.nonPersisted[name] !== true &&
        !new RegExp(CQ_Analytics.PersistedSessionStore.EXCLUDED_PROPERTIES_REGEX, "ig").test(name) &&
        !$CQ.isFunction(this.data[name]) &&
        (typeof this.data[name]) != "object";
};

/**
 * Returns the store key name used by persistence.
 * @return {String} The key name.
 */
CQ_Analytics.PersistedSessionStore.prototype.getStoreKey = function() {
    return this.STOREKEY;
};

/**
 * Persists the store. All properties will be persisted as property=value using a {@link CQ_Analytics.SessionPersistence}.
 */
CQ_Analytics.PersistedSessionStore.prototype.persist = function() {
    if (this.fireEvent("beforepersist") !== false) {
        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        store.set(this.getStoreKey(), this.toString());
        this.fireEvent("persist");
    }
};

//inheritDoc
CQ_Analytics.PersistedSessionStore.prototype.setProperty = function(name, value) {
    if (this.data == null) {
        this.init();
    }
    this.data[name] = value;
    if (this.isPersisted(name)) {
        this.persist();
    }
    this.fireEvent("update", name);
};


//inheritDoc
CQ_Analytics.PersistedSessionStore.prototype.setProperties = function( properties ) {
    if (this.data == null) {
        this.init();
    }

    var names = [];
    var shouldPersist = false;

    for ( var name in properties ) {
        if ( properties.hasOwnProperty (name) ) {

            names.push(name);
            var value = properties[name];

            this.data[name] = value;
            if (this.isPersisted(name)) {
                shouldPersist = true;
            }
        }
    }

    if (shouldPersist) {
        this.persist();
    }

    if (names.length > 0) {
        this.fireEvent("update", names);
    }
};

/**
 * Transforms the current store of paris (name,value) to a string.
 * @return {String} The stringified store.
 * @private
 */
CQ_Analytics.PersistedSessionStore.prototype.toString = function() {
    var list = null;
    if (this.data) {

        var encodeCommandChars = function(value) {
            if( !value || typeof(value) != "string") return value;
            var ret = value;
            ret = ret.replace(new RegExp(",","g"),"&#44;");
            ret = ret.replace(new RegExp("=","g"),"&#61;");
            ret = ret.replace(new RegExp("\\|","g"),"&#124;");
            return ret;
        };

        for (var p in this.data) {
            if (this.isPersisted(p)
                && this.data.hasOwnProperty(p)) {
                list = (list === null ? "" : list + ",");
                list += (p + "=" + encodeCommandChars(this.data[p]));
            }
        }
    }
    return list;
};

/**
 * Parses the given string to fill the store.
 * @param {String} str Stringified store.
 * @return {Object} Parsed object.
 * @private
 */
CQ_Analytics.PersistedSessionStore.prototype.parse = function(str) {
    var decodeCommandChars = function(value) {
        if( !value || typeof(value) != "string") return value;
        var ret = value;
        ret = ret.replace(new RegExp("&#44;","g"),",");
        ret = ret.replace(new RegExp("&#61;","g"),"=");
        ret = ret.replace(new RegExp("&#124;","g"),"|");
        return ret;
    };

    var obj = {};
    var array = str.split(",");
    for (var t in array) {
        if (array.hasOwnProperty(t)) {
            var entry = array[t].split("=");
            if (entry.length == 2) {
                obj[entry[0]] = decodeCommandChars(entry[1]);
            }
        }
    }
    return obj;
};

//inheritDoc
CQ_Analytics.PersistedSessionStore.prototype.reset = function(deferEvent) {
    if (this.data != null) {
        this.data = {};
        this.persist();
        this.data = null;
        if (!deferEvent) {
            this.fireEvent("update");
        }
    }
};

//inheritDoc
CQ_Analytics.PersistedSessionStore.prototype.removeProperty = function(name) {
    if (this.data == null) {
        this.init();
    }
    if (this.data[name]) {
        delete this.data[name];
        if (this.isPersisted(name)) {
            this.persist();
        }
    }
    this.fireEvent("update", name);
};

//inheritDoc
CQ_Analytics.PersistedSessionStore.prototype.clear = function() {
    var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
    store.remove(this.getStoreKey());
    this.data = null;
};
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered int\o
 * with Day.
 */
/**
 * The <code>CQ_Analytics.ClientContextMgr</code> object is a singleton providing methods for registration,
 * persistence and management of different session stores linked to the clientcontext.<br>
 * Each store is basically a set of pairs (key,value) and will be used by segmentation (see {@link CQ_Analytics.SegmentMgr})
 * and displayed by clientcontext UI (see {@link CQ_Analytics.ClientContextUI}).
 * @singleton
 * @class CQ_Analytics.ClientContextMgr
 * @extends CQ_Analytics.PersistedSessionStore
 */
if (!CQ_Analytics.ClientContextMgr) {
    CQ_Analytics.ClientContextMgr = function() {
        this.clientcontext = null;
        this.clientcontextToServer = null;
        this.stores = {};
        this.data = null;
        this.config = null;
        this.isConfigLoaded = false;
        this.areStoresLoaded = false;
    };

    CQ_Analytics.ClientContextMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * Store internal key (used by persistence).
     * @final
     * @private
     */
    CQ_Analytics.ClientContextMgr.prototype.STOREKEY = "CLIENTCONTEXT";

    /**
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.ClientContextMgr.prototype.STORENAME = "clientcontext";

    /**
     * Number of milliseconds between the last store gets registered and the event storesinitialize
     * gets fired.
     * @final
     * @private
     */
    CQ_Analytics.ClientContextMgr.prototype.INITIALIZATION_EVENT_TIMER = 1000;

    /**
     * Location of the config.
     * @static
     * @type String
     */
     CQ_Analytics.ClientContextMgr.prototype.CONFIG_PATH = CQ_Analytics.Utils.externalize("/etc/clientcontext/legacy/config.json",true);

    //inheritDoc
    CQ_Analytics.ClientContextMgr.prototype.init = function() {
        if( !this.initialized) {
            this.clientcontext = {};
            this.clientcontextToServer = {};
        }

        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = store.get(this.getStoreKey());
        if (value) {
            this.data = this.parse(value);
        } else {
            this.data = {};
        }

        this.initialized = true;
        this.fireEvent("initialize",this);

    };

    /**
     * Returns the unique session ID.
     * @return {String} the session ID.
     */
    CQ_Analytics.ClientContextMgr.prototype.getSessionId = function() {
        if (!this.data["sessionId"]) {
            this.setSessionId(CQ_Analytics.Utils.getUID());
        }
        return this.data["sessionId"];
    };

    /**
     * Sets the session ID.
     * @param {String} id the session ID.
     * @private
     */
    CQ_Analytics.ClientContextMgr.prototype.setSessionId = function(id) {
        if (id) {
            this.setProperty("sessionId", id);
        }
    };

    /**
     * Returns the visitor ID if defined.
     * @return {String} the visitor ID, <code>undefined</code> if not defined.
     */
    CQ_Analytics.ClientContextMgr.prototype.getVisitorId = function() {
        return this.data["visitorId"];
    };

    /**
     * Sets the visitor ID.
     * @param {String} id the visitor ID.
     */
    CQ_Analytics.ClientContextMgr.prototype.setVisitorId = function(id) {
        this.setProperty("visitorId", id);
    };

    /**
     * Returns the current clientcontext ID. Can be either: <ul>
     * <li>visitor ID if defined</li>
     * <li>session unique ID in other case.</li>
     * </ul>
     * If visitor ID is not defined, clientcontext is considered as anonymous.
     * @return {String} the ID.
     */
    CQ_Analytics.ClientContextMgr.prototype.getId = function() {
        var id = this.getVisitorId();
        if (!id) {
            return this.getSessionId();
        }
        return id;
    };

    /**
     * Returns if manager is still defined in anonymous mode (no visitor id defined).
     * @return {Boolean} true if anonymous.
     */
    CQ_Analytics.ClientContextMgr.prototype.isAnonymous = function() {
        var id = this.getVisitorId();
        return (!id);
    };

    /**
     * Returns if mode is defined.
     * @param {Number} mode Mode to check.
     * @return {Boolean} true if mode is defined.
     */
    CQ_Analytics.ClientContextMgr.prototype.isMode = function(mode) {
        return CQ_Analytics.ClientContextMgr.ServerStorage.isMode(mode);
    };

    /**
     * Returns the current clientcontext object. Object can contain the non server persited data.
     * @param {Boolean} toServer true to exclue non server persisted data.
     * @return {Object} object representing the clientcontext.
     */
    CQ_Analytics.ClientContextMgr.prototype.get = function(toServer) {
        if (this.clientcontext == null) {
            this.init();
        }
        if (toServer) {
            return this.clientcontextToServer;
        }
        return this.clientcontext;
    };

    /**
     * Registers a session store. The current ClickstreamcloudManager will handle its own persistence store
     * depending on updates done into the registred session store.
     * @param {CQ_Analytics.SessionStore} sessionstore The session store
     */
    CQ_Analytics.ClientContextMgr.prototype.register = function(sessionstore) {
        if (this.clientcontext == null) {
            this.init();
        }
        var ccm = this;

        this.clientcontext[sessionstore.getName()] = sessionstore.getData();
        this.stores[sessionstore.getName()] = sessionstore;
        CQ_Analytics.StoreRegistry.register(sessionstore);

        var config = this.getStoreConfig(sessionstore.getName());
        if (config["stats"] !== false && config["stats"] != "false") {
            this.clientcontextToServer[sessionstore.getName()] = sessionstore.getData(config["excludedFromStats"]);
        }

        if( this.initTimer ) {
            window.clearTimeout(this.initTimer);
            this.initTimer = null;
        }

        this.initTimer = window.setTimeout(function() {
            ccm.fireEvent("storesinitialize");
            ccm.areStoresInitialized = true;
        }, this.INITIALIZATION_EVENT_TIMER);

        //auto update current obj if sessionstore is updated
        sessionstore.addListener("update", function() {
            ccm.update(sessionstore);
        });

        CQ_Analytics.ClientContextMgr.ServerStorage.handleStoreRegistration(sessionstore);

        //clear sessionstore if clientcontext is cleared
        this.addListener("clear", function() {
            sessionstore.clear();
        });

        this.fireEvent("storeregister", sessionstore);
        this.fireEvent("storeupdate", sessionstore);
    };

    /**
     * Updates a session store. The current registred session store with the same name is updated by the given one.
     * @param {CQ_Analytics.SessionStore} sessionstore The session store
     */
    CQ_Analytics.ClientContextMgr.prototype.update = function(sessionstore) {
        if (this.clientcontext == null) {
            this.init();
        }
        this.clientcontext[sessionstore.getName()] = sessionstore.getData();

        var config = this.getStoreConfig(sessionstore.getName());
        if (config["stats"] !== false && config["stats"] != "false") {
            this.clientcontextToServer[sessionstore.getName()] = sessionstore.getData(config["excludedFromStats"]);
        }
        this.fireEvent("storeupdate", sessionstore);
    };

    /**
     * Starts the posting.
     */
    CQ_Analytics.ClientContextMgr.prototype.startPosting = function() {
        return CQ_Analytics.ClientContextMgr.ServerStorage.startPosting();
    };

    /**
     * Stops the posting.
     */
    CQ_Analytics.ClientContextMgr.prototype.stopPosting = function() {
        return CQ_Analytics.ClientContextMgr.ServerStorage.stopPosting();
    };

    /**
     * Posts the current clientcontext object to the server (occurs only if posting is started).
     */
    CQ_Analytics.ClientContextMgr.prototype.post = function() {
        return CQ_Analytics.ClientContextMgr.ServerStorage.post();
    };

    /**
     * Returns the current clientcontext object in "JCR style"
     * o.property = value --> ./property = value
     * o.level1.property = value --> ./level1/property = value
     * 2 levels only
     * @return {Object} object representing the clientcontext in "JCR style"
     * @private
     */
    CQ_Analytics.ClientContextMgr.prototype.getCCMToJCR = function() {
        return CQ_Analytics.ClientContextMgr.ServerStorage.getCCMToJCR();
    };

    //inheritDoc
    CQ_Analytics.ClientContextMgr.prototype.getName = function() {
        return this.STORENAME;
    };

    //inheritDoc
    CQ_Analytics.ClientContextMgr.prototype.clear = function() {
        this.clientcontext = null;
        this.clientcontextToServer = null;
        this.fireEvent("clear");
    };

    /**
     * Returns the registered store looked up by name.
     * @param {String} name Name of the store to retrieve
     * @return {CQ_Analytics.SessionStore} The registered store or null.
     * @since 5.5
     */
    CQ_Analytics.ClientContextMgr.prototype.getRegisteredStore = function(name) {
        return this.stores && this.stores[name] ? this.stores[name] : null;
    };

    /**
     * Loads the config and fires <code>configloaded</code> and <code>storesloaded</code> events.
     */
    CQ_Analytics.ClientContextMgr.prototype.loadConfig = function(c, autoConfig) {
        var setConfig = function(ccm, config) {
            ccm.config = config;

            ccm.isConfigLoaded = true;
            ccm.fireEvent("configloaded");
            ccm.fireEvent("storesloaded");
            ccm.areStoresLoaded = true;
        };

        if( c ) {
            setConfig(this, c);
        } else {
            if( !autoConfig ) {
                //asynchronous load
                var params = {};
                params["path"] = CQ_Analytics.Utils.getPagePath();
                params["cq_ck"] = new Date().valueOf();
                var url = this.CONFIG_PATH;
                url += "?" + CQ_Analytics.Utils.urlEncode(params);

                CQ_Analytics.Utils.load(url, function(data, status, response) {
                    var config = {};
                    try {
                        config = eval("config = " + response.responseText);
                    } catch(error) {}
                    setConfig(this, config);
                }, this);
            } else {
                setConfig(this, {});
            }
        }
    };

    /**
     * Returns the config object.
     * @return {Object} config object if loaded, null otherwise.
     */
    CQ_Analytics.ClientContextMgr.prototype.getConfig = function() {
        return this.config;
    };

    /**
     * Returns the store config object for the give store name.
     * Shortcut to <code>config["configs"][storename]["store"]</code>.
     * @param {String} storename Request config store name.
     * @return {Object} config object if loaded, {} otherwise.
     */
    CQ_Analytics.ClientContextMgr.prototype.getStoreConfig = function(storename) {
        if (this.config &&
            this.config["configs"] &&
            this.config["configs"][storename] &&
            this.config["configs"][storename]["store"]) {
            return this.config["configs"][storename]["store"];
        }
        return {};
    };

    /**
     * Returns the edit config object for the give store name.
     * Shortcut to <code>config["configs"][storename]["edit"]</code>.
     * @param {String} storename Request config store name.
     * @return {Object} config object if loaded, {} otherwise.
     */
    CQ_Analytics.ClientContextMgr.prototype.getEditConfig = function(storename) {
        if (this.config &&
            this.config["configs"] &&
            this.config["configs"][storename] &&
            this.config["configs"][storename]["edit"]) {
            return this.config["configs"][storename]["edit"];
        }
        return {};
    };

    /**
     * Returns the UI config object for the give store name.
     * Shortcut to <code>config["configs"][storename]["ui"]</code>.
     * @param {String} storename Request config store name.
     * @return {Object} config object if loaded, {} otherwise.
     */
    CQ_Analytics.ClientContextMgr.prototype.getUIConfig = function(storename) {
        if (this.config &&
            this.config["configs"] &&
            this.config["configs"][storename] &&
            this.config["configs"][storename]["ui"]) {
            return this.config["configs"][storename]["ui"];
        }
        return {};
    };

    /**
     * Returns the initial data for the give store name.
     * Shortcut to <code>config["data"][storename]</code>.
     * @param {String} storename Request config store name.
     * @return {Object} data object if loaded, {} otherwise.
     */
    CQ_Analytics.ClientContextMgr.prototype.getInitialData = function(storename) {
        if (this.config &&
            this.config["data"] &&
            this.config["data"][storename]) {
            return this.config["data"][storename];
        }
        return {};
    };

    /**
     * Returns the registered stores.
     * @return {Object} All registered stores
     * @since 5.5
     */
    CQ_Analytics.ClientContextMgr.prototype.getStores = function() {
        return this.stores;
    };

    /**
     * Executes the callback when the current ClientContextMgr is ready, i.e. when all stores are loaded.
     * @param {Function} callback Function to execute on ready
     * @param {Object} scope (optional) The execution scope; window object if null
     * @since 5.5
     */
    CQ_Analytics.ClientContextMgr.prototype.onReady = function(callback, scope) {
        if( callback ) {
            if( this.areStoresLoaded) {
                callback.call(scope);
            } else {
                this.addListener("storesloaded", callback, scope);
            }
        }
    };

    CQ_Analytics.ClientContextMgr = CQ_Analytics.CCM = new CQ_Analytics.ClientContextMgr();

    //backward compatibility
    CQ_Analytics.ClickstreamcloudMgr = CQ_Analytics.CCM;
    //just kept for compatibility with internal name during 5.5 dev
    CQ_Analytics.ContextCloudMgr = CQ_Analytics.CCM;

    //Path to the clientcontext on the server. To be defined in app.
    CQ_Analytics.ClientContextMgr.PATH = null;

    /**
     * Prepends the client context path to the provided url.
     * @param {String} url URL to prepend
     * @return {String} the computed url
     * @since 5.5
     */
    CQ_Analytics.ClientContextMgr.getClientContextURL = function(url) {
        return CQ_Analytics.ClientContextMgr.PATH + url;
    };

    //inits the CCM store in a different thread.
    window.setTimeout(function() {
        CQ_Analytics.CCM.init();
    }, 1);

    CQ_Analytics.Utils.addListener(window, "unload", function() {
        try {
            for(var p in CQ_Analytics.ClientContextMgr) {
                delete CQ_Analytics.ClientContextMgr[p];
            }
            CQ_Analytics.ClientContextMgr = null;
        } catch(error) {}
        CQ_Analytics.CCM = null;
    });
}
/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2011 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/
/**
 * @class CQ_Analytics.ClientContextMgr.ServerStorage
 */
if( CQ_Analytics.ClientContextMgr && ! CQ_Analytics.ClientContextMgr.ServerStorage ) {
    CQ_Analytics.ClientContextMgr.ServerStorage = function() {
        //posting is by default set false: no stats by default. CQ_Analytics.CCM.startPosting() is required.
        this.posting = false;
        this.initialized = false;
    };

    /**
     * @cfg {Number} POST_MODE_PAGELOAD
     * Page load mode constant: POST on every page load.
     * @final
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_PAGELOAD = 0x1;

    /**
     * @cfg {Number} POST_MODE_TIMER
     * Timer mode constant: POST defined by an time interval.
     * @final
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_TIMER = 0x2;

    /**
     * @cfg {Number} POST_MODE_DATAUPDATE
     * Data update mode constant: POST if one session store data is updated.
     * @final
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE_DATAUPDATE = 0x4;

    /**
     * @cfg {Number} POST_TIMER
     * Interval in seconds to POST in POST_MODE_TIMER mode (defaults to 600s).
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_TIMER = 600;

    /**
     * @cfg {Number} POST_PROCESS_TIMER
     * Interval in seconds to check if POST is needed in POST_MODE_TIMER mode (defaults to 60s).
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_PROCESS_TIMER = 60;

    /**
     * @cfg {Number} POST_MODE
     * The POST mode of the clickstreamcloud. Must be a & value of the following properties:<ul>
     * <li>POST_MODE_PAGELOAD: POST on page load</li>
     * <li>POST_MODE_TIMER: POST on timer interval</li>
     * <li>POST_MODE_DATAUPDATE: POST when one session store data is updated</li>
     * </ul>
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_MODE = 0x6;

    /**
     * @cfg {Number} POST_PATH
     * Beginning of the path used by post.
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.POST_PATH = "/var/statistics/";

    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.init = function() {
        if (this.isMode(CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_TIMER)) {
            var currentObj = this;
            var func = function() {
                currentObj.timer = window.setInterval(function() {
                    try {
                        var lastPost = parseInt(currentObj.data["lastPost"]);
                        var doPost = false;
                        if (isNaN(lastPost)) {
                            doPost = true;
                        } else {
                            var currentTime = new Date().getTime();
                            if (currentTime > lastPost + CQ_Analytics.ClientContextMgr.ServerStorage.POST_TIMER * 1000) {
                                doPost = true;
                            }
                        }
                    } catch(error) {
                    }
                    if (doPost) {
                        currentObj.post();
                    }
                }, CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER * 1000);
            };

            func.call(this);
        }
        this.initialized = true;
    };

    /**
     * Returns if mode is defined.
     * @param {Number} mode Mode to check.
     * @return {Boolean} true if mode is defined.
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.isMode = function(mode) {
        return (CQ_Analytics.CCM.POST_MODE & mode) > 0;
    };

    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.handleStoreRegistration = function(sessionstore) {
        if( ! this.initialized ) {
            this.init();
        }
        if (this.isMode(CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_DATAUPDATE)) {
            sessionstore.addListener("persist", function() {
                //if a store has been persisted, call current persist
                CQ_Analytics.ClientContextMgr.ServerStorage.post(sessionstore);
            });
        }
    };

    /**
     * Starts the posting.
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.startPosting = function() {
        this.posting = true;
    };

    /**
     * Stops the posting.
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.stopPosting = function() {
        this.posting = false;
    };

    /**
     * Posts the current clientcontext object to the server (occurs only if posting is started).
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.post = function(storeName, forced) {
        if (this.posting || forced) {
            try {
                var obj = this.getCCMToJCR(storeName);
                var currentTime = CQ_Analytics.Utils.getTimestamp();
                obj["./jcr:primaryType"] = "nt:unstructured";
                obj["./sessionId"] = CQ_Analytics.CCM.getSessionId();
                var url = this.POST_PATH + "clientcontext/";
                if (CQ_Analytics.CCM.isAnonymous()) {
                    var sessionSplit = CQ_Analytics.Utils.insert(CQ_Analytics.CCM.getId(), 2, "/");
                    url += "anonymous/" + sessionSplit + "/" + currentTime;
                } else {
                    url += "users/" + CQ_Analytics.CCM.getId() + "/" + currentTime;
                }
                CQ_Analytics.Utils.post(url, null, obj);
                this.lastPost = currentTime;
            } catch(error) {
            }
        }
    };

    /**
     * Returns the current clientcontext object in "JCR style"
     * o.property = value --> ./property = value
     * o.level1.property = value --> ./level1/property = value
     * 2 levels only
     * @return {Object} object representing the clientcontext  in "JCR style"
     * @private
     */
    CQ_Analytics.ClientContextMgr.ServerStorage.prototype.getCCMToJCR = function(storeName) {
        var obj = CQ_Analytics.CCM.get(true);

        var resObj = {};
        for (var key in obj) {
            if( !storeName || key == storeName ) {
                var ov = obj[key], k = encodeURIComponent(key);
                var type = typeof ov;
                if (type == 'object') {
                    for (var l2key in ov) {
                        var v = ov[l2key];
                        //trick for tags
                        l2key = l2key.replace(":", "/");
                        resObj[ "./" + key + "/./" + l2key ] = v;
                    }
                } else {
                    resObj[ "./" + key] = ov;
                }
            }
        }

        return resObj;
    };

    CQ_Analytics.ClientContextMgr.ServerStorage = new CQ_Analytics.ClientContextMgr.ServerStorage();
    
    //support backward compatibility
    
    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_MODE_PAGELOAD = CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_PAGELOAD;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_MODE_TIMER = CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_TIMER;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_MODE_DATAUPDATE = CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE_DATAUPDATE;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_TIMER = CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_PROCESS_TIMER = CQ_Analytics.ClientContextMgr.ServerStorage.POST_PROCESS_TIMER;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_MODE = CQ_Analytics.ClientContextMgr.ServerStorage.POST_MODE;

    /**
     * @deprecated
     * @see CQ_Analytics.ClientContextMgr.ServerStorage
     */
    CQ_Analytics.ClickstreamcloudMgr.POST_PATH = CQ_Analytics.ClientContextMgr.ServerStorage.POST_PATH;
}


/*
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2012 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
/**
 * The <code>CQ_Analytics.Percentile</code> object is a singleton providing utility functions
 * for matching users to percentiles.
 * @singleton
 * @class CQ_Analytics.Percentile
 */
CQ_Analytics.Percentile = {};

CQ_Analytics.Percentile.matchesPercentiles = function(percentiles) {
    
    var percentileValue = ClientContext.get("/surferinfo/percentile");
    if ( !percentileValue ) {
        percentileValue = Math.round(Math.random() * 100);
        ClientContext.set("/surferinfo/percentile", percentileValue);
    }
    
    for ( var i = 0 ; i < percentiles.length ; i++ ) {
        var percentile = percentiles[i];
        if ( ( percentile.start <= percentileValue ) && ( percentileValue < percentile.end ) )
            return true;
    }
    
    return false;
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.SegmentMgr</code> object is a singleton providing methods for registration and resolution
 * of different segments.
 * @singleton
 * @class CQ_Analytics.SegmentMgr
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.SegmentMgr) {
    CQ_Analytics.SegmentMgr = function() {
        this.SEGMENTATION_ROOT = "/etc/segmentation";
        this.SEGMENT_SELECTOR = ".segment.js";
        this.SEGMENTATION_SCRIPT_LOADER = "cq-segmentation-loader";

        this.segments = {};
        this.boosts = {};

        var currentObj = this;
        this.fireUpdate = function() {
            currentObj.fireEvent("update");
        };

        this.init();
    };

    CQ_Analytics.SegmentMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.SegmentMgr.prototype.STORENAME = "segments";

    /**
     * Registers a segment.
     * @param {String} segmentPath Path to the segment.
     * @param {String} rule Boolean JS expression defining the segment.
     * @param {Number} boost (Optional) Segment boost (defaults to 0).
     */
    CQ_Analytics.SegmentMgr.prototype.register = function(segmentPath, rule, boost) {
        this.segments[segmentPath] = rule;
        if ( this.rulesCache && this.rulesCache[segmentPath] ) {
            this.rulesCache[segmentPath] = false;
        }
        this.boosts[segmentPath] = !isNaN(boost) ? parseInt(boost) : 0;
        this.fireUpdate();
    };

    /**
     * Resolves an array of segments. Resolution depends on operator:<ul>
     * <li>operator is AND: success if all segments of array resolve.</li>
     * <li>operator is OR: success when finding one segment of array resolving.</li>
     * </ul>
     * @param {String[]} segmentPaths Array of segment paths.
     * @param {Object} clientcontext  Object containing values to try to resolve segments.
     * @param {String} operator (Optional) Operator: "OR" / "AND" (defaults to "OR").
     * @return {Boolean/String} True if resolution success, false otherwise. String containing error description
     * if any execption occurs during resolution.
     */
    CQ_Analytics.SegmentMgr.prototype.resolveArray = function(segmentPaths, clientcontext, operator) {
        clientcontext = clientcontext || CQ_Analytics.ClientContextMgr.get();

        if (!(segmentPaths instanceof Array)) {
            return this.resolve(segmentPaths, clientcontext);
        }

        operator = ( operator == "AND" ? "AND" : "OR");

        var finalRes = ( operator == "AND");
        for (var i = 0; i < segmentPaths.length; i++) {
            var s = segmentPaths[i];
            var res = this.resolve(s, clientcontext);
            if (operator == "AND") {
                if (res !== true) return res;
            } else {
                if (res === true) return true;
            }
        }
        return finalRes;
    };

    /**
     * Resolves a segment. Tries to eval the rule of the segment the given clientcontext object.
     * @param {String} segmentPath Segment path.
     * @param {Object} clientcontext  Object containing values to try to resolve segments.
     * @return {Boolean/String} True if resolution success, false otherwise. String containing error description
     * if any execption occurs during resolution.
     */
    CQ_Analytics.SegmentMgr.prototype.resolve = function(segmentPath, clientcontext) {
        clientcontext = clientcontext || CQ_Analytics.ClientContextMgr.get();

        // argument check
        if (!segmentPath) return false;

        // support arrays -> looping and aggregation handled over in resolveArray()
        if (segmentPath instanceof Array) return this.resolveArray(segmentPath, clientcontext);

        // only support segments under /etc/segmentation
        if (segmentPath.indexOf(this.SEGMENTATION_ROOT) != 0) return false;

        // the root segment always matches
        if (segmentPath == this.SEGMENTATION_ROOT) return true;

        // match if there is NO rule registered for this segment
        if (!this.segments[segmentPath]) return true;

        //first resolve parents
        var parent = segmentPath.substring(0, segmentPath.lastIndexOf("/"));
        if (parent.indexOf(this.SEGMENTATION_ROOT) == 0) {
            var pres = this.resolve(parent, clientcontext);
            if (pres !== true) return pres;
        }

        //keep old names for backward compatibility
        var rules = "function(clientcontext, contextcloud, clickstreamcloud) { return true ";
        rules += " && ( " + this.segments[segmentPath] + " ) ";
        rules += ";}";

        var res = true;
        try {
            var f = null;
            this.rulesCache = this.rulesCache || {};
            if ( this.rulesCache[segmentPath] ) {
                f = this.rulesCache[segmentPath];
            } else {
                eval("f = " + rules + "");
                this.rulesCache[segmentPath] = f;
            }
            var e = (f == null || f(clientcontext,clientcontext,clientcontext));
            res = res && (e === true);
        } catch(error) {
            return "Unresolved - Error while evaluating segment " + segmentPath + " : " + error.message;
        }
        return res;
    };

    /**
     * Returns all resolving segments for the given clientcontext.
     * @param {Object} clientcontext  Object containing values to try to resolve segments.
     * @return {String[]} Array of resolving segments.
     */
    CQ_Analytics.SegmentMgr.prototype.getResolved = function(clientcontext) {
        clientcontext = clientcontext || CQ_Analytics.ClientContextMgr.get();
        var res = new Array();
        for (var path in this.segments) {
            if (this.resolve(path, clientcontext) === true) {
                res.push(path);
            }
        }
        return res;
    };

    /**
     * Returns the max boost of an array of segments. Segment must resolve the given clientcontext.
     * @param {String[]} segmentPaths Array of segment paths.
     * @param {Object} clientcontext  Object containing values to try to resolve segments.
     * @return {Number} The max boost of the resolving segments.
     */

    CQ_Analytics.SegmentMgr.prototype.getMaxBoost = function(segmentPaths, clientcontext) {
        if (!(segmentPaths instanceof Array)) {
            return this.getBoost(segmentPaths);
        }
        var boost = 0;
        for (var i = 0; i < segmentPaths.length; i++) {
            var s = segmentPaths[i];
            if (this.resolve(s, clientcontext) === true) {
                var b = this.boosts[s] || 0;
                if (b > boost) {
                    boost = b;
                }
            }
        }
        return boost;
    };

    /**
     * Returns the boost of a segment.
     * @param {Array} segmentPath Path of the segment
     * @return {Number} Boost of the segment.
     */
    CQ_Analytics.SegmentMgr.prototype.getBoost = function(segmentPath) {
        if (!(segmentPath instanceof Array)) {
            segmentPath = [segmentPath];
        }
        return this.boosts[segmentPath] || 0;
    };

    /**
     * Reloads the given segment.
     * @param {String} path Path to the segment.
     */
    CQ_Analytics.SegmentMgr.prototype.reload = function(path) {
        var url = path;
        if( !url ) {
            url = this.SEGMENTATION_ROOT;
        }

        if(url) {
            if(url.indexOf(this.SEGMENT_SELECTOR) == -1) url += this.SEGMENT_SELECTOR;
            try {
                CQ_Analytics.Utils.load(url,function(config, status, response) {
                    if(response && response.responseText) {
                        eval(response.responseText);
                    }
                },this);
                var response = CQ.HTTP.get(scripts[i].src);
            } catch(err) {}
        }
    };

    CQ_Analytics.SegmentMgr.prototype.getSessionStore = function() {
        return this;
    };

    //inheritDoc
    CQ_Analytics.SegmentMgr.prototype.getProperty = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.SegmentMgr.prototype.getLink = function(name) {
        return name + ".html";
    };

    //inheritDoc
    CQ_Analytics.SegmentMgr.prototype.getLabel = function(name) {
        if (name) {
            var label = name;
            var index = label.lastIndexOf("/");
            if (index != -1) {
                label = label.substring(index + 1, label.length);
            }
            var res = this.resolve(name);
            if (res === true) {
                return label;
            } else {
                if (res !== true) {
                    return "<span class=\"invalid\" title=\"" + res + "\" alt=\"" + res + "\">" + label + "</span>";
                }
            }
        }
        return name;
    };

    //inheritDoc
    CQ_Analytics.SegmentMgr.prototype.getPropertyNames = function() {
        return this.getResolved();
    };

    CQ_Analytics.SegmentMgr = new CQ_Analytics.SegmentMgr();

    /**
     * Loads the segments at URL: path + ".segment.js".
     * Fires "segmentsload" event.
     * @param {String} path Path from where segments are loaded
     * @static
     * @since 5.5
     */
    CQ_Analytics.SegmentMgr.loadSegments = function(path) {
        CQ_Analytics.SegmentMgr.areSegmentsLoaded = false;
        //jquery will do the eval
        CQ.shared.HTTP.get(CQ.shared.HTTP.externalize(path + ".segment.js"));
        CQ_Analytics.SegmentMgr.areSegmentsLoaded = true;
        this.fireEvent("segmentsload");
    };

    /**
     * Renders the current segments found in the SegmentMgr store. Rendering is appended to the provided
     * target id.
     * @param {CQ_Analytics.SessionStore} store The SegmentMgr store
     * @param {String} targetId The target id
     * @static
     * @since 5.5
     */
    CQ_Analytics.SegmentMgr.renderer = function(store, targetId) {
        if( store && store.STORENAME == CQ_Analytics.SegmentMgr.STORENAME ) {
            var props = store.getPropertyNames();
            var elements=[];
            elements.push("<div>");
            for(var i = 0; i < props.length; i++) {
                var name = props[i];
                elements.push("<span title=\""+store.getProperty(name)+"\" >"
                          + "<a href=\""+CQ.shared.HTTP.externalize(store.getLink(name))+"\" "
                          + " title=\""+store.getProperty(name)+"\" >"
                          + store.getLabel(name)
                          + "</a>"
                          + "</span>");
            }
            elements.push("</div>");
            $CQ("#" + targetId).children().remove();
            $CQ("#" + targetId).append(elements.join(""));
        }
    };

    CQ_Analytics.ClientContextMgr.addListener("storeupdate", CQ_Analytics.SegmentMgr.fireUpdate);

    CQ_Analytics.Utils.addListener(window, "unload", function() {
        try {
            for(var p in CQ_Analytics.SegmentMgr) {
                delete CQ_Analytics.SegmentMgr[p];
            }
        } catch(error) {}
        CQ_Analytics.SegmentMgr = null;
    });
}

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.StrategyMgr</code> object is a singleton managing registration of different selection
 * strategies and selection of teasers
 * @class CQ_Analytics.StrategyMgr
 * @singleton
 */
if (!CQ_Analytics.StrategyMgr) {
    CQ_Analytics.StrategyMgr = function() {
        this.strategies = {};
    };

    CQ_Analytics.StrategyMgr.prototype = {};

    /**
     * Returns if a strategy is registered or not.
     * @param {String} strategy Strategy name
     * @return {Boolean} true if strategy registred. False otherwise.
     */
    CQ_Analytics.StrategyMgr.prototype.isRegistered = function(strategy) {
        return !!this.strategies[strategy];
    };

    /**
     * Registers a selection strategy. Selection function must return true or false,
     * and has one Array parameter: list of all teasers.
     * @param {String} strategy Strategy name
     * @param {Function} func Selection function
     */
    CQ_Analytics.StrategyMgr.prototype.register = function(strategy, func) {
        if (typeof func == 'function') {
            this.strategies[strategy] = func;
        }
    };

    /**
     * Chooses one teaser if the teasers list depending on the specified strategy.
     * @param {String} strategy Strategy name
     * @param {Array} teasers List of teasers
     * @return {Object} The selected teaser
     */
    CQ_Analytics.StrategyMgr.prototype.choose = function(strategy, teasers) {
        //no need to apply a strategy to choose in a list of one item!
        if (teasers.length == 1) return teasers[0];

        if (this.strategies[strategy]) {
            return this.strategies[strategy].call(this, teasers);
        }

        return null;
    };

    CQ_Analytics.StrategyMgr = new CQ_Analytics.StrategyMgr();
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
// Strategy which selects a teaser depending on the current surfer clickstream score
CQ_Analytics.StrategyMgr.register("clickstream-score", function(teasers) {
    //no need to apply a complex logic choose one item in a set of one!
    if( teasers.length == 1) {
        return teasers[0];
    }

    var selectedTeasers = [];
    if( CQ_Analytics.TagCloudMgr ){
        var tags = CQ_Analytics.TagCloudMgr.getTags();
        tags = tags || {};
        var selectedTeasersWeight =  -1;
        for(var i = 0;i < teasers.length; i++) {
            var currentTeaserWeight = 0;
            var teaserTags = teasers[i].tags;
            if( teaserTags ) {
                for(var j = 0;j<teaserTags.length; j++) {
                    var tagID = teaserTags[j].tagID;
                    currentTeaserWeight += parseInt(tags[tagID]) || 0;
                }
            }

            if( currentTeaserWeight == selectedTeasersWeight) {
                selectedTeasers.push(teasers[i]);
            } else {
                if( currentTeaserWeight > selectedTeasersWeight) {
                    //new max weight, clear list, add current teaser and change max weight
                    selectedTeasers = [];
                    selectedTeasers.push(teasers[i]);
                    selectedTeasersWeight = currentTeaserWeight;
                }
            }
        }
    } else {
        //fallback: random
        selectedTeasers = teasers;
    }

    if( selectedTeasers.length == 1) {
        return selectedTeasers[0];
    }

    //at this point 2 cases:
    // - no tagcloud manager, selected teasers are all resolved teasers
    // - can have several teasers with same max weight

    // ==> random choose
    var random = null;
    if( CQ_Analytics.PageDataMgr ) {
        random = CQ_Analytics.PageDataMgr.getProperty("random");
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom;
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom = Math.random();
    }

    if( parseFloat(random) > 1) {
        random = 1 / random;
    }

    if( parseFloat(random) == 1) {
        random = 0;
    }
    var ranNum = Math.floor(random*selectedTeasers.length);
    return selectedTeasers[ranNum];
});
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
// Strategy which selects the first teaser
CQ_Analytics.StrategyMgr.register("first", function(teasers) {
    return teasers[0];
});
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
// Strategy which random selects a teaser
CQ_Analytics.StrategyMgr.register("random", function(teasers) {
    var random = null;
    if( CQ_Analytics.PageDataMgr ) {
        random = CQ_Analytics.PageDataMgr.getProperty("random");
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom;
    }
    if( ! random ) {
        random = window.CQ_StrategyRandom = Math.random();
    }

    if( parseFloat(random) > 1) {
        random = 1 / random;
    }

    if( parseFloat(random) == 1) {
        random = 0;
    }

    var ranNum = Math.floor(random*teasers.length);
    return teasers[ranNum];
});
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.PageDataMgr</code> object is a store providing page data information.
 * @class CQ_Analytics.PageDataMgr
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.PageDataMgr) {
    CQ_Analytics.PageDataMgr = function() {};

    CQ_Analytics.PageDataMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.PageDataMgr.prototype.STORENAME = "pagedata";
    
    /**
     * internal name for the setExperience etc cookie.
     * @final
     * @private
     */
    CQ_Analytics.PageDataMgr.prototype.FORCE_EXPERIENCE_COOKIE = "cq-forceexperience";

    //inheritDoc
    CQ_Analytics.PageDataMgr.prototype.init = function() {
        this.data = {};
        for (var p in this.initProperty) {
            this.data[p] = this.initProperty[p];
        }
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.PageDataMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.PageDataMgr.prototype.getLink = function(name) {
        return "";
    };

    
    /**
     * Sets a cookie that forces the display of a specific teaser page in a
     * teaser when loading the next page.
     * @param {String} path Path to the teaserpage to show.
     */
    CQ_Analytics.PageDataMgr.prototype.setExperience = function(path) {
        CQ.shared.HTTP.setCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE, path, "/");
    };
    
    /**
     * Retrieves the content of the force experience cookie. See {@link #setExperience}.
     * If no cookie is set null or "" is returned.
     * @return {Object}
     */
    CQ_Analytics.PageDataMgr.prototype.getExperience = function() {
        return CQ.shared.HTTP.getCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE, "/");
    };
    
    /**
     * Removes the force experience cookie. See {@link #setExperience}.
     */
    CQ_Analytics.PageDataMgr.prototype.clearExperience = function() {
        CQ.shared.HTTP.clearCookie(CQ_Analytics.PageDataMgr.FORCE_EXPERIENCE_COOKIE, "/");
    };
    
    CQ_Analytics.PageDataMgr = new CQ_Analytics.PageDataMgr();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
        this.init();

        //registers Page Data to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);

    }, CQ_Analytics.PageDataMgr);
}

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>BrowserInfoInstance</code> object is a singleton providing utility methods to retrieve client browser information.
 * @class CQ_Analytics.BrowserInfoInstance
 * @singleton
 */
CQ_Analytics.BrowserInfo = function() {
    var ua = navigator.userAgent.toLowerCase();
    var check = function(r) {
        return r.test(ua);
    };

    var getBrowser = function() {
        if (check(/opera/)) {
            return {
                browserFamily: "Opera",
                browserVersion: ""
            };
        }

        if (check(/chrome/)) {
            return {
                browserFamily: "Chrome",
                browserVersion: ""
            };
        }

        if (check(/safari/)) {
            if (check(/applewebkit\/4/)) { // unique to Safari 2
                return {
                    browserFamily: "Safari",
                    browserVersion: "2"
                };
            }

            if (check(/version\/3/)) {
                return {
                    browserFamily: "Safari",
                    browserVersion: "3"
                };
            }

            if (check(/version\/4/)) {
                return {
                    browserFamily: "Safari",
                    browserVersion: "4"
                };
            }

            if (check(/version\/5/)) {
                return {
                    browserFamily: "Safari",
                    browserVersion: "5"
                };
            }

            if (check(/version\/6/)) {
                return {
                    browserFamily: "Safari",
                    browserVersion: "6"
                };
            }

            return {
                browserFamily: "Safari",
                browserVersion: "7 or higher"
            };
        }

        if (check(/webkit/)) {
            return {
                browserFamily: "WebKit",
                browserVersion: ""
            };
        }

        if (check(/msie/)) {
            if (check(/msie 6/)) {
                return {
                    browserFamily: "IE",
                    browserVersion: "6"
                };
            }

            if (check(/msie 7/)) {
                return {
                    browserFamily: "IE",
                    browserVersion: "7"
                };
            }

            if (check(/msie 8/)) {
                return {
                    browserFamily: "IE",
                    browserVersion: "8"
                };
            }

            if (check(/msie 9/)) {
                return {
                    browserFamily: "IE",
                    browserVersion: "9"
                };
            }

            if (check(/msie 10/)) {
                return {
                    browserFamily: "IE",
                    browserVersion: "10"
                };
            }

            return {
                browserFamily: "IE",
                browserVersion: "11 or higher"
            };
        }

        if (check(/gecko/)) {
            if (check(/rv:1\.8/)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "2"
                };
            }

            if (check(/rv:1\.9/)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "3"
                };
            }

            if (check(/rv:2.0/)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "4"
                };
            }

            if (check(/rv:5./)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "5"
                };
            }

            if (check(/rv:6./)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "6"
                };
            }

            if (check(/rv:7./)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "7"
                };
            }

            if (check(/rv:8./)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "8"
                };
            }

            if (check(/rv:9./)) {
                return {
                    browserFamily: "Firefox",
                    browserVersion: "9"
                };
            }

            return {
                browserFamily: "Firefox",
                browserVersion: "10 or higher"
            };
        }

        var isAir = check(/adobeair/);
        if (isAir) {
            return {
                browserFamily: "Adobe AIR",
                browserVersion: ""
            };
        }

        return {
            browserFamily: "Unresolved",
            browserVersion: "Unresolved"
        };
    };

    var getOS = function() {
        if (check(/windows 98|win98/)) {
            return "Windows 98";
        }

        if (check(/windows nt 5.0|windows 2000/)) {
            return "Windows 2000";
        }

        if (check(/windows nt 5.1|windows xp/)) {
            return "Windows XP";
        }

        if (check(/windows nt 5.2/)) {
            return "Windows Server 2003";
        }

        if (check(/windows nt 6.0/)) {
            return "Windows Vista";
        }

        if (check(/windows nt 6.1/)) {
            return "Windows 7";
        }

        if (check(/windows nt 4.0|winnt4.0|winnt/)) {
            return "Windows NT 4.0";
        }

        if (check(/windows me/)) {
            return "Windows ME";
        }

        if (check(/mac os x/)) {
            if (check(/ipad/) || check(/iphone/)) {
                return "iOS";
            }
            return "Mac OS X";
        }

        if (check(/macintosh|mac os/)) {
            return "Mac OS";
        }

        if (check(/android/)) {
            return "Android";
        }

        if (check(/linux/)) {
            return "Linux";
        }

        return "Unresolved";
    };

    var getDeviceType = function() {
        if (check(/ipad/)) {
            return "iPad";
        }

        if (check(/iphone/)) {
            return "iPhone";
        }

        if (check(/mobi/)) {
            return "Mobile";
        }

        return "Desktop";
    };

    var b = getBrowser.call();
    this.browserFamily = b.browserFamily;
    this.browserVersion = b.browserVersion;

    this.OSName = getOS.call();
    this.deviceType = getDeviceType.call();
    this.ua = ua;

    //protocol
    var isSecure = /^https/i.test(window.location.protocol);

    //resolution
    this.screenResolution = screen.width + "x" + screen.height;
};

CQ_Analytics.BrowserInfo.prototype = {
    /**
     * Returns the browser name.
     * @return {String} Browser name.
     */
    getBrowserName: function() {
        return this.browserFamily + " " + this.browserVersion;
    },

    /**
     * Returns the browser family.
     * @return {String} Browser family.
     */
    getBrowserFamily: function() {
        return this.browserFamily;
    },

    /**
     * Returns the browser version.
     * @return {String} Browser version.
     */
    getBrowserVersion: function() {
        return this.browserVersion;
    },

    /**
     * Returns the operating system name.
     * @return {String} OS name.
     */
    getOSName: function() {
        return this.OSName;
    },

    /**
     * Returns the screen resolution.
     * @return {String} Screen resolution.
     */
    getScreenResolution: function() {
        return this.screenResolution;
    },

    /**
     * Returns the device type.
     * @return {String} Device type.
     */
    getDeviceType: function() {
        return this.deviceType;
    },

    /**
     * Returns the user agent.
     * @return {String} User agent.
     */
    getUserAgent: function() {
        return this.ua;
    },

    /**
     * Returns if the device is a mobile device.
     * @return {Boolean} <code>true</code> if the device is a mobile device.
     */
    isMobile: function(deviceType) {
        if (!deviceType) {
            deviceType = this.getDeviceType();
        }
        deviceType = deviceType ? deviceType.toLowerCase() : "desktop";
        return deviceType != "desktop";
    },

    /**
     * Returns if the browser is Internet Explorer.
     * @return {Boolean}.
     */
    isIE: function(version) {
        return this.getBrowserFamily() == "IE" &&
            (version ? this.getBrowserVersion() == version : true);
    },

    /**
     * Returns if the browser is Internet Explorer 6.
     * @return {Boolean}.
     */
    isIE6: function() {
        return this.isIE("6");
    },

    /**
     * Returns if the browser is Internet Explorer 7.
     * @return {Boolean}.
     */
    isIE7: function() {
        return this.isIE("7");
    },

    /**
     * Returns if the browser is Internet Explorer 8.
     * @return {Boolean}.
     */
    isIE8: function() {
        return this.isIE("8");
    },

    /**
     * Returns if the browser is Internet Explorer 9.
     * @return {Boolean}.
     */
    isIE9: function() {
        return this.isIE("9");
    }
};

CQ_Analytics.BrowserInfoInstance = new CQ_Analytics.BrowserInfo();
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.MousePositionMgr</code> object is a singleton providing utility methods to retrieve
 * te current mouse position.
 * @class CQ_Analytics.MousePositionMgr
 * @singleton
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.MousePositionMgr) {
    CQ_Analytics.MousePositionMgr = function() {
        this.position = {
            "x": 0,
            "y": 0
        };

        this.getPageX = function(ev) {
            var x = ev.pageX;
            if (!x && 0 !== x) {
                x = ev.clientX || 0;
            }
            return x;
        };

        this.getPageY = function(ev) {
            var y = ev.pageY;
            if (!y && 0 !== y) {
                y = ev.clientY || 0;
            }
            return y;
        };

        var currentObj = this;

        this.timer = null;

        $CQ(document).bind("mousemove", function(event, a, b, c) {
            var e = event || window.event;
            if (e) {
                //update coordinates only every 500ms.
                if (!currentObj.timer) {
                    var x = currentObj.getPageX(e);
                    var y = currentObj.getPageY(e);
                    currentObj.timer = setTimeout(function() {
                        currentObj.setPosition(x, y);
                        currentObj.timer = null;
                    }, 500);
                }
            }
        });

        this.init();
    };

    CQ_Analytics.MousePositionMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.MousePositionMgr.prototype.STORENAME = "mouseposition";

    /**
     * Sets the current mouse position.
     * @param {Number} x X mouse position
     * @param {Number} y Y mouse position
     * @private
     */
    CQ_Analytics.MousePositionMgr.prototype.setPosition = function(x, y) {
        this.position["x"] = x;
        this.position["y"] = y;
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getProperty = function(name) {
        return this.position[name];
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getLink = function(name) {
        return "";
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getPropertyNames = function() {
        var res = new Array();
        for (var p in this.position) {
            res.push(p);
        }
        return res;
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getSessionStore = function() {
        return this;
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.getData = function(excluded) {
        return this.position;
    };

    //inheritDoc
    CQ_Analytics.MousePositionMgr.prototype.clear = function() {
        this.position = {};
    };

    CQ_Analytics.MousePositionMgr = new CQ_Analytics.MousePositionMgr();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        //registers Mouse Position manager to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);
    }, CQ_Analytics.MousePositionMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.EventDataMgr</code> object is a store providing page data information.
 * @class CQ_Analytics.EventDataMgr
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.EventDataMgr) {
    CQ_Analytics.EventDataMgr = function() {};

    CQ_Analytics.EventDataMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.EventDataMgr.prototype.STORENAME = "eventdata";

    //inheritDoc
    CQ_Analytics.EventDataMgr.prototype.init = function() {
        this.data = {};
        for (var p in this.initProperty) {
            this.data[p] = this.initProperty[p];
        }
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.EventDataMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.EventDataMgr.prototype.getLink = function(name) {
        return "";
    };

    CQ_Analytics.EventDataMgr = new CQ_Analytics.EventDataMgr();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
        this.init();

        //registers Page Data to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);

    }, CQ_Analytics.EventDataMgr);
}
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * @deprecated
 */
if (!window.CQ_Context) {
    window.CQ_Context = function() {};
    window.CQ_Context.prototype = new CQ_Analytics.Observable();

    window.CQ_Context.prototype.getProfile = function() {
        return (function() {
            return {
                /**
                 *
                 */
                getUserId: function() {
                    return this.getProperty("authorizableId");
                },

                /**
                 *
                 */
                getDisplayName: function() {
                    var fn = this.getProperty("formattedName");
                    if( fn ) return fn;

                    fn = this.getProperty("displayName");
                    if( fn ) return fn;

                    //fallback
                    return this.getUserId();
                },

                /**
                 *
                 */
                getFirstname: function() {
                    return this.getProperty("givenName");
                },

                /**
                 *
                 */
                getLastname: function() {
                    return this.getProperty("familyName");
                },

                /**
                 *
                 */
                getEmail: function() {
                    return this.getProperty("email");
                },

                /**
                 *
                 * @param {String} name
                 */
                getProperty: function(name) {
                    if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
                        return CQ_Analytics.ProfileDataMgr.getProperty(name);
                    }
                    return "";
                },

                /**
                 *
                 */
                getProperties: function() {
                    if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
                        return CQ_Analytics.ProfileDataMgr.getData();
                    }
                    return {};
                },

                /**
                 *
                 */
                getAvatar: function() {
                    return this.getProperty("avatar");
                },

                /**
                 *
                 * @param {Function} fct
                 * @param {Object} scope
                 */
                onUpdate: function(fct, scope) {
                    if (fct && CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
                        CQ_Analytics.ProfileDataMgr.addListener("update",fct,scope || this);
                    }
                }
            }
        })();
    };

    window.CQ_Context = new window.CQ_Context();
}


/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2013 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

CQ_Analytics.Engine = function() {

    window.CQ_trackTeasersStats = true;

    function isEditMode() {
        // ensure boolean return value
        return !!(window.CQ && CQ.WCM && CQ.WCM.isEditMode());
    }

    function isPreviewMode() {
        return !!(window.CQ && CQ.WCM && CQ.WCM.isPreviewMode())
    }

    /**
     * Returns a jQuery promise for an editable given its path.
     * During page load, editables might not be available right away, or it is
     * known that this editable will be created and one wants to listen for it.
     * This promise will resolve when the editable is present, with the editable
     * as argument.
     *
     * @param path the editable path
     * @returns {*} jQuery promise object - use promise.done(function(editable) {...}) to handle it
     */

    function getEditablePromise(path) {
        var deferred = $CQ.Deferred();
        var editable = CQ.WCM.getEditable(path);
        if (editable) {
            // already available, can resolve right away
            deferred.resolve(editable);
        } else {
            // not ready yet, extjs still loading, need to hook into editableready event
            CQ.WCM.onEditableReady(path, function(editable) {
                deferred.resolve(editable);
            });
        }
        return deferred.promise();
    }

    function initTracking(teaser, trackingURL) {
        if (!CQ_Analytics.loadedTeasersStack) {
            // store in loadedTeasersStack the list of teasers shown in the page.
            CQ_Analytics.loadedTeasersStack = [];
            // on window unload, post
            $CQ(window).unload(function() {
                try {
                    var loadedTeasers = CQ_Analytics.loadedTeasersStack;
                    if (loadedTeasers) {
                        delete CQ_Analytics.loadedTeasersStack;
                        //build the URL : trackingURL + paths
                        var url = trackingURL;
                        for (var i = 0; i < loadedTeasers.length; i++) {
                            url = CQ.shared.HTTP.addParameter(url, "path", loadedTeasers[i]);
                        }
                        //run get in asynch mode.
                        CQ.shared.HTTP.get(url, function() {
                        });
                    }
                } catch (error) {
                }
            });
        }
        CQ_Analytics.loadedTeasersStack.push(teaser.path);
    }

    /**
     * Gives an HTML text describing how selection was done based on the decisionInfo etc.
     */

    function buildDecisionHTML(decisionInfo, winnerPath, strategy) {
        var html = "",
            text;

        function getHTML(text, url, thumbnail, match) {
            return '<a href="' + url + '" class="cq-teaser-segment-link">' +
                '<img src="' + thumbnail + '" class="cq-teaser-decision-thumbnail ' + (match ? 'cq-teaser-decision-match' : 'cq-teaser-decision-nomatch') + '">' +
                '</a>' + text + '<br>';
        }

        for (var i = 0; i < decisionInfo.length; i++) {
            var info = decisionInfo[i];

            var path = CQ.shared.HTTP.externalize(info.teaser.path + ".html");

            if (info.hasOwnProperty("boost")) {
                // match
                if (info.noSegment) {
                    text = CQ.I18n.getMessage("Experience: {0} - match (no segments, boost = {1})", [info.teaser.title, info.boost]);
                } else {
                    text = CQ.I18n.getMessage("Experience: {0} - match (boost = {1})", [info.teaser.title, info.boost]);
                }
                var item = getHTML(text, path, info.teaser.thumbnail, true);
                if (winnerPath === info.teaser.path) {
                    html += "<b>" + item + "</b>";
                } else {
                    html += item;
                }
            } else {
                // no match
                if (info.unknownSegment) {
                    text = CQ.I18n.getMessage("Experience: {0} - no match (unknown segment)", [info.teaser.title]);
                } else {
                    text = CQ.I18n.getMessage("Experience: {0} - no match", [info.teaser.title]);
                }
                html += getHTML(text, path, info.teaser.thumbnail, false);
            }
        }

        html += "<br>";

        if (strategy) {
            html += CQ.I18n.getMessage("Strategy <b>{0}</b> selected current teaser.", strategy);
        } else {
            html += CQ.I18n.getMessage("No strategy configured, used the first match.");
        }

        html += "<br>";

        return html;
    }

    /**
     * Sets up the tooltip explaining the teaser selection.
     */

    function setDecisionTooltip(editablePromise, decisionInfo, winnerPath, strategy) {
        editablePromise.done(function(editable) {
            if (editable.teaserToolTip) {
                editable.teaserToolTip.hide();
                editable.teaserToolTip.remove();
            }

            editable.teaserToolTip = new CQ.Ext.Tip({
                "html": buildDecisionHTML(decisionInfo, winnerPath, strategy),
                "title": CQ.I18n.getMessage("Selection decision"),
                "width": 450,
                "autoHide": false,
                "closable": true,
                "height": 300,
                "floating": true,
                "autoHeight": false,
                "bodyStyle": "overflow-y: scroll;"
            });

            editable.on(CQ.wcm.EditRollover.EVENT_SHOW_HIGHTLIGHT, function(highlight) {
                if (!this.teaserInfoButton) {
                    this.teaserInfoButton = CQ.Ext.DomHelper.append('CQ', {
                        tag: 'div',
                        cls: 'x-tool x-tool-help cq-teaser-tooltip-tool'
                    }, true);
                    this.teaserInfoButton.position("absolute");
                    this.teaserInfoButton.on("click", function() {
                        var pos = this.getXY();
                        editable.teaserToolTip.setPosition(pos[0] - 460, pos[1] - 100);
                        editable.teaserToolTip.show();
                    });
                }
                this.teaserInfoButton.anchorTo(
                    highlight.frameBottom.getEl(),
                    "tr", [-26, -15]);
                this.teaserInfoButton.show();
            });

            editable.on(CQ.wcm.EditRollover.EVENT_HIDE_HIGHTLIGHT, function(highlight) {
                if (this.teaserInfoButton) {
                    this.teaserInfoButton.hide();
                }
            });
        });
    }

    /**
     * Removes the tooltip explaining the teaser selection.
     */

    function removeDecisionTooltip(editablePromise) {
        editablePromise.done(function(editable) {
            if (editable.teaserToolTip) {
                editable.teaserToolTip.hide();
                editable.teaserToolTip.remove();
                editable.teaserToolTip = null;
            }
        });
    }

    function resolveTeaserCandidates(teasers, decisionInfo) {
        var candidates = [];
        var lastBoost = 0;

        for (var i = 0; i < teasers.length; i++) {
            var teaser = teasers[i],
                segments = teaser.segments;

            var info;
            if (decisionInfo) {
                info = {
                    teaser: teaser
                };
                decisionInfo.push(info);
            }

            // teaser becomes a candidate if:
            // - it does not specify a segment (= applies to everyone)
            // - its segments can be resolved (= are currently active)
            // - at least one of its segments has the highest boost overall
            var match = !segments || segments.length === 0;

            if (match && info) {
                info.noSegment = true;
            }

            // check if segment(s) evaluate
            if (!match && CQ_Analytics.SegmentMgr.resolve(segments)) {
                match = true;
                // HACK: to avoid changing SegmentMgr.resolve()
                // if segment is unkown (= outside configured segmentPath), SegmentMgr currently
                // sees it as a match, but we don't want this here, it's very confusing, because
                // this gives a lot of false matches
                if (segments && segments.length > 0) {
                    if (!CQ_Analytics.SegmentMgr.segments[segments[0]]) {
                        match = false;
                        if (info) {
                            info.unknownSegment = true;
                        }
                    }
                }
            }

            if (match) {
                // handle boost
                var boost = CQ_Analytics.SegmentMgr.getMaxBoost(segments);

                if (info) {
                    info.boost = boost;
                }

                if (boost === lastBoost) {
                    // same boost, add to list
                    candidates.push(teaser);
                } else {
                    if (boost > lastBoost) {
                        // better boost, clear list and keep only this one
                        candidates = [];
                        candidates.push(teaser);
                        lastBoost = boost;
                    }
                }
            }

        }
        return candidates;
    }

    // stores functions by editable path
    var teaserListeners = {};

    function trackTeaserLoader(editablePath, fn) {
        // first make make sure an existing one is gone (precautious)
        CQ_Analytics.Engine.stopTeaserLoader(editablePath);

        teaserListeners[editablePath] = fn;
    }


    /**
     * Small utility function that checks the equality between two arrays
     * @param arr1
     * @param arr2
     */
    function arrayEquals(arr1, arr2) {
        if (!arr1 || !arr2) {
            return false;
        }
        if (arr1.length !== arr2.length) {
            return false;
        }
        // sort the arrays first
        arr1.sort();
        arr2.sort();
        for (var idx = 0; idx < arr1.length; idx++) {
            if (arr1[idx] !== arr2[idx]) {
                return false;
            }
        }
        return true;
    }

    var teasersCache = {};

    return {

        /**
         * Stops the teaser loader for the given editable (or editable path) to run
         * (it runs continuously when client context simulation is active).
         * @param editable editable object or path
         */
        stopTeaserLoader: function(editable) {
            var editablePath = editable.path || editable;

            if (!editablePath) {
                return;
            }
            var listener = teaserListeners[editablePath];
            if (listener) {
                CQ_Analytics.SegmentMgr.removeListener("update", listener);
                delete teaserListeners[editablePath];
            }
        },

        /**
         * Resolves a teaser to display.
         * @param {Array} teasers all teaser candidates
         * @param {String} strategy name of a strategy (optional)
         * @param {Array} decisionInfo empty array that will be filled with the list of teaser candidates and their evaluated boost (optional)
         * @returns {Object} the resolved teaser or null
         */
        resolveTeaser: function(teasers, strategy, decisionInfo) {
            // select the candidates based on the segments and boost
            var candidates = resolveTeaserCandidates(teasers, decisionInfo);
            if (candidates.length === 0) {
                return null;
            }
            // let strategy find the final teaser or fall back to first
            return CQ_Analytics.StrategyMgr.choose(strategy, candidates) || candidates[0];
        },

        /**
         * Initializes the teaser loader for a given element. Selects a teaser from a list
         * (dependending on the given strategy) and will to load choosen teaser content into a DOM element.
         * Also allows for overriding the automatic teaser selection for simulation purposes.
         *
         * @param {Object} options map of options
         * @param {String} options.targetID       ID of DOM element on which to insert choosen teaser
         * @param {Array}  options.teasers        Complete list of available teasers
         * @param {String} [options.strategy]     Name of the selection strategy (must be availabe in CQ_Analytics.StrategyManager)
         * @param {String} [options.trackingURL]  URL of the tracking service for teaser impressions (if window.CQ_trackTeasersStats)
         */
        loadTeaser: function(options) {
            // in wcm authoring mode, we need to get our editable
            var editable, editablePath;
            if (isEditMode()) {
                editablePath = CQ.WCM.getEditablePathFromDOM(document.getElementById(options.targetID));
                editable = getEditablePromise(editablePath);
            }

            var campaignStore = ClientContext.get("campaign");
            if (campaignStore && campaignStore.isCampaignSelected() && !isPreviewMode) {
                return;
            }

            var toExecute = function() {
                // Simulation: Override the normal teaser display if
                // the PageDataMgr has an experience set.
                var forceExp = CQ_Analytics.PageDataMgr.getExperience();
                if (forceExp) {
                    CQ_Analytics.PageDataMgr.clearExperience();
                    var TEASER_SUFFIX = "/_jcr_content/par.html";
                    if (isEditMode()) {
                        TEASER_SUFFIX += "?wcmmode=disabled";
                    }
                    CQ_Analytics.Utils.loadElement(forceExp + TEASER_SUFFIX, options.targetID);
                    return;
                }

                var currentTeaser = null;

                // function which chooses and loads a teaser.
                var loadTeasers = function() {
                    var decisionInfo = null;
                    if (isEditMode()) {
                        decisionInfo = [];
                    }
                    var campaignStore = ClientContext.get("campaign"),
                        teaserToShow;

                    if (campaignStore && campaignStore.isCampaignSelected()) {
                        // make the target component react to the changes in campaign store: CQ-10513
                        // determine the current segments based on selected experience
                        var campaignPath = campaignStore.data["path"],
                            experience = campaignStore.data["recipe/path"],
                            campaignList = campaignStore.data["campaigns"],
                            currentSegments = {},
                            teasers = options.teasers,
                            defaultTeaser;

                        for (var i = 0; i < teasers.length; i++) {
                            if (teasers[i].name === "default") {
                                defaultTeaser = teasers[i];
                            }
                        }

                        // check the cache first:
                        if (teasersCache[options.targetID] && teasersCache[options.targetID][experience]) {
                            teaserToShow = teasersCache[options.targetID][experience];
                        } else {
                            // shortcut for default
                            if (experience === "DEFAULT") {
                                // just choose the default teaser
                                teaserToShow = defaultTeaser;
                            } else {
                                // collect the segments for this experience
                                // by looking into the campaign store
                                for (var i = 0; i < campaignList.length; i++) {
                                    var campaign = campaignList[i];
                                    if (campaignList[i]["path"] === campaignPath) {
                                        var ex = campaign["experiences"];
                                        for (var j = 0; j < ex.length; j++) {
                                            if (ex[j]["path"] === experience) {
                                                if (ex[j].hasOwnProperty("segments")) {
                                                    var segments = ex[j]["segments"];
                                                    for (var k = 0; k < segments.length; k++) {
                                                        currentSegments[segments[k]] = currentSegments;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                // check if the collected segments match one of the teasers and show that teaser
                                for (var i = 0; i < teasers.length; i++) {
                                    var teaser = teasers[i];
                                    if (teaser.hasOwnProperty("segments")
                                        && (teaser["segments"].length === segments.length)) {
                                        if (arrayEquals(segments, teaser["segments"])) {
                                            teaserToShow = teasers[i];
                                            break;
                                        }
                                    }
                                }

                            }

                            // last resort = no teaser - show the default
                            if (!teaserToShow) {
                                teaserToShow = defaultTeaser;
                            }

                            // add the teaser to the cache
                            teasersCache[options.targetID] = { experience: teaserToShow };
                        }
                    } else {
                        teaserToShow = CQ_Analytics.Engine.resolveTeaser(options.teasers, options.strategy, decisionInfo);
                    }
                    if (teaserToShow) {
                        if (!currentTeaser || currentTeaser.path !== teaserToShow.path) {
                            currentTeaser = teaserToShow;

                            var url = teaserToShow.url;
                            if (isEditMode()) {
                                url += "?wcmmode=disabled";
                            }
                            CQ_Analytics.Utils.loadTeaserElement(url, options.targetID);

                            if (window.CQ_trackTeasersStats && options.trackingURL) {
                                initTracking(teaserToShow, options.trackingURL);
                            }

                            if (editable) {
                                setDecisionTooltip(editable, decisionInfo, currentTeaser.path, options.strategy);
                            }
                        }
                    } else {
                        if (editable) {
                            removeDecisionTooltip(editable);
                        }
                        CQ_Analytics.Utils.clearElement(options.targetID);
                        currentTeaser = null;
                    }
                };

                loadTeasers.call();

                //loaded teaser might change everytime a segment resolution state changes
                if (CQ_Analytics.SegmentMgr) {
                    if (editablePath) {
                        // keep track of the listener to allow the TargetEditor to disable it
                        // when it takes over control of teaser/experience display
                        trackTeaserLoader(editablePath, loadTeasers);
                    }
                    CQ_Analytics.SegmentMgr.addListener("update", loadTeasers);
                }

                // also listen to campaign store
                if (CQ_Analytics.CampaignMgr) {
                    CQ_Analytics.CampaignMgr.addListener("update", loadTeasers);
                }
            };

            // first teaser load is done when all stores are loaded
            if (CQ_Analytics.CCM.areStoresInitialized) {
                toExecute.call(this);
            } else {
                CQ_Analytics.CCM.addListener("storesinitialize", toExecute);
            }
        }
    };
}();

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
window.CQ_trackTeasersStats = true;

/**
 * Initializes every needed to select a teaser from a list (dependending on the given strategy) and
 * to load choosen teaser content into a DOM element.
 * Also allows for overriding the automatic teaser selection for simulation purposes.
 * @param {Array} allTeasers Teasers list
 * @param {String} strategyName Name of the selection strategy (must be availabe in CQ_Analytics.StrategyManager)
 * @param {DOMElement} targetElementId DOM element to insert choosen teaser
 * @param {Boolean} isEditMode True if edit mode is enabled
 * @param {String} trackingURL (optional) URL of the tracking service for teaser impressions (if window.CQ_trackTeasersStats)
 */
function initializeTeaserLoader(allTeasers, strategyName, targetElementId, isEditMode, trackingURL, editablePath) {
    isEditMode = !!(CQ.Ext && (isEditMode == "true" || isEditMode === true));
    if( window.CQ_Analytics ) {
        var toExecute = function() {
            var TEASER_SUFFIX = "/_jcr_content/par.html";
            if( isEditMode ) {
                TEASER_SUFFIX += "?wcmmode=disabled";
            }

            // Simulation: Override the normal teaser display if
            // the PageDataMgr has an experience set.
            var forceExp = CQ_Analytics.PageDataMgr.getExperience();
            if (forceExp) {
                CQ_Analytics.PageDataMgr.clearExperience();
                CQ_Analytics.Utils.loadElement(forceExp + TEASER_SUFFIX, targetElementId);
                return;
            }

            //function which computes an HTML text describing how selection is done.
            var computeDecisionHTML = function(teaserPath) {
                var html = "";

                var teasers = new Array();
                if (CQ_Analytics.SegmentMgr) {
                    var lastBoost = 0;
                    for (var i = 0; i < allTeasers.length; i++) {
                        var p = CQ.shared.HTTP.externalize(allTeasers[i].path + ".html");
                        if (!allTeasers[i]["segments"] ||
                            allTeasers[i]["segments"].length == 0 ||
                            CQ_Analytics.SegmentMgr.resolveArray(allTeasers[i]["segments"]) === true) {
                            var boost = CQ_Analytics.SegmentMgr.getMaxBoost(allTeasers[i]["segments"]);
                            var params = [allTeasers[i]["title"], boost, allTeasers[i].thumbnail, p];
                            if (teaserPath == allTeasers[i].path) {
                                html += CQ.I18n.getMessage("<b><a href=\"{3}\" class=\"cq-teaser-segment-link\"><img src=\"{2}\" class=\"cq-teaser-decision-thumbnail cq-teaser-decision-match\"></a>Experience: {0} - match ( boost = {1} )</b><br>", params);
                            } else {
                                html += CQ.I18n.getMessage("<a href=\"{3}\" class=\"cq-teaser-segment-link\"><img src=\"{2}\" class=\"cq-teaser-decision-thumbnail cq-teaser-decision-match\"></a>Experience: {0} - match ( boost = {1} )<br>", params);
                            }

                            if (boost == lastBoost) {
                                //same boost, add to list
                                teasers.push(allTeasers[i]);
                            } else {
                                if (boost > lastBoost) {
                                    //better boost, clear list and keep only this one
                                    teasers = new Array();
                                    teasers.push(allTeasers[i]);
                                    lastBoost = boost;
                                }
                            }
                        } else {
                            var params = [allTeasers[i]["title"], allTeasers[i].thumbnail, p];
                            html += CQ.I18n.getMessage("<a href=\"{2}\" class=\"cq-teaser-segment-link\"><img src=\"{1}\" class=\"cq-teaser-decision-thumbnail cq-teaser-decision-nomatch\"></a>Experience: {0} - no match<br>", params);
                        }
                    }
                }
                html += CQ.I18n.getMessage("<br>Strategy <b>{0}</b> selected current teaser.<br>", strategyName);
                return html;
            };

            var currentVisibleTeaser = null;
            var ttip = null;
            //function which chooses and loads a teaser.
            var loadTeasers = function() {
                var teasers = new Array();
                if (CQ_Analytics.SegmentMgr) {
                    var lastBoost = 0;
                    for (var i = 0; i < allTeasers.length; i++) {
                        if (!allTeasers[i]["segments"] ||
                            allTeasers[i]["segments"].length == 0 ||
                            CQ_Analytics.SegmentMgr.resolveArray(allTeasers[i]["segments"]) === true) {
                            var boost = CQ_Analytics.SegmentMgr.getMaxBoost(allTeasers[i]["segments"]);
                            if (boost == lastBoost) {
                                //same boost, add to list
                                teasers.push(allTeasers[i]);
                            } else {
                                if (boost > lastBoost) {
                                    //better boost, clear list and keep only this one
                                    teasers = new Array();
                                    teasers.push(allTeasers[i]);
                                    lastBoost = boost;
                                }
                            }
                        }
                    }
                }
                if (teasers.length > 0) {
                    // fallback: display first
                    var teaserToShow = teasers[0];
                    if (CQ_Analytics.StrategyMgr) {
                        var teas = CQ_Analytics.StrategyMgr.choose(strategyName, teasers);
                        if (teas != null) {
                            teaserToShow = teas;
                        }
                    }
                    if (!currentVisibleTeaser || currentVisibleTeaser.path != teaserToShow.path) {
                        currentVisibleTeaser = teaserToShow;
                        var url = teaserToShow.path + TEASER_SUFFIX;
                        url = CQ.shared.HTTP.addSelectors(url, CQ.shared.HTTP.getSelectors(window.location.href));
                        CQ_Analytics.Utils.loadTeaserElement(url, targetElementId);

                        if(window.CQ_trackTeasersStats && trackingURL) {
                            if( !CQ_Analytics.loadedTeasersStack) {
                                //store in loadedTeasersStack the list of teasers shown in the page.
                                CQ_Analytics.loadedTeasersStack = [];
                                //on window unload, post
                                $CQ(window).unload(function() {
                                    try {
                                        var loadedTeasers = CQ_Analytics.loadedTeasersStack;
                                        if( loadedTeasers ) {
                                            delete CQ_Analytics.loadedTeasersStack;
                                            //build the URL : trackingURL + paths
                                            var url = trackingURL;
                                            for(var i=0;i<loadedTeasers.length; i++) {
                                                url = CQ.shared.HTTP.addParameter(url,"path",loadedTeasers[i]);
                                            }
                                            //run get in asynch mode.
                                            CQ.shared.HTTP.get(url, function() {});
                                        }
                                    } catch(error) {}
                                });
                            }
                            CQ_Analytics.loadedTeasersStack.push(teaserToShow.path);
                        }

                        if( isEditMode ) {
                            if( editablePath ) {
                                var editable = CQ.WCM.getEditable(editablePath);
                                if( editable) {
                                    if( editable && editable.teaserToolTip ) {
                                        editable.teaserToolTip.hide();
                                        editable.teaserToolTip.remove();
                                        editable.teaserToolTip = null;
                                    } else {
                                        editable.on(CQ.wcm.EditRollover.EVENT_SHOW_HIGHTLIGHT, function(highlight) {
                                            if( ! this.teaserInfoButton ) {
                                                this.teaserInfoButton = CQ.Ext.DomHelper.append('CQ',{
                                                    tag: 'div',
                                                    cls: 'x-tool x-tool-help cq-teaser-tooltip-tool'
                                                }, true);
                                                this.teaserInfoButton.position("absolute");
                                                this.teaserInfoButton.on("click", function() {
                                                    if( !editable.teaserToolTip ) {
                                                        editable.teaserToolTip = new CQ.Ext.Tip({
                                                            "html": computeDecisionHTML(currentVisibleTeaser.path),
                                                            "title": CQ.I18n.getMessage("Selection decision"),
                                                            "width": 450,
                                                            "autoHide": false,
                                                            "closable": true,
                                                            "height": 300,
                                                            "floating": true,
                                                            "autoHeight": false,
                                                            "bodyStyle": "overflow-y: scroll;"
                                                        });
                                                    }
                                                    var pos = this.getXY();
                                                    editable.teaserToolTip.setPosition(pos[0] - 460,pos[1] - 100);
                                                    editable.teaserToolTip.show();
                                                });
                                            }
                                            this.teaserInfoButton.anchorTo(
                                                highlight.frameBottom.getEl(),
                                                "tr",
                                                [-26, -15]);
                                            this.teaserInfoButton.show();
                                        });

                                        editable.on(CQ.wcm.EditRollover.EVENT_HIDE_HIGHTLIGHT, function(highlight) {
                                            if( this.teaserInfoButton) {
                                                this.teaserInfoButton.hide();
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if( isEditMode ) {
                        var editable = CQ.WCM.getEditable(editablePath);
                        if( editable && editable.teaserToolTip ) {
                            editable.teaserToolTip.hide();
                            editable.teaserToolTip.remove();
                            editable.teaserToolTip = null;
                        }
                    }
                    CQ_Analytics.Utils.clearElement(targetElementId);
                    currentVisibleTeaser = null;
                }
            };

            loadTeasers.call();

            //loaded teaser might change everytime a segment resolution state changes
            if (CQ_Analytics.SegmentMgr) {
                CQ_Analytics.SegmentMgr.addListener("update", loadTeasers);
            }
        };

        //first teaser load is done when all stores are loaded
        if( CQ_Analytics.CCM.areStoresInitialized) {
            toExecute.call(this);
        } else {
            CQ_Analytics.CCM.addListener("storesinitialize",toExecute);
        }
    }
}

/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

window.CQ_trackLandingPagesStats = true;

function initializeLandingPageLoader(allLandingPages, strategyName, targetElementId, isEditMode, trackingURL) {
    isEditMode = CQ.Ext && (isEditMode == "true" || isEditMode === true);

    if( window.CQ_Analytics ) {
        var LANDINGPAGE_SUFFIX = ".html";

        var toExecute = function() {
            var currentVisibleLandingPage = null;
            //function which chooses and loads a landingPage.
            var loadLandingPages = function() {
                var landingPages = new Array();
                if (CQ_Analytics.SegmentMgr) {
                    var lastBoost = 0;
                    for (var i = 0; i < allLandingPages.length; i++) {
                        if (!allLandingPages[i]["segments"] ||
                            allLandingPages[i]["segments"].length == 0 ||
                            CQ_Analytics.SegmentMgr.resolveArray(allLandingPages[i]["segments"]) === true) {
                            var boost = CQ_Analytics.SegmentMgr.getMaxBoost(allLandingPages[i]["segments"]);
                            if (boost == lastBoost) {
                                //same boost, add to list
                                landingPages.push(allLandingPages[i]);
                            } else {
                                if (boost > lastBoost) {
                                    //better boost, clear list and keep only this one
                                    landingPages = new Array();
                                    landingPages.push(allLandingPages[i]);
                                    lastBoost = boost;
                                }
                            }
                        }
                    }
                }
                if (landingPages.length > 0) {
                    // fallback: display first
                    var landingPageToShow = landingPages[0];
                    if (CQ_Analytics.StrategyMgr) {
                        var lp = CQ_Analytics.StrategyMgr.choose(strategyName, landingPages);
                        if (lp != null) {
                            landingPageToShow = lp;
                        }
                    }
                    if (!currentVisibleLandingPage || currentVisibleLandingPage.path != landingPageToShow.path) {
                        var previousLandingPage = currentVisibleLandingPage;
                        currentVisibleLandingPage = landingPageToShow;

                        var request = CQ.shared.HTTP.get(landingPageToShow.path + LANDINGPAGE_SUFFIX);
                        var text = request.responseText;

                        var extractDiv = function(text, id) {
                            var ret = "";
                            if( text && text.indexOf("id=\"" + id + "\"") != -1) {
                                var index = text.indexOf("id=\"" + id + "\"");
                                var oDivIndex = text.substring(0, index).lastIndexOf("<div");
                                var tmp = text.substring(oDivIndex);
                                var split = tmp.split(new RegExp("<div", "ig"));
                                var opened = 0;
                                for(var i=0;i<split.length;i++) {
                                    opened++;
                                    var split2 = split[i].split(new RegExp("</div", "ig"));
                                    for(var j=1; j < split2.length; j++) {
                                        opened--;

                                        if(opened == 1) {
                                            var cDivIndex = split[i].lastIndexOf("</div") + 6;

                                            cDivIndex = tmp.indexOf(split[i]) + cDivIndex;
                                            tmp = tmp.substring(0, cDivIndex);

                                            tmp = tmp.substring(tmp.indexOf(">") + 1, tmp.lastIndexOf("</div"));
                                            return tmp;
                                        }
                                    }
                                }
                             }
                             return "";
                        };

                        text = extractDiv(text, targetElementId);

                        var target = $CQ("#" + targetElementId)[0];

                        var removeEditables = function(filter, show) {
                            if( isEditMode ) {
                                var editables = CQ.WCM.getEditables();
                                for(var epath in editables) {
                                    var editable = editables[epath];
                                    if( !filter || editable.path.indexOf(filter) != -1) {
                                        editable.hide();
                                        editable.remove();
                                    }
                                }
                            }
                        };

                        var node = document.createElement("div");
                        node.innerHTML = text;

                        if( previousLandingPage ) {
                            $CQ("object", target).parent().fadeOut("slow");
                            $CQ("img", target).fadeOut("slow");
                            $CQ(target).slideUp("slow", function() {
                                removeEditables(previousLandingPage.path, false);
                                $CQ(target).children().remove();

                                var toInject = target.insertBefore(node,target.firstChild);

                                $CQ(target).slideDown("slow", function() {
                                    if( isEditMode ) {
                                        CQ.DOM.executeScripts(CQ.Ext.get(node));
                                    }
                                });
                            });
                        } else {
                            var toInject = target.insertBefore(node,target.firstChild);
                            $CQ(target).slideDown("slow", function() {
                                if( isEditMode ) {
                                    CQ.DOM.executeScripts(CQ.Ext.get(node));
                                }
                            });
                        }

                        try {
                            if(window.CQ_trackLandingPagesStats && trackingURL) {
                                if( !CQ_Analytics.loadedLandingPagesStack) {
                                    //store in loadedLandingPagesStack the list of landingPages shown in the page.
                                    CQ_Analytics.loadedLandingPagesStack = [];
                                    //on window unload, post
                                    $CQ(window).unload(function() {
                                        try {
                                            var loadedLandingPages = CQ_Analytics.loadedLandingPagesStack;
                                            if( loadedLandingPages ) {
                                                delete CQ_Analytics.loadedLandingPagesStack;
                                                //build the URL : trackingURL + paths
                                                var url = trackingURL;
                                                for(var i=0;i<loadedLandingPages.length; i++) {
                                                    url = CQ.shared.HTTP.addParameter(url,"path",loadedLandingPages[i]);
                                                }
                                                //run get in asynch mode.
                                                CQ.shared.HTTP.get(url, function() {});
                                            }
                                        } catch(error) {}
                                    });
                                }
                                CQ_Analytics.loadedLandingPagesStack.push(landingPageToShow.path);
                            }
                        } catch(error) {}
                    }
                } else {
                    CQ_Analytics.Utils.clearElement(targetElementId);
                    currentVisibleLandingPage = null;
                }
            };

            loadLandingPages.call();

            //loaded landingPage might change everytime a segment resolution state changes
            if (CQ_Analytics.SegmentMgr) {
                CQ_Analytics.SegmentMgr.addListener("update", loadLandingPages);
            }
        };

        //first landingPage load is done when all stores are loaded
        if( CQ_Analytics.ClickstreamcloudMgr ) {
            if( CQ_Analytics.ClickstreamcloudMgr.areStoresLoaded ) {
                toExecute.call(this);
            } else {
                CQ_Analytics.ClickstreamcloudMgr.addListener("storesloaded",toExecute);
            }
        }
    }
    }

/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

/**
 * @class CQ_Analytics.PersistedJSONStore
 * @extends CQ_Analytics.PersistedSessionStore
 * A PersistedJSONStore is a persisted container of a JSON object.
 * @constructor
 * Creates a new PersistedJSONStore.
 * @since 5.5
 */
CQ_Analytics.PersistedJSONStore = function() {};

CQ_Analytics.PersistedJSONStore.prototype = new CQ_Analytics.PersistedSessionStore();

/**
 * @cfg {String} STOREKEY
 * Store internal key
 * @final
 * @private
 */
CQ_Analytics.PersistedJSONStore.prototype.STOREKEY = "";

/**
 * @cfg {String} STORENAME
 * Store internal name
 * @final
 * @private
 */
CQ_Analytics.PersistedJSONStore.prototype.STORENAME = "";

//inheritDoc
CQ_Analytics.PersistedJSONStore.prototype.init = function() {
    var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
    var value = store.get(this.getStoreKey());
    if (!value || value == "") {
        this.data = {};
        for (var p in this.initProperty) {
            this.data[p] = this.initProperty[p];
        }
    } else {
        this.data = this.parse(value);
    }
    this.persist();

    this.initialized = true;
    this.fireEvent("initialize",this);
    this.fireEvent("update");
};

//inheritDoc
CQ_Analytics.PersistedJSONStore.prototype.clear = function() {
    var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
    store.remove(this.getStoreKey());
    this.data = null;
    this.initProperty = {};
};

/**
 * Sets the store data with the specified JSON object. Note that inside the store, properties are stored based
 * on property path in the store.
 * <code>{
 * A: "valueA",
 * B: {
 *  B1: "valueBB1"
 * }</code>
 * will be accessed in the store as:
 * <code>A: "valueA"
 * B/B1: "valueBB1"</code>
 *
 * @param {Object} jsonData The JSON object containing the data.
 */
CQ_Analytics.PersistedJSONStore.prototype.initJSON = function(jsonData, doNotClear) {
    if( !doNotClear ) {
        this.initProperty = {};
    }

    var propertyToPaths= function(target, prefix, obj) {
        for(var p in obj) {
            if( typeof obj[p]  == "object") {
                propertyToPaths(target, prefix ? prefix + "/" + p : p, obj[p]);
            } else {
                target[prefix ? prefix + "/" + p : p] = obj[p];
            }
        }
    };

    propertyToPaths(this.initProperty, null, jsonData);
};

/**
 * Returns the store data as a JSON object.
 * @return {Object} The JSON object.
 */
CQ_Analytics.PersistedJSONStore.prototype.getJSON = function() {
    var data = this.getData();
    var res = {};

    for(var longProp in data) {
        var s = longProp.split("/");
        var level = res;
        for(var i = 0; i < s.length; i++) {
            var propLevel = s[i];
            if( i == s.length - 1) {
                level[propLevel] = data[longProp];
            } else {
                level[propLevel] = level[propLevel] || {};
                level = level[propLevel];
            }
        }
    }

    return res;
};

/**
 * Returns a new instance of a CQ_Analytics.PersistedJSONStore instance is initialized with the JSON object.
 * @param {String} storeName The name of the new store
 * @param {Object} jsonData The initial data as JSON object
 * @return {CQ_Analytics.PersistedJSONStore} The new store instance
 * @static
 */
CQ_Analytics.PersistedJSONStore.getInstance = function(storeName, jsonData) {
    var s = new CQ_Analytics.PersistedJSONStore();
    s.STOREKEY = storeName.toUpperCase();
    s.STORENAME = storeName;

    s.initJSON(jsonData);

    return s;
};

/**
 * Creates, registers in the ClientContext and returns a new instance of a CQ_Analytics.PersistedJSONStore
 * instance initialized with the JSON object.
 * @param {String} storeName The name of the new store
 * @param {Object} jsonData The initial data as JSON object
 * @return {CQ_Analytics.PersistedJSONStore} The new store instance
 * @static
 */
CQ_Analytics.PersistedJSONStore.registerNewInstance = function(storeName, jsonData) {
    var jsonStore = CQ_Analytics.PersistedJSONStore.getInstance(storeName, jsonData);
    jsonStore.init();
    //registers new store to clickstreamcloud manager
    CQ_Analytics.CCM.register(jsonStore);

    return jsonStore;
};


/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

/**
 * @class CQ_Analytics.JSONStore
 * @extends CQ_Analytics.SessionStore
 * A JSONStore is a container of a JSON object.
 * @constructor
 * Creates a new JSONStore.
 * @since 5.5
 */
CQ_Analytics.JSONStore = function() {};

CQ_Analytics.JSONStore.prototype = new CQ_Analytics.SessionStore();

/**
 * @cfg {String} STOREKEY
 * Store internal key
 * @final
 * @private
 */
CQ_Analytics.JSONStore.prototype.STOREKEY = "";

/**
 * @cfg {String} STORENAME
 * Store internal name
 * @final
 * @private
 */
CQ_Analytics.JSONStore.prototype.STORENAME = "";

//inheritDoc
CQ_Analytics.JSONStore.prototype.init = function() {
    this.data = {};
    for (var p in this.initProperty) {
        this.data[p] = this.initProperty[p];
    }

    this.initialized = true;
    this.fireEvent("initialize",this);
    this.fireEvent("update");
};

//inheritDoc
CQ_Analytics.JSONStore.prototype.clear = function() {
    this.data = null;
    this.initProperty = {};
};

/**
 * Sets the store data with the specified JSON object. Note that inside the store, properties are stored based
 * on property path in the store.
 * <code>{
 * A: "valueA",
 * B: {
 *  B1: "valueBB1"
 * }</code>
 * will be accessed in the store as:
 * <code>A: "valueA"
 * B/B1: "valueBB1"</code>
 *
 * @param {Object} jsonData The JSON object containing the data.
 */
CQ_Analytics.JSONStore.prototype.initJSON = function(jsonData, doNotClear) {
    if( !doNotClear ) {
        this.initProperty = {};
    }

    var propertyToPaths= function(target, prefix, obj) {
        for(var p in obj) {
            if( typeof obj[p]  == "object") {
                propertyToPaths(target, prefix ? prefix + "/" + p : p, obj[p]);
            } else {
                target[prefix ? prefix + "/" + p : p] = obj[p];
            }
        }
    };

    propertyToPaths(this.initProperty, null, jsonData);
};

/**
 * Returns the store data as a JSON object.
 * @return {Object} The JSON object.
 */
CQ_Analytics.JSONStore.prototype.getJSON = function() {
    var data = this.getData();
    var res = {};

    for(var longProp in data) {
        var s = longProp.split("/");
        var level = res;
        for(var i = 0; i < s.length; i++) {
            var propLevel = s[i];
            if( i == s.length - 1) {
                level[propLevel] = data[longProp];
            } else {
                level[propLevel] = level[propLevel] || {};
                level = level[propLevel];
            }
        }
    }

    return res;
};

/**
 * Returns a new instance of a CQ_Analytics.JSONStore instance is initialized with the JSON object.
 * @param {String} storeName The name of the new store
 * @param {Object} jsonData The initial data as JSON object
 * @return {CQ_Analytics.JSONStore} The new store instance
 */
CQ_Analytics.JSONStore.getInstance = function(storeName, jsonData) {
    var s = new CQ_Analytics.JSONStore();
    s.STOREKEY = storeName.toUpperCase();
    s.STORENAME = storeName;

    s.initJSON(jsonData);

    return s;
};

/**
 * Creates, registers in the ClientContext and returns a new instance of a CQ_Analytics.JSONStore
 * instance initialized with the JSON object.
 * @param {String} storeName The name of the new store
 * @param {Object} jsonData The initial data as JSON object
 * @return {CQ_Analytics.JSONStore} The new store instance
 */
CQ_Analytics.JSONStore.registerNewInstance = function(storeName, jsonData) {
    var jsonStore = CQ_Analytics.JSONStore.getInstance(storeName, jsonData);
    jsonStore.init();
    //registers new store to clickstreamcloud manager
    CQ_Analytics.CCM.register(jsonStore);

    return jsonStore;
};


/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

/**
 * @class CQ_Analytics.PersistedJSONPStore
 * @extends CQ_Analytics.PersistedJSONStore
 * A PersistedJSONPStore is a persisted container of a JSON object retrieved from a remote JSONP service.
 * @constructor
 * Creates a new PersistedJSONPStore.
 * @since 5.5
 */
CQ_Analytics.PersistedJSONPStore = function() {};

CQ_Analytics.PersistedJSONPStore.prototype = new CQ_Analytics.PersistedJSONStore();

/**
 * Sets a new service URL.
 * @param {String} serviceURL The service URL
 */
CQ_Analytics.PersistedJSONPStore.prototype.setServiceURL = function(serviceURL) {
    this.serviceURL = serviceURL;
};

/**
 * Returns the service URL of the store.
 * @return {String} The service URL if defined. Null otherwise
 */
CQ_Analytics.PersistedJSONPStore.prototype.getServiceURL = function() {
    return this.serviceURL;
};

/**
 * Loads in the store the data from the remote JSONP service.
 * @param {String} serviceURL (Optional) Defines a new service URL
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Function} callback (Optional) Function to execute after data loading
 */
CQ_Analytics.PersistedJSONPStore.prototype.load = function(serviceURL, dynamicData, callback) {
    var storeName = this.getName();
    if( ! CQ_Analytics.PersistedJSONPStore.JSONPCallbacks[this.getName()]) {
        CQ_Analytics.PersistedJSONPStore.JSONPCallbacks[storeName] = function(data) {
            var s = CQ_Analytics.CCM.getRegisteredStore(storeName);
            if( s ) {
                s.initJSON(data);
                if( dynamicData ) {
                    s.initJSON(dynamicData, true);
                }

            }
            if( callback ) {
                callback.call(s);
            }
        };
    }

    if( serviceURL ) {
        this.setServiceURL(serviceURL);
    }

    var url = this.serviceURL;
    url = url.replace("\$\{callback\}","CQ_Analytics.PersistedJSONPStore.JSONPCallbacks." + storeName);
    $CQ.getScript(url);
};

/**
 * Used as storage for JSONP callbacks (one callback per unique store name).
 */
CQ_Analytics.PersistedJSONPStore.JSONPCallbacks = {};

/**
 * Returns a new instance of a CQ_Analytics.PersistedJSONPStore instance.
 * @param {String} storeName The name of the new store
 * @param {String} serviceURL (Optional) The service URL of the JSONP store
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Boolean} deferLoading (Optional) True to defer the store loading
 * @param {Function} loadingCallback (Optional) Function to execute after data loading
 * @return {CQ_Analytics.PersistedJSONPStore} The new store instance
 * @static
 */
CQ_Analytics.PersistedJSONPStore.getInstance = function(storeName, serviceURL, dynamicData, deferLoading, loadingCallback) {
    if( storeName && serviceURL) {
        try {
            var jsonpStore = new CQ_Analytics.PersistedJSONPStore();
            jsonpStore.STOREKEY = storeName.toUpperCase();
            jsonpStore.STORENAME = storeName;

            if( serviceURL ) {
                jsonpStore.setServiceURL(serviceURL);
            }

            if( !deferLoading ) {
                jsonpStore.load(serviceURL, dynamicData, loadingCallback);
            }

            return jsonpStore;
        } catch(error) {
            console.log("Cannot create the JSONP store",storeName, serviceURL,error);
        }
    }
    return null;
};

/**
 * Creates, registers in the ClientContext and returns a new instance of a CQ_Analytics.PersistedJSONPStore instance.
 * @param {String} storeName The name of the new store
 * @param {String} serviceURL The service URL of the JSONP store
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Function} callback (Optional) Function to execute after data loading
 * @return {CQ_Analytics.PersistedJSONPStore} The new store instance
 * @static
 */
CQ_Analytics.PersistedJSONPStore.registerNewInstance = function(storeName, serviceURL, dynamicData, callback) {
    if( !serviceURL ) {
        return null;
    }

    if( !storeName ) {
        //try to extract a name from service url

        var sa = CQ.shared.HTTP.getSchemeAndAuthority(serviceURL);
        if( sa ) {
            if(sa.indexOf(".") !=-1) {
                sa = sa.substring(0, sa.lastIndexOf("."));
                storeName = sa.substring(sa.lastIndexOf(".") + 1);
            } else {
                storeName = sa.substring(sa.lastIndexOf("/") + 1);
            }
        } else {
            //weird case, should never happen
            storeName = serviceURL;
        }

    }

    var store = CQ_Analytics.PersistedJSONPStore.getInstance(storeName, serviceURL, dynamicData, false, function() {
        this.init();
        this.reset();
        if( callback ) {
            callback.call(this);
        }
    });
    if( store != null ) {
        //registers new store to clickstreamcloud manager
        CQ_Analytics.CCM.register(store);
        return store;
    }
    return null;
};
/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

/**
 * @class CQ_Analytics.JSONPStore
 * @extends CQ_Analytics.JSONStore
 * A JSONPStore is a container of a JSON object retrieved from a remote JSONP service.
 * @constructor
 * Creates a new JSONPStore.
 * @since 5.5
 */
CQ_Analytics.JSONPStore = function() {};

CQ_Analytics.JSONPStore.prototype = new CQ_Analytics.JSONStore();

/**
 * Sets a new service URL.
 * @param {String} serviceURL The service URL
 */
CQ_Analytics.JSONPStore.prototype.setServiceURL = function(serviceURL) {
    this.serviceURL = serviceURL;
};

/**
 * Returns the service URL of the store.
 * @return {String} The service URL if defined. Null otherwise
 */
CQ_Analytics.JSONPStore.prototype.getServiceURL = function() {
    return this.serviceURL;
};

/**
 * Loads in the store the data from the remote JSONP service.
 * @param {String} serviceURL (Optional) Defines a new service URL
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Function} callback (Optional) Function to execute after data loading
 */
CQ_Analytics.JSONPStore.prototype.load = function(serviceURL, dynamicData, callback) {
    var storeName = this.getName();
    if( ! CQ_Analytics.JSONPStore.JSONPCallbacks[this.getName()]) {
        CQ_Analytics.JSONPStore.JSONPCallbacks[storeName] = function(data) {
            var s = CQ_Analytics.CCM.getRegisteredStore(storeName);
            if( s ) {
                s.initJSON(data);
                if( dynamicData ) {
                    s.initJSON(dynamicData, true);
                }

            }
            if( callback ) {
                callback.call(s);
            }
        };
    }

    if( serviceURL ) {
        this.setServiceURL(serviceURL);
    }

    var url = this.serviceURL;
    url = url.replace("\$\{callback\}","CQ_Analytics.JSONPStore.JSONPCallbacks." + storeName);
    $CQ.getScript(url);
};

/**
 * Used as storage for JSONP callbacks (one callback per unique store name).
 */
CQ_Analytics.JSONPStore.JSONPCallbacks = {};

/**
 * Returns a new instance of a CQ_Analytics.JSONPStore instance.
 * @param {String} storeName The name of the new store
 * @param {String} serviceURL (Optional) The service URL of the JSONP store
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Boolean} deferLoading (Optional) True to defer the store loading
 * @param {Function} loadingCallback (Optional) Function to execute after data loading
 * @return {CQ_Analytics.JSONPStore} The new store instance
 */
CQ_Analytics.JSONPStore.getInstance = function(storeName, serviceURL, dynamicData, deferLoading, loadingCallback) {
    if( storeName ) {
        try {
            var jsonpStore = new CQ_Analytics.JSONPStore();
            jsonpStore.STOREKEY = storeName.toUpperCase();
            jsonpStore.STORENAME = storeName;

            if( serviceURL ) {
                jsonpStore.setServiceURL(serviceURL);
                if( !deferLoading ) {
                    jsonpStore.load(serviceURL, dynamicData, loadingCallback);
                }
            }

            return jsonpStore;
        } catch(error) {
            console.log("Cannot create the JSONP store",storeName, serviceURL,error);
        }
    }
    return null;
};

/**
 * Creates, registers in the ClientContext and returns a new instance of a CQ_Analytics.JSONPStore instance.
 * @param {String} storeName The name of the new store
 * @param {String} serviceURL The service URL of the JSONP store
 * @param {Object} dynamicData (Optional) Data that will be appended to the store
 * @param {Function} callback (Optional) Function to execute after data loading
 * @return {CQ_Analytics.JSONPStore} The new store instance
 */
CQ_Analytics.JSONPStore.registerNewInstance = function(storeName, serviceURL, dynamicData, callback) {
    if( !storeName && serviceURL) {
        //try to extract a name from service url

        var sa = CQ.shared.HTTP.getSchemeAndAuthority(serviceURL);
        if( sa ) {
            if(sa.indexOf(".") !=-1) {
                sa = sa.substring(0, sa.lastIndexOf("."));
                storeName = sa.substring(sa.lastIndexOf(".") + 1);
            } else {
                storeName = sa.substring(sa.lastIndexOf("/") + 1);
                storeName = storeName.replace(new RegExp(":", "ig"),"_");
            }
        } else {
            //weird case, should never happen
            storeName = serviceURL;
        }

    }

    var store = CQ_Analytics.JSONPStore.getInstance(storeName, serviceURL, dynamicData, false, function() {
        this.init();
        this.reset();
        if( callback ) {
            callback.call(this);
        }
    });
    if( store != null ) {
        //registers new store to clickstreamcloud manager
        CQ_Analytics.CCM.register(store);
        return store;
    }
    return null;
};
/**
 * Stores the 'data' object into the appropriate properties of the 'store'
 * client side store.
 * 
 * @param {Object}
 *            SessionStore object.
 * @param {Object}
 *            Data object.
 * @private
 */
CQ_Analytics.storeData = function(store, data) {
	
	var findMappingFor = function(prop,value) {
		for (var i=0; i< CQ_Analytics.Sitecatalyst.frameworkMappings.length; i++) {
			var m = CQ_Analytics.Sitecatalyst.frameworkMappings[i];
			if (m[prop] === value) {
				return m;
			}
		}
		return null;
	}
	
	var stripValue = function(value) {
		if (typeof value === 'string') {
			return value.replace(/[,;=\|]/g,"");
		}
		return value;
	}
	
	for (var j in data) {
    	//handle generic data
    	if (j !== "product") {
        	var idx = j.indexOf(".");
        	var storeName = (idx > 0) ? j.substr(0,idx-1) : undefined;
        	var key = (idx > 0) ? j.substr(idx) : j;
        	if ( storeName && CQ_Analytics.StoreRegistry.getStore(storeName) ) {
        		store = CQ_Analytics.StoreRegistry.getStore(storeName);
        	}
            store.setProperty(key, data[j]);
    	// handle product data
    	} else {
    		var productProperties = ["category","sku","quantity","price","events","evars"];
    		var products = store.getProperty("products").split(",");
    		products = (products[0] == "") ? new Array() : products; 

    		var data = (data[j] instanceof Array)
    				   ? data[j] 
    				   : [data[j]];
    			
    		for (var prod = 0; prod < data.length; prod++) {
    			var p = data[prod];
    			var product = new Array(6);
    			for (var k in p) {
	    			var idx = productProperties.indexOf(k);
	    			if (idx > -1) {
	    				if (idx < 4) {
	    					product[idx] = stripValue(p[k]);
	    				} else {
	    					var multival = []; 
	    					for(var l in p[k]) {
	    						var propPath = store.getName() + "." + j + "." + k + "." + l;
	    						var cm = findMappingFor("cqVar", propPath);
	    						if (cm) {
	    							multival.push(cm.scVar + "=" + stripValue(p[k][l]));
	    							//add to events store like normal event
	    							var events = store.getProperty("events").split("\u2026")
	    							if (events.indexOf(cm.cqVar) < 0) {
	    								events.push(cm.cqVar.replace(/.+\./,""));
	    								store.setProperty("events", events.join("\u2026"));
	    							}
	    						}
	    					}
	    					product[idx] = multival.join("|"); 
	    				}
	            	}
	    		}
    			products.push(product.join(";"));
    		}
    		store.setProperty("products", products.join(","));
    	}
    }
};

/**
 * Records a user interaction in the a ClientContext store (by default
 * EventDataManager) to be picked up by the used analytics solution for further
 * processing.
 * 
 * @param {Object}
 *            options Tracking options.
 * 
 * <p>
 * Generic options properties.
 * </p>
 * @param {String}/{Array}
 *            options.event Tracking event name or Array of Strings for multiple 
 *            event names.
 * @param {Object}
 *            options.values Tracking values.
 * @param {Boolean}
 *            options.collect Flag which indicates if event and values should be
 *            collected (optional).
 * @param {String}
 *            options.dataMgr User ClientContext store to hold the information
 *            (optional). Default is <code>CQ_Analytics.EventDataMgr</code>.
 * @param {Object}
 *            options.options Options object holding analytics specific options
 *            (optional).
 * 
 * <p>
 * By default when using SiteCatalyst following <code>options.options</code>
 * are supported.
 * </p>
 * @param {DOM
 *            Element} options.options.obj Link DOM element
 * @param {String}
 *            options.options.defaultLinkType SiteCatalyst link type
 * 
 * @return {Array} An array holding the options.event and options.values if
 *         <code>options.collect</code> is <code>true</code>, otherwise
 *         nothing is returned.
 * @since 5.5
 */
CQ_Analytics.record = function(options) {

    if (options.collect) {
        return [options.event, options.values]; 
    } else {  
        if (options.event) { 
            options.options = options.options || { };
            //execute callbacks before data is set
            try {
                CQ_Analytics.recordBeforeCallbacks.sort(function(a, b){
                    return a.rank-b.rank;
                });
                for(var callback in CQ_Analytics.recordBeforeCallbacks) {
                    if (CQ_Analytics.recordBeforeCallbacks[callback].func.call(this, options)) {
                        return;
                    }
                }
            } catch(err) {
                //nothing to do 
            }
         
            //record data to clickStreamCloud
            var dataMgr = options.dataMgr || CQ_Analytics.EventDataMgr
            dataMgr.reset();

            if (typeof options.event == "string") {
                dataMgr.setProperty("events",options.event);
            } else {
                dataMgr.setProperty("events",options.event.join("\u2026"));
            }
            
            if (options.values) {
                CQ_Analytics.storeData(dataMgr, options.values);
            }
            
            //execute callbacks after data was set
            try {
               CQ_Analytics.recordAfterCallbacks.sort(function(a, b){
                   return a.rank-b.rank;
               });
               for(var callback in CQ_Analytics.recordAfterCallbacks) {
                    if (CQ_Analytics.recordAfterCallbacks[callback].func.call(this, options)) {
                        return;
                    }
                }
            } catch(err) {
                //nothing to do 
            }
        }
    }
};

/**
 * @private
 */
CQ_Analytics.recordBeforeCallbacks = [];

/**
 * @private
 */
CQ_Analytics.recordAfterCallbacks = []; 

/**
 * Registers a callback handler which is called before data in ClientContext
 * store was set.
 * 
 * @param {Function}
 *            Callback function. Parameter passed to the callback is the
 *            <code>options</code> object from the record method.
 * @param {Integer}
 *            Execution rank.
 */
CQ_Analytics.registerBeforeCallback = function(callback, rank) {
    CQ_Analytics.recordBeforeCallbacks.push({rank: rank, func: callback});
};

/**
 * Registers a callback handler which is called after data in ClientContext
 * store was set.
 * 
 * @param {Function}
 *            Callback function. Parameter passed to the callback is the
 *            <code>options</code> object from the record method.
 * @param {Integer}
 *            Execution rank.
 */
CQ_Analytics.registerAfterCallback = function(callback, rank) {
    CQ_Analytics.recordAfterCallbacks.push({rank: rank, func: callback});
};

/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

if (!CQ_Analytics.ClientContext) {
    /**
     * The <code>ClientContext</code> object is a facade to access / update the session stores and
     * their properties contained in the {@link CQ_Analytics.ClientContextMgr}.
     * <br>
     * @static
     * @singleton
     * @class CQ_Analytics.ClientContext
     * @since 5.5
     */
    CQ_Analytics.ClientContext = new function() {
        return {
            /**
             * Returns a store or the value of a property from a store loaded in the ClientContext
             * @param {String} path Format: /"storeName" or /"storeName"/"propertyName". E.g.: /profile, /profile/email
             * or /geolocation/address/city. First / can be omitted - "profile" or profile/email would work too.
             * @param {Boolean} resolveVariables True to resolves the variables contained in the value (defaults to false).
             * @return {Object/String} a store or a property value. Null if not found.
             */
            get: function(path, resolveVariables) {
                if( path ) {
                    if( path.indexOf("/") != 0) {
                        path = "/" + path;
                    }

                    var storeName = path.split("/")[1];
                    var propertyName = path.substring(path.indexOf("/" + storeName) + storeName.length + 2, path.length);
                    var store = CQ_Analytics.CCM.getRegisteredStore(storeName);
                    if( store ) {
                        if( propertyName ) {
                            var value = store.getProperty(propertyName);
                            if( value && resolveVariables ) {
                                value = CQ_Analytics.Variables.replaceVariables(value);
                            }
                            return value;
                        }
                        return store;
                    }
                }
                return null;
            },

            /**
             * Sets the value of a property from a store loaded in the ClientContext
             * @param {String} path Format: /"storeName" or /"storeName"/"propertyName". E.g.: /profile, /profile/email
             * or /geolocation/address/city. First / can be omitted - "profile" or profile/email would work too.
             * @param {String} value New value of the property
             *
             */
            set: function(path, value) {
                if( path ) {
                    if( path.indexOf("/") != 0) {
                        path = "/" + path;
                    }

                    var storeName = path.split("/")[1];
                    var propertyName = path.substring(path.indexOf("/" + storeName) + storeName.length + 2, path.length);
                    var store = CQ_Analytics.CCM.getRegisteredStore(storeName);
                    if( store ) {
                        if( propertyName ) {
                            store.setProperty(propertyName,value);
                        }
                    }
                }
            },

            /**
             * Clears all the stores loaded in the ClientContext (removes properties and values)
             */
            clear: function() {
                var stores = CQ_Analytics.CCM.getStores();
                if( stores ) {
                    for(var s in stores) {
                        if( stores[s].clear ) {
                            stores[s].clear();
                        }
                    }
                }
            },

            /**
             * Resets all the stores loaded in the ClientContext (reset to initial values)
             */
            reset: function() {
                var stores = CQ_Analytics.CCM.getStores();
                if( stores ) {
                    for(var s in stores) {
                        if( stores[s].reset ) {
                            stores[s].reset();
                        }
                    }
                }
            },

            /**
             * Persists the full ClientContext content or the specified store.
             * @param {String} storeName Name of the store to persist.
             */
            persist: function(storeName) {
                CQ_Analytics.ClientContextMgr.ServerStorage.post(storeName, true);
            }
        }
    }();

    /**
     * Shortcut for the {@link CQ_Analytics.ClientContext}.
     * <br>
     * @static
     * @singleton
     * @class ClientContext
     * @since 5.5
     */
    window.ClientContext = CQ_Analytics.ClientContext;
    //just kept for compatibility with internal name during 5.5 dev
    window.ContextCloud = CQ_Analytics.ClientContext;
}
/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2012 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/
/**
 * The <code>CQ_Analytics.ViewedProducts</code> object is a store providing
 * most-recently-viewed product information.
 * @class CQ_Analytics.ViewedProducts
 * @singleton
 * @extends CQ_Analytics.PersistedSessionStore
 */
if (!CQ_Analytics.ViewedProducts) {
    CQ_Analytics.ViewedProducts = function() {
        this.data = null;
        this.MAX_COUNT = 20;
    };

    CQ_Analytics.ViewedProducts.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */
    CQ_Analytics.ViewedProducts.prototype.STOREKEY = "VIEWEDPRODUCTS";

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.ViewedProducts.prototype.STORENAME = "viewedproducts";

    /**
     * Pushes a product onto the most-recently-viewed stack.
     * @param {String} path Product path.
     */
    CQ_Analytics.ViewedProducts.prototype.record = function(path, title, image, price) {
        if (!this.data) {
            this.init();
        }

        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].path == path) {
                this.data.splice(i, 1);
                break;
            }
        }
        if (this.data.length == this.MAX_COUNT) {
            this.data.shift();
        }
        this.data.push({'path': path, 'title': title, 'image': image, 'price': price});
        this.persist();
        this.fireEvent("update");
    };

    /**
     * Returns the most recently pushed product (irrespective of whether or not it currently
     * appears in the shopping cart).
     * @return {Object} containing 'path', 'image', 'title' and 'price' fields
     */
    CQ_Analytics.ViewedProducts.prototype.mostRecent = function() {
        if (!this.data) {
            this.init();
        }

        if (this.data.length > 0) {
            return this.data[this.data.length-1];
        } else {
            return null;
        }
    };

    /**
     * Returns the most recently viewed product which is not in the shopping cart.
     * @return {Object} containing 'path', 'image', 'title' and 'price' fields
     */
    CQ_Analytics.ViewedProducts.prototype.mostRecentNotInCart = function() {
        if (!this.data) {
            this.init();
        }

        if (!CQ_Analytics.CartMgr) {
            return this.mostRecent();
        }
        for (var i = this.data.length-1; i >= 0; i--) {
            var candidate = this.data[i];
            if (!CQ_Analytics.CartHelper.containsProduct(CQ_Analytics.CartMgr.getData(), candidate.path, 1)) {
                return candidate;
            }
        }
        return null;
    };

    /**
     * Returns the n most-recently-viewed products.
     * @param count     the number of products to return
     * @param notInCart if true, only products not already in the shopping cart will be returned
     * @return {Array} of JSON objects, each containing 'path', 'image', 'title' and 'price' fields
     */
    CQ_Analytics.ViewedProducts.prototype.recent = function(count, notInCart) {
        var result = [];

        if (!this.data) {
            this.init();
        }
        if (!CQ_Analytics.CartMgr) {
            notInCart = false;
        }

        for (var i = this.data.length-1; i >= 0 && count > 0; i--) {
            var candidate = this.data[i];
            if (notInCart && CQ_Analytics.CartHelper.containsProduct(CQ_Analytics.CartMgr.getData(), candidate.path, 1)) {
                continue;
            }
            result.push(candidate);
            count--;
        }
        return result;
    };

    //inheritDoc
    CQ_Analytics.ViewedProducts.prototype.getData = function(excluded) {
        if (!this.data) {
            this.init();
        }

        return this.data;
    };

    //inheritDoc
    CQ_Analytics.ViewedProducts.prototype.init = function() {
        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = store.get(this.getStoreKey());

        // convert to real string in case it is a "magic" globalstorage object
        value = value === null ? "" : new String(value);

        var products = value.split(";");
        this.data = [];
        for (var i = 0; i < products.length; i++) {
            var fields = products[i].split(",");
            if (fields.length >= 4) {
                this.data.push({'path': fields[0], 'title': fields[1], 'image': fields[2], 'price': fields[3]});
            } else if (fields.length >= 3) {
                this.data.push({'path': fields[0], 'title': fields[1], 'image': fields[2], 'price': undefined});
            }
        }

        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.ViewedProducts.prototype.persist = function() {
        if (this.fireEvent("beforepersist") !== false) {
            var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});

            var products = [];
            for (var i = 0; i < this.data.length; i++) {
                var product = this.data[i];
                var record = product.path + "," + product.title + "," + product.image;
                if (product.price) {
                    record += "," + product.price;
                }
                products.push(record);
            }
            store.set(this.getStoreKey(), products.join(";"));

            this.fireEvent("persist");
        }
    };

    //inheritDoc
    CQ_Analytics.ViewedProducts.prototype.reset = function() {
        this.clear();
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.ViewedProducts.prototype.clear = function() {
        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        store.remove(this.getStoreKey());
        this.data = [];
    };

    CQ_Analytics.ViewedProducts = new CQ_Analytics.ViewedProducts();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        //registers ViewedProducts to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);
    }, CQ_Analytics.ViewedProducts);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.TagCloudMgr</code> object is a store providing tag cloud information.
 * @class CQ_Analytics.TagCloudMgr
 * @singleton
 * @extends CQ_Analytics.PersistedSessionStore
 */
if (!CQ_Analytics.TagCloudMgr) {
    CQ_Analytics.TagCloudMgr = function() {
        this.data = null;
        this.addedTags = {};
        this.frequencies = null;
        this.initialTags = null;
        this.initialAddedTags = {};

        this.copyObject = function(from) {
            var to = {};
            for(var p in from) {
                to[p] = from[p];
            }
            return to;
        };
    };

    CQ_Analytics.TagCloudMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.STOREKEY = "TAGCLOUD";

/**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.STORENAME = "tagcloud";

    /**
     * Parses the given tag list.
     * @param {String} taglist Tag list to parse.
     * @return {Object} Tags object.
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.parseTagList = function(taglist) {
        var tags = {};
        var tagArray = taglist.split(",");
        for (var t in tagArray) {
            if (tagArray.hasOwnProperty(t)) {
                var entry = tagArray[t].split("=");
                if (entry.length == 2) {
                    tags[entry[0]] = parseInt(entry[1]);
                }
            }
        }
        return tags;
    };

    /**
     * Parses a string in the form "foobar=2,bla=3", with entries
     * being <tagid>=<count>.
     * @param {String} taglist Tag list to parse.
     * @return {Object} Current object.
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.parseString = function(taglist) {
        this.data = this.parseTagList(taglist);
        return this;
    };

    /**
     * Adds a tag.
     * @param {String} tag Tag name.
     */
    CQ_Analytics.TagCloudMgr.prototype.add = function(tag) {
        this.addedTags[tag] = true;
        this.data[tag] = (this.data[tag] || 0) + 1;
    };

    /**
     * Iterates on the data and applies the function to each data.
     * @param {Function} func Function to apply.
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.each = function(func /*(tag, count)*/) {
        for (var t in this.data) {
            if (this.data.hasOwnProperty(t)) {
                func(t, this.data[t]);
            }
        }
    };

    /**
     * Calculates frequencies of each tags.
     * @return {Number[]} Tags frequencies.
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.calculateFrequencies = function() {
        var freqSet = {};
        var freqArray = [];

        this.each(function(tag, count) {
            if (!freqSet[count]) {
                freqArray.push(count);
            }
            freqSet[count] = true;
        });

        freqArray.sort(function compareNumbers(a, b) {
            if (a > b)
                return 1;
            if (a < b)
                return -1;
            return 0;
        });

        return freqArray;
    };

    /**
     *
     * @param frequency
     * @param n
     * @private
     */
    CQ_Analytics.TagCloudMgr.prototype.calculateNtile = function(frequency, n) {
        if (this.frequencies === null) {
            this.frequencies = this.calculateFrequencies();
        }
        var i = 0;
        while (true) {
            // if we reach the end of the array, return the maximum
            // otherwise if we found the frequency or a higher value in the array
            if ((i >= (this.frequencies.length - 1)) || (this.frequencies[i] >= frequency)) {
                return Math.ceil((i + 1) / this.frequencies.length * n);
            }
            i++;
        }
    };

    /**
     * Returns the tags.
     * @return {Object} Tags.
     */
    CQ_Analytics.TagCloudMgr.prototype.getTags = function() {
        return this.data;
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.getData = function(excluded) {
        return this.getTags();
    };

    /**
     * Returns the number of occurencies of a tag.
     * @param {String} tag Tag name.
     * @return {Number} Number of occurencies.
     */
    CQ_Analytics.TagCloudMgr.prototype.getTag = function(tag) {
        return this.data[tag] > 0 ? this.data[tag] : 0;
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.init = function(pageTags) {
        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = store.get(this.getStoreKey());

        // convert to real string in case it is a "magic" globalstorage object
        value = value === null ? "" : new String(value);
        this.data = this.parseTagList(value);

        if (pageTags) {
            // add current page tags to cloud
            for (var i in pageTags) {
                if (pageTags.hasOwnProperty(i)) {
                    this.add(pageTags[i]);
                }
            }
        }

        this.initialTags = this.copyObject(this.data);
        this.initialAddedTags = this.copyObject(this.addedTags);
        this.persist();
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.setProperty = function(tag, value) {
        if (this.data == null) {
            this.init();
        }
        if(value > 0) {
            this.addedTags[tag] = true;
            this.data[tag] = value > 0 ? value : 0;
        } else {
            delete this.addedTags[tag];
            delete this.data[tag];
        }
        this.persist();
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.reset = function() {
        this.clear();
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.getProperty = function(tag) {
        if (this.data == null) {
            this.init();
        }
        return this.data[tag] > 0 ? this.data[tag] : 0;
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.removeProperty = function(tag) {
        if (this.data == null) {
            this.init();
        }
        this.setProperty(tag, 0);
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.clear = function() {
        var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        store.remove(this.getStoreKey());
        this.addedTags = {};
        this.data = {};
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.getLink = function(name) {
        return "";
    };

    //inheritDoc
    CQ_Analytics.TagCloudMgr.prototype.getLabel = function(name) {
        if (name) {
            var namespaceSplit = name.split(":");
            var pathSplit = namespaceSplit[namespaceSplit.length - 1].split("/");
            name = pathSplit[pathSplit.length - 1];
        }
        return name;
    };

    CQ_Analytics.TagCloudMgr = new CQ_Analytics.TagCloudMgr();


    CQ_Analytics.CCM.addListener("configloaded",function() {
        //registers Profile Data to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);
    },CQ_Analytics.TagCloudMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.ProfileDataMgr</code> object is a store providing surfer information, like referral keywords,
 * mouse position and browser details.
 * @class CQ_Analytics.SurferInfoMgr
 * @singleton
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.SurferInfoMgr) {
    CQ_Analytics.SurferInfoMgr = function() {};

    CQ_Analytics.SurferInfoMgr.prototype = new CQ_Analytics.SessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */
    CQ_Analytics.SurferInfoMgr.prototype.STOREKEY = "SURFERINFO";

    /**
     * Store internal name
     * @private
     */
    CQ_Analytics.SurferInfoMgr.prototype.STORENAME = "surferinfo";

    //inheritDoc
    CQ_Analytics.SurferInfoMgr.prototype.init = function() {
        this.data = {};
        for (var p in this.initProperty) {
            this.data[p] = this.initProperty[p];
        }
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    //inheritDoc
    CQ_Analytics.SurferInfoMgr.prototype.clear = function() {
        this.data = null;
        this.initProperty = {};
    };

    //inheritDoc
    CQ_Analytics.SurferInfoMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.SurferInfoMgr.prototype.getLink = function(name) {
        return "";
    };

    CQ_Analytics.SurferInfoMgr = new CQ_Analytics.SurferInfoMgr();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        //add browser info to surfer info
        var bi = CQ_Analytics.BrowserInfoInstance;
        this.addInitProperty("browserFamily", bi.getBrowserFamily());
        this.addInitProperty("browserVersion", bi.getBrowserVersion());
        this.addInitProperty("browser", "${/surferinfo/browserFamily} ${/surferinfo/browserVersion}");
        this.addInitProperty("OS", bi.getOSName());

        this.addInitProperty("resolution", bi.getScreenResolution());
        this.addInitProperty("device", bi.getDeviceType());
        this.addInitProperty("isMobile", bi.isMobile());
        this.addInitProperty("userAgent", bi.getUserAgent());

        var today = new Date();
        this.addInitProperty("day", today.getDate());
        this.addInitProperty("month", today.getMonth() + 1);
        this.addInitProperty("year", today.getFullYear());
        this.addInitProperty("hours", today.getHours());
        this.addInitProperty("minutes", today.getMinutes());

        var image = "${/surferinfo/browserFamily}";
        if( bi.isMobile() ) {
            image = "${/surferinfo/device}";
        }
        this.addInitProperty("image", image);

        var thumbnail = CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/surferinfo/resources/${/surferinfo/image}.png");
        this.addInitProperty("thumbnail", thumbnail);

        if (CQ_Analytics.MousePositionMgr) {
            CQ_Analytics.MousePositionMgr.addListener("update", function() {
                this.setProperty("mouse X", CQ_Analytics.MousePositionMgr.getProperty("x"));
                this.setProperty("mouse Y", CQ_Analytics.MousePositionMgr.getProperty("y"));
            }, this);
        }

        this.addListener("update", function() {
            //magic to maintain image property with logic
            // if( deviceType != "desktop" ) image = device
            // else image = browser
            var deviceType = this.getProperty("device");
            var image = "${/surferinfo/browserFamily}";
            if( bi.isMobile(deviceType) ) {
                image = "${/surferinfo/device}";
            }
            var currentImage = this.getProperty("image");

            //do not set if is the current value to avoid infinite loop
            if( currentImage != image) {
                this.setProperty("image", image);
            }
        }, this);

        //registers Profile Data to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);


    }, CQ_Analytics.SurferInfoMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

if (!CQ_Analytics.SocialGraphMgr) {
    /**
     * Social graph JSONP store. Gets the social graph of the current loaded user and renders it.
     * @class CQ_Analytics.SocialGraphMgr
     * @singleton
     * @since 5.5
     */
    CQ_Analytics.SocialGraphMgr = CQ_Analytics.JSONPStore.registerNewInstance("socialgraph");

    CQ_Analytics.CCM.addListener("configloaded", function() {

        CQ_Analytics.CCM.register(this);

        CQ_Analytics.ProfileDataMgr.addListener("update", function() {
            var uid = CQ_Analytics.ProfileDataMgr.getProperty("authorizableId");
            if (uid != this.lastUid) {
                this.fireEvent("update");
            }
        }, CQ_Analytics.SocialGraphMgr);
    }, CQ_Analytics.SocialGraphMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
if( CQ_Analytics.SegmentMgr && !CQ_Analytics.SegmentMgr.isResolvedRegistered) {
    CQ_Analytics.SegmentMgr.isResolvedRegistered = true;

    CQ_Analytics.CCM.addListener("configloaded", function() {
        CQ_Analytics.StoreRegistry.register(CQ_Analytics.SegmentMgr);
        CQ_Analytics.CCM.fireEvent("storeregister", CQ_Analytics.SegmentMgr);

    }, CQ_Analytics.SegmentMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.ProfileDataMgr</code> object is a store providing user profile information.
 * @class CQ_Analytics.ProfileDataMgr
 * @singleton
 * @extends CQ_Analytics.PersistedSessionStore
 * @since 5.5
 */
if (!CQ_Analytics.ProfileDataMgr) {
    CQ_Analytics.ProfileDataMgr = function() {
        this.addListener("beforepersist", function() {
            this.checkAuthorizableId();
        }, this);
    };

    CQ_Analytics.ProfileDataMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */
    CQ_Analytics.ProfileDataMgr.prototype.STOREKEY = "PROFILEDATA";

    /**
     * @cfg {String} STORENAME
     * Store internal name
     * @final
     * @private
     */
    CQ_Analytics.ProfileDataMgr.prototype.STORENAME = "profile";

    /**
     * @deprecated
     * Use PROFILE_LOADER
     */
    CQ_Analytics.ProfileDataMgr.prototype.LOADER_PATH = CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/profileloader/content/load.js", true);

    /**
     * @deprecated
     * Use getLoaderURL method
     */
    CQ_Analytics.ProfileDataMgr.prototype.PROFILE_LOADER = CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/profileloader/content/load.json", true);

    //inheritDoc
    CQ_Analytics.ProfileDataMgr.prototype.init = function() {
        this.persistence = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});

        var value = this.persistence.get(this.getStoreKey());
        if (!value || value == "") {
            this.data = {};
            for (var p in this.initProperty) {
                this.data[p] = this.initProperty[p];
            }
        } else {
            this.data = this.parse(value);
        }
        this.persist();
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    /**
     * Checks if authorizableId property is defined in profile data and updates the ClickstreamcloudMgr in consequence.
     * See {@link CQ_Analytics.ClientContextMgr#setVisitorId}.
     */
    CQ_Analytics.ProfileDataMgr.prototype.checkAuthorizableId = function() {
        if (!this.data) {
            this.init();
        }
        if (this.data["authorizableId"]) {
            CQ_Analytics.CCM.setVisitorId(this.data["authorizableId"]);
        } else {
            CQ_Analytics.CCM.setVisitorId("");
        }
    };

    //inheritDoc
    CQ_Analytics.ProfileDataMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.ProfileDataMgr.prototype.getLink = function(name) {
        return "";
    };

    //inheritDoc
    CQ_Analytics.ProfileDataMgr.prototype.clear = function() {
        if (this.persistence) {
            this.persistence.remove(this.getStoreKey());
        }

        this.data = null;
        this.initProperty = {};
    };

    /**
     * Return the profile loader URL.
     * @return {String} The URL
     * @since 5.5
     */
    CQ_Analytics.ProfileDataMgr.prototype.getLoaderURL = function() {
        return CQ_Analytics.ClientContextMgr.getClientContextURL("resources/loader.json");
    };

    /**
     * Loads a profile based on the authoriable id of the user.
     * @param {String} authorizableId The user id
     */
    CQ_Analytics.ProfileDataMgr.prototype.loadProfile = function(authorizableId) {
        var url = this.getLoaderURL();
        url = CQ_Analytics.Utils.addParameter(url, "authorizableId", authorizableId);

        try {
            // the response body will be empty if the authorizableId doesn't resolve to a profile
            var object = CQ.shared.HTTP.eval(url);
            if (object) {
                this.data = {};
                for (var p in object) {
                    this.data[p] = object[p];
                }

                this.persist();
                this.fireEvent("initialize",this);
                this.fireEvent("update");

                if (CQ_Analytics.ClickstreamcloudEditor) {
                    CQ_Analytics.ClickstreamcloudEditor.reload();
                }
                return true;
            }
        } catch(error) {
            if (console && console.log) console.log("Error during profile loading", error);
        }

        return false;
    };

    CQ_Analytics.ProfileDataMgr = new CQ_Analytics.ProfileDataMgr();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        this.checkAuthorizableId();

        //creates link between birthday and age
        this.addListener("update", function(event, property) {
            if (property == "birthday" || !property) {
                var birthday = this.getProperty("birthday");
                var age = this.getProperty("age");
                var newAge = "";
                if (birthday) {
                    try {
                        var getDaysBetween = function(d1, d2) {
                            var tmp = new Date(d2.getTime());
                            tmp.setUTCHours(d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds(), d1.getUTCMilliseconds());
                            var time = tmp.getTime() - d1.getTime();
                            return time / (1000 * 60 * 60 * 24);
                        };
                        var getDayOfYear = function(dob) {
                            var start = new Date(dob.getFullYear(), 0, 0);
                            return getDaysBetween(dob, start) * -1;
                        };
                        var dob = new Date(Date.parse(birthday));
                        if (!isNaN(dob.getTime())) {
                            var today = new Date();
                            //display birthday cake if birthday is today
                            if (getDayOfYear(dob) == getDayOfYear(today) &&
                                dob.getMonth() == today.getMonth()) {
                                newAge = CQ.shared.HTTP.externalize(
                                    CQ_Analytics.ClientContextMgr.getClientContextURL(
                                        "/contextstores/profiledata/resources/birthday_cake.png"));
                            } else {
                                var yearDiff = today.getFullYear() - dob.getFullYear();
                                if (getDayOfYear(dob) > getDayOfYear(today)) {
                                    newAge = yearDiff;
                                } else {
                                    newAge = Math.max(0, yearDiff - 1);
                                }
                            }
                        } else {
                            newAge = "";
                        }
                    } catch(error) {
                        newAge = "";
                    }
                }
                if (age != newAge) {
                    this.setProperty("age", newAge);
                }
            }
        });

        //registers Profile Data to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);
    }, CQ_Analytics.ProfileDataMgr);
}
/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2011 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/
//AdobePatentID="2441US01"
if (!CQ_Analytics.GeolocationUtils) {
    /**
     * A helper class providing a set of utility methods to manage a geolocation store.
     * <br>
     * @static
     * @singleton
     * @class CQ_Analytics.GeolocationUtils
     */
    CQ_Analytics.GeolocationUtils = new function() {
        return {
            /**
             * Initializes a persisted json store that contains the geolocation.
             * @param {String} storeName Name of the store
             */
            init: function(storeName) {
                var geoloc;
                try {
                    if (typeof navigator.geolocation === 'undefined') {
                        geoloc = google.gears.factory.create('beta.geolocation');
                    } else {
                        geoloc = navigator.geolocation;
                    }
                } catch(e) {
                }

                var createStore = function(defaultData) {
                    var store = CQ_Analytics.PersistedJSONStore.registerNewInstance(storeName, defaultData);
                    store.addListener("update", function(event, property) {
                        var latitude = CQ_Analytics.ClientContext.get(storeName + "/latitude");
                        var longitude = CQ_Analytics.ClientContext.get(storeName + "/longitude");

                        if (!latitude || !longitude) {
                            if (property != "generatedThumbnail") {
                                store.setProperty("generatedThumbnail", CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback);
                            } else {
                                //if not lat or lng, display the fallback thumbnail
                                if (store.getProperty(property, true) != CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback) {
                                    store.setProperty(property, CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback);
                                }
                            }
                        } else {
                            //if lat or lng, restore initial thumbnail if was set to the fallback
                            if (store.getProperty("generatedThumbnail", true) == CQ_Analytics.GeolocationUtils.THUMBNAILS.fallback) {
                                store.setProperty("generatedThumbnail", store.getInitProperty("generatedThumbnail"));
                            }
                            if (property == "latitude" || property == "longitude" || !property) {
                                CQ_Analytics.GeolocationUtils.computeAddress(latitude, longitude, storeName);
                            }
                        }
                    });
                };

                var initGeolocationStore = function(data, skipValues) {
                    var store = CQ_Analytics.StoreRegistry.getStore(storeName);
                    if (store) {
                        data = data || CQ_Analytics.GeolocationUtils.DEFAULTS;

                        //backup thumbnail
                        var gt = data["generatedThumbnail"] = store.getInitProperty("generatedThumbnail");
                        store.initJSON(data);

                        if (!skipValues) {
                            store.init();
                            //re set because it gets lost during init
                            store.setProperty("generatedThumbnail", gt);
                        }
                    } else {
                        createStore(data);
                    }
                };

                createStore();
                if (geoloc) {
                    geoloc.getCurrentPosition(
                        function(data) {
                            var d = {
                                "longitude": data.coords.longitude,
                                "latitude": data.coords.latitude
                            };

                            if (data.address) {
                                d["address"] = data.address
                            }

                            initGeolocationStore(d, CQ_Analytics.CCM.areStoresInitialized);
                        }, function(error) {
                            if (!CQ_Analytics.CCM.areStoresInitialized) {
                                var msg = "Error";
                                if( CQ_Analytics.isUIAvailable ) {
                                    //code = 3 default is timeout
                                    msg = CQ.I18n.getMessage("Connection timeout", null, "timeout while connecting geolocation service");
                                    if (error.code == 1) {
                                        msg = CQ.I18n.getMessage("Permission denied", null, "permission denied message from goelocation service");
                                    } else {
                                        if (error.code == 2) {
                                            msg = CQ.I18n.getMessage("Position unavailable", null, "geolocation service couldn't find location");
                                        }
                                    }
                                }

                                var d = {
                                    "address": {
                                        "country": msg
                                    }
                                };

                                initGeolocationStore(d, CQ_Analytics.CCM.areStoresInitialized);
                            }
                        }
                    );
                } else {
                    initGeolocationStore();
                }
            },

            /**
             * Computes the address based on latitude and longitude and sets it in the according store.
             * @param {Number} lat The latitude
             * @param {Number} lng The longitude
             * @param {String} storeName The name of the store
             */
            computeAddress: function(lat, lng, storeName) {
                CQ_Analytics.ClientContext.set(storeName + "/address/region");
                CQ_Analytics.ClientContext.set(storeName + "/address/countryCode");
                CQ_Analytics.ClientContext.set(storeName + "/address/country");
                var geocode_callback = function() {
                    var point = new google.maps.LatLng(lat, lng);
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({location: point},
                        function(result, status) {
                            if (status === "OK" && result[0] && result[0].address_components) {
                                for (var i = 0; i < result[0].address_components.length; i++) {
                                    var a = result[0].address_components[i];
                                    if (a.types && a.types.length) {
                                        if (a.types[0] == "administrative_area_level_1") {
                                            CQ_Analytics.ClientContext.set(storeName + "/address/region", a["short_name"]);
                                        } else {
                                            if (a.types[0] == "country") {
                                                CQ_Analytics.ClientContext.set(storeName + "/address/countryCode", a["short_name"]);
                                                CQ_Analytics.ClientContext.set(storeName + "/address/country", a["long_name"]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    );
                };

                if (!window.google) {
                    window.geocode_callback = geocode_callback;
                    $CQ.getScript(document.location.protocol + "//maps.google.com/maps/api/js?sensor=false&callback=geocode_callback");
                } else {
                    geocode_callback.call();
                }
            }
        }
    }();

    //defines the default location if current one could not be resolved (defaults to Adobe HQ)
    CQ_Analytics.GeolocationUtils.DEFAULTS = {
        "latitude": 37.331375,//= Adobe HQ // 47.554995, = basel
        "longitude": -121.893992//= Adobe HQ // 7.589998 = basel
    };

    //fallback thumbnail on California max zoom
    CQ_Analytics.GeolocationUtils.THUMBNAILS = {
        "fallback": document.location.protocol + "//maps.googleapis.com/maps/api/staticmap?center=37,-121&zoom=0&size=80x80&sensor=false"
    }
}


/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 * AdobePatentID="2884US01"
 */

if (!CQ_Analytics.CartMgr) {
    CQ_Analytics.CartMgr = new CQ_Analytics.SessionStore();
    CQ_Analytics.CartMgr.STOREKEY = "CART";
    CQ_Analytics.CartMgr.STORENAME = "cart";

    CQ_Analytics.CartMgr.init = function() {
        if (!this.data) {
            this.data = {};
        } else {
            var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
            var simulationString = store.get(this.STOREKEY);
            if (simulationString) {
                var referenceAndTotal = simulationString.split("=");
                if (referenceAndTotal.length >= 2) {
                    this.referenceTotalPrice = referenceAndTotal[0];
                    this.simulatedTotalPrice = referenceAndTotal[1];
                    this.updateSimulatedPrice();
                }
            }

            this.initialized = true;
            this.fireEvent("initialize", this);
            this.fireEvent("update");
        }
    };

    //
    // A simulated total is the one thing we persist
    //
    CQ_Analytics.CartMgr.persist = function() {
        if (this.fireEvent("beforepersist") !== false) {
            var store = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
            var simulationString = null;
            if (this.referenceTotalPrice && this.simulatedTotalPrice) {
                simulationString = this.referenceTotalPrice + "=" + this.simulatedTotalPrice;
            }
            store.set(this.STOREKEY, simulationString);
            this.fireEvent("persist");
        }
    };

    //
    // Check to see if a simulation is still valid (ie: the reference value underneath it
    // hasn't changed), and if so, apply it to the store.
    //
    CQ_Analytics.CartMgr.updateSimulatedPrice = function() {
        if (this.simulatedTotalPrice && this.referenceTotalPrice == this.data["totalPriceFloat"]) {
            this.data["totalPrice"] = this.simulatedTotalPrice + "";
            this.data["totalPriceFloat"] = this.simulatedTotalPrice;
        } else {
            this.simulatedTotalPrice = null;
            this.persist();
        }
    };

    //
    // Register that the user has simulated a total price.
    //
    CQ_Analytics.CartMgr.registerSimulatedPrice = function(value) {
        if (this.simulatedTotalPrice) {
            // already in a simulation; just update the value
            this.simulatedTotalPrice = value;
            this.data["totalPrice"] = value + "";
        } else {
            // new simulation; store the reference price and simulated value
            this.referenceTotalPrice = this.data["totalPriceFloat"];
            this.simulatedTotalPrice = value;
        }
        this.persist();
    };

    //
    // Override getProperty/setProperty to handle JSON data.
    //
    CQ_Analytics.CartMgr.getProperty = function(name, raw) {
        if (!this.data) {
            this.init();
        }

        var obj = this.data;
        try {
            var parts = name.split(".");
            for (var i = 0; i < parts.length-1; i++) {
                var part = parts[i];
                var indexPos = part.indexOf("[");
                var index = -1;
                if (indexPos > 0) {
                    index = parseInt(part.substring(indexPos+1, part.length-1));
                    part = part.substring(0, indexPos);
                }
                obj = obj[part];

                if (index >= 0) {
                    obj = obj[index];
                }
            }

            var finalPart = parts[parts.length-1];
            if (!raw) {
                var xssName = CQ.shared.XSS.getXSSPropertyName(finalPart);
                if (obj[xssName]) {
                    return obj[xssName];
                }
            }
            return obj[finalPart];
        } catch(e) {
            return undefined;
        }
    };

    CQ_Analytics.CartMgr.validate = function(name, value) {
        if (name == "totalPriceFloat") {
            var price = parseFloat(value);
            return price >= 0;                  // will return false for NaN
        } else if (name.indexOf(".quantity") > 0) {
            var quantity = parseInt(value);
            return quantity >= 0;               // will return false for NaN
        }
        return true;
    }

    CQ_Analytics.CartMgr.setProperty = function(name, value) {
        if (!this.data) {
            this.init();
        }

        if (!this.validate(name, value)) {
            this.fireEvent("update", name);     // reset UI to current value
            return;
        }

        if (name == "totalPriceFloat") {
            this.registerSimulatedPrice(value);
        }

        var obj = this.data;

        var parts = name.split(".");
        for (var i = 0; i < parts.length-1; i++) {
            var part = parts[i];
            var indexPos = part.indexOf("[");
            var index = -1;
            if (indexPos > 0) {
                index = parseInt(part.substring(indexPos+1, part.length-1));
                part = part.substring(0, indexPos);
            }

            if (!obj[part]) {
                obj[part] = {};
            }
            obj = obj[part];

            if (index >= 0) {
                if (!obj[index]) {
                    obj[index] = {};
                }
                obj = obj[index];
            }
        }

        var finalPart = parts[parts.length-1];
        obj[finalPart] = value;
        var xssName = CQ.shared.XSS.getXSSPropertyName(finalPart);
        this.data[xssName] = CQ.shared.XSS.getXSSValue(value);
        this.fireEvent("update", name);
    };

    //
    // Round-trip store to the server for recalculation and persistence
    //
    CQ_Analytics.CartMgr.update = function() {
        var store = this;

        if (this.updateUrl) {
            $CQ.ajax({
                url: this.updateUrl,
                type: "POST",
                data: {
                    "cart": JSON.stringify(store.data)
                },
                externalize: false,
                encodePath: false,
                hook: true,
                success: function(jsonData) {
                    store.data = jsonData;
                    store.updateSimulatedPrice();
                    CQ_Analytics.ClientContextUtils.renderStore(CQ_Analytics.CartMgr.divId, CQ_Analytics.CartMgr.STORENAME);
                    store.fireEvent("updatecomplete");
                    store.fireEvent("update");
                }
            });

        }
    };

    CQ_Analytics.CartMgr.clear = function() {
        if (this.data["entries"]) {
            this.data["entries"] = [];
        }
        if (this.data["vouchers"]) {
            this.data["vouchers"] = [];
        }
        this.data["totalPrice"] = "0";

        this.referenceTotalPrice = null;
        this.simulatedTotalPrice = null;
    };

    CQ_Analytics.CartMgr.reset = function() {
        this.clear();
        this.fireEvent("update");

        // persist changes locally
        this.persist();

        // and push them up to server
        this.update();
    }

    CQ_Analytics.CCM.addListener("configloaded", function() {

        CQ_Analytics.CCM.register(this);

        CQ_Analytics.SegmentMgr.addListener("update", function() {
            if (!this.promotionsMap) {
                return;
            }
            if (!this.data.promotions) {
                this.data.promotions = [];
            }

            var resolvedSegments = CQ_Analytics.SegmentMgr.getResolved();
            var resolvedPromoPaths = [];
            for (var i = 0; i < this.promotionsMap.length; i++) {
                var testPromotionMap = this.promotionsMap[i];
                var resolved = false;
                var testSegments = testPromotionMap.segments.split(",");
                for (var j = 0; j < testSegments.length; j++) {
                    if ($CQ.inArray(testSegments[j], resolvedSegments) >= 0) {
                        resolved = true;
                        break;
                    }
                }
                if (resolved) {
                    resolvedPromoPaths.push(testPromotionMap.path);
                }
            }

            var changed = false;
            for (var i = 0; i < this.data.promotions.length; i++) {
                var promo = this.data.promotions[i];
                var j = $CQ.inArray(promo["path"], resolvedPromoPaths);
                if (j >= 0) {
                    resolvedPromoPaths.splice(j, 1);   // remove
                } else {
                    this.data.promotions.splice(i--, 1);  // remove
                    changed = true;
                }
            }
            for (var i = 0; i < resolvedPromoPaths.length; i++) {
                var promo = { "path": resolvedPromoPaths[i] };
                this.data.promotions.push(promo);
                changed = true;
            }
            if (changed) {
                this.update();
            }
        }, CQ_Analytics.CartMgr);

    }, CQ_Analytics.CartMgr);
}


/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

if(!CQ_Analytics.CartHelper) {
    CQ_Analytics.CartHelper = (function() {
        return {
        
            containsProduct: function(data, product, quantity) {
                var productPagePath = product ? product.substring(0, product.lastIndexOf("#")) : null;
                for (var i = 0; data.entries && i < data.entries.length; i++) {
                    var entry = data.entries[i];
                    var entryPagePath = entry.page.substring(0, entry.page.lastIndexOf("#"));
                    if ((!product || entryPagePath == productPagePath) && (!quantity || entry.quantity >= quantity)) {
                        return true;
                    }
                }
                return false;
            }
        };
    })();
}

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * The <code>CQ_Analytics.CampaignMgr</code> object is a store providing campaign information
 * 
 * This store exposes the following properties:
 * 
 * <ol>
 *  <li>name: the name of the campaign</li>
 *  <li>path: the path of the campaign page in the CQ repository</li>
 *  <li>id: the id the campaign page in Test&amp;Target</li>
 *  <li>recipe/name</li>
 *  <li>recipe/path</li>
 *  <li>recipe/id</li>
 * </ol>
 * 
 * @class CQ_Analytics.CampaignMgr
 * @singleton
 * @extends CQ_Analytics.SessionStore
 */
if (!CQ_Analytics.CampaignMgr) {
    CQ_Analytics.CampaignMgr = function() {};

    CQ_Analytics.CampaignMgr.prototype = new CQ_Analytics.PersistedSessionStore();

    /**
     * @cfg {String} STOREKEY
     * Store internal key
     * @final
     * @private
     */
    CQ_Analytics.CampaignMgr.prototype.STOREKEY = "CAMPAIGN";

    /**
     * Store internal name
     * @private
     */
    CQ_Analytics.CampaignMgr.prototype.STORENAME = "campaign";

    /**
     * String identifying the default experience (only used for editing).
     * All experience paths start with a slash, so there can be no collision.
     * @final
     * @private
     */
    CQ_Analytics.CampaignMgr.prototype.DEFAULT_EXPERIENCE = "DEFAULT";

    //inheritDoc
    CQ_Analytics.CampaignMgr.prototype.init = function() {
        var p;

        this.persistence = new CQ_Analytics.SessionPersistence({'container': 'ClientContext'});
        var value = this.persistence.get(this.getStoreKey());
        if (!this.data) {
            this.data = {};
        }

        if (!value || value === "") {
            for (p in this.initProperty) {
                if (this.initProperty.hasOwnProperty(p)) {
                    this.data[p] = this.initProperty[p];
                }
            }
        } else {
            this.data = this.parse(value);
            // campaigns are not persisted
            var campaigns = this.getInitProperty('campaigns');
            if ( campaigns ) {
                this.data.campaigns = campaigns;
            }
        }
        this.validate();

        this.persist();
        this.initialized = true;
        this.fireEvent("initialize",this);
        this.fireEvent("update");
    };

    CQ_Analytics.CampaignMgr.prototype.validate = function() {
        // only check if we have the list of all campaigns
        if (this.data.campaigns) {
            if (!this.getCampaignBy("path", this.data.path) && !this.getCampaignBy("id", this.data.id)) {
                // campaign not found
                this.setCampaign(null);
            }
            if (this.data["recipe/path"] !== CQ_Analytics.CampaignMgr.DEFAULT_EXPERIENCE) {
                if (!this.getExperienceBy("path", this.data["recipe/path"]) && !this.getExperienceBy("id", this.data["recipe/id"])) {
                    // experience not found
                    this.setExperience(null);
                }
            }
        }
    };

    CQ_Analytics.CampaignMgr.prototype.getCampaignBy = function(prop, value) {
        if (!this.data || !this.data.campaigns) {
            return null;
        }
        var i, campaigns = this.data.campaigns;
        for ( i = 0 ; i < campaigns.length; i++ ) {
            var campaign = campaigns[i];
            if ( campaign[prop] === value ) {
                return campaign;
            }
        }
        return null;
    };

    CQ_Analytics.CampaignMgr.prototype.getExperienceBy = function(prop, value) {
        if (!this.data || !this.data.campaigns) {
            return null;
        }
        var i, campaigns = this.data.campaigns;
        for ( i = 0 ; i < campaigns.length; i++ ) {
            var campaign = campaigns[i];
            for ( var j = 0 ; j < campaign.experiences.length ; j++ ) {
                var experience = campaign.experiences[j];
                if ( experience[prop] === value ) {
                    return experience;
                }
            }
        }
        return null;
    };

    CQ_Analytics.CampaignMgr.prototype.setCampaign = function(campaign) {
        // update all the campaign properties
        this.setProperties({
            'name': campaign ? campaign.title : "",
            'path': campaign ? campaign.path  : "",
            'id'  : campaign ? campaign.id    : "",

            'recipe/name' :  campaign ? CQ.I18n.getMessage("(default)") : "",
            'recipe/path' :  campaign ? this.DEFAULT_EXPERIENCE : "",
            'recipe/id'   :  campaign ? this.DEFAULT_EXPERIENCE : ""
        });
    };

    CQ_Analytics.CampaignMgr.prototype.setExperience = function(experience) {
        this.setProperties({
            'recipe/name' :  experience ? experience.title : "",
            'recipe/path' :  experience ? experience.path : "",
            'recipe/id'   :  experience ? experience.id : ""
        });
    };

    CQ_Analytics.CampaignMgr.prototype.setProperty = function(name, value) {
        // certain properties must update co-properties as well
        if (name === "id" || name === "path") {
            // campaigns: path and id are unique
            this.setCampaign(this.getCampaignBy(name, value));
            return;

        } else if (name === "recipe/id" || name === "recipe/path") {
            if (value !== CQ_Analytics.CampaignMgr.DEFAULT_EXPERIENCE) {
                // experiences: path and id are unique
                this.setExperience(this.getExperienceBy(name.substring("recipe/".length), value));
                return;
            }
        }

        // otherwise update individually
        CQ_Analytics.PersistedSessionStore.prototype.setProperty.call(this, name, value);
    };
    
    CQ_Analytics.CampaignMgr.prototype.isCampaignSelected = function() {
        
        return this.getProperty("path") !== '';
    };

    //inheritDoc
    CQ_Analytics.CampaignMgr.prototype.clear = function() {
        this.data = null;
        this.initProperty = {};
    };

    //inheritDoc
    CQ_Analytics.CampaignMgr.prototype.getLabel = function(name) {
        return name;
    };

    //inheritDoc
    CQ_Analytics.CampaignMgr.prototype.getLink = function(name) {
        return "";
    };

    CQ_Analytics.CampaignMgr = new CQ_Analytics.CampaignMgr();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        CQ_Analytics.CCM.register(this);
    }, CQ_Analytics.CampaignMgr);
}
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
if (!CQ_Analytics.ActivityStreamMgr) {
    /**
     * Activity stream JSON store. Receives and renders the activities of the currently loaded user.
     * @class CQ_Analytics.ActivityStreamMgr
     * @extends CQ_Analytics.JSONStore
     * @singleton
     * @since 5.5
     */
    CQ_Analytics.ActivityStreamMgr = CQ_Analytics.JSONStore.registerNewInstance("activitystream", {});

    /**
     * Loads and renders the activities.
     * @param {String} profilePath Path to user profile
     * @param {String} divId Id of the div to render to
     * @static
     * @private
     * @method internalRenderer
     * @member CQ_Analytics.ActivityStreamMgr
     */
    CQ_Analytics.ActivityStreamMgr.internalRenderer = function(profilePath, divId) {
        // Sample url:
        // /home/users/a/aparker@geometrixx.info/profile.form.html/etc/clientcontext/default/contextstores/activitystream.html?limit=3
        var url = profilePath + ".form.html";
        url += CQ_Analytics.ClientContextMgr.getClientContextURL("/contextstores/activitystream.html");
        url += "?limit=3";

        CQ.shared.HTTP.get(url, function(options, success, response) {
            $CQ("#" + divId).children().remove();
            if (success) {
                $CQ("#" + divId).append(response.body);
            }
        });
    };

    /**
     * Registers the <code>activityStore</code> store to profile update and delegates to
     * {@link #internalRenderer} for rendering.
     * @param {String} activityStore The activity store to render
     * @param {String} divId Id of the div to render to
     * @static
     * @method renderer
     * @member CQ_Analytics.ActivityStreamMgr
     */
    CQ_Analytics.ActivityStreamMgr.renderer = function(activityStore, divId) {
        if (!activityStore.isReady) {
            activityStore.isReady = true;

            CQ_Analytics.ClientContextUtils.onStoreRegistered("profile", function(profileStore) {
                profileStore.addListener("update", function(event, path) {
                    var profilePath = this.getProperty("path");
                    if (profilePath != CQ_Analytics.ActivityStreamMgr.currentProfilePath) {
                        CQ_Analytics.ActivityStreamMgr.currentProfilePath = profilePath;
                        CQ_Analytics.ActivityStreamMgr.internalRenderer(profilePath, divId);
                    }
                }, profileStore);

                var profilePath = profileStore.getProperty("path");
                CQ_Analytics.ActivityStreamMgr.currentProfilePath = profilePath;
                CQ_Analytics.ActivityStreamMgr.internalRenderer(profilePath, divId);
            });

        }
        return "";
    }
}
/*
 * This implementation adds error handling which is missing from the standard jQuery $.ajax methods.
 * Its required since the user adds the Audience Manager Partner ID which forms part of the Demdex URL.
 * Taken from the GitHub Repo at 3bb3da3d064ec0efe4cafad3fa36db68f6155e9e
 * 
 * jQuery JSONP Core Plugin 2.4.0 (2012-08-21)
 *
 * https://github.com/jaubourg/jquery-jsonp
 *
 * Copyright (c) 2012 Julian Aubourg
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
( function( $ ) {

    // ###################### UTILITIES ##

    // Noop
    function noop() {
    }

    // Generic callback
    function genericCallback( data ) {
        lastValue = [ data ];
    }

    // Call if defined
    function callIfDefined( method , object , parameters ) {
        return method && method.apply( object.context || object , parameters );
    }

    // Give joining character given url
    function qMarkOrAmp( url ) {
        return /\?/ .test( url ) ? "&" : "?";
    }

    var // String constants (for better minification)
        STR_ASYNC = "async",
        STR_CHARSET = "charset",
        STR_EMPTY = "",
        STR_ERROR = "error",
        STR_INSERT_BEFORE = "insertBefore",
        STR_JQUERY_JSONP = "_jqjsp",
        STR_ON = "on",
        STR_ON_CLICK = STR_ON + "click",
        STR_ON_ERROR = STR_ON + STR_ERROR,
        STR_ON_LOAD = STR_ON + "load",
        STR_ON_READY_STATE_CHANGE = STR_ON + "readystatechange",
        STR_READY_STATE = "readyState",
        STR_REMOVE_CHILD = "removeChild",
        STR_SCRIPT_TAG = "<script>",
        STR_SUCCESS = "success",
        STR_TIMEOUT = "timeout",

        // Window
        win = window,
        // Deferred
        Deferred = $.Deferred,
        // Head element
        head = $( "head" )[ 0 ] || document.documentElement,
        // Page cache
        pageCache = {},
        // Counter
        count = 0,
        // Last returned value
        lastValue,

        // ###################### DEFAULT OPTIONS ##
        xOptionsDefaults = {
            //beforeSend: undefined,
            //cache: false,
            callback: STR_JQUERY_JSONP,
            //callbackParameter: undefined,
            //charset: undefined,
            //complete: undefined,
            //context: undefined,
            //data: "",
            //dataFilter: undefined,
            //error: undefined,
            //pageCache: false,
            //success: undefined,
            //timeout: 0,
            //traditional: false,
            url: location.href
        },

        // opera demands sniffing :/
        opera = win.opera,

        // IE < 10
        oldIE = !!$( "<div>" ).html( "<!--[if IE]><i><![endif]-->" ).find("i").length;

    // ###################### MAIN FUNCTION ##
    function jsonp( xOptions ) {

        // Build data with default
        xOptions = $.extend( {} , xOptionsDefaults , xOptions );

        // References to xOptions members (for better minification)
        var successCallback = xOptions.success,
            errorCallback = xOptions.error,
            completeCallback = xOptions.complete,
            dataFilter = xOptions.dataFilter,
            callbackParameter = xOptions.callbackParameter,
            successCallbackName = xOptions.callback,
            cacheFlag = xOptions.cache,
            pageCacheFlag = xOptions.pageCache,
            charset = xOptions.charset,
            url = xOptions.url,
            data = xOptions.data,
            timeout = xOptions.timeout,
            pageCached,

            // Abort/done flag
            done = 0,

            // Life-cycle functions
            cleanUp = noop,

            // Support vars
            supportOnload,
            supportOnreadystatechange,

            // Request execution vars
            firstChild,
            script,
            scriptAfter,
            timeoutTimer;

        // If we have Deferreds:
        // - substitute callbacks
        // - promote xOptions to a promise
        Deferred && Deferred(function( defer ) {
            defer.done( successCallback ).fail( errorCallback );
            successCallback = defer.resolve;
            errorCallback = defer.reject;
        }).promise( xOptions );

        // Create the abort method
        xOptions.abort = function() {
            !( done++ ) && cleanUp();
        };

        // Call beforeSend if provided (early abort if false returned)
        if ( callIfDefined( xOptions.beforeSend , xOptions , [ xOptions ] ) === !1 || done ) {
            return xOptions;
        }

        // Control entries
        url = url || STR_EMPTY;
        data = data ? ( (typeof data) == "string" ? data : $.param( data , xOptions.traditional ) ) : STR_EMPTY;

        // Build final url
        url += data ? ( qMarkOrAmp( url ) + data ) : STR_EMPTY;

        // Add callback parameter if provided as option
        callbackParameter && ( url += qMarkOrAmp( url ) + encodeURIComponent( callbackParameter ) + "=?" );

        // Add anticache parameter if needed
        !cacheFlag && !pageCacheFlag && ( url += qMarkOrAmp( url ) + "_" + ( new Date() ).getTime() + "=" );

        // Replace last ? by callback parameter
        url = url.replace( /=\?(&|$)/ , "=" + successCallbackName + "$1" );

        // Success notifier
        function notifySuccess( json ) {

            if ( !( done++ ) ) {

                cleanUp();
                // Pagecache if needed
                pageCacheFlag && ( pageCache [ url ] = { s: [ json ] } );
                // Apply the data filter if provided
                dataFilter && ( json = dataFilter.apply( xOptions , [ json ] ) );
                // Call success then complete
                callIfDefined( successCallback , xOptions , [ json , STR_SUCCESS, xOptions ] );
                callIfDefined( completeCallback , xOptions , [ xOptions , STR_SUCCESS ] );

            }
        }

        // Error notifier
        function notifyError( type ) {

            if ( !( done++ ) ) {

                // Clean up
                cleanUp();
                // If pure error (not timeout), cache if needed
                pageCacheFlag && type != STR_TIMEOUT && ( pageCache[ url ] = type );
                // Call error then complete
                callIfDefined( errorCallback , xOptions , [ xOptions , type ] );
                callIfDefined( completeCallback , xOptions , [ xOptions , type ] );

            }
        }

        // Check page cache
        if ( pageCacheFlag && ( pageCached = pageCache[ url ] ) ) {

            pageCached.s ? notifySuccess( pageCached.s[ 0 ] ) : notifyError( pageCached );

        } else {

            // Install the generic callback
            // (BEWARE: global namespace pollution ahoy)
            win[ successCallbackName ] = genericCallback;

            // Create the script tag
            script = $( STR_SCRIPT_TAG )[ 0 ];
            script.id = STR_JQUERY_JSONP + count++;

            // Set charset if provided
            if ( charset ) {
                script[ STR_CHARSET ] = charset;
            }

            opera && opera.version() < 11.60 ?
                // onerror is not supported: do not set as async and assume in-order execution.
                // Add a trailing script to emulate the event
                ( ( scriptAfter = $( STR_SCRIPT_TAG )[ 0 ] ).text = "document.getElementById('" + script.id + "')." + STR_ON_ERROR + "()" )
            :
                // onerror is supported: set the script as async to avoid requests blocking each others
                ( script[ STR_ASYNC ] = STR_ASYNC )

            ;

            // Internet Explorer: event/htmlFor trick
            if ( oldIE ) {
                script.htmlFor = script.id;
                script.event = STR_ON_CLICK;
            }

            // Attached event handlers
            script[ STR_ON_LOAD ] = script[ STR_ON_ERROR ] = script[ STR_ON_READY_STATE_CHANGE ] = function ( result ) {

                // Test readyState if it exists
                if ( !script[ STR_READY_STATE ] || !/i/.test( script[ STR_READY_STATE ] ) ) {

                    try {

                        script[ STR_ON_CLICK ] && script[ STR_ON_CLICK ]();

                    } catch( _ ) {}

                    result = lastValue;
                    lastValue = 0;
                    result ? notifySuccess( result[ 0 ] ) : notifyError( STR_ERROR );

                }
            };

            // Set source
            script.src = url;

            // Re-declare cleanUp function
            cleanUp = function( i ) {
                timeoutTimer && clearTimeout( timeoutTimer );
                script[ STR_ON_READY_STATE_CHANGE ] = script[ STR_ON_LOAD ] = script[ STR_ON_ERROR ] = null;
                head[ STR_REMOVE_CHILD ]( script );
                scriptAfter && head[ STR_REMOVE_CHILD ]( scriptAfter );
            };

            // Append main script
            head[ STR_INSERT_BEFORE ]( script , ( firstChild = head.firstChild ) );

            // Append trailing script if needed
            scriptAfter && head[ STR_INSERT_BEFORE ]( scriptAfter , firstChild );

            // If a timeout is needed, install it
            timeoutTimer = timeout > 0 && setTimeout( function() {
                notifyError( STR_TIMEOUT );
            } , timeout );

        }

        return xOptions;
    }

    // ###################### SETUP FUNCTION ##
    jsonp.setup = function( xOptions ) {
        $.extend( xOptionsDefaults , xOptions );
    };

    // ###################### INSTALL in jQuery ##
    $.jsonp = jsonp;

} )( jQuery );
/*
 * Taken from https://github.com/garycourt/murmurhash-js at 0197ce38bedac0e05f40b9d7152095d06db8292c
 * 
 * License (MIT)
 * Copyright (c) 2011 Gary Court
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($) {

    /**
     * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
     * 
     * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
     * @see http://github.com/garycourt/murmurhash-js
     * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
     * @see http://sites.google.com/site/murmurhash/
     * 
     * @param {string}
     *            key ASCII only
     * @param {number}
     *            seed Positive integer only
     * @return {number} 32-bit positive integer hash
     */

    function murmurhash3_32_gc(key, seed) {
        var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

        remainder = key.length & 3; // key.length % 4
        bytes = key.length - remainder;
        h1 = seed;
        c1 = 0xcc9e2d51;
        c2 = 0x1b873593;
        i = 0;

        while (i < bytes) {
            k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 16) |
                    ((key.charCodeAt(++i) & 0xff) << 24);
            ++i;

            k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

            h1 ^= k1;
            h1 = (h1 << 13) | (h1 >>> 19);
            h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
            h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
        }

        k1 = 0;

        switch (remainder) {
        case 3:
            k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
        case 2:
            k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
        case 1:
            k1 ^= (key.charCodeAt(i) & 0xff);

            k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= k1;
        }

        h1 ^= key.length;

        h1 ^= h1 >>> 16;
        h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
        h1 ^= h1 >>> 13;
        h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
        h1 ^= h1 >>> 16;

        return h1 >>> 0;
    }

    // ###################### INSTALL in jQuery ##
    $.murmurhash3 = murmurhash3_32_gc;

})(jQuery);
/*******************************************************************************
 *
 * ADOBE CONFIDENTIAL __________________
 *
 * Copyright 2013 Adobe Systems Incorporated All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains the property of
 * Adobe Systems Incorporated and its suppliers, if any. The intellectual and
 * technical concepts contained herein are proprietary to Adobe Systems
 * Incorporated and its suppliers and are protected by trade secret or copyright
 * law. Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is obtained from Adobe
 * Systems Incorporated.
 ******************************************************************************/
CQ_Analytics = window.CQ_Analytics || {};
CQ_Analytics.AAM = CQ_Analytics.AAM || {};

/**
 * Integration point with AudienceManager endpoint.
 * This either runs in simulation mode in conjunction with the SegmentMgr or it runs in publish mode and calls
 * the demdex end point. It is configured with the following properties on construction.
 *
 * config.partner  the name of the audience manager partner, defaults to geometrixx
 * config.desinationNames  a map of maps defining destinations, keyed by the destination name.
 *                         each submap contains:
 *                            domain, the domain the key exists in
 *                            segkey, the parameter key for segments ids (optional defaults to segs)
 *                            keysep, the character used to separate keys (optional defaults to ,)
 *                            valsep, the character user to separate values (optional defaults to ;)
 *                         using defaults, destination values of segs=123,segs=32423  or segs=342;32432;234 represent
 *                         segmentids.
 * config.simulationPath  if present the CQ server will be used for simulation, if not, the live Audience Manager endpoint will be used.
 * config.containerNSID the audience manager container to use.
 *
 */
CQ_Analytics.AAM.AudienceMgr = CQ_Analytics.AAM.AudienceMgr ||
    function(config) {
        "use strict";

        var partner = config.partner || 'geometrixx';
        var destinationNames = config.destinationNames || {
                "CQIntegrationDestination" : {
                    domain : ".cqclientintegration.adobe.com",
                    segkey : "segs",
                    keysep : ",",
                    valsep : ";"
                }
            };
        var debugMessages = config.debug || false;

        var containerNSID = config.containerNSID || "0";

        // server url used to resolve traits into segments.
        var resolveSegmentsUrl = false;
        if ( config.simulationPath ) {
            resolveSegmentsUrl = config.simulationPath + ".segments.json";
        }



        var debug = function() {};
        if ( debugMessages ) {
            debug = function(msg) {
                console.log("DEBUG: audiencemanager.js "+msg);
            };
        }
        var error = function(msg) {
            console.log("ERROR: audiencemanager.js "+msg);
        };

        debug("Initialise Audience Manager");

        var audienceManagerUserSegments = {};

        var newStore = new CQ_Analytics.JSONStore();


        var demdexEndpoint = "http://";
        if ( "https:" == document.location.protocol ) {
            demdexEndpoint = "https://";
        }
        // the =? at the end is a placeholder for jQuery jsonp. Do not remove.
        demdexEndpoint += encodeURIComponent(partner)+".demdex.net/event?d_cb=?";

        /**
         *
         * Parse the destination response. 2 forms are accepted.
         * segs=23423;23432;23423;23423;234
         * or segs=23423,segs=23432,segs=234234
         * , and ; may be specified.
         * <pre>
         * {
         *    "dests":[
         *       {
         *          "id":"123-1354180261",
         *          "y":"img",
         *          "c":"http://<some destination URL>"
         *       },
         *       {
         *          "id":"1934-1234567899",
         *          "y":"img",
         *          "c":"http://<another destionation URL>"
         *       }
         *    ],
         *    "stuff":[
         *       {
         *          "cn":"aam_tnt",
         *          "cv":"segs=14612,14623",
         *          "ttl":0,
         *          "dmn":"www.my_domain.com",
         *          "u":"abc123"
         *       },
         *       {
         *          "cn":"aam_xyz",
         *          "cv":"segs=14612,14623",
         *          "ttl":0,
         *          "dmn":"www.my_domain.com",
         *          "u":"abc123"
         *       }
         *    ],
         *    "uuid":"abc123"
         * }
         * </pre>
         *
         */
        function parseDestinationResponse(stuff) {
            var segments = {};
            $.each(stuff, function(index, value) {
                // is there cn value present in the map of names.
                if ( destinationNames[value.cn] ) {
                    // does the domain match.
                    var dest = destinationNames[value.cn];
                    if ( value.dmn.slice(0,dest.domain.length) === dest.domain) {
                        var destn = (dest.segkey || "segs") + "=" ;
                        var destl = destn.length;
                        var keysep = dest.keysep || ",";
                        var valsep = dest.valsep || ";";
                        // extract the terms. in the form segs=213;234;234 or segs=23423,segs=23423
                        $.each(value.cv.split(keysep), function( index, seg) {
                            if ( seg.slice(0,destl) === destn ) {
                                $.each(seg.substring(destl).split(valsep), function(index, segv) {
                                    segments[segv] = true;
                                });
                            }
                        });
                    }
                }
            });
            return segments;
        }

        /**
         * An empty callback.
         */
        function emptyCallback() {
        }

        /**
         * set the new segments, and update the store property representing the new segments if required.
         * @param segments a map of segments keyed by id.
         */
        function setUserSegments(segments) {
            audienceManagerUserSegments = {};
            var ids = [];
            $.each(segments, function(key, value){
                if ( value ) {
                    audienceManagerUserSegments[key] = true;
                    ids.push(key);
                }
            });
            ids.sort();
            // this should trigger updates with anything in the client context that is listening.
            // putting a single property in, avoids multiple updates.
            var current = newStore.getProperty("segments");
            var newIds = ids.join(",");
            if ( current !== newIds ) {
                newStore.setProperty("segments", newIds);
                debug("Set segments to "+newIds);
            }
        }

        /**
         * Invoke the end point with new signals and call the provided callback when complete.
         * @param signals map of signals to send, if the key is sid it will be send as AAM traits.
         * @param callbacl an optional callback function.
         */
        function invoke(signals, callback) {
            callback = callback || emptyCallback;
            if ( resolveSegmentsUrl ) {
                // perform a call to the CQ server in simulation mode.
                if ( !signals.sid ) {
                    callback();
                    newStore.fireEvent("update");
                } else {
                    $.getJSON(resolveSegmentsUrl, { t : signals.sid }, function(response) {
                        if ( response.segments ) {
                            setUserSegments(response.segments);
                        }
                        callback();
                        newStore.fireEvent("update");
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        error("Failed to resolve segments from AAM server  "+textStatus+" error "+errorThrown);
                        callback();
                        newStore.fireEvent("update");
                    });
                }
            } else {
                var data = {};
                signals = signals || {};
                $.each(signals, function(key, value) {
                   if ( key === "sid" ) {
                       data.d_sid = value;
                   } else {
                       data["c_"+key] = value;
                   }
                });
                data.d_nsid = containerNSID;
                data.d_rtbd = "json";
                $.jsonp({
                    url : demdexEndpoint,
                    callback : "__aaminvoke",
                    data : data,
                    success : function(json, textStatus, xOptions) {
                        // parse the response extracting segments from all configured destinations.
                        if ( json.stuff ) {
                            setUserSegments(parseDestinationResponse(json.stuff));
                        }
                        callback();
                        newStore.fireEvent("update");
                    },
                    error : function(xOptions, textStatus) {
                        error("Failed to retieve json response "+textStatus);
                        callback();
                        newStore.fireEvent("update");
                    }
                });
            }
        }

        /**
         * get the AAM segments for the user.
         */
        function getUserSegments() {
            return audienceManagerUserSegments;
        }


        /**
         * @param segmentId the AAM segment id.
         * @returns true if the AAM segment identified by segmentId is present.
         */
        function checkSegmentMatch(segmentId) {
            return (audienceManagerUserSegments[segmentId]);
        }


        invoke(false, function() {
            CQ_Analytics.ClientContextMgr.register(newStore);
        });

        // make some functions public.
        newStore.getUserSegments = getUserSegments;
        newStore.matches = checkSegmentMatch;
        newStore.invoke = invoke;
        return newStore;
    };
