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
  constructor(private modalCtrl: ModalController, private prodavniceServis: ProdavniceDataService) { }

  ionViewDidEnter() {
    this.createMap();
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
      const markeri = this.map.addMarkers(this.markers);
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
  attachMarkerInfo(marker: Promise<String>, prodavnica: Prodavnica) {

  }
  async openStoreDetails(prodavnica: Prodavnica) {
    const modal = await this.modalCtrl.create({
      component: MapModalPage,
      componentProps: {
        storeInfo: prodavnica,
      },
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5
    });

    await modal.present();
  }
  async addMarkers2() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: 46.80013,
          lng: 21.48749
        }, title: 'Mego prodavnica',
        snippet: 'Opis prodavnice'
      },
      {
        coordinate: {
          lat: 46.80013,
          lng: 20.48749
        }, title: 'Gigo prodavnica',
        snippet: 'da'
      }
    ]
    await this.map.addMarkers(markers);
    this.map.setOnMarkerClickListener(async (marker) => {
      const modal = await this.modalCtrl.create({
        component: MapModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.4],
        initialBreakpoint: 0.4,
      });
      modal.present();
    });
  }
}
