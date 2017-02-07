import {Session} from "./session.model";
export class User {
  email: string;
  token: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  image: string;
  sessions: Session[] = [];

  constructor(email: string) {
    this.email = email;
  }
}
