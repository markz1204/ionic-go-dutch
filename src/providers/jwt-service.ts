import {Injectable} from "@angular/core";
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class JwtService {

  constructor(private cookieService: CookieService){}

  getToken(): String {
    //return window.localStorage['jwtToken'];
    return this.cookieService.get('gd-token');
  }

  saveToken(token: String) {
    //window.localStorage['jwtToken'] = token;

  }

  destroyToken() {
    //window.localStorage.removeItem('jwtToken');
    this.cookieService.remove('gd-token');
  }

}
