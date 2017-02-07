import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Schedule} from '../models/schedule.model';
import {User} from "../models/user.model";

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

  constructor() {
    const count = Math.floor((Math.random() * 100) + 1);
    for (var i = 0; i < count; i++) {
      let user = new User('test1@gmail.com'),
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

}
