import {Injectable} from "@angular/core";
//import {CookieService} from "angular2-cookie/core";

@Injectable()
export class JwtService {

  constructor(){}

  getToken(): String {
    return window.localStorage['gd-token'];
    //return this.cookieService.get('gd-token');
  }

  saveToken(token: String) {
    window.localStorage['gd-token'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('gd-token');
    //this.cookieService.remove('gd-token');
  }

}
