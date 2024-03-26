import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { Porudzbina } from '../domain/porudzbina';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.page.html',
  styleUrls: ['./details-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailsModalPage implements OnInit {
  @Input() porudzbina!:Porudzbina;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  zatvoriModal() {
    this.modalCtrl.dismiss();
  }
}
