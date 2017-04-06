import {User} from "./user.model";
import {Session} from "./session.model";
export class MemberCost {
  member: User;
  session: Session;
  costAmount: number;

  constructor(session: Session, member: User, costAmount: number){
    this.member = member;
    this.session = session;
    this.costAmount = costAmount;
  }
}
