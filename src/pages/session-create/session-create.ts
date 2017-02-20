import {Component} from "@angular/core";
import {Validators, FormBuilder, FormGroup, AbstractControl} from "@angular/forms";
import {NavParams, ViewController} from "ionic-angular";
import {CostType} from "../../enums/CostType.enum";
import {NumberValidator} from "../../validators/number-validator";
import {SessionService} from "../../providers/session-service";
import {ScheduleService} from "../../providers/schedule-service";

/*
  Generated class for the SessionCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-session-create',
  templateUrl: 'session-create.html'
})
export class SessionCreatePage {

  segmentItems: any[] = [{name: 'Average', value: CostType.AVERAGE}, {name: 'Total', value: CostType.TOTAL}, {name: 'Arbitrary', value: CostType.ARBITRARY}];

  costType: any;

  session: FormGroup;
  costAmount: AbstractControl;

  serverErrors = {};

  constructor(private viewCtrl: ViewController, private formBuilder: FormBuilder, private sessionService: SessionService, private scheduleService: ScheduleService, private navParams: NavParams) {

    this.session = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(25)])],
      costType: ['', Validators.required],
      costAmount: ['', Validators.compose([Validators.required, NumberValidator.isNumber, NumberValidator.exceedsLimit])],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  costLabel(){
    if(CostType.AVERAGE.toString() === this.costType){
      return 'Cost per person';
    }else if(CostType.TOTAL.toString() === this.costType){
      return 'Cost in total';
    }else{
      return 'Cost need to be set when collecting'
    }
  }

  isHidden(){
    return !this.costType || CostType.ARBITRARY.toString() === this.costType.toString();
  }

  createSession(){
    if(this.session.valid) {

      let newSession = Object.assign({}, this.session.value);

      this.sessionService.create(newSession).subscribe(data=>{

        if(this.navParams.data.schedule){

          this.scheduleService.update(this.navParams.data.schedule, {sessions: [data.session.id]}).subscribe(

            error=>{
              console.log(error);
            },

            ()=>{
              this.viewCtrl.dismiss();
            }
          );

        }else {
          let newSchedule = Object.assign({}, {title: this.session.value.title, sessions:[data.session.id]});

          this.scheduleService.create(newSchedule).subscribe(
            () => {
              this.viewCtrl.dismiss();
            }
          );
        }
      },

      error=>{
        this.serverErrors = Object.assign({}, error);
      }
      );
    }
  }

}
