

require('dotenv').config();

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

        //console.log(hashable);

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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodemailer = require("nodemailer");
    let internal = `0000000`;

    export async function validate(email: string) {
      const appEmail = await base_64_invert(process.env.APP_EMAIL);
      const appEmailPass = await base_64_invert(process.env.APP_EMAIL_PASSWORD);
      let returnable: boolean;

      const linker = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: await base_64_invert(appEmail),
          pass: await base_64_invert(appEmailPass)
        }
      });

      const actualEmail = {
        from: appEmail,
        to: email,
        subject: `AUTHENTICATION - EMAIL VALIDATION PROCESS`,
        text: `Requested code: ${await randomCode()}`
      };

      linker.sendMail(actualEmail, (err) => {
        if(err) {
          console.log("THERE IS AN ERROR\n\n\n: " + err.message);
          returnable = false;
        } else {
          console.log(`Email Sent Successfully`);
          returnable = true;
        }
      });

      return returnable;
    }

  //email code
    async function randomCode() {
      return internal;
    }

  //email_validation_2
    export async function compareCodes(external: string) {
      return internal === external;
    }