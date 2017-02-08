import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {Session} from "../../models/session.model";
import {OptionsPage} from "../options/options";
import {CostType} from "../../enums/CostType.enum";
import {User} from "../../models/user.model";
import {MemberCostService} from "../../providers/member-cost-service";

/*
  Generated class for the Session page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-session',
  templateUrl: 'session.html'
})
export class SessionPage {

  session: Session;

  sessionCost: number;

  costType: any;

  segmentItems: any[] = [{name: 'Average', value: CostType.AVERAGE}, {name: 'Total', value: CostType.TOTAL}, {name: 'Arbitrary', value: CostType.ARBITRARY}];

  constructor(public navCtrl: NavController, private popOverCtrl: PopoverController, public navParams: NavParams, private memberCostService: MemberCostService) {
    this.session = navParams.data;
    this.costType = this.session.sessionCost.costType.toString();
    this.sessionCost = this.session.sessionCost.costAmount;
  }

  presentOptions(event){
    let popover = this.popOverCtrl.create(OptionsPage, {session: this.session});
    popover.present({ev: event});
  }

  costInputDisabled(){
    return (CostType.ARBITRARY.toString() === this.costType.toString());
  }

  segmentChanged(){
    if(this.costInputDisabled()){
      this.sessionCost = undefined;
    }else{
      this.sessionCost = this.session.sessionCost.costAmount;
    }
  }

  placeholderForCostInput(){
    return this.costInputDisabled() ? 'Enter cost for each member' : 'Enter cost here';
  }

  excludeOrInclude(member: User){
    const isExcluded = this.session.costExcluded.find((m)=>{
      return m === member;
    });

    if(isExcluded){
      const mIndex = this.session.costExcluded.indexOf(member),
            sIndex = member.costExcluded.indexOf(this.session);
      this.session.costExcluded.splice(mIndex, 1);
      member.costExcluded.splice(sIndex, 1);
    }else{
      this.session.costExcluded.push(member);
      member.costExcluded.push(this.session);
    }

  }

  excludeIncludedLabel(member){
    const isExcluded = this.session.costExcluded.find((m)=>{
      return m === member;
    });

    return isExcluded ? 'Include' : 'Exclude';
  }

  initialCost(member){
    const memberCost = this.memberCostService.query(member, this.session);
    return memberCost.costAmount;
  }

  memberCostChanged(member, newValue){
    this.memberCostService.createOrUpdate(member, this.session, newValue);
  }

}
