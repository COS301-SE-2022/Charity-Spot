import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyArwrzThCNUfKZHx9K_z2Ddp-EvnBSr5JM",
  authDomain: "charity-spot.firebaseapp.com",
  projectId: "charity-spot",
  storageBucket: "charity-spot.appspot.com",
  messagingSenderId: "257273465394",
  appId: "1:257273465394:web:c402863daaf04823fb8a2b"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function randomStringGenerator() {
  let text = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 10; i++)
    text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

  return text;
}