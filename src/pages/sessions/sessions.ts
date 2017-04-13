import {Component} from "@angular/core";
import {NavController, Events} from "ionic-angular";
import {Session} from "../../models/session.model";
import {SessionPage} from "../session/session";
import {SessionCreatePage} from "../session-create/session-create";
import {SessionService} from "../../providers/session-service";
import {Category} from "../../enums/Category.enum";
import {AppStatus} from "../../providers/app-status";

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

  category: string = Category.ORGANISED.toString();

  sessions: Session[];

  constructor(public navCtrl: NavController, private sessionService: SessionService, private events: Events, private appStatus: AppStatus) {
  }

  ionViewWillEnter(){
    this.sessionService.getAll(this.category).subscribe(
      data=>{
      this.sessions = data;
      },
      err=>{
        if(err || 401 === err.statusCode || 403 === err.statusCode){
          this.events.publish('user:logout');
        }
      }
      );
  }

  segmentChanged(){

    this.appStatus.isOrganiser = (this.category === '0');

    this.sessionService.getAll(this.category).subscribe(
      data=>{
        this.sessions = data;
      },
      err=>{
        if(401 === err.statusCode || 403 === err.statusCode){
          this.events.publish('user:logout');
        }
      }
    );
  }

  createSession(){
    this.navCtrl.push(SessionCreatePage);
  }

  goToSession(session){

    this.sessionService.getSession(session.slug).subscribe(
      session => {

        this.sessionService.currentSessionSubject.next(session);

        this.navCtrl.push(SessionPage);

      });
  }

}
