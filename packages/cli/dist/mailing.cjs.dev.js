'use strict';

var yargs = require('yargs/yargs');
var http = require('http');
var path = require('path');
var open = require('open');
var fsExtra = require('fs-extra');
var chalk = require('chalk');
var mjmlReact = require('mjml-react');
var process$1 = require('process');
var url = require('url');
var next = require('next');
var prompts = require('prompts');
var tree = require('tree-node-cli');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var yargs__default = /*#__PURE__*/_interopDefault(yargs);
var http__default = /*#__PURE__*/_interopDefault(http);
var open__default = /*#__PURE__*/_interopDefault(open);
var chalk__default = /*#__PURE__*/_interopDefault(chalk);
var next__default = /*#__PURE__*/_interopDefault(next);
var prompts__default = /*#__PURE__*/_interopDefault(prompts);
var tree__default = /*#__PURE__*/_interopDefault(tree);

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function pathHasExistingEmailsDir(path) {
  // could do a better check of whether this exists
  return fsExtra.existsSync(path);
}

function getExistingEmailsDir() {
  if (pathHasExistingEmailsDir("./src/emails")) {
    return path.resolve("./src/emails");
  }

  if (pathHasExistingEmailsDir("./emails")) {
    return path.resolve("./emails");
  }

  return null;
}
function getPreviewsDirectory() {
  var existingEmailsDir = getExistingEmailsDir();
  return existingEmailsDir ? path.resolve(existingEmailsDir, "previews") : null;
}
function getPackageJSON() {
  return JSON.parse(fsExtra.readFileSync("./package.json").toString());
}

process.env.DEBUG;
function log(message) {
  var _console;

  for (var _len = arguments.length, optionalParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    optionalParams[_key - 1] = arguments[_key];
  }

  (_console = console).log.apply(_console, [chalk__default["default"].blue("[mailing]"), message].concat(optionalParams));
}
function error(message) {
  var _console2;

  for (var _len2 = arguments.length, optionalParams = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    optionalParams[_key2 - 1] = arguments[_key2];
  }

  (_console2 = console).error.apply(_console2, [chalk__default["default"].red("[mailing]"), message].concat(optionalParams));
}

function renderNotFound(res) {
  res.writeHead(404);
  res.end("Not found");
}

var cache = {};
function createIntercept(req, res) {
  var body = "";
  req.on("data", function onData(data) {
    body += data;
    if (body.length > 1e8) req.destroy();
  });
  req.on("end", function onEnd() {
    var id = Date.now();
    cache[id] = JSON.parse(body);
    res.writeHead(201);
    res.end(JSON.stringify({
      id: id
    }));
    log("Cached intercept preview at /previews/".concat(id));
  });
}
function showIntercept(req, res) {
  var _req$url;

  var parts = (_req$url = req.url) === null || _req$url === void 0 ? void 0 : _req$url.split("/");
  var id = parts ? parts[parts.length - 1].split(".")[0] : "";
  var data = cache[id];

  if (data) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(data));
  } else {
    renderNotFound(res);
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _asyncIterator(iterable) {
  var method,
      async,
      sync,
      retry = 2;

  for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) {
    if (async && null != (method = iterable[async])) return method.call(iterable);
    if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable));
    async = "@@asyncIterator", sync = "@@iterator";
  }

  throw new TypeError("Object is not async iterable");
}

function AsyncFromSyncIterator(s) {
  function AsyncFromSyncIteratorContinuation(r) {
    if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
    var done = r.done;
    return Promise.resolve(r.value).then(function (value) {
      return {
        value: value,
        done: done
      };
    });
  }

  return AsyncFromSyncIterator = function (s) {
    this.s = s, this.n = s.next;
  }, AsyncFromSyncIterator.prototype = {
    s: null,
    n: null,
    next: function () {
      return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
    },
    return: function (value) {
      var ret = this.s.return;
      return void 0 === ret ? Promise.resolve({
        value: value,
        done: !0
      }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
    },
    throw: function (value) {
      var thr = this.s.return;
      return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
    }
  }, new AsyncFromSyncIterator(s);
}

function render(component) {
  return mjmlReact.render(component, {
    validationLevel: "soft",
    minify: undefined
  });
}

function showPreviewIndex(req, res) {
  var previewsPath = getPreviewsDirectory();

  if (!req.url || !previewsPath) {
    return renderNotFound(res);
  }

  var previewCollections = fsExtra.readdirSync(previewsPath).filter(function (path) {
    return !/^\./.test(path);
  });
  var previews = previewCollections.map(function (p) {
    var previewPath = path.resolve(previewsPath, p);
    return [p, Object.keys(require(previewPath))];
  });

  try {
    res.writeHead(200);
    res.end(JSON.stringify(previews));
  } catch (e) {
    log("caught error rendering mjml to html", e);
    res.writeHead(500);
    res.end(JSON.stringify(e));
  }
}
function showPreview(req, res) {
  var previewsPath = getPreviewsDirectory();

  if (!req.url || !previewsPath) {
    return renderNotFound(res);
  } // previews


  var _req$url$split = req.url.split("/"),
      _req$url$split2 = _slicedToArray(_req$url$split, 4);
      _req$url$split2[0];
      _req$url$split2[1];
      var moduleName = _req$url$split2[2],
      functionNameJSON = _req$url$split2[3];

  var modulePath = path.resolve(previewsPath, moduleName);
  var functionName = functionNameJSON.replace(".json", "");
  var emailsPath = path.resolve(previewsPath, "..");

  for (var path$1 in require.cache) {
    if (path$1.startsWith(emailsPath)) {
      delete require.cache[path$1];
    }
  }

  var previewModule = require(modulePath);

  var component = previewModule[functionName]();

  if (component !== null && component !== void 0 && component.props) {
    try {
      var _render = render(component),
          html = _render.html,
          errors = _render.errors;

      if (errors.length) {
        error(errors);
      }

      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify({
        html: html,
        errors: errors
      }));
    } catch (e) {
      error("caught error rendering mjml to html", e);
      res.writeHead(500);
      res.end(JSON.stringify(e));
    }
  } else {
    var msg = "".concat(functionName, "() from ").concat(modulePath, " must return a react component defined in ").concat(emailsPath);
    error(msg);
    res.writeHead(404);
    res.end(msg);
  }
}
function sendPreview(_x, _x2) {
  return _sendPreview.apply(this, arguments);
}

function _sendPreview() {
  _sendPreview = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var previewsPath, buffers, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk, data, body, html, to, subject, component, modulePath, module, sendMail;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            previewsPath = getPreviewsDirectory();

            if (previewsPath) {
              _context.next = 4;
              break;
            }

            error("Previews path not found");
            return _context.abrupt("return", renderNotFound(res));

          case 4:
            buffers = [];
            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context.prev = 7;
            _iterator = _asyncIterator(req);

          case 9:
            _context.next = 11;
            return _iterator.next();

          case 11:
            if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
              _context.next = 17;
              break;
            }

            chunk = _step.value;
            buffers.push(chunk);

          case 14:
            _iteratorAbruptCompletion = false;
            _context.next = 9;
            break;

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](7);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 23:
            _context.prev = 23;
            _context.prev = 24;

            if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
              _context.next = 28;
              break;
            }

            _context.next = 28;
            return _iterator["return"]();

          case 28:
            _context.prev = 28;

            if (!_didIteratorError) {
              _context.next = 31;
              break;
            }

            throw _iteratorError;

          case 31:
            return _context.finish(28);

          case 32:
            return _context.finish(23);

          case 33:
            data = Buffer.concat(buffers).toString();
            body = JSON.parse(data); // Caller can provide html or preview references, html takes precedence.

            html = body.html, to = body.to, subject = body.subject;

            if (!html && body.previewClass && body.previewFunction) {
              modulePath = path.resolve(previewsPath, body.previewClass);
              delete require.cache[modulePath]; // clean require

              module = require(modulePath);
              component = module[body.previewFunction]();
            }

            if (!(!html && !component)) {
              _context.next = 42;
              break;
            }

            error("no html provided, no component found");
            res.writeHead(400);
            res.end(JSON.stringify({
              error: "no html provided, no component found"
            }));
            return _context.abrupt("return");

          case 42:
            sendMail = require(path.resolve(previewsPath, ".."));

            if (!(sendMail !== null && sendMail !== void 0 && sendMail["default"])) {
              error("sendMail not exported from ".concat(path.resolve(previewsPath, "..")));
            }

            _context.next = 46;
            return sendMail["default"]({
              html: html,
              component: component,
              to: to,
              forceDeliver: true,
              subject: subject
            });

          case 46:
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end("{}");

          case 49:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 19, 23, 33], [24,, 28, 32]]);
  }));
  return _sendPreview.apply(this, arguments);
}

var DEFAULT_PORT = 3883;
var command$1 = "preview";
var describe$1 = "start the email preview server";
var builder = {
  port: {
    "default": DEFAULT_PORT
  }
};
var handler$1 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(argv) {
    var port, dev, hostname, app, nextHandle, previewsPath, host, currentUrl, shouldReload, changeWatchPath;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(process.env.NODE_ENV === "test")) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return");

          case 2:
            if (!process.env.MM_DEV) {
              require("ts-node").register({
                compilerOptions: {
                  module: "commonjs",
                  jsx: "react-jsx",
                  moduleResolution: "node",
                  skipLibCheck: true
                }
              });

              require("@babel/register")({
                presets: [["@babel/react", {
                  runtime: "automatic"
                }], "@babel/preset-env"],
                compact: false
              });
            }

            port = (argv === null || argv === void 0 ? void 0 : argv.port) || DEFAULT_PORT;
            dev = !!process.env.MM_DEV;
            hostname = "localhost";
            app = next__default["default"]({
              dev: dev,
              hostname: hostname,
              port: port,
              dir: dev ? path.resolve(__dirname, "..") : __dirname
            });
            nextHandle = app.getRequestHandler();
            _context3.next = 10;
            return app.prepare();

          case 10:
            previewsPath = getPreviewsDirectory();

            if (previewsPath) {
              _context3.next = 14;
              break;
            }

            error("Could not find emails directory. Have you initialized the project with `mailing init`?");
            return _context3.abrupt("return");

          case 14:
            host = "http://".concat(hostname, ":").concat(port);
            currentUrl = "".concat(host, "/");
            shouldReload = false;
            http__default["default"].createServer( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
                var startTime, noLog, parsedUrl, pathname, query, showShouldReload;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        showShouldReload = function _showShouldReload(_req, res) {
                          res.writeHead(200);
                          res.end(JSON.stringify({
                            shouldReload: shouldReload
                          }));
                          shouldReload = false;
                        };

                        startTime = Date.now();
                        noLog = false;

                        if (req.url) {
                          _context.next = 6;
                          break;
                        }

                        res.end(404);
                        return _context.abrupt("return");

                      case 6:
                        parsedUrl = url.parse(req.url, true);
                        pathname = parsedUrl.pathname, query = parsedUrl.query; // Never cache anything

                        res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");
                        res.setHeader("Pragma", "no-cache");
                        res.setHeader("Expires", "-1");
                        currentUrl = "".concat(host).concat(req.url);
                        res.once("close", function () {
                          if (!noLog || process.env.MM_VERBOSE) log("".concat(res.statusCode, " ").concat(req.url, " ").concat(Date.now() - startTime, "ms"));
                        });
                        _context.prev = 13;

                        if (!(req.url === "/previews.json")) {
                          _context.next = 18;
                          break;
                        }

                        showPreviewIndex(req, res);
                        _context.next = 48;
                        break;

                      case 18:
                        if (!(req.url === "/should_reload.json")) {
                          _context.next = 23;
                          break;
                        }

                        noLog = true;
                        showShouldReload(req, res);
                        _context.next = 48;
                        break;

                      case 23:
                        if (!(req.url === "/intercepts" && req.method === "POST")) {
                          _context.next = 27;
                          break;
                        }

                        createIntercept(req, res);
                        _context.next = 48;
                        break;

                      case 27:
                        if (!(req.url === "/previews/send.json" && req.method === "POST")) {
                          _context.next = 32;
                          break;
                        }

                        _context.next = 30;
                        return sendPreview(req, res);

                      case 30:
                        _context.next = 48;
                        break;

                      case 32:
                        if (!/^\/intercepts\/[a-zA-Z0-9]+\.json/.test(req.url)) {
                          _context.next = 36;
                          break;
                        }

                        showIntercept(req, res);
                        _context.next = 48;
                        break;

                      case 36:
                        if (!/^\/previews\/.*\.json/.test(req.url)) {
                          _context.next = 40;
                          break;
                        }

                        showPreview(req, res);
                        _context.next = 48;
                        break;

                      case 40:
                        if (!/^\/_+next/.test(req.url)) {
                          _context.next = 46;
                          break;
                        }

                        noLog = true;
                        _context.next = 44;
                        return app.render(req, res, "".concat(pathname), query);

                      case 44:
                        _context.next = 48;
                        break;

                      case 46:
                        _context.next = 48;
                        return nextHandle(req, res, parsedUrl);

                      case 48:
                        _context.next = 56;
                        break;

                      case 50:
                        _context.prev = 50;
                        _context.t0 = _context["catch"](13);
                        error("caught error", _context.t0);
                        res.writeHead(500);
                        res.end(JSON.stringify(_context.t0));
                        return _context.abrupt("return");

                      case 56:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[13, 50]]);
              }));

              return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }()).listen(port, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      log("Running preview at ".concat(currentUrl));

                      if (argv.quiet) {
                        _context2.next = 4;
                        break;
                      }

                      _context2.next = 4;
                      return open__default["default"](currentUrl);

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }))).on("error", function onServerError(e) {
              if (e.code === "EADDRINUSE") {
                error("Port ".concat(port, " is taken, is mailing already running?"));
                process.exit(1);
              } else {
                error("Preview server error:", JSON.stringify(e));
              }
            }); // simple live reload implementation

            changeWatchPath = getExistingEmailsDir();

            if (changeWatchPath) {
              _context3.next = 22;
              break;
            }

            log("Error finding emails dir in . or ./src");
            return _context3.abrupt("return");

          case 22:
            fsExtra.watch(changeWatchPath, {
              recursive: true
            }, function (eventType, filename) {
              log("Detected ".concat(eventType, " on ").concat(filename, ", reloading"));
              delete require.cache[path.resolve(changeWatchPath, filename)];
              shouldReload = true;
            });
            log("Watching for changes to ".concat(path.relative(process$1.cwd(), changeWatchPath)));

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function handler(_x) {
    return _ref.apply(this, arguments);
  };
}();

var preview = /*#__PURE__*/Object.freeze({
  __proto__: null,
  command: command$1,
  describe: describe$1,
  builder: builder,
  handler: handler$1
});

function getPotentialEmailsDirPath() {
  if (fsExtra.existsSync("./src")) {
    return path.resolve("./src/emails");
  } else {
    return path.resolve("./emails");
  }
}

function generateEmailsDirectory(_x) {
  return _generateEmailsDirectory.apply(this, arguments);
}

function _generateEmailsDirectory() {
  _generateEmailsDirectory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var isTypescript, emailsDir, existingEmailsPath, targetEmailsDir, emailsPath, response, path$1;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isTypescript = _ref.isTypescript, emailsDir = _ref.emailsDir;
            existingEmailsPath = getExistingEmailsDir();

            if (!existingEmailsPath) {
              _context.next = 5;
              break;
            }

            // if it does abort
            log("Emails directory found at ".concat(existingEmailsPath));
            return _context.abrupt("return", false);

          case 5:
            if (!emailsDir) {
              _context.next = 9;
              break;
            }

            targetEmailsDir = emailsDir;
            _context.next = 14;
            break;

          case 9:
            emailsPath = getPotentialEmailsDirPath();
            _context.next = 12;
            return prompts__default["default"]({
              type: "text",
              name: "path",
              message: "Where should we put your emails?",
              initial: "./" + path.relative(process.cwd(), emailsPath) + "/"
            });

          case 12:
            response = _context.sent;
            targetEmailsDir = response.path;

          case 14:
            if (!targetEmailsDir) {
              _context.next = 22;
              break;
            }

            // copy the emails dir template in!
            path$1 = "generator_templates/".concat(isTypescript ? "ts" : "js", "/emails");
            _context.next = 18;
            return fsExtra.copySync(path.resolve(__dirname, path$1), targetEmailsDir, {
              overwrite: false
            });

          case 18:
            log("Generated your emails dir at ".concat(targetEmailsDir, ":\n").concat(tree__default["default"](targetEmailsDir)));
            return _context.abrupt("return", true);

          case 22:
            log("OK, bye!");
            return _context.abrupt("return", false);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generateEmailsDirectory.apply(this, arguments);
}

function looksLikeTypescriptProject() {
  var _pkg$devDependencies, _pkg$dependencies;

  if (fsExtra.existsSync("./tsconfig.json")) {
    return true;
  }

  var pkg = getPackageJSON();
  return !!((_pkg$devDependencies = pkg.devDependencies) !== null && _pkg$devDependencies !== void 0 && _pkg$devDependencies.typescript || (_pkg$dependencies = pkg.dependencies) !== null && _pkg$dependencies !== void 0 && _pkg$dependencies.typescript);
}

var command = ["$0", "init"];
var describe = "initialize mailing in your app";
var handler = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(args) {
    var isTypescript, ts, options;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(args); // check if emails directory already exists

            if (fsExtra.existsSync("./package.json")) {
              _context.next = 4;
              break;
            }

            log("No package.json found. Please run from the project root.");
            return _context.abrupt("return");

          case 4:
            if (getExistingEmailsDir()) {
              _context.next = 20;
              break;
            }

            if (!("false" === args.typescript)) {
              _context.next = 9;
              break;
            }

            isTypescript = false;
            _context.next = 17;
            break;

          case 9:
            if (!args.typescript) {
              _context.next = 13;
              break;
            }

            isTypescript = true;
            _context.next = 17;
            break;

          case 13:
            _context.next = 15;
            return prompts__default["default"]({
              type: "confirm",
              name: "value",
              message: "Are you using typescript?",
              initial: looksLikeTypescriptProject()
            });

          case 15:
            ts = _context.sent;
            isTypescript = ts.value;

          case 17:
            options = {
              isTypescript: isTypescript,
              emailsDir: args.emails_dir
            };
            _context.next = 20;
            return generateEmailsDirectory(options);

          case 20:
            handler$1(args);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handler(_x) {
    return _ref.apply(this, arguments);
  };
}();

var init = /*#__PURE__*/Object.freeze({
  __proto__: null,
  command: command,
  describe: describe,
  handler: handler
});

yargs__default["default"](process.argv.slice(2)).command(preview).command(init).help().argv;
