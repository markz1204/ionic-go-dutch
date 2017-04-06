import {Session} from "./session.model";
export class User {
  id: string;
  email: string;
  token: string;
  firstName: string;
  lastName: string;
  picture: string;
  sessions: Session[] = [];
}
