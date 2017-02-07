import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import {Schedule} from "../../models/schedule.model";
import {ScheduleService} from "../../providers/schedule-service";
import {SessionsPage} from "../sessions/sessions";

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  schedules: Schedule[];

  constructor(private navCtrl: NavController, private auth: AuthService, private scheduleService: ScheduleService) {
    this.schedules = scheduleService.query();
  }

  goToSessions(schedule: any) {
    this.navCtrl.push(SessionsPage, schedule);
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.navCtrl.setRoot(LoginPage)
    });
  }
}
