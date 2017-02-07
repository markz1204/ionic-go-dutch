import {Session} from "./session.model";
export class Schedule {
  name: string;
  description: string;
  created: string;
  sessions: Session[];

  constructor(name: string){
    this.name = name;
    this.created = new Date().toDateString();
  }
}
