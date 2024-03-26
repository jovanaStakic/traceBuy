import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule} from '@ionic/angular';
import { PorudzbinaService } from '../services/porudzbina.service';
import { Porudzbina } from '../domain/porudzbina';
import * as ionIcons from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular/standalone';
import { DetailsModalPage } from '../details-modal/details-modal.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab4Page implements OnInit {
  porudzbine:Porudzbina[];
 
  constructor(private porudzbinaServis:PorudzbinaService,private modalCTRL:ModalController){
    this.porudzbine=[];
  }

async ngOnInit() {
  addIcons(ionIcons);
this.getPorudzbine();
 }
 async getPorudzbine(){
  const por=await this.porudzbinaServis.getAllOrdersByUser();
  this.porudzbine=por;
 }
async ionViewDidEnter(){
  this.getPorudzbine();
}
 async otvoriDetalje(porudzbina:Porudzbina){
  const modal = await this.modalCTRL.create({
    component: DetailsModalPage,
    componentProps: {
      porudzbina: porudzbina 
    }
  });
  return await modal.present();
}
 }

