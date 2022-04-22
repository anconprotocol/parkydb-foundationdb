"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundationDBAdapter = exports.createKVAdapter = void 0;
const rxjs_1 = require("rxjs");
const fdb = __importStar(require("foundationdb"));
async function createKVAdapter() {
    const a = new FoundationDBAdapter();
    await a.initialize({ name: '' });
    return a;
}
exports.createKVAdapter = createKVAdapter;
class FoundationDBAdapter {
    constructor() {
        this.onBlockCreated = new rxjs_1.Subject();
    }
    async initialize({ name }) {
        fdb.setAPIVersion(620);
        const dbRoot = fdb.open();
        const db = dbRoot
            .at(await fdb.directory.createOrOpen(dbRoot, name))
            .withKeyEncoding(fdb.encoders.tuple)
            .withValueEncoding(fdb.encoders.json);
        this.name = name;
        this.db = db;
    }
    async put(key, value, paths) {
        await this.db.doTransaction(async (t) => {
            t.set([...paths, key], { ...value });
        });
        return {};
    }
    async get(key, paths) {
        return this.db.get([...paths, key]);
    }
    queryBlocks$(fn) {
        return null;
    }
    async getBlocksByTableName$(tableName, fn) {
        return null;
    }
}
exports.FoundationDBAdapter = FoundationDBAdapter;
//# sourceMappingURL=foundationdb.js.map