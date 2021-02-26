import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.page.html',
  styleUrls: ['./detail-client.page.scss'],
})
export class DetailClientPage implements OnInit {

  form: FormGroup;
  client: any = {}
  id: number;

  constructor(private clientService: ClientService, private fb: FormBuilder, private auth: AuthService,
    private component: ComponentsService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    this.createForm();
    this.loadData();

  }


  /* edit client*/
  editForm(input, input1, input2, input3, button) {
    this.auth.viewUser().then(resp => {
      const role = resp['user'].role
      if (role == 'ADMIN') {
        input.disabled = false;
        input.style.color = "black";
        input1.disabled = false;
        input1.style.color = "black";
        input2.disabled = false;
        input2.style.color = "black";
        input3.disabled = false;
        input3.style.color = "black";
        button.disabled = false;
      } else {
        this.component.presentToast('No eres administrador')
      }
    })
  }

  /* create From*/
  createForm() {
    this.form = this.fb.group({
      nombre_cliente: ['', Validators.required],
      rnc: ['', Validators.required],
      direccion: ['', Validators.required],
      sector: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  /* Load Data Form*/
  loadData() {
    this.clientService.getClientsId(this.id).subscribe(resp => {
      this.client = resp[0].cliente

      this.form.setValue({
        nombre_cliente: this.client.nombre_cliente,
        rnc: this.client.rnc,
        direccion: this.client.direccion,
        sector: this.client.sector,
        telefono: this.client.telefono
      })
    })
  }


  /* update client*/
  updateClient() {
    this.auth.readerToken().then(resp => {
      const token = resp['token'];
      this.clientService.updateClient(token, this.form.value, this.client.id_cliente).subscribe(resp => {
        this.component.presentToast('cliente actualizado correctamete')
      }, (error: any) => {
        this.component.presentToast('ha ocurrido un error')
      })
    })
  }

  /* delete client*/
  deleteClient() {
    this.auth.viewUser().then(resp => {
      const role = resp['user'].role
      if (role == 'ADMIN') {
        this.auth.readerToken().then(resp => {
          const token = resp['token'];
          this.clientService.deleteClient(token, this.client.id_cliente).subscribe(resp => {
            this.component.presentToast('cliente eliminado correctamete')
          })
        })
      } else {
        this.component.presentToast('No eres administrador')
      }
    })
  }

}
