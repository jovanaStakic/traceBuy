import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import{Marker} from '@capacitor/google-maps';
import { Prodavnica } from '../domain/prodavnica.model';
import { ProdavniceDataService } from '../services/prodavnice-data.service';

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
  constructor(private dataService:ProdavniceDataService) { }

  ngOnInit() {
    this.dataService.getProdavnicaByName(this.marker.title).subscribe((prodavnica)=>{
      this.prodavnica=prodavnica;
    });
    console.log(this.prodavnica);
  }

}
