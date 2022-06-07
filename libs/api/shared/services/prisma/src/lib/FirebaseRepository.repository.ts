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

    async uploadFile(base64, idOfItem){
        
        let fileName = "DonatedItems/" + idOfItem;

        const fileRef = ref(this.storage, fileName);


        await uploadString(fileRef, base64.split(',')[1], 'base64').then( async (snapshot) => {
            console.log('Successful upload');
          }).catch( (err) =>{
            console.error(err);
          });
    }

}