import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentsService } from 'src/app/services/components.service';
import { ProductService } from 'src/app/services/product.service';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {
  id: number;
  product: any = {};
  cant: number = 1;
  unit: string;
  cant_unit: number;
  price: number = 0.00;
  cost: number = 0.00;
  price2: number = 0.00;
  note: string = '';
  change_price: boolean = false;
  
  constructor(private productService: ProductService, private activateRoute: ActivatedRoute,
    private component: ComponentsService, private dataService:DataService, 
    private nav: NavController) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    this.getProductsId();
  }


  /* get product by id*/
  getProductsId() {
    this.productService.getInventoryId(this.id).subscribe(resp => {
      this.product = resp[0].product;
    })
  }


  /* select price and change colors*/
  selectPrice(item: any, price: number, unit2: string) {
    const item1 = document.getElementById('item1');
    const item2 = document.getElementById('item2');
    const item3 = document.getElementById('item3');
    this.price = price;
    this.unit = unit2;
    /* change colors*/
    if(item == 1){
      item1['color'] = "dark";
      item2['color'] = "none";
      item3['color'] = "none";
      this.price2 =  this.product.precio1;
      this.cost =  this.product.costo1;
      this.cant_unit = this.product.cantidad1;
      this.cant = 1;
    }else if(item == 2){
      item2['color'] = "dark";
      item1['color'] = "none";
      item3['color'] = "none";
      this.price2 =  this.product.precio2;
      this.cost =  this.product.costo2;
      this.cant_unit = this.product.cantidad2;
      this.cant = 1;
    }else if(item == 3){
      item3['color'] = "dark";
      item2['color'] = "none";
      item1['color'] = "none";
      this.price2 =  this.product.precio3;
      this.cost =  this.product.costo3;
      this.cant_unit = this.product.cantidad3;
      this.cant = 1;
    }
    else if(item == 4){
      item1['color'] = "dark";
      item2['color'] = "none";
      item3['color'] = "none";
      this.price2 =  this.product.precio_minimo1;
      this.cost =  this.product.costo1;
      this.cant_unit = this.product.cantidad1;
      this.cant = 1;
    }else if(item == 5){
      item2['color'] = "dark";
      item1['color'] = "none";
      item3['color'] = "none";
      this.price2 =  this.product.precio_minimo2;
      this.cost =  this.product.costo2;
      this.cant_unit = this.product.cantidad2;
      this.cant = 1;
    }else if(item == 6){
      item3['color'] = "dark";
      item2['color'] = "none";
      item1['color'] = "none";
      this.price2 =  this.product.precio_minimo3;
      this.cost =  this.product.costo3;
      this.cant_unit = this.product.cantidad3;
      this.cant = 1;
    }
  }

  /* increment items*/
  decrement() {
    if (this.price) {
      if (this.cant == 1) {
        this.cant = 1;
      } else {
        this.cant--;
        this.price = Number(this.price) - Number(this.price2); 
        console.log(this.price)
      }
    } else {
      this.component.presentToast('Debe seleccionar un precio')
    }
  }

   /* decrement items*/
  increment() {
    if (this.price) {
      this.cant++;
      this.price = Number(this.price) + Number(this.price2); 
      console.log(this.price)
    } else {
      this.component.presentToast('Debe seleccionar un precio')
    }
  }

  /* change prices*/
  changePrice(state: boolean){
    this.change_price = state;
  } 


  /* save product into storage*/
  saveProduct() {
    if (this.note == '') {
      this.note = 'NO TIENE';
    }

    const products = {
      id: this.product.id_producto,
      name: this.product.nombre_producto,
      price: Number(this.price),
      cost: Number(this.cost),
      cant: this.cant,
      unit: this.unit,
      cant_unit: this.cant_unit,
      note: this.note
    }

    if (this.price) {
      this.dataService.agregateProducts(products);
      this.component.presentToast('Producto facturado correctamente')
      this.nav.navigateForward('home');
    } else {
      this.component.presentToast('Debe seleccionar un precio')
    }
  }
}
