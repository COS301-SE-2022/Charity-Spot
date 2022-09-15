export function apiSharedAuth(): string {
  return 'api-shared-auth';
}

//authorisation

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

        console.log(hashable);

        return hashable;
      }

  //enoding
    //spices
      export async function spices(ingr: string) {
        const pan = await require('bcrypt');
        return await pan.genSalt(ingr.length);
      }

    //base_64
      //direct
        export async function base_64_direct(plaintext: string | undefined) {
          if (plaintext === undefined) return "";

          let analysis = Buffer.from(plaintext, 'utf-8').toString('base64');

          while(analysis.includes("=")) {
            analysis = analysis.replace('=','');
          }
          
          return analysis.split("").reverse().join("");
        }

      //invert
        export async function base_64_invert (crypted: string | undefined) {
          if (crypted === undefined) return "";

          let analysis = crypted.split("").reverse().join("") + "==";

          analysis = Buffer.from(analysis, 'base64').toString('utf-8');

          return analysis;
        }
        



//authentication
  //email_validation_1
    import nm_ from "nodemailer";

    export async function validate(email: string) {return null;}

  //email_validation_2
    export async function compareCodes(internal: number, external: number) {
      return internal === external;
    }


//random
  //generator
    export async function randomStringGenerator() {
      let text = "";
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (let i = 0; i < 10; i++)
        text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    
      return text;
    }