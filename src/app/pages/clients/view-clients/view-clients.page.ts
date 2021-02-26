import { Component, OnChanges, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/clients_interface';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.page.html',
  styleUrls: ['./view-clients.page.scss'],
})
export class ViewClientsPage implements OnInit, OnChanges {
  clients: Cliente[] = [];
  search_text: string = '';
  constructor(private clientService: ClientService, private modalController: ModalController) { }

  ngOnInit() {
    this.getclients();
  }


  ngOnChanges(){
    this.getclients();
  }

  /* refresh page*/
  doRefresh(event) {
    setTimeout(() => {
      this.getclients();
      event.target.complete();
    }, 2000);
  }

  /* search clients*/
  onSearchChange(event) {
    this.search_text = event.detail.value;
  }

  /* get all clients*/
  getclients() {
    this.clientService.getClients().subscribe(resp => {
      this.clients = resp[0].clientes;
    })
  }

}
