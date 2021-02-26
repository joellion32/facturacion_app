import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = environment.url;
  page: number = 0;
  products: any[] = []
  prices: any[] = []
  total: number = 0.00;

  constructor(private http: HttpClient) {
    this.getProductsStorage();
    this.updateTotal();
   }


  /* get all users */
  viewUsers(){
    return this.http.get(`${this.url}/user/view_users`);
  }



  /* agregate products into storage*/
  agregateProducts(data: any) {
    this.products.push(data);
    this.saveProductsStorage();
    this.updateTotal()
  }

  /* getProducts into storage*/
  async getProductsStorage() {
    const ret = await Storage.get({ key: 'invoices' });
    const invoices = JSON.parse(ret.value);
    this.products = invoices['products']
    return this.products;
  }



  /* save products into storage*/
  async saveProductsStorage() {
    await Storage.set({
      key: 'invoices',
      value: JSON.stringify({
        products: this.products
      })
    });
  }


  /* calculate total*/
  updateTotal(){
    this.total = 0;
    for(let item of this.products){
      this.total += Number(item.price)
    }
  }


  /* delete products into storage*/
  async deleteProductsStorage(idx: number) {
    this.products.splice(idx, 1)
    this.saveProductsStorage();
    this.updateTotal()
  }


  /* clear storage */
  async removeProductsStorage() {
    await Storage.remove({ key: 'invoices' });
    localStorage.removeItem('client_id')
    this.products = [];
    this.updateTotal()
  }


}
