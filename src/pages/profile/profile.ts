import {Component, OnInit} from '@angular/core';
import { App } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {LoginPage} from "../login/login";

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit{

  ngOnInit(): void {
    this.authService.currentUser.subscribe((currentUser)=>{
      this.username = currentUser.username;
    });
  }

  username: string = '';

  constructor(public appCtrl: App, public authService: AuthService) {

  }

  logout(){
    this.authService.logout().subscribe((success)=>{
      this.appCtrl.getRootNav().setRoot(LoginPage);
    });
  }

}
