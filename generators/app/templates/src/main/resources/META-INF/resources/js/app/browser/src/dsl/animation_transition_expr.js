define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    exports.ANY_STATE = '*';
    function parseTransitionExpr(transitionValue, errors) {
        var expressions = [];
        if (typeof transitionValue == 'string') {
            transitionValue
                .split(/\s*,\s*/)
                .forEach(function (str) { return parseInnerTransitionStr(str, expressions, errors); });
        }
        else {
            expressions.push(transitionValue);
        }
        return expressions;
    }
    exports.parseTransitionExpr = parseTransitionExpr;
    function parseInnerTransitionStr(eventStr, expressions, errors) {
        if (eventStr[0] == ':') {
            eventStr = parseAnimationAlias(eventStr, errors);
        }
        var match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
        if (match == null || match.length < 4) {
            errors.push("The provided transition expression \"" + eventStr + "\" is not supported");
            return expressions;
        }
        var fromState = match[1];
        var separator = match[2];
        var toState = match[3];
        expressions.push(makeLambdaFromStates(fromState, toState));
        var isFullAnyStateExpr = fromState == exports.ANY_STATE && toState == exports.ANY_STATE;
        if (separator[0] == '<' && !isFullAnyStateExpr) {
            expressions.push(makeLambdaFromStates(toState, fromState));
        }
    }
    function parseAnimationAlias(alias, errors) {
        switch (alias) {
            case ':enter':
                return 'void => *';
            case ':leave':
                return '* => void';
            default:
                errors.push("The transition alias value \"" + alias + "\" is not supported");
                return '* => *';
        }
    }
    var TRUE_BOOLEAN_VALUES = new Set();
    TRUE_BOOLEAN_VALUES.add('true');
    TRUE_BOOLEAN_VALUES.add('1');
    var FALSE_BOOLEAN_VALUES = new Set();
    FALSE_BOOLEAN_VALUES.add('false');
    FALSE_BOOLEAN_VALUES.add('0');
    function makeLambdaFromStates(lhs, rhs) {
        var LHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(lhs) || FALSE_BOOLEAN_VALUES.has(lhs);
        var RHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(rhs) || FALSE_BOOLEAN_VALUES.has(rhs);
        return function (fromState, toState) {
            var lhsMatch = lhs == exports.ANY_STATE || lhs == fromState;
            var rhsMatch = rhs == exports.ANY_STATE || rhs == toState;
            if (!lhsMatch && LHS_MATCH_BOOLEAN && typeof fromState === 'boolean') {
                lhsMatch = fromState ? TRUE_BOOLEAN_VALUES.has(lhs) : FALSE_BOOLEAN_VALUES.has(lhs);
            }
            if (!rhsMatch && RHS_MATCH_BOOLEAN && typeof toState === 'boolean') {
                rhsMatch = toState ? TRUE_BOOLEAN_VALUES.has(rhs) : FALSE_BOOLEAN_VALUES.has(rhs);
            }
            return lhsMatch && rhsMatch;
        };
    }
});
//# sourceMappingURL=animation_transition_expr.js.map