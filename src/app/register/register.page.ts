import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})

export class RegisterPage implements OnInit {
 credentials!:FormGroup;
  constructor(private fb:FormBuilder,
    private router:Router,
    private loadingController:LoadingController,
    private authService:AuthService,
    private alertContoller:AlertController) { 
      addIcons(ionIcons);
    }

  ngOnInit() {
    this.credentials=this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirm_password: ['', [Validators.required],
    ]},  {
      validators: this.confirmPasswordValidator('password', 'confirm_password')
    }
    );
  
     
  }

  async register(){
    const loading= await this.loadingController.create();
  await loading.present();
  const user =await this.authService.register(this.credentials.value);
  await loading.dismiss();
  if(user){
  
this.router.navigate(['tabs/tab1']);
  }else{
    this.showAlert('Registracija nije uspela!','Probajte ponovo!');

  }
  }
 
  navigateToLogin(){
this.router.navigate(["/login"]);
  }
  async showAlert(header:string,message:string){
    const alert=await this.alertContoller.create({header,message,buttons:['OK'],});
    await alert.present();
  }

   confirmPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
            return null;
        }

        if (control!.value !== matchingControl!.value) {
          const error = { confirmedValidator: 'Passwords do not match.' };
          matchingControl!.setErrors(error);
          return error;
        } else {
          matchingControl!.setErrors(null);
          return null;
        }
    }
  }
  
}
