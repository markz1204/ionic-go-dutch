import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ApiService} from "./api-service";
import {URLSearchParams} from "@angular/http";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserService {

  constructor(private apiService: ApiService) {}


  query(q: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set("q", q);
    return this.apiService.get("/users", params).map(data=>data.users);
  }

  registerUser(credentials: any) : Observable<any>{
    return this.apiService.post('/users/signup', {user: credentials});
  }

  getCurrentUser() : Observable<any>{
    return this.apiService.get('/users/current');
  }

  login(credentials): Observable<any>{
    return this.apiService.post('/users/login', {user: credentials});
  }

  update(details): Observable<any>{
    return this.apiService.patch(`/users`, {user: details});
  }
}
