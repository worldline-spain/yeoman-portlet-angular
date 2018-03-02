define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ElementInstructionMap = (function () {
        function ElementInstructionMap() {
            this._map = new Map();
        }
        ElementInstructionMap.prototype.consume = function (element) {
            var instructions = this._map.get(element);
            if (instructions) {
                this._map.delete(element);
            }
            else {
                instructions = [];
            }
            return instructions;
        };
        ElementInstructionMap.prototype.append = function (element, instructions) {
            var existingInstructions = this._map.get(element);
            if (!existingInstructions) {
                this._map.set(element, existingInstructions = []);
            }
            existingInstructions.push.apply(existingInstructions, instructions);
        };
        ElementInstructionMap.prototype.has = function (element) { return this._map.has(element); };
        ElementInstructionMap.prototype.clear = function () { this._map.clear(); };
        return ElementInstructionMap;
    }());
    exports.ElementInstructionMap = ElementInstructionMap;
});
//# sourceMappingURL=element_instruction_map.js.map