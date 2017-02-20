import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Session} from "../../models/session.model";
import {SessionPage} from "../session/session";
import {ScheduleService} from "../../providers/schedule-service";
import {SessionCreatePage} from "../session-create/session-create";
import {Schedule} from "../../models/schedule.model";

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

  constructor(public navCtrl: NavController, private scheduleService: ScheduleService, public navParams: NavParams) {

    scheduleService.getAllSessions(navParams.data.slug).subscribe(data=>{
      this.sessions = data;
    });
  }

  createSession(){
    this.navCtrl.push(SessionCreatePage, {schedule: this.navParams.data.slug});
  }

  goToSession(session: Session){
    this.navCtrl.push(SessionPage, session);
  }

}
