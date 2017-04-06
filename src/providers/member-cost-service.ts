import {Injectable} from "@angular/core";
import {MemberCost} from "../models/member-cost.model";
import {Session} from "../models/session.model";
import {ApiService} from "./api-service";
import {Observable} from "rxjs";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class MemberCostService {

  memberCosts: MemberCost[] = [];

  constructor(private apiService: ApiService) {
  }

  get(session:Session) : Observable<any>{
    return this.apiService.get(`/member-costs/${session.slug}`).map(data=>data.memberCosts);
  }

  createOrUpdate(session: Session, memberCosts: MemberCost[]) : Observable<any>{
    return this.apiService.post(`/member-costs/${session.slug}`, {memberCosts: memberCosts}).map(data=>data.memberCosts);
  }

}
