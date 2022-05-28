import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, uploadString} from 'firebase/storage';
import * as fs from 'fs';

@Injectable()
export class FirebaseService {

    firebaseConfig = {
        apiKey: "AIzaSyArwrzThCNUfKZHx9K_z2Ddp-EvnBSr5JM",
        authDomain: "charity-spot.firebaseapp.com",
        projectId: "charity-spot",
        storageBucket: "charity-spot.appspot.com",
        messagingSenderId: "257273465394",
        appId: "1:257273465394:web:c402863daaf04823fb8a2b"
    };

    app = initializeApp(this.firebaseConfig);
        
    storage = getStorage();

    async uploadFile(){

        console.log(process.cwd());

        const fileRef = ref(this.storage, "dog.jpg");

        let tempBool = false;

        let file = require('fs').readFileSync('dog.jpg');

        //add new file to firebase storage
        await uploadBytes(fileRef, file).then( async (snapshot) => {

            console.log('Successful upload');
            console.log(snapshot);
            

        }).catch( (err) =>{

            console.error(err);

        });





    }

}