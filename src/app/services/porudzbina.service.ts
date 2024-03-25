import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, documentId, getDocs, query, setDoc, where } from '@angular/fire/firestore';
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
   
    const auth = getAuth();
    const porudzbine: Porudzbina[] = [];
  
    
    const user = auth.currentUser;
    if (user) {
      this.uid = user.uid;
      const ref = collection(this.firestore, "porudzbine");
      const q = query(ref, where("userDetails.userId", "==", this.uid));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(doc => {
        const data = doc.data();
        const porudzbina: Porudzbina = {
          id: doc.id,
          userDetails: {
            userId: data['userDetails']['userId'],
            ime: data['userDetails']['ime'],
            prezime: data['userDetails']['prezime'],
            adresa: data['userDetails']['adresa'],
            telefon: data['userDetails']['telefon'],
            email: data['userDetails']['email']
          },
          proizvodi: data['proizvodi'],
          iznosZaNaplatu: data['iznosZaNaplatu'],
          datumPoruzbine: data['datumPoruzbine']?.toDate(), // Dodao sam opciono lančanje za slučaj da datumPoruzbine može biti undefined
          status: data['status']
        };
        porudzbine.push(porudzbina);
      });
    } else {
      console.log("User is not signed in");
    }
    console.log(porudzbine);
    return porudzbine;
  }
}
