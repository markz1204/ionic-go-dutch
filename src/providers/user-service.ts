import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ApiService} from "./api-service";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserService {

  users: User[] = [];

  constructor(private apiService: ApiService) {}


  query(q: string) {
    if(q) {
      return this.users.filter((user) => {
        return (user.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1);
      });
    }else{
      return this.users;
    }
  }

  registerUser(credentials: any) : Observable<any>{
    return this.apiService.post('/users', {user: credentials});
  }

  getCurrentUser() : Observable<any>{
    return this.apiService.get('/user');
  }

  getUser(credentials): Observable<any>{
    return this.apiService.post('/users/login', {user: credentials});
  }
}
