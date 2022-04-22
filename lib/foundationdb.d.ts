import { CID } from 'blockstore-core/base';
import { Subject } from 'rxjs';
import { BlockValue, KVAdapter } from 'parkydb-interfaces';
export declare function createKVAdapter(): Promise<KVAdapter>;
export declare class FoundationDBAdapter implements KVAdapter {
    onBlockCreated: Subject<BlockValue>;
    db: any;
    name: any;
    context: any;
    constructor();
    initialize({ name }: any): Promise<void>;
    put(key: CID, value: BlockValue, paths: string[]): Promise<any>;
    get(key: any, paths: string[]): Promise<any>;
    queryBlocks$(fn: (blocks: any) => () => unknown): null;
    getBlocksByTableName$(tableName: string, fn: (table: any) => () => unknown): Promise<null>;
}
