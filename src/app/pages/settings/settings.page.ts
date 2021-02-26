import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  email: string;
  id: number;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.viewUser();
  }

  viewUser(){
    this.auth.viewUser().then(resp => {
      const user = resp['user'];
      this.id = user.id;
      this.email = user.email;
    })
  }

  logout(){
    this.auth.Logout()
  }

}
