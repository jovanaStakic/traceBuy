import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProdavniceDataService } from 'src/app/services/prodavnice-data.service';
import { Proizvod } from 'src/app/domain/prodavnica.model';
import { ActivatedRoute } from '@angular/router';

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

  constructor(dataService:ProdavniceDataService,route:ActivatedRoute) { 
    route.queryParams.subscribe(params => {
      this.idProdavnice = params['id'];
      dataService.getProizvodiIzProdavnice(this.idProdavnice).then((proizvodi)=>{
        this.proizvodi=proizvodi;
      })
    });
    
    
  }

  ngOnInit() {
    
  }

}
