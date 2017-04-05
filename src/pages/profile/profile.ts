import {Component, OnInit} from '@angular/core';
import { App } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {LoginPage} from "../login/login";
import {FormGroup, FormBuilder} from "@angular/forms";
import {UserService} from "../../providers/user-service";
import {User} from "../../models/user.model";

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

  profileForm: FormGroup;

  currentUser: User;

  ngOnInit(): void {
    this.authService.currentUser.subscribe((currentUser)=>{

      this.currentUser = currentUser;

      this.profileForm = this.formBuilder.group({
        email: [this.currentUser.email],
        firstName: [this.currentUser.firstName],
        lastName: [this.currentUser.lastName]
      });
    });
  }

  constructor(public appCtrl: App, public authService: AuthService, private userService: UserService, private formBuilder: FormBuilder) {
  }

  ionViewWillEnter() {
    this.profileForm.controls['email'].setValue(this.currentUser.email);
    this.profileForm.controls['firstName'].setValue(this.currentUser.firstName);
    this.profileForm.controls['lastName'].setValue(this.currentUser.lastName);
  }


  update(){
    if(this.profileForm.valid) {
      this.userService.update(this.profileForm.value).subscribe(updated=>{
        this.authService.currentUserSubject.next(updated.user);
      });
    }
  }

  logout(){
    this.authService.logout().subscribe((success)=>{
      this.appCtrl.getRootNav().setRoot(LoginPage);
    });
  }

}
