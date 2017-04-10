import {Component} from "@angular/core";
import {PopoverController, AlertController, NavParams, NavController} from "ionic-angular";
import {OptionsPage} from "../options/options";
import {CostType} from "../../enums/CostType.enum";
import {SessionService} from "../../providers/session-service";
import {Session} from "../../models/session.model";
import {MemberCost} from "../../models/member-cost.model";
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

  cost: number;

  costType: string;

  costLabels: any[] = ['Cost per person: ', 'Cost in total (go-dutch): ', 'Cost in total (sum-up): '];

  memberCosts: MemberCost[] = [];

  isInitial: boolean = true;

  segmentItems: any[] = [
    {name: 'Equal', value: CostType.EQUAL.toString()},
    {name: 'Total', value: CostType.TOTAL.toString()},
    {name: 'Arbitrary', value: CostType.ARBITRARY.toString()}];

  //Inject navParams is allow to pass memberCosts.
  constructor(private popOverCtrl: PopoverController, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController,
              private memberCostService: MemberCostService, private sessionService: SessionService) {

    console.log('initial ' + this.isInitial);

    this.sessionService.currentSession.subscribe((session) => {
      this.session = session;

      this.costType = this.session.costType.toString();

      this.memberCostService.get(this.session).subscribe((memberCosts) => {
        this.memberCosts = memberCosts;

        if(this.isInitial) {
          this.initialCost();
          this.isInitial = false;
        }else{
          this.calculateCost();
        }

      });
    });
  }

  ionViewWillEnter() {
    this.sessionService.currentSession.subscribe((session) => {
      this.session = session;
    });
  }

  ionViewCanLeave(): boolean {

    if (this.sessionService.isDirtySession) {
      let confirm = this.alertCtrl.create({
        title: 'Save changes',
        message: 'You made some changes, do you want to save it?',
        buttons: [
          {
            text: 'No',
            handler: () => {

              this.sessionService.isDirtySession = false;
              confirm.dismiss().then(()=>{
                this.navCtrl.pop();
              });
            }
          },

          {
            text: 'Yes',
            handler: () => {
              this.sessionService.isDirtySession = false;

              this.memberCostService.createOrUpdate(this.session, this.memberCosts).subscribe((memberCosts)=>{
                this.navCtrl.pop();
              });
            }
          }
        ]
      });
      confirm.present();

      return false;
    }else{
      return true;
    }
  }

    presentOptions(event) {
    let popover = this.popOverCtrl.create(OptionsPage, {memberCosts: this.memberCosts});
    popover.present({ev: event});
  }

  segmentChanged() {

    this.sessionService.updateCostType(this.session.slug, this.costType).subscribe((updated) => {
      this.sessionService.currentSessionSubject.next(updated);
    });

  }

  costChanged(costVal) {

    this.sessionService.isDirtySession = true;

    this.cost = costVal;
    this.calculateCost();
  }

  readyOnly() {
    return ("2" === this.costType);
  }

  showCost(memberCost: MemberCost) {
    let modification = this.alertCtrl.create();
    modification.setTitle("Modify cost");

    modification.addInput({
      type: 'number',
      label: 'Cost:',
      value: `${memberCost.costAmount}`
    });

    modification.addButton('Cancel');
    modification.addButton({
      text: 'Change',
      handler: data => {
        memberCost.costAmount = data[0] || 0;
        this.costType = CostType.ARBITRARY.toString();
        this.sessionService.isDirtySession = true;
        this.calculateCost();
      }
    });

    modification.present();
  }

  removeMember(memberCost: MemberCost) {
    let confirm = this.alertCtrl.create({
      title: 'Member Cost Deletion',
      message: 'Are you sure to remove this member from this group?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            this.memberCostService.delete(memberCost).subscribe((session) => {
              this.memberCosts = this.memberCosts.filter((mc) => mc.member.id != memberCost.member.id);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  private initialCost() {
    if (this.cost == 0 || !this.cost) {
      if ("0" === this.costType) {
        this.cost = this.memberCosts[0].costAmount;
      }
      else {
        this.cost = this.memberCosts.reduce(function (a, b) {
          return a + Number(b.costAmount);
        }, 0);
      }
    }
  }

  private calculateCost() {
    if ("2" === this.costType) {
      this.cost = this.memberCosts.reduce(function (a, b) {
        return a + Number(b.costAmount);
      }, 0);
    } else {
      this.memberCosts.forEach((memberCost) => {
        if ("0" === this.costType) {
          memberCost.costAmount = this.cost;
        } else if ("1" === this.costType) {
          memberCost.costAmount = Number((this.cost / this.session.members.length).toFixed(1));
        }
      });
    }
  }
}
