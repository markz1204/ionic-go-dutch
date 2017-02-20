import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import {Schedule} from "../../models/schedule.model";
import {ScheduleService} from "../../providers/schedule-service";
import {SessionsPage} from "../sessions/sessions";
import {SessionCreatePage} from "../session-create/session-create";

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  schedules: Schedule[];

  constructor(private navCtrl: NavController, private auth: AuthService, private scheduleService: ScheduleService) {

    this.auth.currentUser.subscribe((user)=>{
      if(user && user.username) {
        scheduleService.query(user.username).subscribe((results) => {
          this.schedules = results.schedules;
        });
      }
    });
  }

  goToSessions(schedule: any) {
    this.navCtrl.push(SessionsPage, schedule);
  }

  createSession(){
    this.navCtrl.push(SessionCreatePage);
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.navCtrl.setRoot(LoginPage)
    });
  }
}
