import {User} from "./user.model";
export class Session {
  name: string;
  startTime: string;
  endTime: string;
  members: User[] = [];
  costType: number;

  constructor(name: string, startTime: string, endTime: string){
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
