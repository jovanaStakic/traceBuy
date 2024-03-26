import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, ModalController } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { MapModalPage } from '../map-modal/map-modal.page';
import { ProdavniceDataService } from '../services/prodavnice-data.service';
import { Prodavnica } from '../domain/prodavnica.model';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {
  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;
  markers: Marker[] = [];
  mapInitialized = false;
  constructor(private modalCtrl: ModalController, private prodavniceServis: ProdavniceDataService) { }

  ionViewDidEnter() {
    if(!this.mapInitialized){
    this.createMap();
      this.mapInitialized=true;
  }
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: 'AIzaSyDwA1KiLg6Bw3UIlbabN26ZlBI_QjauuOQ',
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: 44.857400,
          lng: 20.367190,
        },
        zoom: 8
      }
    });
    this.addMarkers();
  }

  async addMarkers() {

    this.prodavniceServis.getProdavnice().subscribe((prodavnice) => {
      
      prodavnice.forEach((prodavnica: Prodavnica) => {
      
        const marker: Marker = {

          coordinate: {
            lat: prodavnica.lokacija.latitude,
            lng: prodavnica.lokacija.longitude,
          },
          title: prodavnica.ime,
          snippet: prodavnica.opis,

        }
        
        this.markers.push(marker);

      })
      this.map.addMarkers(this.markers);
      this.map.setOnMarkerClickListener(async (marker) => {
        //console.log(marker);
        const modal = await this.modalCtrl.create({
          component: MapModalPage,
          componentProps: {
            marker
          },
          breakpoints: [0, 0.4],
          initialBreakpoint: 0.4,
        });
        modal.present();
       
      });
    });

  }


 
}
