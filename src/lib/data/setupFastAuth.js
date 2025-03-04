import {
  keyStores,
  connect,
  WalletConnection,
  transactions,
  utils,
} from "near-api-js";
import { createAction } from "@near-wallet-selector/wallet-utils";

var commonjsGlobal =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : typeof self !== "undefined"
    ? self
    : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$m =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == "object" && globalThis) ||
  check(typeof window == "object" && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == "object" && self) ||
  check(typeof commonjsGlobal == "object" && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this;
  })() ||
  Function("return this")();

var objectGetOwnPropertyDescriptor = {};

var fails$j = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$i = fails$j;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$i(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      },
    })[1] != 7
  );
});

var fails$h = fails$j;

var functionBindNative = !fails$h(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = function () {
    /* empty */
  }.bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != "function" || test.hasOwnProperty("prototype");
});

var NATIVE_BIND$3 = functionBindNative;

var call$i = Function.prototype.call;

var functionCall = NATIVE_BIND$3
  ? call$i.bind(call$i)
  : function () {
      return call$i.apply(call$i, arguments);
    };

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG =
  getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$2(this, V);
      return !!descriptor && descriptor.enumerable;
    }
  : $propertyIsEnumerable;

var createPropertyDescriptor$3 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  };
};

var NATIVE_BIND$2 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var bind$5 = FunctionPrototype$2.bind;
var call$h = FunctionPrototype$2.call;
var uncurryThis$j = NATIVE_BIND$2 && bind$5.bind(call$h, call$h);

var functionUncurryThis = NATIVE_BIND$2
  ? function (fn) {
      return fn && uncurryThis$j(fn);
    }
  : function (fn) {
      return (
        fn &&
        function () {
          return call$h.apply(fn, arguments);
        }
      );
    };

var uncurryThis$i = functionUncurryThis;

var toString$5 = uncurryThis$i({}.toString);
var stringSlice$4 = uncurryThis$i("".slice);

var classofRaw$1 = function (it) {
  return stringSlice$4(toString$5(it), 8, -1);
};

var uncurryThis$h = functionUncurryThis;
var fails$g = fails$j;
var classof$6 = classofRaw$1;

var $Object$4 = Object;
var split = uncurryThis$h("".split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$g(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4("z").propertyIsEnumerable(0);
})
  ? function (it) {
      return classof$6(it) == "String" ? split(it, "") : $Object$4(it);
    }
  : $Object$4;

var $TypeError$c = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$4 = function (it) {
  if (it == undefined) throw $TypeError$c("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$3 = requireObjectCoercible$4;

var toIndexedObject$5 = function (it) {
  return IndexedObject$1(requireObjectCoercible$3(it));
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$m = function (argument) {
  return typeof argument == "function";
};

var isCallable$l = isCallable$m;

var isObject$7 = function (it) {
  return typeof it == "object" ? it !== null : isCallable$l(it);
};

var global$l = global$m;
var isCallable$k = isCallable$m;

var aFunction = function (argument) {
  return isCallable$k(argument) ? argument : undefined;
};

var getBuiltIn$8 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(global$l[namespace])
    : global$l[namespace] && global$l[namespace][method];
};

var uncurryThis$g = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$g({}.isPrototypeOf);

var getBuiltIn$7 = getBuiltIn$8;

var engineUserAgent = getBuiltIn$7("navigator", "userAgent") || "";

var global$k = global$m;
var userAgent$3 = engineUserAgent;

var process$3 = global$k.process;
var Deno$1 = global$k.Deno;
var versions = (process$3 && process$3.versions) || (Deno$1 && Deno$1.version);
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split(".");
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent$3) {
  match = userAgent$3.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$3.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es-x/no-symbol -- required for testing */

var V8_VERSION$1 = engineV8Version;
var fails$f = fails$j;

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$f(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return (
      !String(symbol) ||
      !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (!Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41)
    );
  });

/* eslint-disable es-x/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid =
  NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == "symbol";

var getBuiltIn$6 = getBuiltIn$8;
var isCallable$j = isCallable$m;
var isPrototypeOf$3 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == "symbol";
    }
  : function (it) {
      var $Symbol = getBuiltIn$6("Symbol");
      return (
        isCallable$j($Symbol) &&
        isPrototypeOf$3($Symbol.prototype, $Object$3(it))
      );
    };

var $String$3 = String;

var tryToString$4 = function (argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return "Object";
  }
};

var isCallable$i = isCallable$m;
var tryToString$3 = tryToString$4;

var $TypeError$b = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$7 = function (argument) {
  if (isCallable$i(argument)) return argument;
  throw $TypeError$b(tryToString$3(argument) + " is not a function");
};

var aCallable$6 = aCallable$7;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$4 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$6(func);
};

var call$g = functionCall;
var isCallable$h = isCallable$m;
var isObject$6 = isObject$7;

var $TypeError$a = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (
    pref === "string" &&
    isCallable$h((fn = input.toString)) &&
    !isObject$6((val = call$g(fn, input)))
  )
    return val;
  if (
    isCallable$h((fn = input.valueOf)) &&
    !isObject$6((val = call$g(fn, input)))
  )
    return val;
  if (
    pref !== "string" &&
    isCallable$h((fn = input.toString)) &&
    !isObject$6((val = call$g(fn, input)))
  )
    return val;
  throw $TypeError$a("Can't convert object to primitive value");
};

var shared$4 = { exports: {} };

var global$j = global$m;

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$5 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$5(global$j, key, {
      value: value,
      configurable: true,
      writable: true,
    });
  } catch (error) {
    global$j[key] = value;
  }
  return value;
};

var global$i = global$m;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = "__core-js_shared__";
var store$3 = global$i[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})("versions", []).push({
  version: "3.23.3",
  mode: "global",
  copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.23.3/LICENSE",
  source: "https://github.com/zloirock/core-js",
});

var requireObjectCoercible$2 = requireObjectCoercible$4;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$4 = function (argument) {
  return $Object$2(requireObjectCoercible$2(argument));
};

var uncurryThis$f = functionUncurryThis;
var toObject$3 = toObject$4;

var hasOwnProperty = uncurryThis$f({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject$3(it), key);
  };

var uncurryThis$e = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$4 = uncurryThis$e((1.0).toString);

var uid$2 = function (key) {
  return (
    "Symbol(" +
    (key === undefined ? "" : key) +
    ")_" +
    toString$4(++id + postfix, 36)
  );
};

var global$h = global$m;
var shared$3 = shared$4.exports;
var hasOwn$a = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$3("wks");
var Symbol$1 = global$h.Symbol;
var symbolFor = Symbol$1 && Symbol$1["for"];
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1
  : (Symbol$1 && Symbol$1.withoutSetter) || uid$1;

var wellKnownSymbol$g = function (name) {
  if (
    !hasOwn$a(WellKnownSymbolsStore, name) ||
    !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")
  ) {
    var description = "Symbol." + name;
    if (NATIVE_SYMBOL && hasOwn$a(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name];
};

var call$f = functionCall;
var isObject$5 = isObject$7;
var isSymbol$1 = isSymbol$2;
var getMethod$3 = getMethod$4;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$f = wellKnownSymbol$g;

var $TypeError$9 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$f("toPrimitive");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$5(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = "default";
    result = call$f(exoticToPrim, input, pref);
    if (!isObject$5(result) || isSymbol$1(result)) return result;
    throw $TypeError$9("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = "number";
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, "string");
  return isSymbol(key) ? key : key + "";
};

var global$g = global$m;
var isObject$4 = isObject$7;

var document$3 = global$g.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$4(document$3) && isObject$4(document$3.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};

var DESCRIPTORS$a = descriptors;
var fails$e = fails$j;
var createElement$1 = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine =
  !DESCRIPTORS$a &&
  !fails$e(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty(createElement$1("div"), "a", {
        get: function () {
          return 7;
        },
      }).a != 7
    );
  });

var DESCRIPTORS$9 = descriptors;
var call$e = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$2 = createPropertyDescriptor$3;
var toIndexedObject$4 = toIndexedObject$5;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$9 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9
  ? $getOwnPropertyDescriptor$1
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$4(O);
      P = toPropertyKey$1(P);
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor$1(O, P);
        } catch (error) {
          /* empty */
        }
      if (hasOwn$9(O, P))
        return createPropertyDescriptor$2(
          !call$e(propertyIsEnumerableModule$1.f, O, P),
          O[P]
        );
    };

var objectDefineProperty = {};

var DESCRIPTORS$8 = descriptors;
var fails$d = fails$j;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug =
  DESCRIPTORS$8 &&
  fails$d(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty(
        function () {
          /* empty */
        },
        "prototype",
        {
          value: 42,
          writable: false,
        }
      ).prototype != 42
    );
  });

var isObject$3 = isObject$7;

var $String$2 = String;
var $TypeError$8 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$e = function (argument) {
  if (isObject$3(argument)) return argument;
  throw $TypeError$8($String$2(argument) + " is not an object");
};

var DESCRIPTORS$7 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$d = anObject$e;
var toPropertyKey = toPropertyKey$2;

var $TypeError$7 = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$7
  ? V8_PROTOTYPE_DEFINE_BUG$1
    ? function defineProperty(O, P, Attributes) {
        anObject$d(O);
        P = toPropertyKey(P);
        anObject$d(Attributes);
        if (
          typeof O === "function" &&
          P === "prototype" &&
          "value" in Attributes &&
          WRITABLE in Attributes &&
          !Attributes[WRITABLE]
        ) {
          var current = $getOwnPropertyDescriptor(O, P);
          if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
              configurable:
                CONFIGURABLE$1 in Attributes
                  ? Attributes[CONFIGURABLE$1]
                  : current[CONFIGURABLE$1],
              enumerable:
                ENUMERABLE in Attributes
                  ? Attributes[ENUMERABLE]
                  : current[ENUMERABLE],
              writable: false,
            };
          }
        }
        return $defineProperty(O, P, Attributes);
      }
    : $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$d(O);
      P = toPropertyKey(P);
      anObject$d(Attributes);
      if (IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes);
        } catch (error) {
          /* empty */
        }
      if ("get" in Attributes || "set" in Attributes)
        throw $TypeError$7("Accessors not supported");
      if ("value" in Attributes) O[P] = Attributes.value;
      return O;
    };

var DESCRIPTORS$6 = descriptors;
var definePropertyModule$4 = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$3;

var createNonEnumerableProperty$5 = DESCRIPTORS$6
  ? function (object, key, value) {
      return definePropertyModule$4.f(
        object,
        key,
        createPropertyDescriptor$1(1, value)
      );
    }
  : function (object, key, value) {
      object[key] = value;
      return object;
    };

var makeBuiltIn$2 = { exports: {} };

var DESCRIPTORS$5 = descriptors;
var hasOwn$8 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$8(FunctionPrototype$1, "name");
// additional protection from minified / mangled / dropped function names
var PROPER =
  EXISTS &&
  function something() {
    /* empty */
  }.name === "something";
var CONFIGURABLE =
  EXISTS &&
  (!DESCRIPTORS$5 ||
    (DESCRIPTORS$5 && getDescriptor(FunctionPrototype$1, "name").configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE,
};

var uncurryThis$d = functionUncurryThis;
var isCallable$g = isCallable$m;
var store$1 = sharedStore;

var functionToString = uncurryThis$d(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$g(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$4 = store$1.inspectSource;

var global$f = global$m;
var isCallable$f = isCallable$m;
var inspectSource$3 = inspectSource$4;

var WeakMap$1 = global$f.WeakMap;

var nativeWeakMap =
  isCallable$f(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

var shared$2 = shared$4.exports;
var uid = uid$2;

var keys = shared$2("keys");

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$e = global$m;
var uncurryThis$c = functionUncurryThis;
var isObject$2 = isObject$7;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$7 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$2 = global$e.TypeError;
var WeakMap = global$e.WeakMap;
var set$1, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$2("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  var wmget = uncurryThis$c(store.get);
  var wmhas = uncurryThis$c(store.has);
  var wmset = uncurryThis$c(store.set);
  set$1 = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$2("state");
  hiddenKeys$3[STATE] = true;
  set$1 = function (it, metadata) {
    if (hasOwn$7(it, STATE)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$7(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$7(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor,
};

var fails$c = fails$j;
var isCallable$e = isCallable$m;
var hasOwn$6 = hasOwnProperty_1;
var DESCRIPTORS$4 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$4;
var InternalStateModule$2 = internalState;

var enforceInternalState = InternalStateModule$2.enforce;
var getInternalState$2 = InternalStateModule$2.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$4 = Object.defineProperty;

var CONFIGURABLE_LENGTH =
  DESCRIPTORS$4 &&
  !fails$c(function () {
    return (
      defineProperty$4(
        function () {
          /* empty */
        },
        "length",
        { value: 8 }
      ).length !== 8
    );
  });

var TEMPLATE = String(String).split("String");

var makeBuiltIn$1 = (makeBuiltIn$2.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === "Symbol(") {
    name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
  }
  if (options && options.getter) name = "get " + name;
  if (options && options.setter) name = "set " + name;
  if (
    !hasOwn$6(value, "name") ||
    (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)
  ) {
    if (DESCRIPTORS$4)
      defineProperty$4(value, "name", { value: name, configurable: true });
    else value.name = name;
  }
  if (
    CONFIGURABLE_LENGTH &&
    options &&
    hasOwn$6(options, "arity") &&
    value.length !== options.arity
  ) {
    defineProperty$4(value, "length", { value: options.arity });
  }
  try {
    if (options && hasOwn$6(options, "constructor") && options.constructor) {
      if (DESCRIPTORS$4)
        defineProperty$4(value, "prototype", { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) {
    /* empty */
  }
  var state = enforceInternalState(value);
  if (!hasOwn$6(state, "source")) {
    state.source = TEMPLATE.join(typeof name == "string" ? name : "");
  }
  return value;
});

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return (
    (isCallable$e(this) && getInternalState$2(this).source) ||
    inspectSource$2(this)
  );
}, "toString");

var isCallable$d = isCallable$m;
var definePropertyModule$3 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$7 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$d(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) {
      /* empty */
    }
    if (simple) O[key] = value;
    else
      definePropertyModule$3.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable,
      });
  }
  return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$1 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
var mathTrunc =
  Math.trunc ||
  function trunc(x) {
    var n = +x;
    return (n > 0 ? floor$1 : ceil)(n);
  };

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$4 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

var max$1 = Math.max;
var min$2 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$3(index);
  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
};

var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

var min$1 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$2 = function (argument) {
  return argument > 0
    ? min$1(toIntegerOrInfinity$2(argument), 0x1fffffffffffff)
    : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$1 = toLength$2;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$2 = function (obj) {
  return toLength$1(obj.length);
};

var toIndexedObject$3 = toIndexedObject$5;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$1 = lengthOfArrayLike$2;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this);
    var length = lengthOfArrayLike$1(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
      }
    else
      for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el)
          return IS_INCLUDES || index || 0;
      }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$1(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$1(false),
};

var uncurryThis$b = functionUncurryThis;
var hasOwn$5 = hasOwnProperty_1;
var toIndexedObject$2 = toIndexedObject$5;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var push$1 = uncurryThis$b([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O)
    !hasOwn$5(hiddenKeys$2, key) && hasOwn$5(O, key) && push$1(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i)
    if (hasOwn$5(O, (key = names[i++]))) {
      ~indexOf$1(result, key) || push$1(result, key);
    }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf",
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat("length", "prototype");

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$5 = getBuiltIn$8;
var uncurryThis$a = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$c = anObject$e;

var concat$2 = uncurryThis$a([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 =
  getBuiltIn$5("Reflect", "ownKeys") ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$c(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols
      ? concat$2(keys, getOwnPropertySymbols(it))
      : keys;
  };

var hasOwn$4 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$2 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$2.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$b = fails$j;
var isCallable$c = isCallable$m;

var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$c(detection)
    ? fails$b(detection)
    : !!detection;
};

var normalize = (isForced$2.normalize = function (string) {
  return String(string).replace(replacement, ".").toLowerCase();
});

var data = (isForced$2.data = {});
var NATIVE = (isForced$2.NATIVE = "N");
var POLYFILL = (isForced$2.POLYFILL = "P");

var isForced_1 = isForced$2;

var global$d = global$m;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var defineBuiltIn$6 = defineBuiltIn$7;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$1 = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$d;
  } else if (STATIC) {
    target = global$d[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$d[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$1(
        GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
        options.forced
      );
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$3(sourceProperty, "sham", true);
      }
      defineBuiltIn$6(target, key, sourceProperty, options);
    }
};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
var objectKeys$2 =
  Object.keys ||
  function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

var DESCRIPTORS$3 = descriptors;
var uncurryThis$9 = functionUncurryThis;
var call$d = functionCall;
var fails$a = fails$j;
var objectKeys$1 = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$2 = toObject$4;
var IndexedObject = indexedObject;

// eslint-disable-next-line es-x/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
var defineProperty$3 = Object.defineProperty;
var concat$1 = uncurryThis$9([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign =
  !$assign ||
  fails$a(function () {
    // should have correct order of operations (Edge bug)
    if (
      DESCRIPTORS$3 &&
      $assign(
        { b: 1 },
        $assign(
          defineProperty$3({}, "a", {
            enumerable: true,
            get: function () {
              defineProperty$3(this, "b", {
                value: 3,
                enumerable: false,
              });
            },
          }),
          { b: 2 }
        )
      ).b !== 1
    )
      return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es-x/no-symbol -- safe
    var symbol = Symbol();
    var alphabet = "abcdefghijklmnopqrst";
    A[symbol] = 7;
    alphabet.split("").forEach(function (chr) {
      B[chr] = chr;
    });
    return (
      $assign({}, A)[symbol] != 7 ||
      objectKeys$1($assign({}, B)).join("") != alphabet
    );
  })
    ? function assign(target, source) {
        // eslint-disable-line no-unused-vars -- required for `.length`
        var T = toObject$2(target);
        var argumentsLength = arguments.length;
        var index = 1;
        var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
        var propertyIsEnumerable = propertyIsEnumerableModule.f;
        while (argumentsLength > index) {
          var S = IndexedObject(arguments[index++]);
          var keys = getOwnPropertySymbols
            ? concat$1(objectKeys$1(S), getOwnPropertySymbols(S))
            : objectKeys$1(S);
          var length = keys.length;
          var j = 0;
          var key;
          while (length > j) {
            key = keys[j++];
            if (!DESCRIPTORS$3 || call$d(propertyIsEnumerable, S, key))
              T[key] = S[key];
          }
        }
        return T;
      }
    : $assign;

var $$8 = _export;
var assign = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es-x/no-object-assign -- required for testing
$$8(
  { target: "Object", stat: true, arity: 2, forced: Object.assign !== assign },
  {
    assign: assign,
  }
);

var wellKnownSymbol$e = wellKnownSymbol$g;

var TO_STRING_TAG$3 = wellKnownSymbol$e("toStringTag");
var test = {};

test[TO_STRING_TAG$3] = "z";

var toStringTagSupport = String(test) === "[object z]";

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$b = isCallable$m;
var classofRaw = classofRaw$1;
var wellKnownSymbol$d = wellKnownSymbol$g;

var TO_STRING_TAG$2 = wellKnownSymbol$d("toStringTag");
var $Object$1 = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS =
  classofRaw(
    (function () {
      return arguments;
    })()
  ) == "Arguments";

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$5 = TO_STRING_TAG_SUPPORT
  ? classofRaw
  : function (it) {
      var O, tag, result;
      return it === undefined
        ? "Undefined"
        : it === null
        ? "Null"
        : // @@toStringTag case
        typeof (tag = tryGet((O = $Object$1(it)), TO_STRING_TAG$2)) == "string"
        ? tag
        : // builtinTag case
        CORRECT_ARGUMENTS
        ? classofRaw(O)
        : // ES3 arguments fallback
        (result = classofRaw(O)) == "Object" && isCallable$b(O.callee)
        ? "Arguments"
        : result;
    };

var classof$4 = classof$5;

var $String$1 = String;

var toString$3 = function (argument) {
  if (classof$4(argument) === "Symbol")
    throw TypeError("Cannot convert a Symbol value to a string");
  return $String$1(argument);
};

var anObject$b = anObject$e;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$b(this);
  var result = "";
  if (that.hasIndices) result += "d";
  if (that.global) result += "g";
  if (that.ignoreCase) result += "i";
  if (that.multiline) result += "m";
  if (that.dotAll) result += "s";
  if (that.unicode) result += "u";
  if (that.unicodeSets) result += "v";
  if (that.sticky) result += "y";
  return result;
};

var call$c = functionCall;
var hasOwn$3 = hasOwnProperty_1;
var isPrototypeOf$2 = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;

var RegExpPrototype$2 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined &&
    !("flags" in RegExpPrototype$2) &&
    !hasOwn$3(R, "flags") &&
    isPrototypeOf$2(RegExpPrototype$2, R)
    ? call$c(regExpFlags, R)
    : flags;
};

var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
var defineBuiltIn$5 = defineBuiltIn$7;
var anObject$a = anObject$e;
var $toString = toString$3;
var fails$9 = fails$j;
var getRegExpFlags = regexpGetFlags;

var TO_STRING = "toString";
var RegExpPrototype$1 = RegExp.prototype;
var n$ToString = RegExpPrototype$1[TO_STRING];

var NOT_GENERIC = fails$9(function () {
  return n$ToString.call({ source: "a", flags: "b" }) != "/a/b";
});
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn$5(
    RegExp.prototype,
    TO_STRING,
    function toString() {
      var R = anObject$a(this);
      var pattern = $toString(R.source);
      var flags = $toString(getRegExpFlags(R));
      return "/" + pattern + "/" + flags;
    },
    { unsafe: true }
  );
}

var objectDefineProperties = {};

var DESCRIPTORS$2 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$1 = objectDefineProperty;
var anObject$9 = anObject$e;
var toIndexedObject$1 = toIndexedObject$5;
var objectKeys = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
objectDefineProperties.f =
  DESCRIPTORS$2 && !V8_PROTOTYPE_DEFINE_BUG
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        anObject$9(O);
        var props = toIndexedObject$1(Properties);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index)
          definePropertyModule$1.f(O, (key = keys[index++]), props[key]);
        return O;
      };

var getBuiltIn$4 = getBuiltIn$8;

var html$2 = getBuiltIn$4("document", "documentElement");

/* global ActiveXObject -- old IE, WSH */

var anObject$8 = anObject$e;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$1 = sharedKey$3;

var GT = ">";
var LT = "<";
var PROTOTYPE = "prototype";
var SCRIPT = "script";
var IE_PROTO$1 = sharedKey$1("IE_PROTO");

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(""));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1("iframe");
  var JS = "java" + SCRIPT + ":";
  var iframeDocument;
  iframe.style.display = "none";
  html$1.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag("document.F=Object"));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject("htmlfile");
  } catch (error) {
    /* ignore */
  }
  NullProtoObject =
    typeof document != "undefined"
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
var objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$8(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined
      ? result
      : definePropertiesModule.f(result, Properties);
  };

var wellKnownSymbol$c = wellKnownSymbol$g;
var create$2 = objectCreate;
var defineProperty$2 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$c("unscopables");
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  defineProperty$2(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$2(null),
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var iterators = {};

var fails$8 = fails$j;

var correctPrototypeGetter = !fails$8(function () {
  function F() {
    /* empty */
  }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$2 = hasOwnProperty_1;
var isCallable$a = isCallable$m;
var toObject$1 = toObject$4;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey("IE_PROTO");
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es-x/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER
  ? $Object.getPrototypeOf
  : function (O) {
      var object = toObject$1(O);
      if (hasOwn$2(object, IE_PROTO)) return object[IE_PROTO];
      var constructor = object.constructor;
      if (isCallable$a(constructor) && object instanceof constructor) {
        return constructor.prototype;
      }
      return object instanceof $Object ? ObjectPrototype : null;
    };

var fails$7 = fails$j;
var isCallable$9 = isCallable$m;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$4 = defineBuiltIn$7;
var wellKnownSymbol$b = wellKnownSymbol$g;

var ITERATOR$5 = wellKnownSymbol$b("iterator");
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(
      getPrototypeOf$1(arrayIterator)
    );
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
      IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE =
  IteratorPrototype$2 == undefined ||
  fails$7(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
  });

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$9(IteratorPrototype$2[ITERATOR$5])) {
  defineBuiltIn$4(IteratorPrototype$2, ITERATOR$5, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1,
};

var defineProperty$1 = objectDefineProperty.f;
var hasOwn$1 = hasOwnProperty_1;
var wellKnownSymbol$a = wellKnownSymbol$g;

var TO_STRING_TAG$1 = wellKnownSymbol$a("toStringTag");

var setToStringTag$3 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$1(target, TO_STRING_TAG$1)) {
    defineProperty$1(target, TO_STRING_TAG$1, {
      configurable: true,
      value: TAG,
    });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$1 = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$3;
var setToStringTag$2 = setToStringTag$3;
var Iterators$4 = iterators;

var returnThis$1 = function () {
  return this;
};

var createIteratorConstructor$1 = function (
  IteratorConstructor,
  NAME,
  next,
  ENUMERABLE_NEXT
) {
  var TO_STRING_TAG = NAME + " Iterator";
  IteratorConstructor.prototype = create$1(IteratorPrototype$1, {
    next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next),
  });
  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var isCallable$8 = isCallable$m;

var $String = String;
var $TypeError$6 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == "object" || isCallable$8(argument)) return argument;
  throw $TypeError$6("Can't set " + $String(argument) + " as a prototype");
};

/* eslint-disable no-proto -- safe */

var uncurryThis$8 = functionUncurryThis;
var anObject$7 = anObject$e;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
var objectSetPrototypeOf =
  Object.setPrototypeOf ||
  ("__proto__" in {}
    ? (function () {
        var CORRECT_SETTER = false;
        var test = {};
        var setter;
        try {
          // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
          setter = uncurryThis$8(
            Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set
          );
          setter(test, []);
          CORRECT_SETTER = test instanceof Array;
        } catch (error) {
          /* empty */
        }
        return function setPrototypeOf(O, proto) {
          anObject$7(O);
          aPossiblePrototype(proto);
          if (CORRECT_SETTER) setter(O, proto);
          else O.__proto__ = proto;
          return O;
        };
      })()
    : undefined);

var $$7 = _export;
var call$b = functionCall;
var FunctionName = functionName;
var isCallable$7 = isCallable$m;
var createIteratorConstructor = createIteratorConstructor$1;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var setToStringTag$1 = setToStringTag$3;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var defineBuiltIn$3 = defineBuiltIn$7;
var wellKnownSymbol$9 = wellKnownSymbol$g;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$4 = wellKnownSymbol$9("iterator");
var KEYS = "keys";
var VALUES = "values";
var ENTRIES = "entries";

var returnThis = function () {
  return this;
};

var defineIterator$1 = function (
  Iterable,
  NAME,
  IteratorConstructor,
  next,
  DEFAULT,
  IS_SET,
  FORCED
) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
      return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };
      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };
      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }
    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + " Iterator";
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator =
    IterablePrototype[ITERATOR$4] ||
    IterablePrototype["@@iterator"] ||
    (DEFAULT && IterablePrototype[DEFAULT]);
  var defaultIterator =
    (!BUGGY_SAFARI_ITERATORS && nativeIterator) || getIterationMethod(DEFAULT);
  var anyNativeIterator =
    NAME == "Array"
      ? IterablePrototype.entries || nativeIterator
      : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(
      anyNativeIterator.call(new Iterable())
    );
    if (
      CurrentIteratorPrototype !== Object.prototype &&
      CurrentIteratorPrototype.next
    ) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$1) {
          setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$7(CurrentIteratorPrototype[ITERATOR$4])) {
          defineBuiltIn$3(CurrentIteratorPrototype, ITERATOR$4, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (
    PROPER_FUNCTION_NAME &&
    DEFAULT == VALUES &&
    nativeIterator &&
    nativeIterator.name !== VALUES
  ) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$2(IterablePrototype, "name", VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() {
        return call$b(nativeIterator, this);
      };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES),
    };
    if (FORCED)
      for (KEY in methods) {
        if (
          BUGGY_SAFARI_ITERATORS ||
          INCORRECT_VALUES_NAME ||
          !(KEY in IterablePrototype)
        ) {
          defineBuiltIn$3(IterablePrototype, KEY, methods[KEY]);
        }
      }
    else
      $$7(
        {
          target: NAME,
          proto: true,
          forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME,
        },
        methods
      );
  }

  // define iterator
  if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
    defineBuiltIn$3(IterablePrototype, ITERATOR$4, defaultIterator, {
      name: DEFAULT,
    });
  }
  Iterators$3[NAME] = defaultIterator;

  return methods;
};

var toIndexedObject = toIndexedObject$5;
var addToUnscopables = addToUnscopables$1;
var Iterators$2 = iterators;
var InternalStateModule$1 = internalState;
var defineProperty = objectDefineProperty.f;
var defineIterator = defineIterator$1;
var DESCRIPTORS$1 = descriptors;

var ARRAY_ITERATOR = "Array Iterator";
var setInternalState$1 = InternalStateModule$1.set;
var getInternalState$1 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(
  Array,
  "Array",
  function (iterated, kind) {
    setInternalState$1(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0, // next index
      kind: kind, // kind
    });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  },
  function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == "keys") return { value: index, done: false };
    if (kind == "values") return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  },
  "values"
);

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = (Iterators$2.Arguments = Iterators$2.Array);

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables("keys");
addToUnscopables("values");
addToUnscopables("entries");

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$1 && values.name !== "values")
  try {
    defineProperty(values, "name", { value: "values" });
  } catch (error) {
    /* empty */
  }

var classof$3 = classofRaw$1;
var global$c = global$m;

var engineIsNode = classof$3(global$c.process) == "process";

var getBuiltIn$3 = getBuiltIn$8;
var definePropertyModule = objectDefineProperty;
var wellKnownSymbol$8 = wellKnownSymbol$g;
var DESCRIPTORS = descriptors;

var SPECIES$3 = wellKnownSymbol$8("species");

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () {
        return this;
      },
    });
  }
};

var isPrototypeOf$1 = objectIsPrototypeOf;

var $TypeError$5 = TypeError;

var anInstance$1 = function (it, Prototype) {
  if (isPrototypeOf$1(Prototype, it)) return it;
  throw $TypeError$5("Incorrect invocation");
};

var uncurryThis$7 = functionUncurryThis;
var fails$6 = fails$j;
var isCallable$6 = isCallable$m;
var classof$2 = classof$5;
var getBuiltIn$2 = getBuiltIn$8;
var inspectSource$1 = inspectSource$4;

var noop = function () {
  /* empty */
};
var empty = [];
var construct = getBuiltIn$2("Reflect", "construct");
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$1 = uncurryThis$7(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$6(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$6(argument)) return false;
  switch (classof$2(argument)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return (
      INCORRECT_TO_STRING ||
      !!exec$1(constructorRegExp, inspectSource$1(argument))
    );
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$1 =
  !construct ||
  fails$6(function () {
    var called;
    return (
      isConstructorModern(isConstructorModern.call) ||
      !isConstructorModern(Object) ||
      !isConstructorModern(function () {
        called = true;
      }) ||
      called
    );
  })
    ? isConstructorLegacy
    : isConstructorModern;

var isConstructor = isConstructor$1;
var tryToString$2 = tryToString$4;

var $TypeError$4 = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$1 = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError$4(tryToString$2(argument) + " is not a constructor");
};

var anObject$6 = anObject$e;
var aConstructor = aConstructor$1;
var wellKnownSymbol$7 = wellKnownSymbol$g;

var SPECIES$2 = wellKnownSymbol$7("species");

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$6(O).constructor;
  var S;
  return C === undefined || (S = anObject$6(C)[SPECIES$2]) == undefined
    ? defaultConstructor
    : aConstructor(S);
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$2 = FunctionPrototype.apply;
var call$a = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
var functionApply =
  (typeof Reflect == "object" && Reflect.apply) ||
  (NATIVE_BIND$1
    ? call$a.bind(apply$2)
    : function () {
        return call$a.apply(apply$2, arguments);
      });

var uncurryThis$6 = functionUncurryThis;
var aCallable$5 = aCallable$7;
var NATIVE_BIND = functionBindNative;

var bind$4 = uncurryThis$6(uncurryThis$6.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$5(fn);
  return that === undefined
    ? fn
    : NATIVE_BIND
    ? bind$4(fn, that)
    : function (/* ...args */) {
        return fn.apply(that, arguments);
      };
};

var uncurryThis$5 = functionUncurryThis;

var arraySlice$1 = uncurryThis$5([].slice);

var $TypeError$3 = TypeError;

var validateArgumentsLength$1 = function (passed, required) {
  if (passed < required) throw $TypeError$3("Not enough arguments");
  return passed;
};

var userAgent$2 = engineUserAgent;

var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

var global$b = global$m;
var apply$1 = functionApply;
var bind$3 = functionBindContext;
var isCallable$5 = isCallable$m;
var hasOwn = hasOwnProperty_1;
var fails$5 = fails$j;
var html = html$2;
var arraySlice = arraySlice$1;
var createElement = documentCreateElement$2;
var validateArgumentsLength = validateArgumentsLength$1;
var IS_IOS$1 = engineIsIos;
var IS_NODE$2 = engineIsNode;

var set = global$b.setImmediate;
var clear = global$b.clearImmediate;
var process$2 = global$b.process;
var Dispatch = global$b.Dispatch;
var Function$1 = global$b.Function;
var MessageChannel = global$b.MessageChannel;
var String$1 = global$b.String;
var counter = 0;
var queue$1 = {};
var ONREADYSTATECHANGE = "onreadystatechange";
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global$b.location;
} catch (error) {
  /* empty */
}

var run = function (id) {
  if (hasOwn(queue$1, id)) {
    var fn = queue$1[id];
    delete queue$1[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$b.postMessage(String$1(id), location.protocol + "//" + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable$5(handler) ? handler : Function$1(handler);
    var args = arraySlice(arguments, 1);
    queue$1[++counter] = function () {
      apply$1(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue$1[id];
  };
  // Node.js 0.8-
  if (IS_NODE$2) {
    defer = function (id) {
      process$2.nextTick(runner(id));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$3(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$b.addEventListener &&
    isCallable$5(global$b.postMessage) &&
    !global$b.importScripts &&
    location &&
    location.protocol !== "file:" &&
    !fails$5(post)
  ) {
    defer = post;
    global$b.addEventListener("message", listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in createElement("script")) {
    defer = function (id) {
      html.appendChild(createElement("script"))[ONREADYSTATECHANGE] =
        function () {
          html.removeChild(this);
          run(id);
        };
    };
    // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear,
};

var userAgent$1 = engineUserAgent;
var global$a = global$m;

var engineIsIosPebble =
  /ipad|iphone|ipod/i.test(userAgent$1) && global$a.Pebble !== undefined;

var userAgent = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

var global$9 = global$m;
var bind$2 = functionBindContext;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$1 = engineIsNode;

var MutationObserver =
  global$9.MutationObserver || global$9.WebKitMutationObserver;
var document$2 = global$9.document;
var process$1 = global$9.process;
var Promise$1 = global$9.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(
  global$9,
  "queueMicrotask"
);
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify$1();
        else last = undefined;
        throw error;
      }
    }
    last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (
    !IS_IOS &&
    !IS_NODE$1 &&
    !IS_WEBOS_WEBKIT &&
    MutationObserver &&
    document$2
  ) {
    toggle = true;
    node = document$2.createTextNode("");
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = bind$2(promise.then, promise);
    notify$1 = function () {
      then(flush);
    };
    // Node.js without promises
  } else if (IS_NODE$1) {
    notify$1 = function () {
      process$1.nextTick(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessage
    // - onreadystatechange
    // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind$2(macrotask, global$9);
    notify$1 = function () {
      macrotask(flush);
    };
  }
}

var microtask$1 =
  queueMicrotask ||
  function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify$1();
    }
    last = task;
  };

var global$8 = global$m;

var hostReportErrors$1 = function (a, b) {
  var console = global$8.console;
  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};

var perform$3 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var Queue$1 = function () {
  this.head = null;
  this.tail = null;
};

Queue$1.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    if (this.head) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry) this.tail = null;
      return entry.item;
    }
  },
};

var queue = Queue$1;

var global$7 = global$m;

var promiseNativeConstructor = global$7.Promise;

var engineIsBrowser = typeof window == "object" && typeof Deno != "object";

var global$6 = global$m;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var isCallable$4 = isCallable$m;
var isForced = isForced_1;
var inspectSource = inspectSource$4;
var wellKnownSymbol$6 = wellKnownSymbol$g;
var IS_BROWSER = engineIsBrowser;
var V8_VERSION = engineV8Version;

NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var SPECIES$1 = wellKnownSymbol$6("species");
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$4(
  global$6.PromiseRejectionEvent
);

var FORCED_PROMISE_CONSTRUCTOR$5 = isForced("Promise", function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
  var GLOBAL_CORE_JS_PROMISE =
    PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE))
    return false;
  // Detect correctness of subclassing with @@species support
  var promise = new NativePromiseConstructor$3(function (resolve) {
    resolve(1);
  });
  var FakePromise = function (exec) {
    exec(
      function () {
        /* empty */
      },
      function () {
        /* empty */
      }
    );
  };
  var constructor = (promise.constructor = {});
  constructor[SPECIES$1] = FakePromise;
  SUBCLASSING =
    promise.then(function () {
      /* empty */
    }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return (
    !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_PROMISE_REJECTION_EVENT$1
  );
});

var promiseConstructorDetection = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
  SUBCLASSING: SUBCLASSING,
};

var newPromiseCapability$2 = {};

var aCallable$4 = aCallable$7;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined)
      throw TypeError("Bad Promise constructor");
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$4(resolve);
  this.reject = aCallable$4(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var $$6 = _export;
var IS_NODE = engineIsNode;
var global$5 = global$m;
var call$9 = functionCall;
var defineBuiltIn$2 = defineBuiltIn$7;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$3;
var setSpecies = setSpecies$1;
var aCallable$3 = aCallable$7;
var isCallable$3 = isCallable$m;
var isObject$1 = isObject$7;
var anInstance = anInstance$1;
var speciesConstructor = speciesConstructor$1;
var task = task$1.set;
var microtask = microtask$1;
var hostReportErrors = hostReportErrors$1;
var perform$2 = perform$3;
var Queue = queue;
var InternalStateModule = internalState;
var NativePromiseConstructor$2 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;

var PROMISE = "Promise";
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT =
  PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype$1 =
  NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
var PromiseConstructor = NativePromiseConstructor$2;
var PromisePrototype = NativePromisePrototype$1;
var TypeError$1 = global$5.TypeError;
var document$1 = global$5.document;
var process = global$5.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;

var DISPATCH_EVENT = !!(
  document$1 &&
  document$1.createEvent &&
  global$5.dispatchEvent
);
var UNHANDLED_REJECTION = "unhandledrejection";
var REJECTION_HANDLED = "rejectionhandled";
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject$1(it) && isCallable$3((then = it.then)) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError$1("Promise-chain cycle"));
      } else if ((then = isThenable(result))) {
        call$9(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while ((reaction = reactions.get())) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent("Event");
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$5.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$5["on" + name]))
    handler(event);
  else if (name === UNHANDLED_REJECTION)
    hostReportErrors("Unhandled promise rejection", reason);
};

var onUnhandled = function (state) {
  call$9(task, global$5, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function () {
        if (IS_NODE) {
          process.emit("unhandledRejection", value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call$9(task, global$5, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit("rejectionHandled", promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$1 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value)
      throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call$9(
            then,
            value,
            bind$1(internalResolve, wrapper, state),
            bind$1(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR$4) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable$3(executor);
    call$9(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined,
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn$2(
    PromisePrototype,
    "then",
    function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(
        speciesConstructor(this, PromiseConstructor)
      );
      state.parent = true;
      reaction.ok = isCallable$3(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable$3(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      if (state.state == PENDING) state.reactions.add(reaction);
      else
        microtask(function () {
          callReaction(reaction, state);
        });
      return reaction.promise;
    }
  );

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind$1(internalResolve, state);
    this.reject = bind$1(internalReject, state);
  };

  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (
    isCallable$3(NativePromiseConstructor$2) &&
    NativePromisePrototype$1 !== Object.prototype
  ) {
    nativeThen = NativePromisePrototype$1.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn$2(
        NativePromisePrototype$1,
        "then",
        function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            call$9(nativeThen, that, resolve, reject);
          }).then(onFulfilled, onRejected);
          // https://github.com/zloirock/core-js/issues/640
        },
        { unsafe: true }
      );
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype$1.constructor;
    } catch (error) {
      /* empty */
    }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype$1, PromisePrototype);
    }
  }
}

$$6(
  {
    global: true,
    constructor: true,
    wrap: true,
    forced: FORCED_PROMISE_CONSTRUCTOR$4,
  },
  {
    Promise: PromiseConstructor,
  }
);

setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

var wellKnownSymbol$5 = wellKnownSymbol$g;
var Iterators$1 = iterators;

var ITERATOR$3 = wellKnownSymbol$5("iterator");
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return (
    it !== undefined &&
    (Iterators$1.Array === it || ArrayPrototype[ITERATOR$3] === it)
  );
};

var classof$1 = classof$5;
var getMethod$2 = getMethod$4;
var Iterators = iterators;
var wellKnownSymbol$4 = wellKnownSymbol$g;

var ITERATOR$2 = wellKnownSymbol$4("iterator");

var getIteratorMethod$2 = function (it) {
  if (it != undefined)
    return (
      getMethod$2(it, ITERATOR$2) ||
      getMethod$2(it, "@@iterator") ||
      Iterators[classof$1(it)]
    );
};

var call$8 = functionCall;
var aCallable$2 = aCallable$7;
var anObject$5 = anObject$e;
var tryToString$1 = tryToString$4;
var getIteratorMethod$1 = getIteratorMethod$2;

var $TypeError$2 = TypeError;

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod =
    arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable$2(iteratorMethod))
    return anObject$5(call$8(iteratorMethod, argument));
  throw $TypeError$2(tryToString$1(argument) + " is not iterable");
};

var call$7 = functionCall;
var anObject$4 = anObject$e;
var getMethod$1 = getMethod$4;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$4(iterator);
  try {
    innerResult = getMethod$1(iterator, "return");
    if (!innerResult) {
      if (kind === "throw") throw value;
      return value;
    }
    innerResult = call$7(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === "throw") throw value;
  if (innerError) throw innerResult;
  anObject$4(innerResult);
  return value;
};

var bind = functionBindContext;
var call$6 = functionCall;
var anObject$3 = anObject$e;
var tryToString = tryToString$4;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var lengthOfArrayLike = lengthOfArrayLike$2;
var isPrototypeOf = objectIsPrototypeOf;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;

var $TypeError$1 = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$2 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, "normal", condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$3(value);
      return INTERRUPTED
        ? fn(value[0], value[1], stop)
        : fn(value[0], value[1]);
    }
    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError$1(tryToString(iterable) + " is not iterable");
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (
        index = 0, length = lengthOfArrayLike(iterable);
        length > index;
        index++
      ) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      }
      return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = call$6(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, "throw", error);
    }
    if (
      typeof result == "object" &&
      result &&
      isPrototypeOf(ResultPrototype, result)
    )
      return result;
  }
  return new Result(false);
};

var wellKnownSymbol$3 = wellKnownSymbol$g;

var ITERATOR$1 = wellKnownSymbol$3("iterator");
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    return: function () {
      SAFE_CLOSING = true;
    },
  };
  iteratorWithReturn[ITERATOR$1] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$1] = function () {
      return {
        next: function () {
          return { done: (ITERATION_SUPPORT = true) };
        },
      };
    };
    exec(object);
  } catch (error) {
    /* empty */
  }
  return ITERATION_SUPPORT;
};

var NativePromiseConstructor$1 = promiseNativeConstructor;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

var promiseStaticsIncorrectIteration =
  FORCED_PROMISE_CONSTRUCTOR$3 ||
  !checkCorrectnessOfIteration(function (iterable) {
    NativePromiseConstructor$1.all(iterable).then(undefined, function () {
      /* empty */
    });
  });

var $$5 = _export;
var call$5 = functionCall;
var aCallable$1 = aCallable$7;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$1 = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$$5(
  {
    target: "Promise",
    stat: true,
    forced: PROMISE_STATICS_INCORRECT_ITERATION$1,
  },
  {
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$2.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform$1(function () {
        var $promiseResolve = aCallable$1(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$1(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call$5($promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    },
  }
);

var $$4 = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor = promiseNativeConstructor;
var getBuiltIn$1 = getBuiltIn$8;
var isCallable$2 = isCallable$m;
var defineBuiltIn$1 = defineBuiltIn$7;

var NativePromisePrototype =
  NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$$4(
  {
    target: "Promise",
    proto: true,
    forced: FORCED_PROMISE_CONSTRUCTOR$2,
    real: true,
  },
  {
    catch: function (onRejected) {
      return this.then(undefined, onRejected);
    },
  }
);

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (isCallable$2(NativePromiseConstructor)) {
  var method = getBuiltIn$1("Promise").prototype["catch"];
  if (NativePromisePrototype["catch"] !== method) {
    defineBuiltIn$1(NativePromisePrototype, "catch", method, { unsafe: true });
  }
}

var $$3 = _export;
var call$4 = functionCall;
var aCallable = aCallable$7;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$$3(
  {
    target: "Promise",
    stat: true,
    forced: PROMISE_STATICS_INCORRECT_ITERATION,
  },
  {
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$1.f(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable(C.resolve);
        iterate(iterable, function (promise) {
          call$4($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    },
  }
);

var $$2 = _export;
var call$3 = functionCall;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$$2(
  { target: "Promise", stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 },
  {
    reject: function reject(r) {
      var capability = newPromiseCapabilityModule.f(this);
      call$3(capability.reject, undefined, r);
      return capability.promise;
    },
  }
);

var anObject$2 = anObject$e;
var isObject = isObject$7;
var newPromiseCapability = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$2(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$1 = _export;
var getBuiltIn = getBuiltIn$8;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve = promiseResolve$1;

getBuiltIn("Promise");

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$$1(
  { target: "Promise", stat: true, forced: FORCED_PROMISE_CONSTRUCTOR },
  {
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    },
  }
);

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0,
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement("span").classList;
var DOMTokenListPrototype$1 =
  classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype =
  DOMTokenListPrototype$1 === Object.prototype
    ? undefined
    : DOMTokenListPrototype$1;

var global$4 = global$m;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var wellKnownSymbol$2 = wellKnownSymbol$g;

var ITERATOR = wellKnownSymbol$2("iterator");
var TO_STRING_TAG = wellKnownSymbol$2("toStringTag");
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues)
      try {
        createNonEnumerableProperty$1(
          CollectionPrototype,
          ITERATOR,
          ArrayValues
        );
      } catch (error) {
        CollectionPrototype[ITERATOR] = ArrayValues;
      }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty$1(
        CollectionPrototype,
        TO_STRING_TAG,
        COLLECTION_NAME
      );
    }
    if (DOMIterables[COLLECTION_NAME])
      for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (
          CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]
        )
          try {
            createNonEnumerableProperty$1(
              CollectionPrototype,
              METHOD_NAME,
              ArrayIteratorMethods[METHOD_NAME]
            );
          } catch (error) {
            CollectionPrototype[METHOD_NAME] =
              ArrayIteratorMethods[METHOD_NAME];
          }
      }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(
    global$4[COLLECTION_NAME] && global$4[COLLECTION_NAME].prototype,
    COLLECTION_NAME
  );
}

handlePrototype(DOMTokenListPrototype, "DOMTokenList");

var fails$4 = fails$j;
var global$3 = global$m;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$3.RegExp;

var UNSUPPORTED_Y$1 = fails$4(function () {
  var re = $RegExp$2("a", "y");
  re.lastIndex = 2;
  return re.exec("abcd") != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY =
  UNSUPPORTED_Y$1 ||
  fails$4(function () {
    return !$RegExp$2("a", "y").sticky;
  });

var BROKEN_CARET =
  UNSUPPORTED_Y$1 ||
  fails$4(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2("^r", "gy");
    re.lastIndex = 2;
    return re.exec("str") != null;
  });

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1,
};

var fails$3 = fails$j;
var global$2 = global$m;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$2.RegExp;

var regexpUnsupportedDotAll = fails$3(function () {
  var re = $RegExp$1(".", "s");
  return !(re.dotAll && re.exec("\n") && re.flags === "s");
});

var fails$2 = fails$j;
var global$1 = global$m;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$1.RegExp;

var regexpUnsupportedNcg = fails$2(function () {
  var re = $RegExp("(?<a>b)", "g");
  return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$2 = functionCall;
var uncurryThis$4 = functionUncurryThis;
var toString$2 = toString$3;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4.exports;
var create = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared("native-string-replace", String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$3 = uncurryThis$4("".charAt);
var indexOf = uncurryThis$4("".indexOf);
var replace$1 = uncurryThis$4("".replace);
var stringSlice$3 = uncurryThis$4("".slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$2(nativeExec, re1, "a");
  call$2(nativeExec, re2, "a");
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

var PATCH =
  UPDATES_LAST_INDEX_WRONG ||
  NPCG_INCLUDED ||
  UNSUPPORTED_Y ||
  UNSUPPORTED_DOT_ALL ||
  UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString$2(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$2(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$2(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$1(flags, "y", "");
      if (indexOf(flags, "g") === -1) {
        flags += "g";
      }

      strCopy = stringSlice$3(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (
        re.lastIndex > 0 &&
        (!re.multiline ||
          (re.multiline && charAt$3(str, re.lastIndex - 1) !== "\n"))
      ) {
        source = "(?: " + source + ")";
        strCopy = " " + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp("^(?:" + source + ")", flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call$2(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$3(match.input, charsAdded);
        match[0] = stringSlice$3(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call$2(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $ = _export;
var exec = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$(
  { target: "RegExp", proto: true, forced: /./.exec !== exec },
  {
    exec: exec,
  }
);

// TODO: Remove from `core-js@4` since it's moved to entry points

var uncurryThis$3 = functionUncurryThis;
var defineBuiltIn = defineBuiltIn$7;
var regexpExec$1 = regexpExec$2;
var fails$1 = fails$j;
var wellKnownSymbol$1 = wellKnownSymbol$g;
var createNonEnumerableProperty = createNonEnumerableProperty$5;

var SPECIES = wellKnownSymbol$1("species");
var RegExpPrototype = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$1(KEY);

  var DELEGATES_TO_SYMBOL = !fails$1(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () {
      return 7;
    };
    return ""[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC =
    DELEGATES_TO_SYMBOL &&
    !fails$1(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === "split") {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () {
          return re;
        };
        re.flags = "";
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () {
        execCalled = true;
        return null;
      };

      re[SYMBOL]("");
      return !execCalled;
    });

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
    var uncurriedNativeRegExpMethod = uncurryThis$3(/./[SYMBOL]);
    var methods = exec(
      SYMBOL,
      ""[KEY],
      function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$3(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: uncurriedNativeRegExpMethod(regexp, str, arg2),
            };
          }
          return {
            done: true,
            value: uncurriedNativeMethod(str, regexp, arg2),
          };
        }
        return { done: false };
      }
    );

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], "sham", true);
};

var uncurryThis$2 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
var toString$1 = toString$3;
var requireObjectCoercible$1 = requireObjectCoercible$4;

var charAt$2 = uncurryThis$2("".charAt);
var charCodeAt = uncurryThis$2("".charCodeAt);
var stringSlice$2 = uncurryThis$2("".slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$1(requireObjectCoercible$1($this));
    var position = toIntegerOrInfinity$1(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size)
      return CONVERT_TO_STRING ? "" : undefined;
    first = charCodeAt(S, position);
    return first < 0xd800 ||
      first > 0xdbff ||
      position + 1 === size ||
      (second = charCodeAt(S, position + 1)) < 0xdc00 ||
      second > 0xdfff
      ? CONVERT_TO_STRING
        ? charAt$2(S, position)
        : first
      : CONVERT_TO_STRING
      ? stringSlice$2(S, position, position + 2)
      : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true),
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

var uncurryThis$1 = functionUncurryThis;
var toObject = toObject$4;

var floor = Math.floor;
var charAt = uncurryThis$1("".charAt);
var replace = uncurryThis$1("".replace);
var stringSlice$1 = uncurryThis$1("".slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (
  matched,
  str,
  position,
  captures,
  namedCaptures,
  replacement
) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case "$":
        return "$";
      case "&":
        return matched;
      case "`":
        return stringSlice$1(str, 0, position);
      case "'":
        return stringSlice$1(str, tailPos);
      case "<":
        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m)
            return captures[f - 1] === undefined
              ? charAt(ch, 1)
              : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? "" : capture;
  });
};

var call$1 = functionCall;
var anObject$1 = anObject$e;
var isCallable$1 = isCallable$m;
var classof = classofRaw$1;
var regexpExec = regexpExec$2;

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$1(exec)) {
    var result = call$1(exec, R, S);
    if (result !== null) anObject$1(result);
    return result;
  }
  if (classof(R) === "RegExp") return call$1(regexpExec, R, S);
  throw $TypeError("RegExp#exec called on incompatible receiver");
};

var apply = functionApply;
var call = functionCall;
var uncurryThis = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var fails = fails$j;
var anObject = anObject$e;
var isCallable = isCallable$m;
var toIntegerOrInfinity = toIntegerOrInfinity$4;
var toLength = toLength$2;
var toString = toString$3;
var requireObjectCoercible = requireObjectCoercible$4;
var advanceStringIndex = advanceStringIndex$1;
var getMethod = getMethod$4;
var getSubstitution = getSubstitution$1;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol = wellKnownSymbol$g;

var REPLACE = wellKnownSymbol("replace");
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis("".indexOf);
var stringSlice = uncurryThis("".slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return "a".replace(/./, "$0") === "$0";
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]("a", "$0") === "";
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: "7" };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return "".replace(re, "$<a>") !== "7";
});

// @@replace logic
fixRegExpWellKnownSymbolLogic(
  "replace",
  function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      ? "$"
      : "$0";

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer =
          searchValue == undefined
            ? undefined
            : getMethod(searchValue, REPLACE);
        return replacer
          ? call(replacer, searchValue, O, replaceValue)
          : call(nativeReplace, toString(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject(this);
        var S = toString(string);

        if (
          typeof replaceValue == "string" &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, "$<") === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable(replaceValue);
        if (!functionalReplace) replaceValue = toString(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec(rx, S);
          if (result === null) break;

          push(results, result);
          if (!global) break;

          var matchStr = toString(result[0]);
          if (matchStr === "")
            rx.lastIndex = advanceStringIndex(
              S,
              toLength(rx.lastIndex),
              fullUnicode
            );
        }

        var accumulatedResult = "";
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString(result[0]);
          var position = max(
            min(toIntegerOrInfinity(result.index), S.length),
            0
          );
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++)
            push(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S);
            if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
            var replacement = toString(
              apply(replaceValue, undefined, replacerArgs)
            );
          } else {
            replacement = getSubstitution(
              matched,
              S,
              position,
              captures,
              namedCaptures,
              replaceValue
            );
          }
          if (position >= nextSourcePosition) {
            accumulatedResult +=
              stringSlice(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + stringSlice(S, nextSourcePosition);
      },
    ];
  },
  !REPLACE_SUPPORTS_NAMED_GROUPS ||
    !REPLACE_KEEPS_$0 ||
    REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value);
        });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

var icon = `data:image/png;base64,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`;

const resolveWalletUrl = (network, walletUrl) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://app.mynearwallet.com";

    case "testnet":
      return "https://testnet.mynearwallet.com";

    default:
      throw new Error("Invalid wallet url");
  }
};

const setupWalletState = (params, network) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const near = yield connect(
      Object.assign(
        Object.assign(
          {
            keyStore,
            walletUrl: params.walletUrl,
          },
          network
        ),
        {
          headers: {},
        }
      )
    );
    const wallet = new WalletConnection(near, "near_app");
    return {
      wallet,
      keyStore,
    };
  });

const MyNearWallet = ({ metadata, options, store, params, logger }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const _state = yield setupWalletState(params, options.network);

    const getAccounts = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const accountId = _state.wallet.getAccountId();

        const account = _state.wallet.account();

        if (!accountId || !account) {
          return [];
        }

        try {
          const publicKey = yield account.connection.signer.getPublicKey(
            account.accountId,
            options.network.networkId
          );
          return [
            {
              accountId,
              publicKey: publicKey.toString(),
            },
          ];
        } catch (e) {
          return [
            {
              accountId,
              publicKey: undefined,
            },
          ];
        }
      });

    const transformTransactions = (transactions$1) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const account = _state.wallet.account();

        const { networkId, signer, provider } = account.connection;
        const localKey = yield signer.getPublicKey(
          account.accountId,
          networkId
        );
        return Promise.all(
          transactions$1.map((transaction, index) =>
            __awaiter(void 0, void 0, void 0, function* () {
              const actions = transaction.actions.map((action) =>
                createAction(action)
              );
              const accessKey = yield account.accessKeyForTransaction(
                transaction.receiverId,
                actions,
                localKey
              );

              if (!accessKey) {
                throw new Error(
                  `Failed to find matching key for transaction sent to ${transaction.receiverId}`
                );
              }

              const block = yield provider.block({
                finality: "final",
              });
              return transactions.createTransaction(
                account.accountId,
                utils.PublicKey.from(accessKey.public_key),
                transaction.receiverId,
                accessKey.access_key.nonce + index + 1,
                actions,
                utils.serialize.base_decode(block.header.hash)
              );
            })
          )
        );
      });

    return {
      signIn({ contractId, methodNames, successUrl, failureUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
          const existingAccounts = yield getAccounts();

          if (existingAccounts.length) {
            return existingAccounts;
          }

          yield _state.wallet.requestSignIn({
            contractId,
            methodNames,
            successUrl,
            failureUrl,
          });
          return getAccounts();
        });
      },

      signOut() {
        return __awaiter(this, void 0, void 0, function* () {
          if (_state.wallet.isSignedIn()) {
            _state.wallet.signOut();
          }
        });
      },

      getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
          return getAccounts();
        });
      },

      verifyOwner({ message, callbackUrl, meta }) {
        return __awaiter(this, void 0, void 0, function* () {
          logger.log("verifyOwner", {
            message,
          });

          const account = _state.wallet.account();

          if (!account) {
            throw new Error("Wallet not signed in");
          }

          const locationUrl =
            typeof window !== "undefined" ? window.location.href : "";
          const url = callbackUrl || locationUrl;

          if (!url) {
            throw new Error(`The callbackUrl is missing for ${metadata.name}`);
          }

          const encodedUrl = encodeURIComponent(url);
          const extraMeta = meta ? `&meta=${meta}` : "";
          window.location.replace(
            `${params.walletUrl}/verify-owner?message=${message}&callbackUrl=${encodedUrl}${extraMeta}`
          );
          return;
        });
      },

      signAndSendTransaction({ signerId, receiverId, actions, callbackUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
          logger.log("signAndSendTransaction", {
            signerId,
            receiverId,
            actions,
            callbackUrl,
          });
          const { contract } = store.getState();

          if (!_state.wallet.isSignedIn() || !contract) {
            throw new Error("Wallet not signed in");
          }

          const account = _state.wallet.account();

          return account["signAndSendTransaction"]({
            receiverId: receiverId || contract.contractId,
            actions: actions.map((action) => createAction(action)),
            walletCallbackUrl: callbackUrl,
          });
        });
      },

      signAndSendTransactions({ transactions, callbackUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
          logger.log("signAndSendTransactions", {
            transactions,
            callbackUrl,
          });

          if (!_state.wallet.isSignedIn()) {
            throw new Error("Wallet not signed in");
          }

          return _state.wallet.requestSignTransactions({
            transactions: yield transformTransactions(transactions),
            callbackUrl,
          });
        });
      },

      buildImportAccountsUrl() {
        return `${params.walletUrl}/batch-import`;
      },
    };
  });

function setupFastAuth({
  walletUrl = "https://alphatest.near.org",
  iconUrl = icon,
  deprecated = false,
  successUrl = "",
  failureUrl = "",
} = {}) {
  return () =>
    __awaiter(this, void 0, void 0, function* () {
      return {
        id: "fast-auth",
        type: "browser",
        metadata: {
          name: "FastAuth",
          description:
            "Fast auth to quickly spin up an account and interact with Near blockchain.",
          iconUrl,
          deprecated,
          available: true,
          successUrl,
          failureUrl,
        },
        init: (options) => {
          return MyNearWallet(
            Object.assign(Object.assign({}, options), {
              params: {
                walletUrl,
              },
            })
          );
        },
      };
    });
}

export { setupFastAuth };
