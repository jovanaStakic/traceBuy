import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { Porudzbina } from '../domain/porudzbina';
import { getAuth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  uid!: String;
  constructor(private firestore: Firestore) { }

  async addNewOrder(porudzbina: Porudzbina) {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => { 
      if (user) {
        this.uid = user.uid;
        console.log(porudzbina);
        

        try {
          const docRef = await addDoc(collection(this.firestore, "porudzbine"), {
            userDetails: {
              userId: this.uid,
              ime: porudzbina.userDetails.ime,
              prezime: porudzbina.userDetails.prezime,
              adresa: porudzbina.userDetails.adresa,
              telefon: porudzbina.userDetails.telefon,
              email: porudzbina.userDetails.email
            },
            proizvodi: porudzbina.proizvodi,
            iznosZaNaplatu: porudzbina.iznosZaNaplatu,
            datumPoruzbine: porudzbina.datumPoruzbine,
            status: porudzbina.status
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
  
      } else {
        console.log("User is not signed in");
      }
    });
  }

  async getAllOrdersByUser(){
    
  }
}
