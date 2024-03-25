import { Injectable } from '@angular/core';
import { Proizvod } from '../domain/prodavnica.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  proizvodi:Proizvod[];

  constructor() {
    this.proizvodi=[];
   }

   addProizvodToCard(proizvod:Proizvod){
      if(proizvod!=null && !this.proizvodi.includes(proizvod)){
          this.proizvodi.push(proizvod);
      }else{
      alert("Proizvod je već dodat u korpu!")
      }
      console.log(this.proizvodi);
   }

   removeProizvod(proizvod:Proizvod){
      const index=this.proizvodi.indexOf(proizvod);
      if(index>-1){
        this.proizvodi.splice(index,1);
      }else{
        alert("Proizvod nije u korpi!");
      }
   }
}
