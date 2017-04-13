import {Component, OnInit} from "@angular/core";
import {App, ModalController, ToastController} from "ionic-angular";
import {AuthService} from "../../providers/auth-service";
import {LoginPage} from "../login/login";
import {FormGroup, FormBuilder} from "@angular/forms";
import {UserService} from "../../providers/user-service";
import {User} from "../../models/user.model";
import {QrcodePage} from "../qrcode/qrcode";

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

  user: User;

  ngOnInit(): void {
    this.authService.currentUser.subscribe((currentUser)=>{

      this.user = currentUser;

      this.profileForm = this.formBuilder.group({
        email: [this.user.email],
        firstName: [this.user.firstName],
        lastName: [this.user.lastName]
      });
    });
  }

  constructor(public appCtrl: App, public authService: AuthService, private userService: UserService, private formBuilder: FormBuilder,
              private modalCtrl: ModalController, private toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    this.profileForm.controls['email'].setValue(this.user.email);
    this.profileForm.controls['firstName'].setValue(this.user.firstName);
    this.profileForm.controls['lastName'].setValue(this.user.lastName);
  }


  update(){
    if(this.profileForm.valid) {
      this.userService.update(this.profileForm.value).subscribe(updated=>{
        this.authService.currentUserSubject.next(updated.user);

        let toast = this.toastCtrl.create({message: 'Successfully updated', duration:2000});

        toast.present();

      });
    }
  }

  logout(){
    this.authService.logout().subscribe((success)=>{
      this.appCtrl.getRootNav().setRoot(LoginPage);
    });
  }

  popupQR(){
    let modal = this.modalCtrl.create(QrcodePage, {params: {user: this.user}}, {showBackdrop: true, enableBackdropDismiss: true});
    modal.present();
  }

}
