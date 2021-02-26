import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/clients_interface';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search_text: string = '';
  clients: Cliente[] = [];

  constructor(private modalController: ModalController, 
    private clientService: ClientService, private nav: NavController) { }

  ngOnInit() {
    this.getclients()
  }

  onSearchChange(event){
    this.search_text = event.detail.value;
  }

  dismissModal(id?: number){
    this.modalController.dismiss({id: id});
  }



  /* get all clients*/
  getclients() {
      this.clientService.getClients().subscribe(resp => {
      this.clients = resp[0].clientes;
    })
  }

  /* client client id dismmis modal*/
   getclientsID(id: number){
    this.dismissModal(id);
  }

  /* navigate to create-client*/
  navigate(){
    this.dismissModal();
    this.nav.navigateForward('create-client')
  }
}
