import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController, Loading} from "ionic-angular";
import {AuthService} from "../../providers/auth-service";
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";
import {FormGroup, FormBuilder} from "@angular/forms";
import {EmailValidator} from "../../validators/EmailValidator";
import {Facebook, FacebookLoginResponse} from "ionic-native";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: Loading;

  loginForm: FormGroup;

  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', EmailValidator.isValid],
      password: ['']
    });
  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public login() {

    if (this.loginForm.valid) {
      this.showLoading();
      this.auth.login(this.loginForm.value).subscribe(isAuthenticated => {
          if (isAuthenticated) {
            this.loading.dismiss();
            this.navCtrl.setRoot(TabsPage);
          }
        },
        error => {
          this.showError(error);
        });
    }
  }

  fbLogin() {

    this.showLoading();

    Facebook.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        if (res.authResponse.accessToken) {
          this.auth.fbLogin(res.authResponse.accessToken).subscribe(isAuthenticated => {
            this.loading.dismiss();
            this.navCtrl.setRoot(TabsPage);
          })
        }
      })
      .catch(e => this.showError(e));
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(error) {
    this.loading.dismiss();

    //If cancel facebook login, it returned as error with this code.
    if("4201" === error.errorCode){
      return;
    }

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: error.message || error.errorMessage || 'Error happened, try again later',
      buttons: ['OK']
    });
    alert.present();
  }


}
