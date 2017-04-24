import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

const webClientId = "347630520639-jjpcnv4geph483tblf298fn5agae2m7n.apps.googleusercontent.com";

@Injectable() export class SocialService {

  constructor(private fb: Facebook, private googlePlus: GooglePlus) {
    console.log('Hello SocialService Provider');
    this.logout();
  }

  public googlePlusLogin(): Observable<any> {
        const provider = 'google';
        return Observable.create((observer) => {
            this.googlePlus.login({
                scopes: 'profile',
                webClientId: webClientId
            }).then((res) => {
                console.log('@googleRes', JSON.stringify(res))
                const userProfile = { email: res.email, imageUrl: res.imageUrl, name: res.displayName };
                // Call Restful API to login if needed
                observer.next(userProfile);
                observer.complete();
            }).catch((err) => {
                console.log('Fail to connect Google!');
                observer.error(err);
                observer.complete();
            });
        });
    }

  public facebookLogin(): Observable<any> {
    const provider = 'facebook';

    return Observable.create((observer) => {

      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => {
          console.log('Logged into Facebook!', res);
          if (res.status === 'connected') {
            this.fb.api(`/${res.authResponse.userID}?fields=id,name,email,picture,gender,location`, [])
              .then((profile) => {
                console.log('@profile', JSON.stringify(profile))
                const userProfile = {
                  email: profile.email,
                  imageUrl: profile.picture.data.url,
                  name: profile.name,
                  gender: profile.gender
                };

                observer.next(userProfile);
                observer.complete();
              });
          }
        })
        .catch(err => {
          console.log('Error logging into Facebook', err)
          observer.complete();

        });

    });
  }

  logout() {
    this.fb.logout().catch((err) => {
      console.error(err);
    })
    this.googlePlus.logout().catch((err)=> {
      console.error(err);
    })
  }
}