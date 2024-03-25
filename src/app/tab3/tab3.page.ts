import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule} from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/angular/standalone';
import { Proizvod } from '../domain/prodavnica.model';
import { CardService } from '../services/card.service';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports:[IonHeader,IonContent,IonTitle,IonToolbar,IonicModule, CommonModule, FormsModule]

})
export class Tab3Page {
  proizvodi:Proizvod[];
  ukupno:number=0;
  constructor(private cardService:CardService) { 
    addIcons(ionIcons);
    this.proizvodi=cardService.proizvodi;
  }
  ionViewWillEnter(){
    this.proizvodi=this.cardService.proizvodi;
    this.proizvodi.forEach((proizvod)=>{
      this.ukupno+=proizvod.cena*(proizvod.kolicina ?? 0);
    });
     }

     poruci(){

     }
}
