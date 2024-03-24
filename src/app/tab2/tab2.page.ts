import { Component } from '@angular/core';
import {  IonTitle, IonContent, IonInput, IonList, IonLabel, IonItem, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { Barcode,BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductOriginService } from '../services/product-origin.service';
import { ProizvodOrigin } from '../domain/proizvod-origin';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [ IonItem, IonLabel, IonInput, CommonModule,IonicModule]
})
export class Tab2Page {
  proizvodOrigin!:ProizvodOrigin | null;
  isSupported = false;



  
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController,private originService:ProductOriginService) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const barcodes  = await BarcodeScanner.scan();
    
    this.proizvodOrigin = await this.originService.getPorekloProizvoda(barcodes.barcodes[0].rawValue);
    //this.originService.getPorekloProizvoda("USPwhgFVZq4KJwawBRal");
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
