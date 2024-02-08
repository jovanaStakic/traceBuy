import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertController,  IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  credentials!:FormGroup;
  isLoading: boolean = false;
  

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertContoller: AlertController,
    private fb: FormBuilder,
    private router:Router
  ) {
    addIcons(ionIcons);
  }

  async ngOnInit() {
    this.credentials=this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
    });
  }

  async login() {
    const loading= await this.loadingController.create();
    await loading.present();
    const user =await this.authService.login(this.credentials.value);
    await loading.dismiss();
    if(user){
  this.router.navigate(['/tabs/tab1']);
    }else{
      this.showAlert('Prijavljivanje nije uspelo!','Probajte ponovo!');
  
    }
  }

  private async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Opening login window...',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
  navigateToRegister(){
  this.router.navigate(["/register"]);
  }

  async showAlert(header:string,message:string){
    const alert=await this.alertContoller.create({header,message,buttons:['OK'],});
    await alert.present();
  }
}

