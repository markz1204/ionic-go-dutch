import {Component} from "@angular/core";
import {PopoverController} from "ionic-angular";
import {OptionsPage} from "../options/options";
import {CostType} from "../../enums/CostType.enum";
import {SessionService} from "../../providers/session-service";
import {Session} from "../../models/session.model";

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

  cost: number;

  costPerPerson: number;

  costLabels: any[] = ['Cost per person: ', 'Cost in total (go-dutch): ', 'Cost in total (sum-up): '];

  segmentItems: any[] = [
    {name: 'Average', value: CostType.AVERAGE},
    {name: 'Total', value: CostType.TOTAL},
    {name: 'Arbitrary', value: CostType.ARBITRARY}];

  constructor(private popOverCtrl: PopoverController, private sessionService: SessionService) {

    this.costType = "0";
    this.cost = 0;

    this.sessionService.currentSession.subscribe((session)=>{
      this.session = session;

      this.calculateCost();

    });
  }

  ionViewWillEnter(){
    this.sessionService.currentSession.subscribe((session)=>{
      this.session = session;
    });
  }

  presentOptions(event) {
    let popover = this.popOverCtrl.create(OptionsPage);
    popover.present({ev: event});
  }

  segmentChanged(){
    this.calculateCost();
  }

  costChanged(costVal){
    this.cost = costVal;

    this.calculateCost();
  }

  private calculateCost() {
    if ("0" === this.costType) {
      this.costPerPerson = this.cost;
    } else if ("1" === this.costType) {
      this.costPerPerson = Number((this.cost / this.session.members.length).toFixed(1));
    } else {
      this.costPerPerson = 0;
    }
  }
}
