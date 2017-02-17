import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController, Loading} from "ionic-angular";
import {AuthService} from "../../providers/auth-service";
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";
import {FormGroup, FormBuilder} from "@angular/forms";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: Loading;

  loginForm: FormGroup;

  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public login() {

    if(this.loginForm.valid) {
      this.showLoading();
      this.auth.login(this.loginForm.value).subscribe(isAuthenticated => {
          if (isAuthenticated) {
            this.loading.dismiss();
            this.navCtrl.setRoot(TabsPage);
          } else {
            this.showError();
          }
        },
        error => {
          this.showError();
        });
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError() {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Login fail',
      subTitle: 'email and password does not match',
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
