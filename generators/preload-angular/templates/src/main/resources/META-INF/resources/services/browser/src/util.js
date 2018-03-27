define(["require", "exports", "@angular/animations"], function (require, exports, animations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_SECOND = 1000;
    exports.SUBSTITUTION_EXPR_START = '{{';
    exports.SUBSTITUTION_EXPR_END = '}}';
    exports.ENTER_CLASSNAME = 'ng-enter';
    exports.LEAVE_CLASSNAME = 'ng-leave';
    exports.ENTER_SELECTOR = '.ng-enter';
    exports.LEAVE_SELECTOR = '.ng-leave';
    exports.NG_TRIGGER_CLASSNAME = 'ng-trigger';
    exports.NG_TRIGGER_SELECTOR = '.ng-trigger';
    exports.NG_ANIMATING_CLASSNAME = 'ng-animating';
    exports.NG_ANIMATING_SELECTOR = '.ng-animating';
    function resolveTimingValue(value) {
        if (typeof value == 'number')
            return value;
        var matches = value.match(/^(-?[\.\d]+)(m?s)/);
        if (!matches || matches.length < 2)
            return 0;
        return _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
    }
    exports.resolveTimingValue = resolveTimingValue;
    function _convertTimeValueToMS(value, unit) {
        switch (unit) {
            case 's':
                return value * exports.ONE_SECOND;
            default:
                return value;
        }
    }
    function resolveTiming(timings, errors, allowNegativeValues) {
        return timings.hasOwnProperty('duration') ?
            timings :
            parseTimeExpression(timings, errors, allowNegativeValues);
    }
    exports.resolveTiming = resolveTiming;
    function parseTimeExpression(exp, errors, allowNegativeValues) {
        var regex = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
        var duration;
        var delay = 0;
        var easing = '';
        if (typeof exp === 'string') {
            var matches = exp.match(regex);
            if (matches === null) {
                errors.push("The provided timing value \"" + exp + "\" is invalid.");
                return { duration: 0, delay: 0, easing: '' };
            }
            duration = _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
            var delayMatch = matches[3];
            if (delayMatch != null) {
                delay = _convertTimeValueToMS(Math.floor(parseFloat(delayMatch)), matches[4]);
            }
            var easingVal = matches[5];
            if (easingVal) {
                easing = easingVal;
            }
        }
        else {
            duration = exp;
        }
        if (!allowNegativeValues) {
            var containsErrors = false;
            var startIndex = errors.length;
            if (duration < 0) {
                errors.push("Duration values below 0 are not allowed for this animation step.");
                containsErrors = true;
            }
            if (delay < 0) {
                errors.push("Delay values below 0 are not allowed for this animation step.");
                containsErrors = true;
            }
            if (containsErrors) {
                errors.splice(startIndex, 0, "The provided timing value \"" + exp + "\" is invalid.");
            }
        }
        return { duration: duration, delay: delay, easing: easing };
    }
    function copyObj(obj, destination) {
        if (destination === void 0) { destination = {}; }
        Object.keys(obj).forEach(function (prop) { destination[prop] = obj[prop]; });
        return destination;
    }
    exports.copyObj = copyObj;
    function normalizeStyles(styles) {
        var normalizedStyles = {};
        if (Array.isArray(styles)) {
            styles.forEach(function (data) { return copyStyles(data, false, normalizedStyles); });
        }
        else {
            copyStyles(styles, false, normalizedStyles);
        }
        return normalizedStyles;
    }
    exports.normalizeStyles = normalizeStyles;
    function copyStyles(styles, readPrototype, destination) {
        if (destination === void 0) { destination = {}; }
        if (readPrototype) {
            // we make use of a for-in loop so that the
            // prototypically inherited properties are
            // revealed from the backFill map
            for (var prop in styles) {
                destination[prop] = styles[prop];
            }
        }
        else {
            copyObj(styles, destination);
        }
        return destination;
    }
    exports.copyStyles = copyStyles;
    function setStyles(element, styles) {
        if (element['style']) {
            Object.keys(styles).forEach(function (prop) {
                var camelProp = dashCaseToCamelCase(prop);
                element.style[camelProp] = styles[prop];
            });
        }
    }
    exports.setStyles = setStyles;
    function eraseStyles(element, styles) {
        if (element['style']) {
            Object.keys(styles).forEach(function (prop) {
                var camelProp = dashCaseToCamelCase(prop);
                element.style[camelProp] = '';
            });
        }
    }
    exports.eraseStyles = eraseStyles;
    function normalizeAnimationEntry(steps) {
        if (Array.isArray(steps)) {
            if (steps.length == 1)
                return steps[0];
            return animations_1.sequence(steps);
        }
        return steps;
    }
    exports.normalizeAnimationEntry = normalizeAnimationEntry;
    function validateStyleParams(value, options, errors) {
        var params = options.params || {};
        var matches = extractStyleParams(value);
        if (matches.length) {
            matches.forEach(function (varName) {
                if (!params.hasOwnProperty(varName)) {
                    errors.push("Unable to resolve the local animation param " + varName + " in the given list of values");
                }
            });
        }
    }
    exports.validateStyleParams = validateStyleParams;
    var PARAM_REGEX = new RegExp(exports.SUBSTITUTION_EXPR_START + "\\s*(.+?)\\s*" + exports.SUBSTITUTION_EXPR_END, 'g');
    function extractStyleParams(value) {
        var params = [];
        if (typeof value === 'string') {
            var val = value.toString();
            var match = void 0;
            while (match = PARAM_REGEX.exec(val)) {
                params.push(match[1]);
            }
            PARAM_REGEX.lastIndex = 0;
        }
        return params;
    }
    exports.extractStyleParams = extractStyleParams;
    function interpolateParams(value, params, errors) {
        var original = value.toString();
        var str = original.replace(PARAM_REGEX, function (_, varName) {
            var localVal = params[varName];
            // this means that the value was never overidden by the data passed in by the user
            if (!params.hasOwnProperty(varName)) {
                errors.push("Please provide a value for the animation param " + varName);
                localVal = '';
            }
            return localVal.toString();
        });
        // we do this to assert that numeric values stay as they are
        return str == original ? value : str;
    }
    exports.interpolateParams = interpolateParams;
    function iteratorToArray(iterator) {
        var arr = [];
        var item = iterator.next();
        while (!item.done) {
            arr.push(item.value);
            item = iterator.next();
        }
        return arr;
    }
    exports.iteratorToArray = iteratorToArray;
    function mergeAnimationOptions(source, destination) {
        if (source.params) {
            var p0_1 = source.params;
            if (!destination.params) {
                destination.params = {};
            }
            var p1_1 = destination.params;
            Object.keys(p0_1).forEach(function (param) {
                if (!p1_1.hasOwnProperty(param)) {
                    p1_1[param] = p0_1[param];
                }
            });
        }
        return destination;
    }
    exports.mergeAnimationOptions = mergeAnimationOptions;
    var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
    function dashCaseToCamelCase(input) {
        return input.replace(DASH_CASE_REGEXP, function () {
            var m = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                m[_i] = arguments[_i];
            }
            return m[1].toUpperCase();
        });
    }
    exports.dashCaseToCamelCase = dashCaseToCamelCase;
    function allowPreviousPlayerStylesMerge(duration, delay) {
        return duration === 0 || delay === 0;
    }
    exports.allowPreviousPlayerStylesMerge = allowPreviousPlayerStylesMerge;
    function visitDslNode(visitor, node, context) {
        switch (node.type) {
            case 7 /* Trigger */:
                return visitor.visitTrigger(node, context);
            case 0 /* State */:
                return visitor.visitState(node, context);
            case 1 /* Transition */:
                return visitor.visitTransition(node, context);
            case 2 /* Sequence */:
                return visitor.visitSequence(node, context);
            case 3 /* Group */:
                return visitor.visitGroup(node, context);
            case 4 /* Animate */:
                return visitor.visitAnimate(node, context);
            case 5 /* Keyframes */:
                return visitor.visitKeyframes(node, context);
            case 6 /* Style */:
                return visitor.visitStyle(node, context);
            case 8 /* Reference */:
                return visitor.visitReference(node, context);
            case 9 /* AnimateChild */:
                return visitor.visitAnimateChild(node, context);
            case 10 /* AnimateRef */:
                return visitor.visitAnimateRef(node, context);
            case 11 /* Query */:
                return visitor.visitQuery(node, context);
            case 12 /* Stagger */:
                return visitor.visitStagger(node, context);
            default:
                throw new Error("Unable to resolve animation metadata node #" + node.type);
        }
    }
    exports.visitDslNode = visitDslNode;
});
//# sourceMappingURL=util.js.map