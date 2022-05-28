import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, uploadString} from 'firebase/storage';
import * as fs from 'fs';

@Injectable()
export class FirebaseService {

    firebaseConfig = {
        apiKey: "AIzaSyCJDoT3fRnol23upGcl4O2q90Hsmq0aQ-s",
        authDomain: "cos301-storage-test.firebaseapp.com",
        projectId: "cos301-storage-test",
        storageBucket: "cos301-storage-test.appspot.com",
        messagingSenderId: "994861102315",
        appId: "1:994861102315:web:6a4b736d15abc7915cbaae"
        //measurementId: "MEASUREMENT_ID",
      };

}