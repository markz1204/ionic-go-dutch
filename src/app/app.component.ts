import {Component, OnInit} from "@angular/core";
import {Platform, Events} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {AuthService} from "../providers/auth-service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  rootPage: any;


  ngOnInit(): void {

    this.authService.populate();

    this.authService.isAuthenticated.subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        this.rootPage = TabsPage;
      }else{
        this.rootPage = LoginPage;
      }
    });
  }

  constructor(platform: Platform, public authService: AuthService, private events: Events) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.listenToLoginEvents();

  }

  listenToLoginEvents(){
    this.events.subscribe('user:logout', () => {
      this.authService.purgeAuth();
    });
  }
}
