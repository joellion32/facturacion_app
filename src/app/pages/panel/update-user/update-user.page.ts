import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  user: any = {};
  form: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder, private component: ComponentsService) { }

  ngOnInit() {
    this.viewUser()
    this.createForm()
    this.loadData()
  }

  viewUser() {
    this.auth.viewUser().then(resp => {
      this.user = resp['user'];
    })
  }


  /* create From*/
  createForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  /* load data this form*/
  loadData(){
    this.auth.viewUser().then(resp => {
      this.user = resp['user'];
      this.form.setValue({
        nombre: this.user.nombre,
        email: this.user.email
      });
    })

   
  }

  updateUser() {
    this.auth.readerToken().then(data => {
      const token = data['token']
      this.auth.updateUser(token, this.user.id, this.form.value).subscribe(resp => {
        this.component.presentAlert()
      }, (error: any) => {
        this.component.presentToast('Ha ocurrido un error')
      })
    })
  }


}
