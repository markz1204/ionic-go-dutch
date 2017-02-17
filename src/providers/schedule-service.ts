import {Injectable} from '@angular/core';
import {Schedule} from '../models/schedule.model';
import {Session} from "../models/session.model";
import {User} from "../models/user.model";
import {CostType} from "../enums/CostType.enum";
import {SessionCostService} from "./session-cost-service";
import {MemberCostService} from "./member-cost-service";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ScheduleService {

  schedules: Schedule[] = [];

  constructor(private sessionCostService: SessionCostService, private memberCostService: MemberCostService) {
    let schedule1 = new Schedule("Badminton session"),
      session1 = new Session(schedule1.name, "8:00 PM", "10:00 PM"),
      session2 = new Session(schedule1.name, "1:00 PM", "3:00 PM"),
      session3 = new Session(schedule1.name, "10:00 AM", "12:00 PM");
      schedule1.sessions = [session1, session2, session3];
    let schedule2 = new Schedule("Basketball session"),
      session4 = new Session(schedule2.name, "8:00 PM", "10:00 PM"),
      session5 = new Session(schedule2.name, "1:00 PM", "3:00 PM"),
      session6 = new Session(schedule2.name, "10:00 AM", "12:00 PM");
      schedule2.sessions = [session4, session5, session6];
    let schedule3 = new Schedule("Music show session"),
      session7 = new Session(schedule3.name, "8:00 PM", "10:00 PM");
      schedule3.sessions = [session7];

    this.schedules.push(schedule1, schedule2, schedule3);

    let tmpSessions = [];
    tmpSessions = tmpSessions.concat(schedule1.sessions, schedule2.sessions, schedule3.sessions);
    for(let session of tmpSessions){

      let type = Math.floor(Math.random() * 3), cost;

      if(CostType.AVERAGE === type){
        cost = this.sessionCostService.createOrUpdate(session, CostType.AVERAGE, 12);

      }else if(CostType.TOTAL === type){
        cost = this.sessionCostService.createOrUpdate(session, CostType.TOTAL, 150);

      }else{
        cost = this.sessionCostService.createOrUpdate(session, CostType.ARBITRARY, 0);

      }

      session.sessionCost = cost;

      this.assignMembers(session);

      this.initialCostExcluded(session);
    }
  }

  private assignMembers(session) {
    const imgs = ["https://ionicframework.com/dist/preview-app/www/assets/img/avatar-han.png",
      "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-finn.png",
      "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-rey.png",
      "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-luke.png",
      "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-poe.png",
      "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-ben.png",
      "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-leia.png"];

    const count = Math.floor((Math.random() * 10) + 1);

    session.members = [];

    for (var i = 0; i < count; i++) {
      let user = new User(),
        imgUrl = Math.floor(Math.random() * imgs.length);
      user.image = imgs[imgUrl];
      user.firstName = user.image.substring(user.image.lastIndexOf('-') + 1, user.image.lastIndexOf('.'));
      session.members.push(user);

      if(CostType.AVERAGE === session.sessionCost.costType){
        this.memberCostService.createOrUpdate(user, session, session.sessionCost.costAmount);
      }else if(CostType.TOTAL === session.sessionCost.costType){
        this.memberCostService.createOrUpdate(user, session, Number.parseFloat((session.sessionCost.costAmount/count).toFixed(2)));
      }else{
        this.memberCostService.createOrUpdate(user, session, session.sessionCost.costAmount);
      }
    }
  }

  private initialCostExcluded(session){
    session.costExcluded = [];
  }


    query() {

    return this.schedules;

  }

}
