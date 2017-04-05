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

  segmentItems: any[] = [{name: 'Average', value: CostType.AVERAGE}, {
    name: 'Total',
    value: CostType.TOTAL
  }, {name: 'Arbitrary', value: CostType.ARBITRARY}];

  constructor(private popOverCtrl: PopoverController, private sessionService: SessionService) {
    this.sessionService.currentSession.subscribe((session)=>{
      this.session = session;
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

}
