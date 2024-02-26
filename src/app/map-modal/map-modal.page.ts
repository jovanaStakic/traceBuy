import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProdavniceDataService } from '../services/prodavnice-data.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.page.html',
  styleUrls: ['./map-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MapModalPage implements OnInit {
@Input() marker:any;
prodavnica!:any;
idProdavnice!:number;

  constructor(private dataService:ProdavniceDataService,private router:Router,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.dataService.getProdavnicaByName(this.marker.title).subscribe((prodavnica)=>{
      this.prodavnica=prodavnica;
    });
  }
  pogledajProdavnicu(){
    this.modalCtrl.dismiss();
    this.idProdavnice=this.prodavnica.id;
    this.router.navigate(['/products'], { queryParams: { id: this.idProdavnice } });
  }
}
