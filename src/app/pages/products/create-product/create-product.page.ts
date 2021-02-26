import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/products_interface';
import { ComponentsService } from 'src/app/services/components.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {
  form: FormGroup;
  
  constructor(private fb: FormBuilder, private nav: NavController, private components: ComponentsService, private productService: ProductService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
     cod_producto: ['', Validators.required],
     categoria: [''],
     nombre_producto: ['', Validators.required],
     unidad1: ['', Validators.required],
     unidad2: [''],
     unidad3: [''],
    });
  }


  navigate(){
    if(this.form.invalid){
      this.components.presentToast('Los campos estan vacios')
    }else{
      this.productService.saveProductStorage(this.form.value.cod_producto, this.form.value.categoria, this.form.value.nombre_producto, this.form.value.unidad1, this.form.value.unidad2, this.form.value.unidad3)
      /* NAVIGATE TO PAGE 2*/
      this.nav.navigateForward('create-product2')
    }
  }


}
