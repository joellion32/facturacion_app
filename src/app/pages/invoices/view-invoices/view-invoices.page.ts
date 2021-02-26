import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UsersComponent } from 'src/app/components/users/users.component';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.page.html',
  styleUrls: ['./view-invoices.page.scss'],
})
export class ViewInvoicesPage implements OnInit {
  role: string;
  invoices: any[] = []
  constructor(private auth: AuthService, 
    private invoice: InvoicesService, private component: ComponentsService) { }

  ngOnInit() {
    this.loadData()
  }


  loadData(){
    this.auth.viewUser().then(resp => {
      const user = resp['user']
      this.role = user.role;

      // get invoices
      this.invoice.getInvoices(user.id).subscribe(resp => {
        this.invoices = resp[0].factura
      })
    })
  }
  

  deleteInvoice(id: number){
    this.auth.viewUser().then(resp => {
      const role = resp['user'].role
      if (role == 'ADMIN') {
        this.auth.readerToken().then(resp => {
          const token = resp['token'];
          this.component.presentLoading()
          this.invoice.deleteInvoice(token, id).subscribe(resp => {
            this.component.closeLoading()
            this.loadData()
            this.component.presentToast('factura eliminada correctamete')
          })
        })
      } else {
        this.component.presentToast('No eres administrador')
      }
    })
  }
}
