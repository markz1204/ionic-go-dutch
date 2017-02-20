import {Injectable} from "@angular/core";
import {Schedule} from "../models/schedule.model";
import {URLSearchParams} from "@angular/http";
import {ApiService} from "./api-service";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ScheduleService {

  schedules: Schedule[] = [];

  constructor(private apiService: ApiService){}

  create(newSchedule){
    return this.apiService.post('/schedules', {schedule: newSchedule});
  }

  update(scheduleSlug, scheduleDetails){
    return this.apiService.patch(`/schedules/${scheduleSlug}`, scheduleDetails);
  }

  query(username) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('organiser', username);

    return this.apiService.get('/schedules', params);
  }

  getAllSessions(slug){
    return this.apiService.get(`/schedules/${slug}/sessions`).map(data=>data.sessions);
  }

}
