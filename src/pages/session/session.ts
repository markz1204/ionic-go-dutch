import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {Session} from "../../models/session.model";
import {OptionsPage} from "../options/options";
import {CostType} from "../../enums/CostType.enum";

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

  costType: any;

  costAmount: number;

  segmentItems: any[] = [{name: 'Average', value: CostType.AVERAGE}, {name: 'Total', value: CostType.TOTAL}, {name: 'Arbitrary', value: CostType.ARBITRARY}];

  constructor(public navCtrl: NavController, private popOverCtrl: PopoverController, public navParams: NavParams) {
    this.session = navParams.data;
    this.costType = CostType.AVERAGE.toString();
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
      this.costAmount = undefined;
    }
  }

  placeholderForCostInput(){
    return this.costInputDisabled() ? 'Enter cost for each member' : 'Enter cost here';
  }

}
