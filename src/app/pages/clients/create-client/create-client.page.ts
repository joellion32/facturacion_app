import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.page.html',
  styleUrls: ['./create-client.page.scss'],
})
export class CreateClientPage implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private components: ComponentsService, 
    private auth: AuthService, private clientsService: ClientService, private router: Router) { 
    this.createForm();
  }

  ngOnInit() {
    
  }


  createForm(){
    this.form = this.fb.group({
     nombre_cliente: ['', Validators.required],
     rnc: ['', Validators.required],
     direccion: [''],
     sector: [''],
     telefono: ['', Validators.required]
    });
  }


  saveClient(){
   if(this.form.invalid){
     this.components.presentToast('Los campos estan vacios')
   }else{
    this.auth.readerToken().then(resp => {
      const token = resp['token']
      this.clientsService.saveClient(token, this.form.value).subscribe(resp => {
        this.components.presentToast('Cliente guardado correctamente')
        this.router.navigateByUrl('/view-clients')
      }, (err) => this.components.presentToast('Ha ocurrido un error'))
    });
   }
  }
}
