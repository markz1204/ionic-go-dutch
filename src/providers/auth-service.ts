import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.model";
import {UserService} from "./user-service";
import {JwtService} from "./jwt-service";
import {BehaviorSubject, ReplaySubject} from "rxjs";

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  currentUserSubject = new BehaviorSubject<User>(new User());
  currentUser = this.currentUserSubject.asObservable();

  isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private userService: UserService, private jwtService: JwtService){}

  public login(credentials): Observable<boolean> {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please provide credentials");
    } else {
       return this.userService.login(credentials).map(
         data => {
          this.setAuth(data.user);
          return true;
         },

          error =>{
            return false;
          }
         );
    }
  }

  public register(credentials) : Observable<any> {
    if (credentials.username === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.userService.registerUser(credentials).map(
        data =>{

          if(data.user) {
            this.setAuth(data.user);
          }

          return data;
        }
      );
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    //this.jwtService.saveToken(user.token);

    this.currentUserSubject.next(user);

    this.isAuthenticatedSubject.next(true);
  }


  public getUserInfo() : User {
    return this.currentUserSubject.value;
  }

  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.userService.getCurrentUser()
        .subscribe(
          data => this.setAuth(data.user),
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  public logout() {
    return Observable.create(observer => {
      this.purgeAuth();
      observer.next(true);
      observer.complete();
    });
  }

}
