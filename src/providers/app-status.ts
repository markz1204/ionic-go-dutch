import {Injectable} from "@angular/core";

@Injectable()
export class AppStatus {

  isDirtySession: boolean = false;
  isOrganiser: boolean = true;

  constructor(){}

}
