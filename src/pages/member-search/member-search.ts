import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {User} from "../../models/user.model";
import {UserService} from "../../providers/user-service";
import {Session} from "../../models/session.model";
import {SessionService} from "../../providers/session-service";

/*
  Generated class for the MemberSearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-member-search',
  templateUrl: 'member-search.html'
})
export class MemberSearchPage {

  members: User[];

  currentSession: Session;

  constructor(public navCtrl: NavController, private userService: UserService, private sessionService: SessionService) {

    this.sessionService.currentSession.subscribe((session)=>{
      this.currentSession = session;
    })
  }

  getMembers(ev: any){

    let q = ev.target.value;

    this.userService.query(q).subscribe(results=>{
      this.members = results;
    });
  }

  isAlreadyInSession(member){
    return this.currentSession.members.find((m)=>{
      return m.email === member.email;
    });
  }

  addToSession(member: User){

    this.sessionService.update(this.currentSession.slug, member).subscribe(updated=>{
      this.sessionService.currentSessionSubject.next(updated);
    });
  }

  goBack(){
    this.navCtrl.pop();
  }

}
