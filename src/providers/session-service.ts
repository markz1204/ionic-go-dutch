import {Injectable} from "@angular/core";
import {ApiService} from "./api-service";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SessionService {


  constructor(private apiService: ApiService){

  }

  create(sessionDetails){

    let startDateTime = new Date(),
        startTimeArray = sessionDetails.startTime.split(':'),
        endDateTime = new Date(),
        endTimeArray = sessionDetails.endTime.split(':');
    startDateTime.setHours(startTimeArray[0]);
    startDateTime.setMinutes(startTimeArray[1]);
    endDateTime.setHours(endTimeArray[0]);
    endDateTime.setMinutes(endTimeArray[1]);

    let convertedSessionDetails = Object.assign({}, sessionDetails, {startTime: startDateTime.toISOString(), endTime: endDateTime.toISOString()});

    return this.apiService.post('/sessions', {session: convertedSessionDetails});
  }
}
