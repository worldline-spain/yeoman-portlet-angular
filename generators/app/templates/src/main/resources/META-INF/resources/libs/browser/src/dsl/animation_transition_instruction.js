define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createTransitionInstruction(element, triggerName, fromState, toState, isRemovalTransition, fromStyles, toStyles, timelines, queriedElements, preStyleProps, postStyleProps, errors) {
        return {
            type: 0 /* TransitionAnimation */,
            element: element,
            triggerName: triggerName,
            isRemovalTransition: isRemovalTransition,
            fromState: fromState,
            fromStyles: fromStyles,
            toState: toState,
            toStyles: toStyles,
            timelines: timelines,
            queriedElements: queriedElements,
            preStyleProps: preStyleProps,
            postStyleProps: postStyleProps,
            errors: errors
        };
    }
    exports.createTransitionInstruction = createTransitionInstruction;
});
//# sourceMappingURL=animation_transition_instruction.js.map