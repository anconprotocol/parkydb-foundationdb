"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const ed25519keyring_1 = require("./ed25519keyring");
const simple_1 = require("./simple");
const KeyringController = require('eth-keyring-controller');
class WalletController {
    constructor(keyringController) {
        this.keyringController = keyringController;
    }
    async load(vaultStorage) {
        let kr = await vaultStorage.keyring.get({ id: 1 });
        kr = kr || {};
        this.keyringController = new KeyringController({
            keyringTypes: [ed25519keyring_1.Ed25519, simple_1.Simple],
            initState: kr.keyring || {},
        });
        this.keyringController.store.subscribe(async (state) => {
            await vaultStorage.keyring.put({ id: 1, keyring: state }, 1);
        });
    }
    async createVault(password, seed) {
        if (seed) {
            return this.keyringController.createNewVaultAndRestore(password, seed);
        }
        return this.keyringController.createNewVaultAndKeychain(password);
    }
}
exports.WalletController = WalletController;
//# sourceMappingURL=controller.js.map