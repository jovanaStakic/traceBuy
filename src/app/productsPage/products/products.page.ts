import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProdavniceDataService } from 'src/app/services/prodavnice-data.service';
import { Proizvod } from 'src/app/domain/prodavnica.model';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';
import {Observable} from 'rxjs';
import { CardService } from 'src/app/services/card.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductsPage implements OnInit {
  proizvodi!:Proizvod[];
  idProdavnice!:string;

  kolicina:number=1;
  filteredProizvodi: Proizvod[] = []; 
  searchQuery: string = '';
  constructor(private dataService:ProdavniceDataService,private route:ActivatedRoute,
    private location:Location,private cardService:CardService
     ) {
    
    
    addIcons(ionIcons);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idProdavnice = params['id'];
      this.dataService.getProizvodiIzProdavnice(this.idProdavnice).then((proizvodi)=>{
        this.proizvodi=proizvodi;
        this.proizvodi.forEach((proizvod)=>{
          proizvod.kolicina=1;
        })
        this.filteredProizvodi=proizvodi;
      })
     
    });
  }
  
  nazad() {
    this.location.back();
  }
  smanjiKolicinu(proizvod:Proizvod){
    if((proizvod.kolicina ?? 0)>1)
    proizvod.kolicina = (proizvod.kolicina ?? 0) - 1;
  }
  povecajKolicinu(proizvod:Proizvod){
    if((proizvod.kolicina ?? 0)<20)
    proizvod.kolicina = (proizvod.kolicina ?? 0) + 1;
  }
  dodajUKorpu(proizvod:Proizvod){
    this.cardService.addProizvodToCard(proizvod);
    alert("Proizvod "+proizvod.naziv+" je dodat u korpu!");
  }

  filterProizvodi() {
    if (this.searchQuery.trim()) {
      this.filteredProizvodi = this.proizvodi.filter((proizvod) =>
        proizvod.naziv.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProizvodi = [...this.proizvodi];
    }
  }
}
