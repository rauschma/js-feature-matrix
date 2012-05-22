var matrixTests = [
    "Methods and functions",
    {
        key: "Array.isArray",
        name: "Array.isArray",
        version: "ES5",
        isTypeof: "function",
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Array.prototype:indexOf",
        name: "Array.prototype",
        version: "ES5",
        object: Array.prototype,
        methods: [ "indexOf", "lastIndexOf" ],
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Array.prototype:iterate",
        name: "Array.prototype",
        version: "ES5",
        object: Array.prototype,
        methods: [ "every", "some", "forEach", "map", "filter" ],
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Array.prototype:reduce",
        name: "Array.prototype",
        version: "ES5",
        object: Array.prototype,
        methods: [ "reduce", "reduceRight" ],
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Date.now",
        name: "Date.now",
        version: "ES5",
        isTypeof: "function",
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Date.prototype.toISOString",
        name: "Date.prototype.toISOString",
        version: "ES5",
        isTypeof: "function",
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Function.prototype.bind",
        name: "Function.prototype.bind",
        version: "ES5",
        isTypeof: "function",
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Object.create",
        name: "Object.create",
        version: "ES5",
        isTypeof: "function",
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Object.getPrototypeOf",
        name: "Object.getPrototypeOf",
        version: "ES5",
        isTypeof: "function",
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Object:prop_names",
        name: "Object",
        version: "ES5",
        object: Object,
        methods: [ "keys", "getOwnPropertyNames" ],
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Object:prop_def",
        name: "Object",
        version: "ES5",
        object: Object,
        methods: [ "defineProperty", "defineProperties", "getOwnPropertyDescriptor" ],
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "Object:protect",
        name: "Object",
        version: "ES5",
        object: Object,
        methods: [ "preventExtensions", "seal", "freeze", "isExtensible", "isSealed", "isFrozen" ],
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "String.prototype.trim",
        name: "String.prototype.trim",
        version: "ES5",
        isTypeof: "function",
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "JSON",
        name: "<tt>JSON</tt>",
        version: "ES5",
        check: function () {
            return isJsonAvailable;
        },
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    "Syntax and semantics",
    {
        key: "strict_mode",
        name: "Strict mode",
        version: "ES5",
        check: function () {
            function strictFunction() {
                "use strict";
                return this === undefined;
            }
            return strictFunction(); // call as non-method
        },
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "getters_setters",
        name: "Getters and setters",
        version: "ES5",
        check: function () {
            // Possibly a parser error, use eval
            var obj = eval("({ get foo() { return 'getter' } })");
            if (obj.foo !== "getter") return false;
            obj = eval("({ set bar(v) { this._bar = v } })");
            obj.bar = 123;
            return obj._bar === 123;
        },
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "reserved_prop_names",
        name: "Reserved words as property names",
        version: "ES5",
        check: function () {
            // Possibly a parser error, use eval
            return eval("({ function: 123 }).function") === 123;
        },
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "trailing_comma",
        name: "Trailing comma in object literal",
        version: "ES5",
        check: function () {
            // Possibly a parser error, use eval
            var obj = eval("({ foo: 123, bar: 456, })");
            return obj.foo === 123 && obj.bar === 456;
        },
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "str_index",
        name: "String square brackets",
        version: "ES3",
        check: function () {
            var str = "abc";
            return str[0] === "a";
        },
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "named_func_expr",
        name: "Named function expressions",
        version: "ES3",
        check: function () {
            var worksProperly = true;
            var f = function g() {
                if (!g || g !== f) {
                    worksProperly = false;
                }
            };
            if (typeof g !== "undefined") {
                worksProperly = false;
            }
            f();
            return worksProperly;
        },
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    },
    {
        key: "arguments.callee",
        name: "<tt>arguments.callee</tt>",
        version: "N/A",
        check: function () {
            var f = function () {
                return arguments.callee === f;
            }
            return f();
        },
        support: {
            FF: "?", Chr: "?", IE: "?", Op: "?", Saf: "?",
            FFM: "?", Andr: "?", IEM: "?", OpM: "?", SafM: "?", ChrM: "?"
        }
    }
];
