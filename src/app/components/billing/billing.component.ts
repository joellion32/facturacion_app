import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Plugins } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { ComponentsService } from 'src/app/services/components.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  products: any[] = []
  constructor(private modal: ModalController, private dataService: DataService, private auth: AuthService,
    private invoice: InvoicesService, private component: ComponentsService) { }


  ngOnInit() {
    this.loadProducts()
  }


  /* modal dissmiss*/
  modalDismiss() {
    this.modal.dismiss();
  }

  /* load products*/
  loadProducts() {
    this.dataService.getProductsStorage().then(resp => { this.products = resp });
  }

  /* delete product list*/
  deleteProduct(idx: number) {
    this.dataService.deleteProductsStorage(idx)
    this.loadProducts();
  }

  /* save invoice | guardar factura*/
  async save_invoice() {
    this.auth.readerToken().then(async data => {
      const token = data['token']

      // client data
      const client = JSON.parse(localStorage.getItem('client_id'));

      // user data
      const ret_user = await Storage.get({ key: 'user_data' });
      const user = JSON.parse(ret_user.value);

      if (client) {
        const invoice = {
          id_cliente: client,
          id_usuario: user.user.id,
          rnc: '',
          total: this.dataService.total
        }

        if (this.products.length != 0) {
          this.invoice.saveInvoice(token, invoice).subscribe(resp => {
            this.save_detail_invoice()
            this.component.presentToast('Factura guardada correctamente');
            this.products = []
            this.dataService.removeProductsStorage();
            this.modalDismiss();
          })
        } else {
          this.component.presentToast('No hay productos')
        }
      } else {
        this.component.presentToast('Id de cliente no encontrado, por favor agregue el cliente de nuevo')
      }
    })
  }

  save_detail_invoice() {
    this.products.forEach(element => {
      this.invoice.saveDetailInvoice(element).subscribe(resp => console.log(resp));
    });
  }


  /* delete all products*/
  deleteAll(){
    this.dataService.removeProductsStorage();
    this.products = []
  }
}
