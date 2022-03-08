import { Injectable } from '@angular/core';
import {User} from "../models/login.model";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static USER_KEY :string ="USER";

  constructor() { }

  public login(user: User){
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, user.email, user.password);
  }

  public storeUser(userid: string){
    localStorage.setItem(AuthService.USER_KEY, userid)
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(AuthService.USER_KEY) != null;
  }

  public logout(){
    localStorage.removeItem(AuthService.USER_KEY);
    signOut(getAuth())
  }
}
