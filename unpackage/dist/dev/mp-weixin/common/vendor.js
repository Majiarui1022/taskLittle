(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {return;}var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!****************************************!*\
  !*** F:/ruanjian/task/task/pages.json ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 5 */
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 6 */
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200402001","_inBundle":false,"_integrity":"sha512-Mdhd/IRuUMHWPj3TtWrBb0kghRBA0YiO2L2THMFvhCTfQDSoSq1vwOdAx5n/8fIORAvG0uVQoYl73xeVFZML5A==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200402001.tgz","_shasum":"5f66f5dc252ac00c6064857dee8251ee51aa2391","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"bfdbb7b3000599679ef8cb29a969e6bd447b00c7","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200402001"};

/***/ }),
/* 7 */
/*!*********************************************************!*\
  !*** F:/ruanjian/task/task/pages.json?{"type":"style"} ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/wechart/wechart": { "navigationBarTitleText": "" }, "pages/today/today": { "navigationStyle": "custom", "navigationBarTextStyle": "white", "enablePullDownRefresh": false }, "pages/index/index": { "navigationBarTitleText": "" }, "pages/newtask/newtask": { "navigationBarTitleText": "" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "", "navigationBarBackgroundColor": "#FFFFFF", "backgroundColor": "#FFFFFF", "enablePullDownRefresh": false } };exports.default = _default;

/***/ }),
/* 8 */
/*!********************************************************!*\
  !*** F:/ruanjian/task/task/pages.json?{"type":"stat"} ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__EA98496" };exports.default = _default;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/*!************************************************!*\
  !*** F:/ruanjian/task/task/requist/requist.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var host = 'https://www.kongfushidai.cn/';

//  	http://47.103.80.249:8000
/**     http://10.102.100.23:8001
//		http://10.102.100.120:8000
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 * loginstatus:为ture检测是否登录
 */
function request(url, postData, doSuccess, doFail, loginstatus) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': uni.getStorageSync('storage_user') ? 'JWT ' + uni.getStorageSync('storage_user') : '' },

    data: postData,
    method: 'POST',
    success: function success(res) {
      //参数值为res.data,直接将返回的数据传入	
      if (res.statusCode === 401) {
        console.log('未登录');
      }
      console.log(res);
      doSuccess(res);
    },
    fail: function fail() {
      doFail();
    } });

}







//GET请求，不需传参，直接URL调用，
function getData(url, doSuccess, doFail, loginstatus) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': uni.getStorageSync('storage_user') ? 'JWT ' + uni.getStorageSync('storage_user') : '' },

    method: 'GET',
    success: function success(res) {
      console.log(res);
      doSuccess(res);
    },
    fail: function fail() {
      doFail();
    } });

}

//delete请求
function getDeleteData(url, doSuccess, doFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': uni.getStorageSync('storage_user') ? 'JWT ' + uni.getStorageSync('storage_user') : '' },

    method: 'delete',
    success: function success(res) {
      console.log(res);
      doSuccess(res);
    },
    fail: function fail(err) {
      doFail(err);
    } });

}



//updata请求
function getUpdataData(url, postData, doSuccess, doFail) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': uni.getStorageSync('storage_user') ? 'JWT ' + uni.getStorageSync('storage_user') : '' },

    data: postData,
    method: 'update',
    success: function success(res) {
      //参数值为res.data,直接将返回的数据传入
      console.log(res);
      doSuccess(res);
    },
    fail: function fail() {
      doFail();
    } });

}



/**
   * PUT请求，
   * URL：接口
   * postData：参数，json类型
   * doSuccess：成功的回调函数
   * doFail：失败的回调函数
   */
function getPutData(url, postData, doSuccess, doFail) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': uni.getStorageSync('storage_user') ? 'JWT ' + uni.getStorageSync('storage_user') : '' },

    data: postData,
    method: 'Put',
    success: function success(res) {
      //参数值为res.data,直接将返回的数据传入
      console.log(res);
      doSuccess(res);
    },
    fail: function fail() {
      doFail();
    } });

}


module.exports.request = request;
module.exports.getData = getData;
module.exports.getPutData = getPutData;


module.exports.getUpdataData = getUpdataData;

module.exports.getDeleteData = getDeleteData;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/*!****************************************************!*\
  !*** F:/ruanjian/task/task/static/img/bluemsg.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCOUMyRDc3MDc1NTkxMUVBOEU3QThGNDUxRkI1QUE0QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCOUMyRDc3MTc1NTkxMUVBOEU3QThGNDUxRkI1QUE0QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI5QzJENzZFNzU1OTExRUE4RTdBOEY0NTFGQjVBQTRCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI5QzJENzZGNzU1OTExRUE4RTdBOEY0NTFGQjVBQTRCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+DLZjTQAAESxJREFUeNrsXQlsHFcZ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"

/***/ }),
/* 31 */
/*!*****************************************************!*\
  !*** F:/ruanjian/task/task/static/img/bluelogo.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAYAAACP3YV9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MjY1REE3Qjc1NTkxMUVBOTAzNTk2N0M1Nzk0N0I1QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MjY1REE3Qzc1NTkxMUVBOTAzNTk2N0M1Nzk0N0I1QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgyNjVEQTc5NzU1OTExRUE5MDM1OTY3QzU3OTQ3QjVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgyNjVEQTdBNzU1OTExRUE5MDM1OTY3QzU3OTQ3QjVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+snAxAAAAHhVJREFUeNrsXQm0JFV5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"

/***/ }),
/* 32 */
/*!************************************************!*\
  !*** F:/ruanjian/task/task/static/img/tsk.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQzgwNkRGMDc1NTkxMUVBQjk1RTk4Qzg5MUU4NDIxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQzgwNkRGMTc1NTkxMUVBQjk1RTk4Qzg5MUU4NDIxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNDODA2REVFNzU1OTExRUFCOTVFOThDODkxRTg0MjE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNDODA2REVGNzU1OTExRUFCOTVFOThDODkxRTg0MjE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3SIEUwAAAhJJREFUeNrUlksoRFEYx89l0sx4lFgodsrCY4GSsjBYEHmFhTJRIikbWdl57SgpCxbIq5DE5LEgkkRKShYsKBLFxqM7hLn+Hx+uW7h3jCmnfv2/e+655z/3nO98c6XKnSuhKKIY1CsuEaso0jk0CtS5XKJNcUkCKnDNiusnVfz5XtNckaUjc8y5gr4EzHUA7V4sM/ebhBDZYEJ8NF/WEBAojLVw1jB+NhH0ZQzdmX0QdGoGX7AOgluDRuOsl5r+FnqjSE2nP+sh/6oYnSZHWDaZ4wDNvSAycqompxYKWkEvOAF7380+k2t9j7MnnRHYq3yEcZph9xKS4RqJEAheNhUb+KqvG/yIDZZ0JoOCa1+o9Pb8+1yKuDH9sBwm4aHmI7zU/qXRA8gD239tlI70diyUWOiQnhk12tNrMltoXaMga8KZBTHrNaLDmgZiwcY3BncgyZFvXeZzVAeZB8F6jY7BCseZQP5inA0HdouCnCm5HNJlNBlsYJTja5DMFUTd6I03Kcidlu2QAXezrhR0c7wLUlX3Ut7eOM8hV3MB/lV614JyjmmJGkARWOe+KtCjJ1v0lBhakn1Oig5Vv50Lr0cPLKVuvOq6Qs9yuWNE/7qrHBeAfqOn2Uh1DuADHOVO2SAjycD4aDfLk0RLZ/FC8fYjo1MvGN2TUaMXjNppj0b4g6RG9V3mqUafbsNLdnPzswADAJk7xZWyurGpAAAAAElFTkSuQmCC"

/***/ }),
/* 33 */
/*!************************************************!*\
  !*** F:/ruanjian/task/task/static/img/red.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCOTYwNjUzRjc1NTkxMUVBQjc1MURGMkZFMEM4RjRCOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCOTYwNjU0MDc1NTkxMUVBQjc1MURGMkZFMEM4RjRCOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI5NjA2NTNENzU1OTExRUFCNzUxREYyRkUwQzhGNEI4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI5NjA2NTNFNzU1OTExRUFCNzUxREYyRkUwQzhGNEI4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+eV/GpAAAEetJREFUeNrsXQl0FFW6/mvpLZ3OhiQEAoSdIAjBRHHhicrioCDzcGYYBuE5R304LmdkZJhhVPDoe+qo4wzmifqGOYoOKLI5rE8EQRSGRQTBsAtCCJBAurP2Ust9t6vTnepKLbe6q0nIe/ekTy1dXan6/u/+9/v/e+sW5Zy1H66CQpk8HrX3G2KvcoDNngf9P/DGQFOEv0Um2E+1F0Ow7QhsyuR2omBqGQJ1VOApg30k6yRgK2sCpQMqSqAGXTXAUwRgk+7TcjVqhlB+b2QIdCUNwLYTwCmNfWZcDtLY1lrqGSrlBmDbAHBN0Oef/8I9wXd0mJsP9XMI3DBaFHMpJPagBJQNSMgEEbGAMA4iEpAINQIgH948JyK4EKDY/bWM4+R7BTfsf6fwFr8G4HL2y9eV+1JuAMpiHa8FOqW1vvH0soI+gZqxDpEfzQjCTYDEfAwsNAMcWyKMdNx+tX14iReVHNC7Gml2y77M7p89UDqjQgaq3ABq+9TWU6KCrAJeD3A52DHQj5z866Q0gfs5KwqjMVpuTYBNAh/ZH16K4c0mbITNPpvzo5KxT/9DBXQSg6TEAFYAb8TyuO3jpxZNw4A/jl3IUCKAkwBevp9H1H6fzfXW8PHzlioAFgkMYTn4yQJPkbL82Jl373MLod9hvz04DARSgJVq4KP7eaAOVTkyXrlp/NOrCQxgxH7UFsBTBiyXPp9fWNG7b9D3EouEiXIg2gr46HqIYtZ+ldv3mX8b+fD3hOAjK8GnUwn6iXOLZwzgvLtYECe2tySVXeTvGXX+yBe7P5l3P95kmrGILmm1+zERY6QEeBLQ6bOV777pRtzbeMPTflOeyJPnry0rX/7bv2iAr2WEpMGnkwS91Weh74vsc5XvfmpD4i/hKiluLjj9+IdPrn3ku03ZMrAZGehGNcA0+Ax700yrmE6vu7y+6+3Biq00oGLN9h8ZxZaIbL/usRDx5SRNYvM6jcTuN108PrFLU+3azQWDGw3kMUm+yRLGG4K+pmZDl+Fc9Ta80Reu0sIgsffPTuz4n/l7Ps5vZjyj4vdpK9xOoq4mDvQX63ell3BVW/FGD7jKCwa/4P6j2zdMPrkrXcXXk4JvCfB6+ly6gOn+Y2vxRiF0kILB7/HSziXLNRpamkDtUMkCrxaVxn3OVv/9bQbQCOhgxSbypYeWzHpdB3xap6E1BN+Mj1cynj56edkUG4jToYOWdC7wi60rn71PBXxKxeWAhgFMA0/pSciP6zbnZqLQf0MHL4V11QtmfbMm14S+J3I5Zhkf+9zMXfgbtL9RCqko7MMHN5WZ8PVEjGcTYXu5d/k9LKA7E0lSMAVdwH7XSGCvGwh055zWB2ieFJnaLS/iJS9wew+B/8MN0tJscQrcqDWf/OeYCffO3aSIJKLEFUG7r1e1q5FNhO05KPhaItRxTh4Hzl/ce+VVitsFTM+u+P+PxeCvh/o5fzJ9jiJvxYt4sVkjYUYpgDakBEuo1WP7jvuWTUtErzsn3wXOqRNaiNrkB+HshUiESckqFkIa67J7QbKdrbLkKO54xAvAdMsDOq+TtNs1ZTxQ7jSoe/R5c8YTxYLPVsybPHryc8sV4NMK8NXqZCvWk/romAHSET/XdEIot1Mc6E0LFkNoxz5ADU1XJi1M02C/ZThkLJiLQXeBc8IoCHy0AULb9pi6j5511b/Bi5XQOlVMm2G7WuOq25nxbd2qcTSgwkTYHgf65h0S469YEQQIbd0Nvmm/bUmMPTnDfCsrCoUr/vHyKMJoVjeoMiMn6RwxODOR+7aVDonQoK4BQlt2tpk84Q4cBe7boxHX0atbQucY6D33Sx3QaavkZOwE7zZuz8XB0piErtbpiBDvfFWba0Pu6/LIDdltCf3exYVGTSvf1kkjiCLO3dAGjWps+2a+agIk2mOFq7p0IpZpc+ApOrkByRQg5oFDm8eZyN2oGsPI1cQ+aYgfm/DVIpRIAi9F4RDbWjGZLLl+32iV1AFtJpgiCaCoqaGTThbElCTCmJ7dJMUR0QcoLABj63GdHdGOamj5Dqnsk29z+w9j5bJX/c6SAD6NC5YOqzrl3J/bq0kWPKl9iAMo1WryRPDwELxyjeXV3mGHjDfnp5Tgvim/wX79O9k/Tb7W0QhlP/bN+kEPjnv062amk4AfJzNpEh+QjYLDUoJKmOFhLZ/KomR2FHiU3GCwnnVVg3UaWEPBwpL4dwcIg1KCSYiD2gf/AOy1/SKNnihzNXLg1KLW8LFU9DsqBqREMYqKuRrh2A/qwCdZMkON/QjYTpnJ1bRK6DMIpaxLD9U3AIej2JRFroQVwbRC5rmuBmArMUV6clI1YsXRam5HyfFSFjEeR7F5hDJStZOEKIDCB2VAx0HeEsqzophhoNVNd/21OgEOGjI7HPBJKxsxk5DlqkZggezhLmfKcHA6gOnfS6bDxZZ1MZL8Q00B4A4d0wSSKewmdbAALwB/7DQI56t1ELOG8ZiMdkKWqzWuFGvUsIL+U3PJXbzdBhnvvAB0pyzDYwOrNkHjK4tafpvlAffMn+Hg63qgu8hCDGws/vhpCKzcBP73VqeM8eFEiJaHIGlgSXMvfEroTtNEoEsRbmFLNtE2fBBkr3xD6tGKA72Z0eyAXpD++4elY6hMT0pkDZasjZDgYCY9HR93MgRULa5aOZZLyUAQ6p/8D7CNKI4wsdm1xKUBJL3PQ2DFxsgFD+4HGQtbot2wGwpt2w1iZRWA3Q5Mj3yw31YaOXZQH8heXQbe8f/eEqhZxHiBogMqoBOPrWF1gidZnaJq6RQ99hn2yfyRU0Q6Ptx7lPnWc7HfBtdthca/vA9idU3csWxxEaTPeVAyEtMtFxtqHtTeP8dS4HmK8ZGCTKLjVQu+5QvtQZCkPTIV+5xIajm0aQfUz3tDGkGgLNy+cvD+5NcgnKmUtu03D8PRcWQsLe1xxxr1pICnmUvE7bDKOpGP5yj6bHuQcI67bo24l7oGaJhfZnh8/exXW4z2q59HAPu++VbCkW0Spclmr0gqDpC7XC3WNwFzNB24NmU706sAqDRXhO1bd0t5HkPCHDgC4sXL0ggD+6hSSUU1vv4ePgEPQXyOZEq1K/M4aVOmts5qHBjnjy7QrkO5YsC6DKFS3ESVTdTHhw/neBAv+1RVjYDBJC3hlLBj/L9IriU8gEqouAANL/81aVVzuFPBER2Aweg7luTg/3IUHVzI7/TiBjbbUhrbWPC8PBvYPj0jgU0UjLBrEkTgD5+E+qdewsoliFnawnAz3XfhBjl2Q4JgjaKh6arXSiYdUSEp8bOwRD5+ta1nIEjR/7Q8gGJZYMNRK0NHwMa6XvqE11kG2CH9JYkYVT8x9vcvJLdt6eBIZfLWYvXjteS66+yub6rSMoVEANdivNLPxwbt1FCOT7sh/keW6nh/ADeSC4DtV6ja9cftOSQ1pBJwWDKKVTVA5+aA/dbrgSnIA/7sed3zOyfdGWsXgis/i3W6J1tOZ+RtUQHZ1GP4LGjP9xJXltp7r38qcPAVsHiEMLfnIHC7vtXW8fK0wbL1kPbYNKlGeF6bA94pT7Y6JlYrenSF9PmPxwzctGilNWQBKvinkolbgGzOA819tM6Bcc/YveIcctlPsZuTk5PJNWj+JWtBaGY507s7ZH/058hgKZlcpbBOd957B2R/UoYb1IibCg/VEy9esgR4n9P9+ZfdBtWD8RPgevMgGLI37ocnac+iwWLNuERyMpHGTUzevz78LGS+/0egr8mWJGbm28+BeKEa+ONnpLbCdt0AoNLT4n4TTiG4HvgxNP0tedZ/1XXgBwRENYZEQ0aqWu1Oz4+2ckCfMn21wVCEpbmdkr5x0VcHtdNmQ2j71y030aUz2EdejyPU4jjQg5sjeoByOSH96ZmQNnNKUv87yNhOPH7HQ18TMlxvTpzYA8ZG88vEPvdxp2tzxODdpqI0LBeZ7vmSluaPngIxmi9P8AFj5A9CaOOXwO0vBxqDGtbnFJamYQkqVFZBYPmnUD/nVQgsXQfIWxdLmtlvKQbU6I8N4zPr/XbmD3hmVd8RpyDSwW30UQO/xSU2z96h9Sil/PHy6IetrFmyi0FiTyQfaIQUA49Qy2wZTO8e4Hlpdiyb2Ph8GXDfHbd09o7wUHAp6MLKRzlMO+2RKXGjg+ufeSOSq1fOJqJxH+HtAM1+P3DGGxOa8/DyD69YCs3ACzIDiEr2s0bpApWqIx5kc34/jLu0hDjgOPEDhL7ci2VgCZZ3uNq/+BTW5adAwOxHHIcDIjp2dgRqo8Ogdbo4/BfOJF+sAf/iVdjPX9KMRpveXCq5O/fvHpK2Pc9jtcPz4P9gDbGY2VhYPN9EI2oYVMnnq5GznjZgPXOq5sMPXCI/moTxUVa5Zz8EthHWj40KrtsG9XNfN5yvxnn/RPDMfzT2u6rudxAx3mt3byme+uoTCjbzKqwXFKxXMj4GPKvDcErPwi+kFT/+QsOe/fgg4vxq4x/fkbrq7HffDkx+Z+x0bWSqV+cLyd9v30smRxd/Ii3dj02VUsfE0a8oeEB/4jg9f6564VqMV/P18vlcwgZjPvetnVDEed8hZXx7mqFJ9Xp0fPyrxRPGlQ0b/4MV/l1NTgKBNIqeTLw96561XtrxHvwfKGPPHCg10O9A6t9JkmRa4Mf8V1Gnn/4BR7Q7OjrwXRtqbjBoTJGZIIomjVo1qo5kgJ9mjZnOUfSxjgx8VqjxRjcXoE0wHmn1b6gBjwiYjpTBwh5bZ/9cz4338UBVdFTgGVHMe+afywYaeATyLEoCrkYV/Pdd/Wte8JRMDFFMeUcFv/TiiREGriSpjhAj1muC/5Z7UPVPcsb+uJGybeuIwHf2140Ai0bVkfRAIR3mKz/CLnteU5/8aTMu0c4Op3awjx9ecvGkK5FsJCnwWqFvK1UjB12+Pjh/6ryDtk6zwoOhOgrwNEKeX+9bM9QK1pOOnUR6el7J+uj62LxJK/+cUTy+lnZsaG8g1jjcn9Xa075EQJkat9LHd34kiQ83bKwN5p1M5FUSccm2Hc78hrLMoRtu8587co3g78MisbN+F0Jq551sZB0HtnQpmn/P6FmLFg68c12d3bU2jQ8dZpDgs4mCnRUF3TGidoH3lBXfvVhFVpOkD1RTBnrAa+XotSZJU5suVlr/tGL5v/YNemc4Re7aK5kyaKAd33yb1XXplFtnbtTT4M/t+bj/jRdPlOQ1ekvSQ4GhNoHrIn+mtol1bLl2xoIZKkkxwSAvH/f/SGbTThZ81fl6V1SsHlMUuDwxgw/cRouiKxXA4/al3se6vtqb1WPVQzdM32EifSuBNdBb6Zi9b/WQATWVJdmB+lIeaN9b1417duHQu6pUAJcvkRXAG/VQ0QYG0Jsomf5Vzb5uk3zHRhaE6m5x88FiVuTzkgE+BExFLeM48IMra+ffu9+wfXnB8Mug/xoKXfB12jQ50IKKwEBWAk8KPqUDuOY8L0WBS84nqnZf2zPg7Z0baixyClxnh8Dl4agxixZ5DyWKtjCdRZFqDE8BHwKqJgh0VYBmL56zZ5Z/n5Zz5uW+Y8ov2d28jhQGIJsLXnmsaAC+motJGniz4BvVADVDGc3jSDpuzyhvTsJ8kgShqCGlRY0GN+5/mBmcpPdSq2gSTQ0krdZe+QogSrGuNYkmyXugjNLaAGTv/zDKWWkpGNND+JIFX2kA+RSBygunFeuUYt0K4El6ikjz6sosrVoDSpwsS2Q4Hgn4WgZQsj0KtBL8RCZMJskx6bkfMMl+I5eia4REx0GSgi83gHK2OuVSyfZE/LyZflHSEWCIwG2KBIZEVgBvBD4C7VksaA3gtdhOMjk+ImgUjXqLEKFBjYxJ5HKSHflLOteiWgNKazSoyTauRiCRyslkDJASH68Hvh771b6nTIBuhZyEBNhuVKsSqkVWjXUnfROkmnsinrnOhI8Hi0EnbXSBtCZZPQ25Hru12gQjhifDeLMAQQJGSOhtaKmY/12L/XrvUVWbOC3VL9K16qWJyOR2yoAnNYDR8WZeHU3CyFSAbvR7dCUZn4j/N/uObYqgaiOCdStANwX4lQReywBmGmHS3yVc9VMNdFsCr3aRlImLRykABUEblbZ+uQrSaTjbBTM7KvCkwFBXK8Ba5X8FGADJViuMFUUdKgAAAABJRU5ErkJggg=="

/***/ }),
/* 34 */
/*!*************************************************!*\
  !*** F:/ruanjian/task/task/static/img/hong.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAYAAACP3YV9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MjA5QUI2MTc1NTkxMUVBQjExMzgwRjhERDFENDlCQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MjA5QUI2Mjc1NTkxMUVBQjExMzgwRjhERDFENDlCQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgyMDlBQjVGNzU1OTExRUFCMTEzODBGOEREMUQ0OUJDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgyMDlBQjYwNzU1OTExRUFCMTEzODBGOEREMUQ0OUJDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+gBRxbQAAHehJREFUeNrsXWmUHFd1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"

/***/ }),
/* 35 */
/*!***************************************************!*\
  !*** F:/ruanjian/task/task/static/img/redtsk.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQzI0OEQwMjc1NTkxMUVBQUY2RkM5QTNEQThCQkQyNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQzI0OEQwMzc1NTkxMUVBQUY2RkM5QTNEQThCQkQyNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNDMjQ4RDAwNzU1OTExRUFBRjZGQzlBM0RBOEJCRDI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNDMjQ4RDAxNzU1OTExRUFBRjZGQzlBM0RBOEJCRDI2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+j/PhnwAAAgxJREFUeNpi/JTczsDw71/I/3//ihj+/tNh+Pv3xf+/f9WAdC7Dnz+tQDYDkGb4D8QMvyH0/z+YYmD+37+NYg929L6SdDwAZBsBzbgFNHOq+Ifj81kYGBi8gHg1AwIwQ2lhIOZlIA1IQ2kJqF5jIJ73gs+cgwnImICm+DWUXgTEX0i0aBWUfoMm3gzykTKaIDeUvgd1lTaRltwHBts3KJsHTY4PZNF3JMNBQASIW4B4FhA/BuKr+EwXuboWzn6l4CEDjCt/IFMXTdlPkEX/sOivhmJgLDMw4rPojXYwLDH8h8YvNvX/WQgEBwsDlQATA53AkLToNxD7AfE5WlvkBEzem8We7AFl0uekWnSVWEtE7249Ak7iMi4eQIqDWItAmdURiHWA+AQeC34AsZnozY37ofkoF0htB2JBYi16BMQHoGx3IP6GQ50DMMOeBpdbyt7xQGoSqYnBAYiXQdmfgNgCWoIgA5CPT4ItUfePBVILyE11kUA8Fcq+DMT2SHLWMB8DS4Y0aAFMUfLOAuJ4KBsURCVAHAzEx6BiqUA8k5jUQkwRAwqSm9BE0YskHgsteKmaYUFJ1xCJn0BMcJFjEahUPgRlBwDxfFJzMymlMw80A6uRU2ywEKpv0IAWmcUTIyjoOOlQeLOBLHpKB4t+giyqooNFPaA4WgptkGQgtcuoBUBNtyUSn042AQQYAHpfo6AIyV6fAAAAAElFTkSuQmCC"

/***/ }),
/* 36 */
/*!**************************************************!*\
  !*** F:/ruanjian/task/task/static/img/green.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAYAAADHLIObAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCOEFCQjBDMzc1NTkxMUVBQTc3Njg4OUM5ODI3Qjk3QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCOEFCQjBDNDc1NTkxMUVBQTc3Njg4OUM5ODI3Qjk3QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI4QUJCMEMxNzU1OTExRUFBNzc2ODg5Qzk4MjdCOTdCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI4QUJCMEMyNzU1OTExRUFBNzc2ODg5Qzk4MjdCOTdCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++Dox+QAAEBtJREFUeNrknWlwHMUV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"

/***/ }),
/* 37 */
/*!***********************************************!*\
  !*** F:/ruanjian/task/task/static/img/lv.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAYAAACP3YV9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MTRFM0E4ODc1NTkxMUVBQThGQUVBMjEyN0Y5MERENiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MTRFM0E4OTc1NTkxMUVBQThGQUVBMjEyN0Y5MERENiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgxNEUzQTg2NzU1OTExRUFBOEZBRUEyMTI3RjkwREQ2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgxNEUzQTg3NzU1OTExRUFBOEZBRUEyMTI3RjkwREQ2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pfsQqgAAIHBJREFUeNrsXQmcHEW5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"

/***/ }),
/* 38 */
/*!*****************************************************!*\
  !*** F:/ruanjian/task/task/static/img/greentsk.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQjYxQzI1QTc1NTkxMUVBQjk0NkUxMjhBMkM2QThBNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQjYxQzI1Qjc1NTkxMUVBQjk0NkUxMjhBMkM2QThBNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNCNjFDMjU4NzU1OTExRUFCOTQ2RTEyOEEyQzZBOEE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNCNjFDMjU5NzU1OTExRUFCOTQ2RTEyOEEyQzZBOEE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+eBuPtAAAAg5JREFUeNpidLu5m4GBgTGE8T9jERDrANkvgLQaEOcCcSvjfyYGIM0Aphmg9D8oDZNjgKtpXGGm1Rt14sYBIN8IaNYtID11iZXqfBagLV5AvJoBAZihtDAQ8zKQBqShtARUrzEQz4s9eoeDCciYgKb4NZReBMRfSLRoFZR+gybeDPKRMpogN5S+B3WVNpGW3AcG2zcomwdNjg9k0Xckw0FABIhbgHgWED8G4qv4TF9tog9nR5y6JgOME39gbOmiKfvJCEwMn4CRxguJTEZQwmCAsYH4DzCCGYlMDEDIxAwkGbGY9ZmFQHCwMFAJMDHQCQxJi34DsR8Qn6O1RU7A5L15ubkmKJM+J9Wiq8RastJU5wiIEXnyugeQ4iDWIlBmdQRiYNnHcAKPBT+A2GyVie5+aD7KBVLbgViQWIseAfEBKNsdiL/hUOcAzLCnQYzw01figdQkUhODAxAvg7KBGZrBAlqCIAOQj0+CGGFnLscCqQXkprpIIJ4KZV8GYnskOWuYj0PPXEyDFsAUJe8sII6HskFBVALEwUB8DCqWCsQziUktxBQxoCC5CU0UvUjisdCCl6oZFpR0DZH4CcQEFzkWgWrdQ1B2ABDPJzU3k1I680AzsBo5xQYLuNIgHmiRWTwxgoKOkw6FNxvIoqd0sOgnyKIqOljUA4qjpdAGSQZSu4xaANR0W7LYWqUJIMAAFz+LweJgalgAAAAASUVORK5CYII="

/***/ }),
/* 39 */
/*!***************************************************!*\
  !*** F:/ruanjian/task/task/static/img/yellow.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCOTAyODg1RDc1NTkxMUVBODhFMUIwNTFEMzgwRDBDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCOTAyODg1RTc1NTkxMUVBODhFMUIwNTFEMzgwRDBDMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI5MDI4ODVCNzU1OTExRUE4OEUxQjA1MUQzODBEMEMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI5MDI4ODVDNzU1OTExRUE4OEUxQjA1MUQzODBEMEMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ctAbVQAAEeVJREFUeNrsXQt4FdWd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"

/***/ }),
/* 40 */
/*!**************************************************!*\
  !*** F:/ruanjian/task/task/static/img/huang.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAYAAACP3YV9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MUFCRjA1ODc1NTkxMUVBOEEwRjg2QjJEMzdCNzkwOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MUFCRjA1OTc1NTkxMUVBOEEwRjg2QjJEMzdCNzkwOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgxQUJGMDU2NzU1OTExRUE4QTBGODZCMkQzN0I3OTA5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgxQUJGMDU3NzU1OTExRUE4QTBGODZCMkQzN0I3OTA5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+eyrYXgAAHvxJREFUeNrsXQuUHFWZ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"

/***/ }),
/* 41 */
/*!******************************************************!*\
  !*** F:/ruanjian/task/task/static/img/yellowtsk.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQkJBMDUzMzc1NTkxMUVBQkI3MUFCMkRBRTQ3MjA2MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQkJBMDUzNDc1NTkxMUVBQkI3MUFCMkRBRTQ3MjA2MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNCQkEwNTMxNzU1OTExRUFCQjcxQUIyREFFNDcyMDYzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNCQkEwNTMyNzU1OTExRUFCQjcxQUIyREFFNDcyMDYzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7idtMgAAAg9JREFUeNpifLNfnYGBgTGE4T9jESMDkw6QfsHwn0kNyM4F0q1AzMAIxAz/maE0lM0AYaPJNfL4b+r9uiHoAJBtBDTrFlDdVK6glfNZgLZ4AfFqBgRghtLCQMzLQBqQhtISUL3GQDzv29oIDqAzGCagKX4NpRcB8RcSLVoFpd+giTeDfKSMJsgNpe9BXaVNpCX3gcH2DcrmQZPjA1n0HclwEBAB4hYgngXEj4H4Kj7TeX12wtlfNvrJAOPGHxgvumjKfjICE8MnYGLgBUYcNIIZIZEMiew/QMxIZGL4D+Qzg9UzwNTBzfzMQiA4WBioBJgY6ASGpEW/gdgPiM/R2iInYPLezBOwAZRJn5Nq0VWiLfHbcgScxDcEeAApDmItAmVWRyDWAeITeCz4AcRmvL7b9kPzUS6Q2g7EgsRa9AiID0DZ7kD8DYc6B2CGPQ22ZJNPPJCaRGpicADiZVA2MEMzWEBLEGQA8vFJEOPzZq9YILWA3FQXCcRToezLQGyPJGcN8/HnLe5p0AKYouSdBcTxUDYoiEqAOBiIj0HFUoF4JjGphZgiBhQkN6GJohdJPBZa8FI1w4KSriESP4GY4CLHIlCtewjKDgDi+aTmZlJKZx5oBlYjp9gAWcRIgnotMosnRlDQcdKh8GYDWfSUDhb9BFlURQeLekBxtBTaIMlAapdRC4Cabku4glc0AQQYAJPHisNBbn/eAAAAAElFTkSuQmCC"

/***/ }),
/* 42 */
/*!****************************************************!*\
  !*** F:/ruanjian/task/task/static/img/running.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4Qjc0MjI1Qzc1NTkxMUVBOUQxQTlDOEQzMzk3MEYxQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4Qjc0MjI1RDc1NTkxMUVBOUQxQTlDOEQzMzk3MEYxQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhCNzQyMjVBNzU1OTExRUE5RDFBOUM4RDMzOTcwRjFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhCNzQyMjVCNzU1OTExRUE5RDFBOUM4RDMzOTcwRjFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+9Un95gAAAfdJREFUeNrMmT9OAkEUh3cJUKiV0BCJFhqwFw4AhxA9gonxEproBQyYGCsvQDCWcgCxF6KFBENBsEELMGH8PfOWrIiyszPszi/5AuHPzMcj7Mw8bCGE5SMRkAcFkAMZsAaW+fkP8ApaoAHq4B6MpWciQQnS4BS0hXza/N60zJxeX5gA52Ao1DPksRK6BHdBT+gPjVlSEYyCslh8yjyXlOASqIngUuM5PQnSp6mK4FOdVclZghURXirzBEsi/Oy7nWzXhToBHkHSCjdvYBv0nBXByYminD2F36yC48mgXMF18ARiioI/FimFsT7BFmg7FTxQlNOdGDt9V5AkX0BacVCdFaR0wIazK0lb5oWc8iRYtMxNgQR3DBbMkWDWYMEsCaYMFkzRr3iIO3ENg+n+FVNG0QV+eq+riZh3+BkY/BUPSLBrsGCXBJsGCzZJ8EHTYMIn/6UR4UO1qanr3CzozmSzQO2IawOrR05jZ8NK1XvWdMHWkRHYpCpGXOW8NKh6V+z069DU5Nsw0+cNTH/60EQPHBpQvSNH7q/2W5gH9wsvnYV4iK2PuEzz6DZAuRuZ5pFDLKCvu8Jz+W5g7i2wgbmvqwWc5EajrhZwmcfU1qN2N9HPQMeHWIffK9VEtxX/hijysTXDy+UKP//OK0GLt3N3fv+G+BJgAP3D16dGhYMiAAAAAElFTkSuQmCC"

/***/ }),
/* 43 */
/*!**************************************************!*\
  !*** F:/ruanjian/task/task/static/img/norun.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QkQwOUY5Mjc1NTkxMUVBOUNFOUMxQzg4RjJCRUY0OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QkQwOUY5Mzc1NTkxMUVBOUNFOUMxQzg4RjJCRUY0OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhCRDA5RjkwNzU1OTExRUE5Q0U5QzFDODhGMkJFRjQ4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhCRDA5RjkxNzU1OTExRUE5Q0U5QzFDODhGMkJFRjQ4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NRZrAQAAAh5JREFUeNrMmb9OAkEQhz0DFiqFgghKtDFiL8ZaHkLEN/AdjI0m+gIGTIydD2A0llJYqr0YGwmGArVRCzBx/Y2ZI2jOeHs7CzfJ1/Bn9rs5WGYHRyk1ECAGwRJYATkwD6bBCD//Dh7BHbgGFXAFPrVXIkENMmAX1JR+1Pi9GZ01/b4wDvZBS5lHi3PFpQRXQVPJB+UsmAhGQEnZjxKvpSU4DE5V7+KU1/QlSFdzonofJ16V9BIsq/5F+T/Bgup/FLudnK6NOg5uQSLAxu38tc0GyPUCFkDT/UVwYyegnHSMg+3OlXMFZ8A9iAZMKllBig8wB2puBTcM5GxElJ2+K0iSDyBjkFC6ghR1MOt2JRnDK3Y0pP0GOS2RYF7glkz4fEw3VkhwUSBR0uOxSYG8ORLMCiRKWRLMkmDakmBKIG+aBGOWbnFSIG9sUGjf8roLUxKJSfDVUgUlvsWvJNiwVEGJz3aDBKsh3maqJHgjVMGxX0h8i68jfKiWqOCLhaahItUsPHlc6DK3cUbNgtta7xq26ZceZ5tjw5zk1Omo90E7RP1gm506glTOwxAJHrHTjzPJFngOgRw5bP413VoLwbFzPcwH9wM/k4WhPo4+hnSGR+c9lDvTGR65RHt0u8u8VuAB5prFAWZRagSc4EGj1Ai4xDnFZtTdQ/Q9UA8gVuf3ag3RHcO/IfJ8bJ3nZmOUn3/jX4I7bucugv4N8SXAAMkd7Pc1rDptAAAAAElFTkSuQmCC"

/***/ }),
/* 44 */
/*!****************************************************!*\
  !*** F:/ruanjian/task/task/static/img/success.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QzM2Qjc1RTc1NTkxMUVBOTVCOUZBRDlFMDJFMjQ4RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QzM2Qjc1Rjc1NTkxMUVBOTVCOUZBRDlFMDJFMjQ4RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhDMzZCNzVDNzU1OTExRUE5NUI5RkFEOUUwMkUyNDhGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhDMzZCNzVENzU1OTExRUE5NUI5RkFEOUUwMkUyNDhGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+DIH/YwAAAtVJREFUeNrMmUtoFEEQhmdWkxVRJCawrHgQQdSADzSCoPg4GAieAuLFkxBUxAd6EESQgAoKQRAUUYwiouJBwQR87EEEkYCoCDGRPfgmBGIiuiFxNcb2r6UW2maGne6e7fGH7zDTXd0/1bPTNb2+EMIz1GKwHKwFS8BcUAd8UAADoA88Bc9Br9EsZFCDLNgH+oW+PoAjYJ7OnFE7psFhUBTxqAPUxWVwE/gk4tdXsMXW4FFRfZ01NXhRuFOXrsFO4V73oxpsF8npUiWD60Ty2ip78pUX9SiY4SUrMjQdFOkiJTWccGzuCtjMhmTRTtSp7iQzHS/jQWkZJ0P6NFB7OYNtjrL2DiwDp0EavFVW0VNWtJTBFPjiIGs5UCNl7k2EnabkfiFoqHLmzoNmMMHXT8CiCjFUGTWluFyqptrBbun6usac2yjVt6q4rPuV9+whzfgez7C2i6Jdirk1BmPkKfC7RkAvaAMjFfrtVMzVgjEDg58peDxi55tgGk84B/SF9NsbsL/nTGtGCi5E6PhH3SOZLqXf8YA+Oywek1EaYFAjoDXAwCluuxvQlrF8jodpkFeaQasDjDRLyy9zz9Lge3oP9mu+1+gzcoVyL1euPiS1MDYqkMFHmkEU8wwsqNCvO4aX/GuarMcgcAp4AbIh7ce4j61uUMFKAw2B2QYDDIJG8E26N0u5NtUPKlwpg5Ogw3CQLC93jXTvZEx7eK5UvXLJXw+GLQajs5dVUskeh6jayZeLxRFwxmKwJnAO7Ikxe3k5g6RaMAameskrw7+Lf8rtX6D1PzB3oGwu7PjtQoLfxN2qHz/kAPMxWO84c3TAuTRoVwjSBjbpSi+lt0Akg6SN4LIDc3fASvDT9Ah4e8SaUVcTyge81REw1XXXuHCNQ7ejnlXrHqLP51/5RwNTA+AqaNSZ0zf8G8LnD/EWfn4yXCSkua3IJ2VDXPU8BA/Ab92J/gowAJVCbOE5ltNEAAAAAElFTkSuQmCC"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map