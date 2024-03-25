import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';
import { CardService } from '../services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PorudzbinaService } from '../services/porudzbina.service';
import { Porudzbina } from '../domain/porudzbina';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.page.html',
  styleUrls: ['./order-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class OrderFormPage implements OnInit {
  userInfo!: FormGroup;
  ukupanIznos:number=0
  constructor(private location:Location,private cardService:CardService,private router:Router,
    private porudzbinaService:PorudzbinaService,private route:ActivatedRoute) {
    addIcons(ionIcons);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
      this.ukupanIznos=params["ukupno"];
    });
    this.userInfo = new FormGroup({
      ime: new FormControl('', Validators.required),
      prezime: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      adresa: new FormControl('', Validators.required),
      telefon: new FormControl('', Validators.required)
    });
  }
  poruci() {
    if(this.userInfo.valid){
    let  proizvodiId: String[] = this.cardService.proizvodi.map(proizvod => proizvod.id);
 
    const porudzbina: Porudzbina = {
      
      userDetails: {
        userId: '', 
        ime: this.userInfo.get('ime')?.value,
        prezime: this.userInfo.get('prezime')?.value,
        adresa: this.userInfo.get('adresa')?.value,
        telefon: this.userInfo.get('telefon')?.value,
        email: this.userInfo.get('email')?.value,
      },
      proizvodi: proizvodiId,
      iznosZaNaplatu: this.ukupanIznos, 
      datumPoruzbine: new Date(),
      status: 'u obradi' 
    };
    this.porudzbinaService.addNewOrder(porudzbina);
    this.router.navigate(['/tabs/tab4']);
    this.cardService.clearCard();
  }else{
    alert("Popunite sva polja prvo!");
  }
}

  nazad(){
    this.location.back();
  }
}
