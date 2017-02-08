import {Session} from "./session.model";
import {CostType} from "../enums/CostType.enum";
export class SessionCost {
  session: Session;
  costType: CostType;
  costAmount: number;

  constructor(session: Session, costType: CostType, costAmount: number){
    this.session = session;
    this.costType = costType;
    this.costAmount = costAmount;
  }
}
