import {Session} from "./session.model";
export class User {
  id: string;
  email: string;
  token: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  image: string;
  sessions: Session[] = [];
}
