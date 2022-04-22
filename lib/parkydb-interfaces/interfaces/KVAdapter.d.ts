import { CID } from 'blockstore-core/base';
import { Subject } from 'rxjs';
import { BlockValue } from './Blockvalue';
export interface KVAdapter {
    initialize(options: any): Promise<void>;
    queryBlocks$(fn: (blocks: any) => () => unknown): Promise<any>;
    getBlocksByTableName$(tableName: string, fn: (table: any) => () => unknown): Promise<any>;
    get(key: string): Promise<BlockValue>;
    put(cid: CID, block: BlockValue): Promise<BlockValue>;
    onBlockCreated: Subject<any>;
}
