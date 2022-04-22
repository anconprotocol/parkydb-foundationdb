import { CID } from 'blockstore-core/base'
import { Subject } from 'rxjs'
import { BlockValue, KVAdapter } from 'parkydb-interfaces'
import * as fdb from 'foundationdb'

export async function createKVAdapter(): Promise<KVAdapter> {
  const a = new FoundationDBAdapter()
  await a.initialize({ name: '' })
  // @ts-ignore
  return a
}

/**
 * FoundationDBAdapter core class
 */
export class FoundationDBAdapter implements KVAdapter {
  onBlockCreated = new Subject<BlockValue>()
  db: any
  name: any
  context: any
  constructor() {}

  async initialize({ name }: any) {
    // Open Database
    fdb.setAPIVersion(620) // Must be called before database is opened
    const dbRoot = fdb.open() // or open('/path/to/fdb.cluster')

    // Scope all of your application's data inside the 'myapp' directory in your database
    const db = dbRoot
      .at(await fdb.directory.createOrOpen(dbRoot, name))
      .withKeyEncoding(fdb.encoders.tuple) // automatically encode & decode keys using tuples
      .withValueEncoding(fdb.encoders.json) // and values using JSON

    this.name = name
    this.db = db
  }

  async put(key: CID, value: BlockValue, paths: string[]) {
    await this.db.doTransaction(async (t: any) => {
      t.set([...paths, key], 
        {...value}
      )
    })

    return {} as any
  }

  /**
   *
   * @param key
   * @param options
   * @returns
   */
  async get(key: any, paths: string[]) {
    return this.db.get([...paths, key])
  }

  /**
   *
   * @param options
   * @returns
   */
  // @ts-ignore
  queryBlocks$(fn: (blocks: any) => () => unknown) {
    return null
  }

  /**
   *
   * @param options
   * @returns
   */
  async getBlocksByTableName$(
    tableName: string,
    fn: (table: any) => () => unknown,
  ) {
    return null
  }
}
