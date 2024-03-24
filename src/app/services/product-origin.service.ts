import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

import { ProizvodOrigin } from '../domain/proizvod-origin';

@Injectable({
  providedIn: 'root'
})
export class ProductOriginService {

  constructor(private firestore:Firestore) { }

  async getPorekloProizvoda(id:string){
   const docRef=doc(this.firestore,'prozivodi',id);
   const snapshot=await getDoc(docRef);

  
    const data =snapshot.data();
    if(data){
      const proizvod: ProizvodOrigin = {
        id: data['id'],
        naziv: data['naziv'],
        poreklo: data['poreklo']
      };
      return proizvod;
    }
      return null;

  }
 
}