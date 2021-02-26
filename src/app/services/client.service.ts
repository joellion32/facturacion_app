import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Cliente } from '../interfaces/clients_interface';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string = environment.url;
  page: number = 1;
  
  constructor(private http: HttpClient) { }

  /* get clients */
  getClients(){
    return this.http.get<Cliente>(`${this.url}/clients/get_clients`);
  }

  /*get clients by id */
  getClientsId(id:number){
    return this.http.get(`${this.url}/clients/get_client/${id}`);
  }

  /* save client*/
  saveClient(token: string, data: any){
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.post(`${this.url}/clients/save_client`, data, {headers: headers})
  }

  /* save client into storage*/
  async saveClientStorage(client_id: string){
    localStorage.setItem('client_id', client_id);
  }

  /*update client*/
  updateClient(token: string, data: any, id: number){
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.put(`${this.url}/clients/update_client/${id}`, data, {headers: headers})
  }


  /* delete client*/
  deleteClient(token: string, id: number){
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.delete(`${this.url}/clients/delete_client/${id}`, {headers: headers})
  }
}
