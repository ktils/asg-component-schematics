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
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
const collectionPath = path.join(__dirname, '../collection.json');
const runner = new testing_1.SchematicTestRunner('schematics', collectionPath);
describe('custom-component', () => {
    let appTree;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        appTree = yield runner.runExternalSchematicAsync('@schematics/angular', 'workspace', {
            name: 'workspace',
            version: '0.1',
        }).toPromise();
        appTree = yield runner.runExternalSchematicAsync('@schematics/angular', 'application', {
            name: 'app',
            version: '0.1',
        }, appTree).toPromise();
    }));
    it('works', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = {
            name: 'test-name',
            skipImport: true,
            path: 'path',
            style: 'scss',
        };
        const tree = yield runner.runSchematicAsync('component', options, appTree).toPromise();
        const files = tree.files;
        expect(files).toContain('/path/test-name/test-name.component.ts');
        expect(files).toContain('/path/test-name/test-name.component.html');
        expect(files).toContain('/path/test-name/test-name.component.scss');
        expect(files).toContain('/path/test-name/test-name.component.spec.ts');
    }));
});
//# sourceMappingURL=index_spec.js.map