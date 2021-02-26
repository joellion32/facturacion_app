import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.url;
  token: string;
  constructor(private http: HttpClient, private nav: NavController) { }

  login(email: string, password: string) {

    const data = {
      email: email,
      password: password
    }

    return this.http.post(`${this.url}/login`, data);
  }


  async saveToken(token: string, user: any) {
    // save token 
    await Storage.set({
      key: 'token',
      value: JSON.stringify({
        token: token
      })
    });

    // save user 
    await Storage.set({
      key: 'user_data',
      value: JSON.stringify({
        user: user
      })
    });
  }


  // reader token
  async readerToken() {
    if ((await Storage.get({ key: 'token' })).value) {
      const data = await Storage.get({ key: 'token' });
      const token = JSON.parse(data.value);
      this.token = token;
    } else {
      this.token = '';
    }
    return this.token;
  }

  // view user to storage
  async viewUser() {
    const data = await Storage.get({ key: 'user_data' });
    const user = JSON.parse(data.value);
    return user;
  }



  //update password
  resetPassword( data: any) {
    const user = {
      email: data.email,
      password: data.password1
    }
    
    return this.http.put(`${this.url}/user/update_password`, user)
  }

  // update user
  updateUser(token: string, id: number, data: any) {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.put(`${this.url}/user/update/${id}`, data, { headers: headers })
  }


  /* send Mail*/
  sendMail(data: any){
    return this.http.post(`${this.url}/send/mail`, data)
  }

  //check if the user is authenticated
  async Isauthenticated() {
    // token
    const data = await Storage.get({ key: 'token' });
    const token = JSON.parse(data.value);
    
    if (token.token.length > 0) {
      this.nav.navigateBack('home');
    }
 
  }

  /* logout*/
  async Logout() {
    await Storage.remove({ key: 'token' });
    await Storage.remove({ key: 'user_data' });
    this.nav.navigateBack('login');
  }

}
