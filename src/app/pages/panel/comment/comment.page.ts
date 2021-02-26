import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
user: any = {}

data = {
  phone: '',
  comment: ''
}
  constructor(private component: ComponentsService, private auth: AuthService) { }

  ngOnInit() {
    this.viewUser()
  }

  viewUser(){
    this.auth.viewUser().then(resp => {
      this.user = resp['user']
    })
  }


  sendComment() {
    const mail = {
      name: this.user.nombre,
      phone: this.data.phone,
      email: this.user.email,
      comment: this.data.comment
    }

    if (this.data.phone != '' || this.data.comment != '') {
      this.auth.sendMail(mail).subscribe(resp => {
       this.component.presentToast('Mensaje enviado correctamente')
      }, (error: any) => {
        this.component.presentToast('Ha ocurrido un error por favor intente mas tarde')
      })
    } else {
      this.component.presentToast('Los campos son necesarios')
    }
  }

}
