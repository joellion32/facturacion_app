import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  data = {
    email: '',
    password1: '',
    password2: ''
  }
  constructor(private component: ComponentsService, private auth: AuthService) { }

  ngOnInit() {
  }

  updatePassword() {
    if (this.data.email) {
      if (this.data.password1 == this.data.password2) {
        this.auth.resetPassword(this.data).subscribe(resp => {
          this.component.presentToast('contraseña actualizada correctamente')
        }, (error: any) => {
          this.component.presentToast('El correo electrónico es incorrecto')
        })
      } else {
        this.component.presentToast('Las contraseñas no son idénticas')
      }
    } else {
      this.component.presentToast('El campo email esta vacio')
    }
  }

}
