import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {CostType} from "../../enums/CostType.enum";
import {NumberValidator} from "../../validators/number-validator";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private formBuilder: FormBuilder) {
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
    console.log(this.session.value);
  }

}
