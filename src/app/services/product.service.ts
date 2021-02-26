import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { emit } from 'process';
import { environment } from 'src/environments/environment.prod';
import { Product, Producto } from '../interfaces/products_interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = environment.url;
  page: number = 0;
  page2: number = 0;
  newProduct = new EventEmitter<Producto>();
  delete_Product = new EventEmitter<any>();


  constructor(private http: HttpClient) { }
  /* search products*/
  searchProducts(param){
    return this.http.get(`https://avanisoft.com/inventory/search_products/${param}`);
  }


  /*get all products*/
  getInventory(pull: boolean = false){
    if(pull){
      this.page2 = 0;
    }

    this.page2++;

    return this.http.get<Product>(`${this.url}/inventory/get_products?page=${this.page2}`)
  }

  /* create array object*/
  getInventoryHome(pull: boolean = false){
    if(pull){
      this.page = 0;
    }

    this.page++;
    return this.http.get<Product>(`${this.url}/inventory/get_products?page=${this.page}`)
  }

  /* get products by id*/
  getInventoryId(id: number){
    return this.http.get<Producto>(`${this.url}/inventory/get_product/${id}`);
  }

  /* save product*/
  saveProduct(data: Producto, token: string){
    const headers = new HttpHeaders({
      'Authorization': token
    });
    
    return new Promise(resolve => {
      this.http.post(`${this.url}/inventory/save_product`, data, {headers: headers}).subscribe(resp => {
        this.newProduct.emit(resp[0].product)
        resolve(true)
      })
    })
  }

  /* update product*/
  UpdateProduct(data: Producto, token: string, id: number){
    const headers = new HttpHeaders({
      'Authorization': token
    });
    
    return this.http.put(`${this.url}/inventory/update_product/${id}`, data, {headers: headers})
  }


  /* delete product*/
  deleteProduct(token: string, id: number){
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return new Promise(resolve => {
      this.http.delete(`${this.url}/inventory/delete_product/${id}`, {headers: headers}).subscribe(resp => {
        this.getInventory(true).subscribe(resp => {
          this.delete_Product.emit(resp[0].product.data)
          resolve(true)
        })
      })
    })
    
  }
  
  /* save product into localstorage*/
  saveProductStorage(
    cod_producto?: string,
    categoria?: string,
    nombre_producto?: string,
    unidad1?: string,
    unidad2?: string,
    unidad3?: string,
    cantidad1?: number,
    cantidad2?: number,
    cantidad3?: number,
    precio1?: number,
    precio2?: number,
    precio3?: number,
    itbs?: number,
    costo1?: number,
    costo2?: number,
    costo3?: number,
    precio_minimo1?: number,
    precio_minimo2?: number,
    precio_minimo3?: number,
  ){
    
    localStorage.setItem('product', JSON.stringify({
      cod_producto,
      categoria,
      nombre_producto,
      precio1,
      precio2,
      precio3,
      itbs,
      costo1,
      costo2,
      costo3,
      unidad1,
      unidad2,
      unidad3,
      cantidad1,
      cantidad2,
      cantidad3,
      precio_minimo1,
      precio_minimo2,
      precio_minimo3,
    }))
  }
}


