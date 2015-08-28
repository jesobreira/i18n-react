(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["i18n-react"] = factory(require("React"));
	else
		root["i18n-react"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***************************!*\
  !*** ./src/i18n-react.ts ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var React = __webpack_require__(/*! react */ 1);
	var _ = {
	    isString: function (s) { return typeof s === 'string' || s instanceof String; },
	    isObject: function (o) { return typeof o === 'object'; },
	    get: function (obj, path) {
	        var spath = path.split('.');
	        for (var i = 0, len = spath.length; i < len; i++) {
	            if (!obj || typeof obj !== 'object')
	                return undefined;
	            obj = obj[spath[i]];
	        }
	        return obj;
	    }
	};
	function first(o) {
	    for (var k in o)
	        return o[k];
	}
	function isEqualShallow(a, b) {
	    if (a === b)
	        return true;
	    if (a == null || b == null)
	        return false;
	    for (var key in a) {
	        if (!(key in b) || a[key] !== b[key])
	            return false;
	    }
	    for (var key in b) {
	        if (!(key in a) || a[key] !== b[key])
	            return false;
	    }
	    return true;
	}
	function merge2(head, tail) {
	    if (head == null)
	        return tail;
	    if (tail == null)
	        return head;
	    if (_.isString(head) && _.isString(tail))
	        return head + tail;
	    return [head, tail];
	}
	function merge(head, middle, tail) {
	    if (head == null)
	        return merge2(middle, tail);
	    if (middle == null)
	        return merge2(head, tail);
	    if (tail == null)
	        return merge2(head, middle);
	    if (_.isString(head) && _.isString(middle) && _.isString(tail))
	        return head + middle + tail;
	    return [head, middle, tail];
	}
	var maybeRegex = /[\*_\{\[\n]/;
	var regexes = {
	    strong: /^(|.*?\W)\*(\S.*?)\*(|\W.*)$/,
	    em: /^(|.*?\W)_(\S.*?)_(|\W.*)$/,
	    p: /^(.*?)\[(.*?)\](.*)$/,
	    br: /^(.*?)[^\S\n]*\n()[^\S\n]*([\s\S]*)$/,
	    self: /^(.*?)\{\{(.*?)\}\}(.*)$/,
	    inter: /^(.*?)\{(.*?)\}(.*)$/
	};
	function M(value, vars) {
	    if (value == null || value == '')
	        return null;
	    if (!value.match(maybeRegex))
	        return value;
	    var res = null, type = null;
	    for (var rtype in regexes) {
	        if (!regexes.hasOwnProperty(rtype))
	            continue;
	        var rres = regexes[rtype].exec(value);
	        if (rres) {
	            if (res == null || rres[1].length < res[1].length) {
	                res = rres;
	                type = rtype;
	            }
	        }
	    }
	    switch (type) {
	        case null:
	            return value;
	        case "inter":
	            var _a = res[2].split(','), vn = _a[0], flags = _a[1];
	            var v = _.get(vars, vn);
	            if (v == null) {
	                return res[1] + res[3];
	            }
	            else if (_.isObject(v) && Object.getPrototypeOf(v)._isReactElement) {
	                return merge(M(res[1], vars), React.cloneElement(v, { key: 'r' }), M(res[3], vars));
	            }
	            var vs;
	            if (flags && flags.match(/l/)) {
	                vs = v.toLocaleString();
	            }
	            else {
	                vs = v.toString();
	            }
	            return merge(M(res[1], vars), vs, M(res[3], vars));
	        case "self":
	            return merge(M(res[1], vars), MDText.translate(res[2], vars), M(res[3], vars));
	        default:
	            return merge(M(res[1], vars), React.createElement(type, { key: type + res[2] }, M(res[2], vars)), M(res[3], vars));
	    }
	}
	var MDText = (function (_super) {
	    __extends(MDText, _super);
	    function MDText(props) {
	        _super.call(this, props);
	    }
	    MDText.format = function (text, options) {
	        return M(text, options);
	    };
	    MDText.translate = function (key, options) {
	        var trans = key && _.get(MDText.texts, key);
	        if (key == null || trans == null) {
	            return key;
	        }
	        if (!_.isString(trans)) {
	            var ctx_trans = (options && options.context != null && _.get(trans, options.context.toString()));
	            if (ctx_trans === false)
	                ctx_trans = null;
	            if (ctx_trans == null)
	                ctx_trans = trans._;
	            if (ctx_trans == null)
	                ctx_trans = first(trans);
	            if (ctx_trans == null)
	                return key;
	            trans = ctx_trans;
	        }
	        return M(trans, options);
	    };
	    MDText.prototype.shouldComponentUpdate = function (nextProps) {
	        return !isEqualShallow(this.props, nextProps);
	    };
	    MDText.prototype.render = function () {
	        var tag = this.tag || this.props.tag || 'span';
	        return React.createElement(tag, this.props, MDText.translate(this.props.text, this.props));
	    };
	    MDText.factory = function (tag) {
	        var ctor = function MDTextTag(props, ctx) {
	            MDText.call(this, props, ctx);
	            this.tag = tag;
	        };
	        ctor.prototype = MDText.prototype;
	        return ctor;
	    };
	    ;
	    MDText.setTexts = function (t) { return MDText.texts = t; };
	    MDText.p = MDText.factory('p');
	    MDText.span = MDText.factory('span');
	    MDText.div = MDText.factory('div');
	    MDText.button = MDText.factory('button');
	    MDText.a = MDText.factory('a');
	    return MDText;
	})(React.Component);
	module.exports = MDText;


/***/ },
/* 1 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=i18n-react.umd.js.map