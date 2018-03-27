var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "@angular/animations", "../util", "./animation_timeline_instruction", "./element_instruction_map"], function (require, exports, animations_1, util_1, animation_timeline_instruction_1, element_instruction_map_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ONE_FRAME_IN_MILLISECONDS = 1;
    /*
     * The code within this file aims to generate web-animations-compatible keyframes from Angular's
     * animation DSL code.
     *
     * The code below will be converted from:
     *
     * ```
     * sequence([
     *   style({ opacity: 0 }),
     *   animate(1000, style({ opacity: 0 }))
     * ])
     * ```
     *
     * To:
     * ```
     * keyframes = [{ opacity: 0, offset: 0 }, { opacity: 1, offset: 1 }]
     * duration = 1000
     * delay = 0
     * easing = ''
     * ```
     *
     * For this operation to cover the combination of animation verbs (style, animate, group, etc...) a
     * combination of prototypical inheritance, AST traversal and merge-sort-like algorithms are used.
     *
     * [AST Traversal]
     * Each of the animation verbs, when executed, will return an string-map object representing what
     * type of action it is (style, animate, group, etc...) and the data associated with it. This means
     * that when functional composition mix of these functions is evaluated (like in the example above)
     * then it will end up producing a tree of objects representing the animation itself.
     *
     * When this animation object tree is processed by the visitor code below it will visit each of the
     * verb statements within the visitor. And during each visit it will build the context of the
     * animation keyframes by interacting with the `TimelineBuilder`.
     *
     * [TimelineBuilder]
     * This class is responsible for tracking the styles and building a series of keyframe objects for a
     * timeline between a start and end time. The builder starts off with an initial timeline and each
     * time the AST comes across a `group()`, `keyframes()` or a combination of the two wihtin a
     * `sequence()` then it will generate a sub timeline for each step as well as a new one after
     * they are complete.
     *
     * As the AST is traversed, the timing state on each of the timelines will be incremented. If a sub
     * timeline was created (based on one of the cases above) then the parent timeline will attempt to
     * merge the styles used within the sub timelines into itself (only with group() this will happen).
     * This happens with a merge operation (much like how the merge works in mergesort) and it will only
     * copy the most recently used styles from the sub timelines into the parent timeline. This ensures
     * that if the styles are used later on in another phase of the animation then they will be the most
     * up-to-date values.
     *
     * [How Missing Styles Are Updated]
     * Each timeline has a `backFill` property which is responsible for filling in new styles into
     * already processed keyframes if a new style shows up later within the animation sequence.
     *
     * ```
     * sequence([
     *   style({ width: 0 }),
     *   animate(1000, style({ width: 100 })),
     *   animate(1000, style({ width: 200 })),
     *   animate(1000, style({ width: 300 }))
     *   animate(1000, style({ width: 400, height: 400 })) // notice how `height` doesn't exist anywhere
     * else
     * ])
     * ```
     *
     * What is happening here is that the `height` value is added later in the sequence, but is missing
     * from all previous animation steps. Therefore when a keyframe is created it would also be missing
     * from all previous keyframes up until where it is first used. For the timeline keyframe generation
     * to properly fill in the style it will place the previous value (the value from the parent
     * timeline) or a default value of `*` into the backFill object. Given that each of the keyframe
     * styles are objects that prototypically inhert from the backFill object, this means that if a
     * value is added into the backFill then it will automatically propagate any missing values to all
     * keyframes. Therefore the missing `height` value will be properly filled into the already
     * processed keyframes.
     *
     * When a sub-timeline is created it will have its own backFill property. This is done so that
     * styles present within the sub-timeline do not accidentally seep into the previous/future timeline
     * keyframes
     *
     * (For prototypically-inherited contents to be detected a `for(i in obj)` loop must be used.)
     *
     * [Validation]
     * The code in this file is not responsible for validation. That functionality happens with within
     * the `AnimationValidatorVisitor` code.
     */
    function buildAnimationTimelines(driver, rootElement, ast, startingStyles, finalStyles, options, subInstructions, errors) {
        if (startingStyles === void 0) { startingStyles = {}; }
        if (finalStyles === void 0) { finalStyles = {}; }
        if (errors === void 0) { errors = []; }
        return new AnimationTimelineBuilderVisitor().buildKeyframes(driver, rootElement, ast, startingStyles, finalStyles, options, subInstructions, errors);
    }
    exports.buildAnimationTimelines = buildAnimationTimelines;
    var AnimationTimelineBuilderVisitor = (function () {
        function AnimationTimelineBuilderVisitor() {
        }
        AnimationTimelineBuilderVisitor.prototype.buildKeyframes = function (driver, rootElement, ast, startingStyles, finalStyles, options, subInstructions, errors) {
            if (errors === void 0) { errors = []; }
            subInstructions = subInstructions || new element_instruction_map_1.ElementInstructionMap();
            var context = new AnimationTimelineContext(driver, rootElement, subInstructions, errors, []);
            context.options = options;
            context.currentTimeline.setStyles([startingStyles], null, context.errors, options);
            util_1.visitDslNode(this, ast, context);
            // this checks to see if an actual animation happened
            var timelines = context.timelines.filter(function (timeline) { return timeline.containsAnimation(); });
            if (timelines.length && Object.keys(finalStyles).length) {
                var tl = timelines[timelines.length - 1];
                if (!tl.allowOnlyTimelineStyles()) {
                    tl.setStyles([finalStyles], null, context.errors, options);
                }
            }
            return timelines.length ? timelines.map(function (timeline) { return timeline.buildKeyframes(); }) :
                [animation_timeline_instruction_1.createTimelineInstruction(rootElement, [], [], [], 0, 0, '', false)];
        };
        AnimationTimelineBuilderVisitor.prototype.visitTrigger = function (ast, context) {
            // these values are not visited in this AST
        };
        AnimationTimelineBuilderVisitor.prototype.visitState = function (ast, context) {
            // these values are not visited in this AST
        };
        AnimationTimelineBuilderVisitor.prototype.visitTransition = function (ast, context) {
            // these values are not visited in this AST
        };
        AnimationTimelineBuilderVisitor.prototype.visitAnimateChild = function (ast, context) {
            var elementInstructions = context.subInstructions.consume(context.element);
            if (elementInstructions) {
                var innerContext = context.createSubContext(ast.options);
                var startTime = context.currentTimeline.currentTime;
                var endTime = this._visitSubInstructions(elementInstructions, innerContext, innerContext.options);
                if (startTime != endTime) {
                    // we do this on the upper context because we created a sub context for
                    // the sub child animations
                    context.transformIntoNewTimeline(endTime);
                }
            }
            context.previousNode = ast;
        };
        AnimationTimelineBuilderVisitor.prototype.visitAnimateRef = function (ast, context) {
            var innerContext = context.createSubContext(ast.options);
            innerContext.transformIntoNewTimeline();
            this.visitReference(ast.animation, innerContext);
            context.transformIntoNewTimeline(innerContext.currentTimeline.currentTime);
            context.previousNode = ast;
        };
        AnimationTimelineBuilderVisitor.prototype._visitSubInstructions = function (instructions, context, options) {
            var startTime = context.currentTimeline.currentTime;
            var furthestTime = startTime;
            // this is a special-case for when a user wants to skip a sub
            // animation from being fired entirely.
            var duration = options.duration != null ? util_1.resolveTimingValue(options.duration) : null;
            var delay = options.delay != null ? util_1.resolveTimingValue(options.delay) : null;
            if (duration !== 0) {
                instructions.forEach(function (instruction) {
                    var instructionTimings = context.appendInstructionToTimeline(instruction, duration, delay);
                    furthestTime =
                        Math.max(furthestTime, instructionTimings.duration + instructionTimings.delay);
                });
            }
            return furthestTime;
        };
        AnimationTimelineBuilderVisitor.prototype.visitReference = function (ast, context) {
            context.updateOptions(ast.options, true);
            util_1.visitDslNode(this, ast.animation, context);
            context.previousNode = ast;
        };
        AnimationTimelineBuilderVisitor.prototype.visitSequence = function (ast, context) {
            var _this = this;
            var subContextCount = context.subContextCount;
            var ctx = context;
            var options = ast.options;
            if (options && (options.params || options.delay)) {
                ctx = context.createSubContext(options);
                ctx.transformIntoNewTimeline();
                if (options.delay != null) {
                    if (ctx.previousNode.type == 6 /* Style */) {
                        ctx.currentTimeline.snapshotCurrentStyles();
                        ctx.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
                    }
                    var delay = util_1.resolveTimingValue(options.delay);
                    ctx.delayNextStep(delay);
                }
            }
            if (ast.steps.length) {
                ast.steps.forEach(function (s) { return util_1.visitDslNode(_this, s, ctx); });
                // this is here just incase the inner steps only contain or end with a style() call
                ctx.currentTimeline.applyStylesToKeyframe();
                // this means that some animation function within the sequence
                // ended up creating a sub timeline (which means the current
                // timeline cannot overlap with the contents of the sequence)
                if (ctx.subContextCount > subContextCount) {
                    ctx.transformIntoNewTimeline();
                }
            }
            context.previousNode = ast;
        };
        AnimationTimelineBuilderVisitor.prototype.visitGroup = function (ast, context) {
            var _this = this;
            var innerTimelines = [];
            var furthestTime = context.currentTimeline.currentTime;
            var delay = ast.options && ast.options.delay ? util_1.resolveTimingValue(ast.options.delay) : 0;
            ast.steps.forEach(function (s) {
                var innerContext = context.createSubContext(ast.options);
                if (delay) {
                    innerContext.delayNextStep(delay);
                }
                util_1.visitDslNode(_this, s, innerContext);
                furthestTime = Math.max(furthestTime, innerContext.currentTimeline.currentTime);
                innerTimelines.push(innerContext.currentTimeline);
            });
            // this operation is run after the AST loop because otherwise
            // if the parent timeline's collected styles were updated then
            // it would pass in invalid data into the new-to-be forked items
            innerTimelines.forEach(function (timeline) { return context.currentTimeline.mergeTimelineCollectedStyles(timeline); });
            context.transformIntoNewTimeline(furthestTime);
            context.previousNode = ast;
        };
        AnimationTimelineBuilderVisitor.prototype._visitTiming = function (ast, context) {
            if (ast.dynamic) {
                var strValue = ast.strValue;
                var timingValue = context.params ? util_1.interpolateParams(strValue, context.params, context.errors) : strValue;
                return util_1.resolveTiming(timingValue, context.errors);
            }
            else {
                return { duration: ast.duration, delay: ast.delay, easing: ast.easing };
            }
        };
        AnimationTimelineBuilderVisitor.prototype.visitAnimate = function (ast, context) {
            var timings = context.currentAnimateTimings = this._visitTiming(ast.timings, context);
            var timeline = context.currentTimeline;
            if (timings.delay) {
                context.incrementTime(timings.delay);
                timeline.snapshotCurrentStyles();
            }
            var style = ast.style;
            if (style.type == 5 /* Keyframes */) {
                this.visitKeyframes(style, context);
            }
            else {
                context.incrementTime(timings.duration);
                this.visitStyle(style, context);
                timeline.applyStylesToKeyframe();
            }
            context.currentAnimateTimings = null;
            context.previousNode = ast;
        };
        AnimationTimelineBuilderVisitor.prototype.visitStyle = function (ast, context) {
            var timeline = context.currentTimeline;
            var timings = context.currentAnimateTimings;
            // this is a special case for when a style() call
            // directly follows  an animate() call (but not inside of an animate() call)
            if (!timings && timeline.getCurrentStyleProperties().length) {
                timeline.forwardFrame();
            }
            var easing = (timings && timings.easing) || ast.easing;
            if (ast.isEmptyStep) {
                timeline.applyEmptyStep(easing);
            }
            else {
                timeline.setStyles(ast.styles, easing, context.errors, context.options);
            }
            context.previousNode = ast;
        };
        AnimationTimelineBuilderVisitor.prototype.visitKeyframes = function (ast, context) {
            var currentAnimateTimings = context.currentAnimateTimings;
            var startTime = (context.currentTimeline).duration;
            var duration = currentAnimateTimings.duration;
            var innerContext = context.createSubContext();
            var innerTimeline = innerContext.currentTimeline;
            innerTimeline.easing = currentAnimateTimings.easing;
            ast.styles.forEach(function (step) {
                var offset = step.offset || 0;
                innerTimeline.forwardTime(offset * duration);
                innerTimeline.setStyles(step.styles, step.easing, context.errors, context.options);
                innerTimeline.applyStylesToKeyframe();
            });
            // this will ensure that the parent timeline gets all the styles from
            // the child even if the new timeline below is not used
            context.currentTimeline.mergeTimelineCollectedStyles(innerTimeline);
            // we do this because the window between this timeline and the sub timeline
            // should ensure that the styles within are exactly the same as they were before
            context.transformIntoNewTimeline(startTime + duration);
            context.previousNode = ast;
        };
        AnimationTimelineBuilderVisitor.prototype.visitQuery = function (ast, context) {
            var _this = this;
            // in the event that the first step before this is a style step we need
            // to ensure the styles are applied before the children are animated
            var startTime = context.currentTimeline.currentTime;
            var options = (ast.options || {});
            var delay = options.delay ? util_1.resolveTimingValue(options.delay) : 0;
            if (delay && (context.previousNode.type === 6 /* Style */ ||
                (startTime == 0 && context.currentTimeline.getCurrentStyleProperties().length))) {
                context.currentTimeline.snapshotCurrentStyles();
                context.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
            }
            var furthestTime = startTime;
            var elms = context.invokeQuery(ast.selector, ast.originalSelector, ast.limit, ast.includeSelf, options.optional ? true : false, context.errors);
            context.currentQueryTotal = elms.length;
            var sameElementTimeline = null;
            elms.forEach(function (element, i) {
                context.currentQueryIndex = i;
                var innerContext = context.createSubContext(ast.options, element);
                if (delay) {
                    innerContext.delayNextStep(delay);
                }
                if (element === context.element) {
                    sameElementTimeline = innerContext.currentTimeline;
                }
                util_1.visitDslNode(_this, ast.animation, innerContext);
                // this is here just incase the inner steps only contain or end
                // with a style() call (which is here to signal that this is a preparatory
                // call to style an element before it is animated again)
                innerContext.currentTimeline.applyStylesToKeyframe();
                var endTime = innerContext.currentTimeline.currentTime;
                furthestTime = Math.max(furthestTime, endTime);
            });
            context.currentQueryIndex = 0;
            context.currentQueryTotal = 0;
            context.transformIntoNewTimeline(furthestTime);
            if (sameElementTimeline) {
                context.currentTimeline.mergeTimelineCollectedStyles(sameElementTimeline);
                context.currentTimeline.snapshotCurrentStyles();
            }
            context.previousNode = ast;
        };
        AnimationTimelineBuilderVisitor.prototype.visitStagger = function (ast, context) {
            var parentContext = context.parentContext;
            var tl = context.currentTimeline;
            var timings = ast.timings;
            var duration = Math.abs(timings.duration);
            var maxTime = duration * (context.currentQueryTotal - 1);
            var delay = duration * context.currentQueryIndex;
            var staggerTransformer = timings.duration < 0 ? 'reverse' : timings.easing;
            switch (staggerTransformer) {
                case 'reverse':
                    delay = maxTime - delay;
                    break;
                case 'full':
                    delay = parentContext.currentStaggerTime;
                    break;
            }
            var timeline = context.currentTimeline;
            if (delay) {
                timeline.delayNextStep(delay);
            }
            var startingTime = timeline.currentTime;
            util_1.visitDslNode(this, ast.animation, context);
            context.previousNode = ast;
            // time = duration + delay
            // the reason why this computation is so complex is because
            // the inner timeline may either have a delay value or a stretched
            // keyframe depending on if a subtimeline is not used or is used.
            parentContext.currentStaggerTime =
                (tl.currentTime - startingTime) + (tl.startTime - parentContext.currentTimeline.startTime);
        };
        return AnimationTimelineBuilderVisitor;
    }());
    exports.AnimationTimelineBuilderVisitor = AnimationTimelineBuilderVisitor;
    var DEFAULT_NOOP_PREVIOUS_NODE = {};
    var AnimationTimelineContext = (function () {
        function AnimationTimelineContext(_driver, element, subInstructions, errors, timelines, initialTimeline) {
            this._driver = _driver;
            this.element = element;
            this.subInstructions = subInstructions;
            this.errors = errors;
            this.timelines = timelines;
            this.parentContext = null;
            this.currentAnimateTimings = null;
            this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
            this.subContextCount = 0;
            this.options = {};
            this.currentQueryIndex = 0;
            this.currentQueryTotal = 0;
            this.currentStaggerTime = 0;
            this.currentTimeline = initialTimeline || new TimelineBuilder(element, 0);
            timelines.push(this.currentTimeline);
        }
        Object.defineProperty(AnimationTimelineContext.prototype, "params", {
            get: function () { return this.options.params; },
            enumerable: true,
            configurable: true
        });
        AnimationTimelineContext.prototype.updateOptions = function (options, skipIfExists) {
            var _this = this;
            if (!options)
                return;
            var newOptions = options;
            var optionsToUpdate = this.options;
            // NOTE: this will get patched up when other animation methods support duration overrides
            if (newOptions.duration != null) {
                optionsToUpdate.duration = util_1.resolveTimingValue(newOptions.duration);
            }
            if (newOptions.delay != null) {
                optionsToUpdate.delay = util_1.resolveTimingValue(newOptions.delay);
            }
            var newParams = newOptions.params;
            if (newParams) {
                var paramsToUpdate_1 = optionsToUpdate.params;
                if (!paramsToUpdate_1) {
                    paramsToUpdate_1 = this.options.params = {};
                }
                Object.keys(newParams).forEach(function (name) {
                    if (!skipIfExists || !paramsToUpdate_1.hasOwnProperty(name)) {
                        paramsToUpdate_1[name] = util_1.interpolateParams(newParams[name], paramsToUpdate_1, _this.errors);
                    }
                });
            }
        };
        AnimationTimelineContext.prototype._copyOptions = function () {
            var options = {};
            if (this.options) {
                var oldParams_1 = this.options.params;
                if (oldParams_1) {
                    var params_1 = options['params'] = {};
                    Object.keys(oldParams_1).forEach(function (name) { params_1[name] = oldParams_1[name]; });
                }
            }
            return options;
        };
        AnimationTimelineContext.prototype.createSubContext = function (options, element, newTime) {
            if (options === void 0) { options = null; }
            var target = element || this.element;
            var context = new AnimationTimelineContext(this._driver, target, this.subInstructions, this.errors, this.timelines, this.currentTimeline.fork(target, newTime || 0));
            context.previousNode = this.previousNode;
            context.currentAnimateTimings = this.currentAnimateTimings;
            context.options = this._copyOptions();
            context.updateOptions(options);
            context.currentQueryIndex = this.currentQueryIndex;
            context.currentQueryTotal = this.currentQueryTotal;
            context.parentContext = this;
            this.subContextCount++;
            return context;
        };
        AnimationTimelineContext.prototype.transformIntoNewTimeline = function (newTime) {
            this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
            this.currentTimeline = this.currentTimeline.fork(this.element, newTime);
            this.timelines.push(this.currentTimeline);
            return this.currentTimeline;
        };
        AnimationTimelineContext.prototype.appendInstructionToTimeline = function (instruction, duration, delay) {
            var updatedTimings = {
                duration: duration != null ? duration : instruction.duration,
                delay: this.currentTimeline.currentTime + (delay != null ? delay : 0) + instruction.delay,
                easing: ''
            };
            var builder = new SubTimelineBuilder(instruction.element, instruction.keyframes, instruction.preStyleProps, instruction.postStyleProps, updatedTimings, instruction.stretchStartingKeyframe);
            this.timelines.push(builder);
            return updatedTimings;
        };
        AnimationTimelineContext.prototype.incrementTime = function (time) {
            this.currentTimeline.forwardTime(this.currentTimeline.duration + time);
        };
        AnimationTimelineContext.prototype.delayNextStep = function (delay) {
            // negative delays are not yet supported
            if (delay > 0) {
                this.currentTimeline.delayNextStep(delay);
            }
        };
        AnimationTimelineContext.prototype.invokeQuery = function (selector, originalSelector, limit, includeSelf, optional, errors) {
            var results = [];
            if (includeSelf) {
                results.push(this.element);
            }
            if (selector.length > 0) {
                var multi = limit != 1;
                var elements = this._driver.query(this.element, selector, multi);
                if (limit !== 0) {
                    elements = elements.slice(0, limit);
                }
                results.push.apply(results, elements);
            }
            if (!optional && results.length == 0) {
                errors.push("`query(\"" + originalSelector + "\")` returned zero elements. (Use `query(\"" + originalSelector + "\", { optional: true })` if you wish to allow this.)");
            }
            return results;
        };
        return AnimationTimelineContext;
    }());
    exports.AnimationTimelineContext = AnimationTimelineContext;
    var TimelineBuilder = (function () {
        function TimelineBuilder(element, startTime, _elementTimelineStylesLookup) {
            this.element = element;
            this.startTime = startTime;
            this._elementTimelineStylesLookup = _elementTimelineStylesLookup;
            this.duration = 0;
            this._previousKeyframe = {};
            this._currentKeyframe = {};
            this._keyframes = new Map();
            this._styleSummary = {};
            this._pendingStyles = {};
            this._backFill = {};
            this._currentEmptyStepKeyframe = null;
            if (!this._elementTimelineStylesLookup) {
                this._elementTimelineStylesLookup = new Map();
            }
            this._localTimelineStyles = Object.create(this._backFill, {});
            this._globalTimelineStyles = this._elementTimelineStylesLookup.get(element);
            if (!this._globalTimelineStyles) {
                this._globalTimelineStyles = this._localTimelineStyles;
                this._elementTimelineStylesLookup.set(element, this._localTimelineStyles);
            }
            this._loadKeyframe();
        }
        TimelineBuilder.prototype.containsAnimation = function () {
            switch (this._keyframes.size) {
                case 0:
                    return false;
                case 1:
                    return this.getCurrentStyleProperties().length > 0;
                default:
                    return true;
            }
        };
        TimelineBuilder.prototype.getCurrentStyleProperties = function () { return Object.keys(this._currentKeyframe); };
        Object.defineProperty(TimelineBuilder.prototype, "currentTime", {
            get: function () { return this.startTime + this.duration; },
            enumerable: true,
            configurable: true
        });
        TimelineBuilder.prototype.delayNextStep = function (delay) {
            // in the event that a style() step is placed right before a stagger()
            // and that style() step is the very first style() value in the animation
            // then we need to make a copy of the keyframe [0, copy, 1] so that the delay
            // properly applies the style() values to work with the stagger...
            var hasPreStyleStep = this._keyframes.size == 1 && Object.keys(this._pendingStyles).length;
            if (this.duration || hasPreStyleStep) {
                this.forwardTime(this.currentTime + delay);
                if (hasPreStyleStep) {
                    this.snapshotCurrentStyles();
                }
            }
            else {
                this.startTime += delay;
            }
        };
        TimelineBuilder.prototype.fork = function (element, currentTime) {
            this.applyStylesToKeyframe();
            return new TimelineBuilder(element, currentTime || this.currentTime, this._elementTimelineStylesLookup);
        };
        TimelineBuilder.prototype._loadKeyframe = function () {
            if (this._currentKeyframe) {
                this._previousKeyframe = this._currentKeyframe;
            }
            this._currentKeyframe = this._keyframes.get(this.duration);
            if (!this._currentKeyframe) {
                this._currentKeyframe = Object.create(this._backFill, {});
                this._keyframes.set(this.duration, this._currentKeyframe);
            }
        };
        TimelineBuilder.prototype.forwardFrame = function () {
            this.duration += ONE_FRAME_IN_MILLISECONDS;
            this._loadKeyframe();
        };
        TimelineBuilder.prototype.forwardTime = function (time) {
            this.applyStylesToKeyframe();
            this.duration = time;
            this._loadKeyframe();
        };
        TimelineBuilder.prototype._updateStyle = function (prop, value) {
            this._localTimelineStyles[prop] = value;
            this._globalTimelineStyles[prop] = value;
            this._styleSummary[prop] = { time: this.currentTime, value: value };
        };
        TimelineBuilder.prototype.allowOnlyTimelineStyles = function () { return this._currentEmptyStepKeyframe !== this._currentKeyframe; };
        TimelineBuilder.prototype.applyEmptyStep = function (easing) {
            var _this = this;
            if (easing) {
                this._previousKeyframe['easing'] = easing;
            }
            // special case for animate(duration):
            // all missing styles are filled with a `*` value then
            // if any destination styles are filled in later on the same
            // keyframe then they will override the overridden styles
            // We use `_globalTimelineStyles` here because there may be
            // styles in previous keyframes that are not present in this timeline
            Object.keys(this._globalTimelineStyles).forEach(function (prop) {
                _this._backFill[prop] = _this._globalTimelineStyles[prop] || animations_1.AUTO_STYLE;
                _this._currentKeyframe[prop] = animations_1.AUTO_STYLE;
            });
            this._currentEmptyStepKeyframe = this._currentKeyframe;
        };
        TimelineBuilder.prototype.setStyles = function (input, easing, errors, options) {
            var _this = this;
            if (easing) {
                this._previousKeyframe['easing'] = easing;
            }
            var params = (options && options.params) || {};
            var styles = flattenStyles(input, this._globalTimelineStyles);
            Object.keys(styles).forEach(function (prop) {
                var val = util_1.interpolateParams(styles[prop], params, errors);
                _this._pendingStyles[prop] = val;
                if (!_this._localTimelineStyles.hasOwnProperty(prop)) {
                    _this._backFill[prop] = _this._globalTimelineStyles.hasOwnProperty(prop) ?
                        _this._globalTimelineStyles[prop] :
                        animations_1.AUTO_STYLE;
                }
                _this._updateStyle(prop, val);
            });
        };
        TimelineBuilder.prototype.applyStylesToKeyframe = function () {
            var _this = this;
            var styles = this._pendingStyles;
            var props = Object.keys(styles);
            if (props.length == 0)
                return;
            this._pendingStyles = {};
            props.forEach(function (prop) {
                var val = styles[prop];
                _this._currentKeyframe[prop] = val;
            });
            Object.keys(this._localTimelineStyles).forEach(function (prop) {
                if (!_this._currentKeyframe.hasOwnProperty(prop)) {
                    _this._currentKeyframe[prop] = _this._localTimelineStyles[prop];
                }
            });
        };
        TimelineBuilder.prototype.snapshotCurrentStyles = function () {
            var _this = this;
            Object.keys(this._localTimelineStyles).forEach(function (prop) {
                var val = _this._localTimelineStyles[prop];
                _this._pendingStyles[prop] = val;
                _this._updateStyle(prop, val);
            });
        };
        TimelineBuilder.prototype.getFinalKeyframe = function () { return this._keyframes.get(this.duration); };
        Object.defineProperty(TimelineBuilder.prototype, "properties", {
            get: function () {
                var properties = [];
                for (var prop in this._currentKeyframe) {
                    properties.push(prop);
                }
                return properties;
            },
            enumerable: true,
            configurable: true
        });
        TimelineBuilder.prototype.mergeTimelineCollectedStyles = function (timeline) {
            var _this = this;
            Object.keys(timeline._styleSummary).forEach(function (prop) {
                var details0 = _this._styleSummary[prop];
                var details1 = timeline._styleSummary[prop];
                if (!details0 || details1.time > details0.time) {
                    _this._updateStyle(prop, details1.value);
                }
            });
        };
        TimelineBuilder.prototype.buildKeyframes = function () {
            var _this = this;
            this.applyStylesToKeyframe();
            var preStyleProps = new Set();
            var postStyleProps = new Set();
            var isEmpty = this._keyframes.size === 1 && this.duration === 0;
            var finalKeyframes = [];
            this._keyframes.forEach(function (keyframe, time) {
                var finalKeyframe = util_1.copyStyles(keyframe, true);
                Object.keys(finalKeyframe).forEach(function (prop) {
                    var value = finalKeyframe[prop];
                    if (value == animations_1.ɵPRE_STYLE) {
                        preStyleProps.add(prop);
                    }
                    else if (value == animations_1.AUTO_STYLE) {
                        postStyleProps.add(prop);
                    }
                });
                if (!isEmpty) {
                    finalKeyframe['offset'] = time / _this.duration;
                }
                finalKeyframes.push(finalKeyframe);
            });
            var preProps = preStyleProps.size ? util_1.iteratorToArray(preStyleProps.values()) : [];
            var postProps = postStyleProps.size ? util_1.iteratorToArray(postStyleProps.values()) : [];
            // special case for a 0-second animation (which is designed just to place styles onscreen)
            if (isEmpty) {
                var kf0 = finalKeyframes[0];
                var kf1 = util_1.copyObj(kf0);
                kf0['offset'] = 0;
                kf1['offset'] = 1;
                finalKeyframes = [kf0, kf1];
            }
            return animation_timeline_instruction_1.createTimelineInstruction(this.element, finalKeyframes, preProps, postProps, this.duration, this.startTime, this.easing, false);
        };
        return TimelineBuilder;
    }());
    exports.TimelineBuilder = TimelineBuilder;
    var SubTimelineBuilder = (function (_super) {
        __extends(SubTimelineBuilder, _super);
        function SubTimelineBuilder(element, keyframes, preStyleProps, postStyleProps, timings, _stretchStartingKeyframe) {
            if (_stretchStartingKeyframe === void 0) { _stretchStartingKeyframe = false; }
            var _this = _super.call(this, element, timings.delay) || this;
            _this.element = element;
            _this.keyframes = keyframes;
            _this.preStyleProps = preStyleProps;
            _this.postStyleProps = postStyleProps;
            _this._stretchStartingKeyframe = _stretchStartingKeyframe;
            _this.timings = { duration: timings.duration, delay: timings.delay, easing: timings.easing };
            return _this;
        }
        SubTimelineBuilder.prototype.containsAnimation = function () { return this.keyframes.length > 1; };
        SubTimelineBuilder.prototype.buildKeyframes = function () {
            var keyframes = this.keyframes;
            var _a = this.timings, delay = _a.delay, duration = _a.duration, easing = _a.easing;
            if (this._stretchStartingKeyframe && delay) {
                var newKeyframes = [];
                var totalTime = duration + delay;
                var startingGap = delay / totalTime;
                // the original starting keyframe now starts once the delay is done
                var newFirstKeyframe = util_1.copyStyles(keyframes[0], false);
                newFirstKeyframe['offset'] = 0;
                newKeyframes.push(newFirstKeyframe);
                var oldFirstKeyframe = util_1.copyStyles(keyframes[0], false);
                oldFirstKeyframe['offset'] = roundOffset(startingGap);
                newKeyframes.push(oldFirstKeyframe);
                /*
                  When the keyframe is stretched then it means that the delay before the animation
                  starts is gone. Instead the first keyframe is placed at the start of the animation
                  and it is then copied to where it starts when the original delay is over. This basically
                  means nothing animates during that delay, but the styles are still renderered. For this
                  to work the original offset values that exist in the original keyframes must be "warped"
                  so that they can take the new keyframe + delay into account.
          
                  delay=1000, duration=1000, keyframes = 0 .5 1
          
                  turns into
          
                  delay=0, duration=2000, keyframes = 0 .33 .66 1
                 */
                // offsets between 1 ... n -1 are all warped by the keyframe stretch
                var limit = keyframes.length - 1;
                for (var i = 1; i <= limit; i++) {
                    var kf = util_1.copyStyles(keyframes[i], false);
                    var oldOffset = kf['offset'];
                    var timeAtKeyframe = delay + oldOffset * duration;
                    kf['offset'] = roundOffset(timeAtKeyframe / totalTime);
                    newKeyframes.push(kf);
                }
                // the new starting keyframe should be added at the start
                duration = totalTime;
                delay = 0;
                easing = '';
                keyframes = newKeyframes;
            }
            return animation_timeline_instruction_1.createTimelineInstruction(this.element, keyframes, this.preStyleProps, this.postStyleProps, duration, delay, easing, true);
        };
        return SubTimelineBuilder;
    }(TimelineBuilder));
    function roundOffset(offset, decimalPoints) {
        if (decimalPoints === void 0) { decimalPoints = 3; }
        var mult = Math.pow(10, decimalPoints - 1);
        return Math.round(offset * mult) / mult;
    }
    function flattenStyles(input, allStyles) {
        var styles = {};
        var allProperties;
        input.forEach(function (token) {
            if (token === '*') {
                allProperties = allProperties || Object.keys(allStyles);
                allProperties.forEach(function (prop) { styles[prop] = animations_1.AUTO_STYLE; });
            }
            else {
                util_1.copyStyles(token, false, styles);
            }
        });
        return styles;
    }
});
//# sourceMappingURL=animation_timeline_builder.js.map