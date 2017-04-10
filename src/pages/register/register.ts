import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {AuthService} from "../../providers/auth-service";
import {FormGroup, FormBuilder} from "@angular/forms";
import {TabsPage} from "../tabs/tabs";

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage{

  serverErrors = {};

  registerForm: FormGroup;

  constructor(private navCtrl: NavController, private auth: AuthService, private formBuilder: FormBuilder, private alertCtrl: AlertController) {
    this.registerForm = formBuilder.group({
      //username: [''],
      email: [''],
      password: ['']
    });
  }

  public register() {
    if(this.registerForm.valid) {

      this.auth.register(this.registerForm.value).subscribe(
        (data) => {
          if(data.user) {
            this.navCtrl.setRoot(TabsPage);
          }else{
            if(data.error){
              let alert = this.alertCtrl.create({
                title: 'Error',
                message: data.error.message,
                buttons: ['OK']
              });

              alert.present();
            }
          }
        },
        error => {
          this.serverErrors = Object.assign({}, error);
        }

      );
    }
  }
}
