import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, NavDelegate } from '@ionic/angular';
import { DisplayComponent } from 'src/app/components/display/display.component';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product2',
  templateUrl: './detail-product2.page.html',
  styleUrls: ['./detail-product2.page.scss'],
})
export class DetailProduct2Page implements OnInit {

  product: any = {};
  id: number;
  form: FormGroup;
  edit: boolean = true;

  constructor(private productService: ProductService, private activateRoute: ActivatedRoute, private alertController: AlertController,
    private nav: NavController, private auth: AuthService, private component: ComponentsService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    this.getProductId();
  }


  /* create Form*/
  getProductId() {
    this.productService.getInventoryId(this.id).subscribe(resp => {this.product = resp[0].product})
  }


  /*edit Form*/
  editForm(input2, input3, input4, input5, input6, input7, input8, input9, input10, input11) {
    const inputs = [input2, input3, input4, input5, input6, input7, input8, input9, input10, input11]

    this.auth.viewUser().then(resp => {
      const role = resp['user'].role
      if (role == 'ADMIN') {
        this.edit = false;

        for (let index = 0; index <= 9; index++) {
          inputs[index].disabled = false;
          inputs[index].style.color = "black";
        }
      } else {
        this.component.presentToast('No eres administrador')
      }
    })
  }

  /* update product*/
  updateProduct() {
    this.auth.readerToken().then(data => {
      const token = data['token']
      this.productService.UpdateProduct(this.product, token, this.product.id_producto).subscribe(resp => {
       this.component.presentToast('Producto actualizado correctamente')
      }, (error: any) => this.component.presentToast('Ha ocurrido un error'))
    })
  }

  /* delete product*/
  ConfirmDeleteProduct(){
    this.auth.viewUser().then(resp => {
      const role = resp['user'].role
      if (role == 'ADMIN') {
        this.auth.readerToken().then(data => {
          const token = data['token']
          this.presentAlertConfirm(token)
        })
      } else {
        this.component.presentToast('No eres administrador')
      }
    })
  }

  async DeleteProduct(token){
    const product = await this.productService.deleteProduct(token, this.product.id_producto)
    if(product){
      this.component.presentToast('Producto eliminado correctamente')
      this.nav.navigateForward('view-products')
    }else{
      this.component.presentToast('Ha ocurrido un error')
    }
  }


  /* show alert */
async presentAlertConfirm(token) {
  const alert = await this.alertController.create({
    header: 'Aviso',
    message: '¿Estas seguro de que quieres eliminar el producto?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Continuar',
        handler: () => {
          this.DeleteProduct(token);
        }
      }
    ]
  });

  await alert.present();
}

}
