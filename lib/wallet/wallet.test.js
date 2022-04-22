"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const c = require('crypto').webcrypto;
global.crypto = c;
const db_1 = require("../core/db");
const parkydb_indexeddb_1 = require("../parkydb-indexeddb");
const resolvers_1 = require("../resolvers");
const simple_1 = require("./simple");
const payload = {
    commitHash: 'xg8pyBr3McqYlUgxAqV0t3s6TRcP+B7MHyPTtyVKMJw=',
    contentHash: {
        '/': 'baguqeerahiqryfzwbjc2fn7is4k2uupilwtoxabtb6noifnwxznxszuvrg6a',
    },
    digest: '0x5ab3124ede7a511fbc7c6302b164d1547aefda8b5909b6bb637c7da025c3ffaf',
    height: 207,
    issuer: '0x32A21c1bB6E7C20F547e930b53dAC57f42cd25F6',
    key: 'YW5jb25wcm90b2NvbC91c2Vycy9kaWQ6ZXRocjpibmJ0OjB4MzJBMjFjMWJCNkU3QzIwRjU0N2U5MzBiNTNkQUM1N2Y0MmNkMjVGNi9iYWd1cWVlcmFoaXFyeWZ6d2JqYzJmbjdpczRrMnV1cGlsd3RveGFidGI2bm9pZm53eHpueHN6dXZyZzZh',
    lastBlockHash: {
        '/': 'baguqeeraw4ssfjictj2b47cccep2oioytbjistjke2xuaa35qgdoivtgrwra',
    },
    network: 'anconprotocol',
    parentHash: {
        '/': 'baguqeerakv6jersryhhanjaihmb2ncdujajxt7gpkfzs7rkur7lo4s5uecwa',
    },
    rootKey: 'YW5jb25wcm90b2NvbC91c2Vycy9kaWQ6ZXRocjpibmJ0OjB4MzJBMjFjMWJCNkU3QzIwRjU0N2U5MzBiNTNkQUM1N2Y0MmNkMjVGNg==',
    signature: '0xa628e3e256a187453c55ffbebc189ec4464c6c0d874a278272d224dbbaa4f6f028d3550651c33edf7af0ea8b3f3806d09ba9135034a61dd1a651c67f83cb06a51b',
    timestamp: 1645384767,
    content: {
        blockchainTokenId: '8',
        blockchainTxHash: '0x977dd680952c4f7da1040d12a0a2c9e68a60f6158edee20b1591f91372030670',
        creator: '0x32A21c1bB6E7C20F547e930b53dAC57f42cd25F6',
        currentOrderHash: '',
        description: 'me and friends',
        fileExtension: 'jpg',
        image: 'baguqeerar56ywt7p3qbbf6wiqgja5ybvkblz4wx37vyybthr2jl65d657jha',
        name: 'Sweden 90s',
        owner: '0x32A21c1bB6E7C20F547e930b53dAC57f42cd25F6',
        price: '',
        sources: [
            'https://tensta.did.pa/v0/file/baguqeerar56ywt7p3qbbf6wiqgja5ybvkblz4wx37vyybthr2jl65d657jha/',
        ],
        tags: 'Diseño grafico',
        uuid: '854198e4-1c09-4c27-8103-2ae54adfc681',
    },
};
ava_1.default.beforeEach(async (t) => {
    const db = new db_1.ParkyDB('tests');
    await db.initialize({
        withDB: {
            provider: parkydb_indexeddb_1.IndexedDBAdapter,
            options: {
                name: 'coco'
            }
        },
        graphql: { resolvers: resolvers_1.defaultResolvers },
        withWallet: {
            autoLogin: true,
            password: 'qwerty',
            seed: 'window alpha view text barely urge minute nasty motion curtain need dinosaur',
        },
    });
    t.context = {
        db,
    };
});
(0, ava_1.default)('add key ring', async (t) => {
    const { db } = t.context;
    const w = await db.getWallet();
    await w.submitPassword('qwerty');
    await w.addNewKeyring(simple_1.Simple.type, [
        'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3',
    ]);
    const accounts = await w.getAccounts();
    t.is(accounts.length, 1);
});
//# sourceMappingURL=wallet.test.js.map