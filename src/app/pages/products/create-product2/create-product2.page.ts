import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ComponentsService } from 'src/app/services/components.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product2',
  templateUrl: './create-product2.page.html',
  styleUrls: ['./create-product2.page.scss'],
})
export class CreateProduct2Page implements OnInit {

  form: FormGroup;
  product: any;

  constructor(private fb: FormBuilder, private nav: NavController, private components: ComponentsService, private productService: ProductService) { }

  ngOnInit() {
    this.product = JSON.parse(localStorage.getItem('product'));
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
     cantidad1: ['0', Validators.required],
     cantidad2: ['0', ],
     cantidad3: ['0', ],
     precio1: ['0.00', Validators.required],
     precio2: ['0.00'],
     precio3: ['0.00'],
     itbs: ['0.00', Validators.required],
    });
  }

  navigate(){
    if(this.form.invalid || this.form.value.cantidad1 == 0 || this.form.value.precio1 == 0.00){
      this.components.presentToast('Los campos estan vacios')
    }else{
      this.productService.saveProductStorage(this.product.cod_producto, this.product.categoria, this.product.nombre_producto, 
        this.product.unidad1, this.product.unidad2, this.product.unidad3, this.form.value.cantidad1, this.form.value.cantidad2, 
        this.form.value.cantidad3, this.form.value.precio1, this.form.value.precio2, this.form.value.precio3, this.form.value.itbs);

        /* NAVIGATE TO PAGE 3*/
      this.nav.navigateForward('create-product3')
    }
  }


}
