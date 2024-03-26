import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PorudzbinaService } from '../services/porudzbina.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab5Page implements OnInit {
  email:String|null|undefined;
  numOfOrders!:number;
  constructor(private authService:AuthService,private router:Router,private porudzbinaService:PorudzbinaService) { 
 

  }

  ngOnInit() {
    this.authService.getUserEmail().then((email)=>{
      this.email=email;
      console.log(email);
    });
    this.porudzbinaService.getNuberOfOrdersOfUser().then((num)=>{
      this.numOfOrders=num;
    });
  }
  async logout(){
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
