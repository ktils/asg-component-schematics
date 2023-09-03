"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAdd = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function getWorkspacePath(host) {
    const possibleFiles = ['/angular.json', '/.angular.json'];
    return possibleFiles.filter(path => host.exists(path))[0];
}
function getWorkspace(host) {
    const path = getWorkspacePath(host);
    const configBuffer = host.read(path);
    if (configBuffer === null) {
        throw new Error(`Could not find (${path})`);
    }
    const config = configBuffer.toString();
    return JSON.parse(config);
}
function updateWorkspaceCli(host, value) {
    const workspace = getWorkspace(host);
    const path = getWorkspacePath(host);
    workspace.cli = Object.assign(Object.assign({}, workspace.cli), value);
    host.overwrite(path, JSON.stringify(workspace, null, 2));
}
function setAsDefaultSchematics() {
    const cli = {
        defaultCollection: 'subscription-component-schematics',
    };
    return (host) => {
        updateWorkspaceCli(host, cli);
        return host;
    };
}
function ngAdd(options) {
    return (host, context) => {
        return schematics_1.chain([
            options && options.defaultCollection ? setAsDefaultSchematics() : schematics_1.noop(),
        ])(host, context);
    };
}
exports.ngAdd = ngAdd;
//# sourceMappingURL=index.js.map