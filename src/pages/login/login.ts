import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { SocialService } from "../../providers/social-service";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [SocialService]
})
export class LoginPage {

  private userProfile : string 
  
  constructor(public navCtrl: NavController, public socialService: SocialService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  loginViaFacebook() {

    this.socialService.facebookLogin().subscribe((res)=> {
      console.log("loginViaFacebook : ", res);
      this.userProfile = JSON.stringify(res);
    }, (err) => {
      console.log("loginViaFacebook : ", err);
    })

  }

  loginViaGoogle() {
    this.socialService.googlePlusLogin().subscribe((res)=> {
      console.log("loginViaGoogle : ", res);
      this.userProfile = JSON.stringify(res);
    }, (err) => {
      console.log("loginViaGoogle : ", err);
    })
  }

  logout() {
    this.socialService.logout();
    this.userProfile = null;
  }

}
