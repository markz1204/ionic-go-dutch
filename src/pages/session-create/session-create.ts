import {Component} from "@angular/core";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {NavController} from "ionic-angular";
import {SessionService} from "../../providers/session-service";

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

  session: FormGroup;

  serverErrors = {};

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private sessionService: SessionService) {

    this.session = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  createSession() {
    if (this.session.valid) {

      let newSession = Object.assign({}, this.session.value);

      this.sessionService.create(newSession).subscribe(
        data => {
          this.navCtrl.pop();
        },

        error => {
          this.serverErrors = Object.assign({}, error);
        }
      );
    }
  }

}
