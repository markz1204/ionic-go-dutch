import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {User} from "../../models/user.model";
import {UserService} from "../../providers/user-service";
import {Session} from "../../models/session.model";
import {SessionService} from "../../providers/session-service";
import {MemberCost} from "../../models/member-cost.model";
import {MemberCostService} from "../../providers/member-cost-service";

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

  constructor(public navCtrl: NavController, private navParams: NavParams, private userService: UserService, private sessionService: SessionService, private memberCostService: MemberCostService) {

    this.sessionService.currentSession.subscribe((session) => {
      this.currentSession = session;
    });

  }

  getMembers(ev: any) {

    let q = ev.target.value;

    this.userService.query(q).subscribe(results => {
      this.members = results;
    });
  }

  isAlreadyInSession(member) {
    return this.currentSession.members.find((m) => {
      return m.email === member.email;
    });
  }

  addToSession(member: User) {

    this.sessionService.addMember(this.currentSession.slug, member).subscribe(updated => {
      this.sessionService.currentSessionSubject.next(updated);
    });

    let costAmount = 0;
    let memberCosts = this.navParams.get('memberCosts');


    if (0 === this.currentSession.costType) {
      costAmount = memberCosts[0].costAmount;
    } else if (1 === this.currentSession.costType) {
      let sum = memberCosts.reduce((a, b) => {
        return a + b.costAmount
      }, 0);

      //count this new one to be added.
      costAmount = Math.floor(sum / (memberCosts.length + 1));

      memberCosts.forEach((memberCost) => {
        memberCost.costAmount = costAmount;
      });
    }

    let newMemberCost = new MemberCost(this.currentSession, member, costAmount);

    memberCosts.push(newMemberCost);

    this.memberCostService.createOrUpdate(this.currentSession, memberCosts).subscribe((memberCosts)=>{
      console.log('created member cost successfully');
    });

  }

  goBack() {
    this.navCtrl.pop();
  }

}
