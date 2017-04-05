import {Injectable} from "@angular/core";
import {ApiService} from "./api-service";
import {BehaviorSubject, ReplaySubject} from "rxjs";
import {Session} from "../models/session.model";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SessionService {


  currentSessionSubject = new ReplaySubject<Session>(1);
  currentSession = this.currentSessionSubject.asObservable();


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

  getAll(){
    return this.apiService.get(`/sessions`).map(data=>data.sessions);
  }

  getSession(slug){
    return this.apiService.get(`/sessions/${slug}`).map(data=>data.session);
  }

  update(slug, additionals){
    return this.apiService.patch(`/sessions/${slug}`, {member: additionals}).map(data=>data.session);
  }
}
