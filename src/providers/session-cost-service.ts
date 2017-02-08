import {Injectable} from '@angular/core';
import {SessionCost} from "../models/session-cost.model";
import {Session} from "../models/session.model";
import {CostType} from "../enums/CostType.enum";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SessionCostService {

  sessionCosts: SessionCost[] = [];

  constructor() {
  }

  createOrUpdate(session:Session, costType: CostType, costAmount: number) : SessionCost{

    let cost = this.query(session);
    if(cost){
        cost.costAmount = costAmount;
    }else {
      cost = new SessionCost(session, costType, costAmount);
      this.sessionCosts.push(cost);
    }

    return cost;
  }

  query(session:Session) : SessionCost {
    const cost =  this.sessionCosts.find((cost) => {
      return cost.session === session;
    });

    return cost;
  }

}
