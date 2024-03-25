import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule} from '@ionic/angular';
import { PorudzbinaService } from '../services/porudzbina.service';
import { Porudzbina } from '../domain/porudzbina';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab4Page implements OnInit {
  porudzbine:Porudzbina[];
  constructor(private porudzbinaServis:PorudzbinaService){
    this.porudzbine=[];
  }

 ngOnInit(): void {
this.getPorudzbine();
 }
 async getPorudzbine(){
  const por=await this.porudzbinaServis.getAllOrdersByUser();
  this.porudzbine=por;
 }
}
