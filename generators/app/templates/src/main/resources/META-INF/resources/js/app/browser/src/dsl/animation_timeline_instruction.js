define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createTimelineInstruction(element, keyframes, preStyleProps, postStyleProps, duration, delay, easing, subTimeline) {
        if (easing === void 0) { easing = null; }
        if (subTimeline === void 0) { subTimeline = false; }
        return {
            type: 1 /* TimelineAnimation */,
            element: element,
            keyframes: keyframes,
            preStyleProps: preStyleProps,
            postStyleProps: postStyleProps,
            duration: duration,
            delay: delay,
            totalTime: duration + delay, easing: easing, subTimeline: subTimeline
        };
    }
    exports.createTimelineInstruction = createTimelineInstruction;
});
//# sourceMappingURL=animation_timeline_instruction.js.map