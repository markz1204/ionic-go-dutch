import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Session} from "../../models/session.model";
import {SessionPage} from "../session/session";

/*
  Generated class for the Sessions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html'
})
export class SessionsPage {

  sessions: Session[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sessions = navParams.data.sessions;
  }

  goToSession(session: Session){
    this.navCtrl.push(SessionPage, session);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionsPage');
  }

}
