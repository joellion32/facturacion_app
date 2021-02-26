import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.page.html',
  styleUrls: ['./detail-invoice.page.scss'],
})
export class DetailInvoicePage implements OnInit {
  id: number;
  invoice: any = {}
  products: any[] = []
  constructor(private activateRoute: ActivatedRoute, private invoicesService: 
    InvoicesService, private component: ComponentsService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    this.invoicesService.getdetailInvoices(this.id).subscribe(resp => {
      this.invoice = resp[0].factura;
      this.products = resp[0].productos;
    });
  }
}
