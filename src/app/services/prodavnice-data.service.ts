import { Injectable } from '@angular/core';
import { Firestore, collection,collectionData, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Prodavnica,Proizvod } from '../domain/prodavnica.model';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdavniceDataService {

  constructor(private firestore:Firestore) { }

  getProdavnice():Observable<Prodavnica[]>{
    const prodavniceRef= collection(this.firestore,'prodavnice');
    return collectionData(prodavniceRef,{idField:'id'}) as Observable<Prodavnica[]>;
  }

  getProdavnicaWithCorrdinates(lat: number, lng: number){
    const prodavniceRef=collection(this.firestore,'prodavnice');
    const q = query( prodavniceRef,where('lokacija.lat', '==', lat), where('lokacija.lng', '==', lng));
    return collectionData(q, { idField: 'id' })
    .pipe(
      map(prodavnice => prodavnice[0])
    );
  }
  getProdavnicaByName(name:string){
    const prodavniceRef=collection(this.firestore,'prodavnice');
    const q = query( prodavniceRef, where('ime','==',name));
    return collectionData(q, { idField: 'id' })
    .pipe(
      map(prodavnice => prodavnice[0])
    );
  }

async getProizvodiIzProdavnice(idProdavnice:string){
  const proizvodi:Proizvod[]=[];


  const querySnapshot = await getDocs(collection(this.firestore, "prodavnice", `${idProdavnice}`, "proizvodi"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
      const proizvod: Proizvod = {
        naziv: data['naziv'],
        cena: data['cena'],
        id: data['id'],
        slika:data['slika'],
        opis: data['opis']
      };
      proizvodi.push(proizvod);
    
  });
  return proizvodi;
}
}
