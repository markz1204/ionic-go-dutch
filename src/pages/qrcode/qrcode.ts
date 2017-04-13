import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import {User} from "../../models/user.model";

/*
  Generated class for the Qrcode page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html'
})
export class QrcodePage {

  user: User;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.user = this.navParams.data.params.user;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
