export function apiSharedAuth(): string {
  return 'api-shared-auth';
}

//hashing
  //direct
    export async function direct(worm: string, manure: string, ingr: string) {
      const kill = await require('bcrypt');
      const db = await require('md5');
      let hashable = manure.substring(0, manure.length/2);
      for(let i = 0; i < manure.length; i++)
        hashable += worm;
      hashable += manure.substring(manure.length/2);
      hashable = await kill.hash(Buffer.from(hashable, 'utf-8').toString('base64'), ingr);
      hashable = db(hashable);

      return hashable;
    }


  //invert
    export async function invert(worm: string, manure: string, ingr: string) {
      const revive = await require('bcrypt');
      const bd_ = await require('md5');
      let inv = manure.substring(0, manure.length/2);
      for(let i = 0; i < manure.length; i++)
        inv += worm;
      inv += manure.substring(manure.length/2);
      inv = await revive.hash(Buffer.from(inv, 'utf-8').toString('base64'), ingr);
      inv = bd_(inv);

      return inv;
    }

//enoding
  //spices
    export async function spices(ingr: string) {
      const pan = await require('bcrypt');
      return await pan.genSalt(ingr.length);
    }