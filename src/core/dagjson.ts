import * as Block from 'multiformats/block'
import * as codec from '@ipld/dag-json'
import { sha256 as hasher } from 'multiformats/hashes/sha2'
import { IDataBuilder } from '../parkydb-interfaces/interfaces/IBuilder'

export class DAGJsonService implements IDataBuilder {

  async decodeBlock(block: any) {
    return Block.decode({ bytes: block, codec, hasher })
  }
  async build(value: object) {
    // encode a block
    let block = await Block.encode({ value, codec, hasher })
    return block
  }

  async loadFromCID(kvstore: any, key: string) {
    const block = kvstore.get(key)
    return Block.create({
      bytes: block.bytes,
      cid: block.cid,
      codec,
      hasher,
    })
  }

  async loadFromKey(kvstore: any, key: string) {
    const block = kvstore.get(key)
    return Block.decode({ bytes: block.bytes, codec, hasher })
  }
}
