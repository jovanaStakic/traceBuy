import { Injectable } from '@angular/core';
import{Auth,createUserWithEmailAndPassword,getAuth,signInWithEmailAndPassword,signOut} from '@angular/fire/auth';
import { onAuthStateChanged } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  getUserId():Promise<String | null>{
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      });
    });
  }
  getUserEmail(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.email);
        } else {
          resolve(null);
        }
      });
    });
  }
  async login({ email, password }: { email: string, password: string }){
    try{
    const user=await signInWithEmailAndPassword(this.auth,email,password);
    return user;
    }catch(e){
      return null;
    }
  }

  async register({ email, password }: { email: string, password: string }){
    try{
    const user=await createUserWithEmailAndPassword(this.auth,email,password);
    return user;
  }catch(e){
    return null;
  }
  }
  async logout(){
    try{
      return signOut(this.auth);
    }catch(e){
      return null;
    }
  }
}
