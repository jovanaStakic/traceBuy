import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PorudzbinaService } from '../services/porudzbina.service';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  uid!:String|null;
  profileImageUrl: string = 'https://www.citypng.com/public/uploads/small/11639594314mvt074h0zt5cijvfdn7gqxbrya72bzqulyd5bhqhemb5iasfe7gbydmr2jxk8lcclcp6qrgaoiuiavf4sendwc3jvwadddqmli2d.png';
  constructor(private authService:AuthService,private router:Router,private porudzbinaService:PorudzbinaService) { 
 

  }

  async ngOnInit() {
    try {
      this.email = await this.authService.getUserEmail();
      this.numOfOrders = await this.porudzbinaService.getNuberOfOrdersOfUser();
      this.uid = await this.authService.getUserId();
      await this.checkForProfileImage(); 
    } catch (error) {
      console.error('Greška prilikom inicijalizacije:', error);
    }
  }
  async checkForProfileImage() {
  
    if (this.uid) {
      
      const storage = getStorage();
      const profileImageRef = ref(storage, `profileImages/${this.uid}/profilePicture.jpg`);

      try {
        const url = await getDownloadURL(profileImageRef);
        this.profileImageUrl = url; 
      } catch (error) {
        console.error('Slika ne postoji ili došlo je do greške:', error);
      
      }
    }
  }
  async logout(){
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
    if (this.uid) {
        const storage = getStorage();
        const storageRef = ref(storage, `profileImages/${this.uid}/profilePicture.jpg`);
        uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Slika je uspešno uploadovana.');

          getDownloadURL(snapshot.ref).then((downloadURL) => {
            this.profileImageUrl = downloadURL;
            console.log('Download URL:', downloadURL);
          });
        }).catch((error) => {
          console.error('Došlo je do greške pri uploadovanju slike:', error);
        });
      }
    }
  }

  

}
