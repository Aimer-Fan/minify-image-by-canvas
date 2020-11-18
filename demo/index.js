var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MinifyImage = /** @class */ (function () {
    /**
     * Creates an instance of Minify.
     * @author AimerFan
     * @date 18/11/2020
     * @param {File} file
     */
    function MinifyImage(file) {
        this.file = file;
        this.canvas = this.getCanvas();
        this.ctx = this.getContext(this.canvas);
    }
    MinifyImage.prototype.setImage = function (file) {
        if (!this.isImage(file)) {
            throw new Error('this file is not a image');
        }
        this.file = file;
    };
    /**
     * @description 等比压缩
     * @author AimerFan
     * @date 18/11/2020
     * @param {number} quality 清晰度
     * @returns {Promise<File>} file
     */
    MinifyImage.prototype.minify = function (quality) {
        var _this = this;
        if (quality === void 0) { quality = 85; }
        if (!this.isImage(this.file)) {
            console.error('this file is not a image');
            return;
        }
        var promise = new Promise(function (resolve) {
            _this.filetoImage(_this.file).then(function (image) {
                var width = image.width;
                var height = image.height;
                _this.canvas.width = width;
                _this.canvas.height = height;
                _this.ctx.drawImage(image, 0, 0, width, height);
                _this.canvas.toBlob(function (blob) {
                    var file = new File([blob], _this.file.name, { type: _this.file.type });
                    resolve(file);
                }, _this.file.type, quality / 100);
            });
        });
        return promise;
    };
    /**
     * @description 图片文件转化成图片元素
     * @author AimerFan
     * @date 18/11/2020
     * @private
     * @param file 需要转化的图片
     * @returns {Promise<HTMLImageElement>}
     */
    MinifyImage.prototype.filetoImage = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var dataURL, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.filetoDataURL(file)];
                    case 1:
                        dataURL = _a.sent();
                        return [4 /*yield*/, this.dataURLtoImage(dataURL)];
                    case 2:
                        image = _a.sent();
                        return [2 /*return*/, image];
                }
            });
        });
    };
    /**
     * @description 根据 base64 数据生成图片
     * @author AimerFan
     * @date 18/11/2020
     * @private
     * @param {string} dataURL base64 格式的数据
     * @returns {Promise<HTMLImageElement>}
     */
    MinifyImage.prototype.dataURLtoImage = function (dataURL) {
        var promise = new Promise(function (resolve, reject) {
            var image = new Image();
            image.src = dataURL;
            image.onload = function () { return resolve(image); };
            image.onerror = function (e) { return reject(e); };
        });
        return promise;
    };
    /**
     * @description filetoDataURL
     * @author AimerFan
     * @date 18/11/2020
     * @private
     * @param {File} file
     * @returns {string}
     */
    MinifyImage.prototype.filetoDataURL = function (file) {
        var promise = new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onloadend = function (e) { return resolve(e.target.result.toString()); };
            reader.onerror = function (err) { return reject(err.toString()); };
            reader.readAsDataURL(file);
        });
        return promise;
    };
    /**
     * @description 判断文件是否为图片
     * @author AimerFan
     * @date 18/11/2020
     * @param file 需要判断的文件
     * @returns {Boolean}
     */
    MinifyImage.prototype.isImage = function (file) {
        var type = file.type;
        return /image/.test(type);
    };
    /**
     * @description 获取当前处理的文件对象
     * @author AimerFan
     * @date 18/11/2020
     * @returns {File}
     */
    MinifyImage.prototype.getFile = function () {
        return this.file;
    };
    /**
     * @description 生成 canvas 对象
     * @author AimerFan
     * @date 18/11/2020
     * @returns {HTMLCanvasElement} canvas
     */
    MinifyImage.prototype.getCanvas = function () {
        return document.createElement('canvas');
    };
    /**
     * @description 获取 canvas 上下文
     * @author AimerFan
     * @date 18/11/2020
     * @param {HTMLCanvasElement} canvas
     * @returns {CanvasRenderingContext2D} context
     */
    MinifyImage.prototype.getContext = function (canvas) {
        return canvas.getContext('2d');
    };
    return MinifyImage;
}());
//# sourceMappingURL=index.js.map