import {Injectable} from '@angular/core';
import {MemberCost} from "../models/member-cost.model";
import {Session} from "../models/session.model";
import {User} from "../models/user.model";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class MemberCostService {

  memberCosts: MemberCost[] = [];

  constructor() {
  }

  createOrUpdate(member: User, session:Session, costAmount: number) : MemberCost{

    let cost = this.query(member, session);
    if(cost){
      cost.costAmount = costAmount;
    }else {
      cost = new MemberCost(member, session, costAmount);
      this.memberCosts.push(cost);
    }

    return cost;
  }

  query(member: User, session:Session) : MemberCost {
    const cost =  this.memberCosts.find((cost) => {
      return cost.member === member && cost.session === session;
    });

    return cost;
  }

}
