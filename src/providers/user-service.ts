import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {JwtService} from "./jwt-service";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserService {

  users: User[] = [];

  imgs: string[] = ["https://ionicframework.com/dist/preview-app/www/assets/img/avatar-han.png",
  "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-finn.png",
  "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-rey.png",
  "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-luke.png",
  "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-poe.png",
  "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-ben.png",
  "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-leia.png"];

  constructor(private http: Http, private jwtService: JwtService) {
    const count = Math.floor((Math.random() * 100) + 1);
    for (var i = 0; i < count; i++) {
      let user = new User(),
        imgUrl = Math.floor(Math.random() * this.imgs.length);
      user.image = this.imgs[imgUrl];
      user.firstName = user.image.substring(user.image.lastIndexOf('-') + 1, user.image.lastIndexOf('.'));
      this.users.push(user);
    }
  }


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
    return this.http.post('api/users', JSON.stringify({user: credentials}),{headers: this.setHeaders()}).catch(this.formatErrors)
      .map(res => res.json());
  }

  getCurrentUser() : Observable<any>{
    return this.http.post('/api/user', {headers: this.setHeaders()}).map(res=>res.json());
  }

  getUser(credentials): Observable<any>{
    return this.http.post('/api/users/login', JSON.stringify({user: credentials}),{headers: this.setHeaders()}).catch(this.formatErrors).map(res=>res.json());
  }

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

}
