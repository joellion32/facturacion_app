import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

user: any = {
email: '',
password: '' 
}
  constructor(private auth: AuthService, private components: ComponentsService, private nav: NavController) { }

  ngOnInit() {
  }

  Login(){
    if(this.user.email == "" || this.user.password == ""){
      this.components.presentToast("Los campos están vacíos")
    }else{
      this.components.presentLoading();
      this.auth.login(this.user.email, this.user.password).subscribe(resp => {
        console.log(resp)
        this.components.closeLoading();
        if(resp[0].status == "error"){
          this.components.presentToast("El correo o contraseña son incorrectos")
        }else{
          this.auth.saveToken(resp[0].token, resp[0].usuario);
          this.nav.navigateForward('home')
        }
      }, (err: any) => {
        this.components.closeLoading();
        this.components.presentToast("Ha ocurrido un error al iniciar sesión por favor intente de nuevo")
      })
    }
  }
}
