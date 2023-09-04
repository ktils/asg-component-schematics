"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asgComponent = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
const rxjs_1 = require("rxjs");
function asgComponent(options) {
    return (tree, context) => __awaiter(this, void 0, void 0, function* () {
        options.path = parse_name_1.parseName("/src/app", options.name).path;
        options.name = core_1.basename(options.name);
        // 创建模版源
        const templateSource = schematics_1.apply(schematics_1.url("./files"), [
            schematics_1.template(Object.assign(Object.assign({}, options), { classify: core_1.strings.classify, dasherize: core_1.strings.dasherize })),
            schematics_1.move(options.path),
        ]);
        //调用三方原理图
        let collection = context.engine.createCollection("@schematics/angular");
        let schematic = context.engine.createSchematic("component", collection);
        let ngContext = context.engine.createContext(schematic, context, {
            interactive: true,
        });
        const _tree = yield schematic
            .call({ name: options.name, path: options.path }, rxjs_1.of(tree), ngContext)
            .toPromise();
        // 合并三方原理图
        return schematics_1.chain([
            schematics_1.mergeWith(schematics_1.source(_tree)),
            schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite),
        ]);
    });
}
exports.asgComponent = asgComponent;
//# sourceMappingURL=index.js.map