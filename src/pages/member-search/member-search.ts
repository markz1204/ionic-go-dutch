import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user.model";
import {UserService} from "../../providers/user-service";
import {Session} from "../../models/session.model";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
    this.currentSession = this.navParams.get('session');
  }

  getMembers(ev: any){

    let q = ev.target.value;

    this.members = this.userService.query(q);
  }

  isAlreadyInSession(member){
    return member.sessions.find((m)=>{
      return m = this.currentSession;
    })
  }

  addToSession(member: User){
    //add this member to session in db
    this.currentSession.members.push(member);
    member.sessions.push(this.currentSession);
  }

  goBack(){
    this.navCtrl.pop();
  }

}
