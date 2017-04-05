import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {Session} from "../../models/session.model";
import {SessionPage} from "../session/session";
import {SessionCreatePage} from "../session-create/session-create";
import {SessionService} from "../../providers/session-service";

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

  sessions: Session[];

  constructor(public navCtrl: NavController, private sessionService: SessionService) {
  }

  ionViewWillEnter(){
    this.sessionService.getAll().subscribe(data=>{
      this.sessions = data;
    });
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
