import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { Producto } from 'src/app/interfaces/products_interface';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product3',
  templateUrl: './create-product3.page.html',
  styleUrls: ['./create-product3.page.scss'],
})
export class CreateProduct3Page implements OnInit {
  form: FormGroup;
  product: Producto;
  @ViewChild(ProductsComponent) products: ProductsComponent;

  constructor(private fb: FormBuilder, private nav: NavController, 
    private productService: ProductService, private auth: AuthService, private components: ComponentsService) { }

  ngOnInit() {
    this.product = JSON.parse(localStorage.getItem('product'));
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      costo1: ['0.00', Validators.required],
      costo2: ['0.00'],
      costo3: ['0.00'],
      precio_minimo1: ['0.00', Validators.required],
      precio_minimo2: ['0.00'],
      precio_minimo3: ['0.00'],
    });
  }

  /*save Product*/
  async saveProduct() {
    const product_final =
    {
      cod_producto: this.product.cod_producto,
      categoria: this.product.categoria,
      nombre_producto: this.product.nombre_producto,
      precio1: this.product.precio1,
      precio2: this.product.precio2,
      precio3: this.product.precio3,
      itbs: this.product.itbs,
      costo1: this.form.value.costo1,
      costo2: this.form.value.costo2,
      costo3: this.form.value.costo3,
      unidad1: this.product.unidad1,
      unidad2: this.product.unidad2,
      unidad3: this.product.unidad3,
      cantidad1: this.product.cantidad1,
      cantidad2: this.product.cantidad2,
      cantidad3: this.product.cantidad3,
      precio_minimo1: this.form.value.precio_minimo1,
      precio_minimo2: this.form.value.precio_minimo2,
      precio_minimo3:this.form.value.precio_minimo3
    }

/* validate form and send data to server*/
    if(this.form.invalid || this.form.value.costo1 == 0 || this.form.value.precio_minimo1 == 0.00){
      this.components.presentToast('Los campos estan vacios')
    }else{
        const token = await this.auth.readerToken()
        const created = await this.productService.saveProduct(product_final, token['token'])

        if(created){
          this.nav.navigateForward('view-products')
          this.components.presentToast('Producto creado correctamente')
          localStorage.removeItem('product')
        }else{
          this.components.presentToast('Ha ocurrido un error')
        }
    }
  }

}
