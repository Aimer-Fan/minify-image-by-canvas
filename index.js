(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Minify = /** @class */ (function () {
        /**
         * Creates an instance of Minify.
         * @author AimerFan
         * @date 18/11/2020
         * @param {File} file
         */
        function Minify(file) {
            this.file = file;
            this.canvas = this.getCanvas();
            this.ctx = this.getContext(this.canvas);
        }
        Minify.prototype.minify = function () { };
        Minify.prototype.isImage = function (file) {
            var type = file;
            debugger;
            return true;
        };
        /**
         * @description 获取当前处理的文件对象
         * @author AimerFan
         * @date 18/11/2020
         * @returns {File}
         */
        Minify.prototype.getFile = function () {
            return this.file;
        };
        /**
         * @description 生成 canvas 对象
         * @author AimerFan
         * @date 18/11/2020
         * @returns {HTMLCanvasElement} canvas
         */
        Minify.prototype.getCanvas = function () {
            return document.createElement('canvas');
        };
        /**
         * @description 获取 canvas 上下文
         * @author AimerFan
         * @date 18/11/2020
         * @param {HTMLCanvasElement} canvas
         * @returns {CanvasRenderingContext2D} context
         */
        Minify.prototype.getContext = function (canvas) {
            return canvas.getContext('2d');
        };
        return Minify;
    }());
    exports["default"] = Minify;
});
