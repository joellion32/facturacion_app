import { Component, OnInit} from '@angular/core';
import { IonRouterOutlet, MenuController, ModalController, Platform } from '@ionic/angular';
import { Factura } from 'src/app/interfaces/invoice_interface';
import { SearchComponent } from 'src/app/components/search/search.component';
import { ProductService } from 'src/app/services/product.service';
import { ClientService } from 'src/app/services/client.service';
import { Product } from 'src/app/interfaces/products_interface';
import { BillingComponent } from 'src/app/components/billing/billing.component';
import { DataService } from 'src/app/services/data.service';
import { Plugins } from '@capacitor/core';
import { ComponentsService } from 'src/app/services/components.service';
const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  search_text: string = '';
  token: any = '';
  invoice: Factura;
  valueSegment: string;
  productsHome: Product[] = [];
  enabled: boolean = true;
  total: number = 0.00;


  client = {
    nombre: '',
    rnc: '',
    telefono: '',
    direccion: '',
    sector: ''
  }


  constructor(private menu: MenuController, private clietService: ClientService,
    public modalController: ModalController, private producService: ProductService, 
    public dataService: DataService, private platform: Platform,
    private routerOutlet: IonRouterOutlet, public components: ComponentsService) {
      // exit app
      this.platform.backButton.subscribeWithPriority(-1, () => {
        if (!this.routerOutlet.canGoBack()) {
          this.dataService.removeProductsStorage()
          App.exitApp();
        }
      });
     }

 

  ngOnInit() {
    this.valueSegment = "client";
    this.menu.swipeGesture(true);
    this.producService.newProduct.subscribe(product => {
      this.productsHome.unshift(product)
    })

    this.producService.delete_Product.subscribe(products => {
      this.productsHome = []
      this.loadData()
    })
  }

 
  /* change to billyPage*/
  async billyPage() {
    const modal = await this.modalController.create({
      component: BillingComponent,
    });
    return await modal.present();
  }

  menuToggle() {
    this.menu.toggle();
  }

  segmentChanged(ev: any) {
    this.valueSegment = ev.detail.value;
    if (this.valueSegment == 'inventory') {
      this.loadData();
    }
  }

  /*activate searchbar*/
  activateSearch() {
    let search = document.getElementById("search");
    let column1 = document.getElementById('column1');
    let column2 = document.getElementById('column2');
    let row_search = document.getElementById('row-search');
    let button = document.getElementById('button');
    
    button.style.display = "block";
    search.style.display = "block";
    row_search.style.display = "block";
    column1.style.display = "none";
    column2.style.display = "none";
  }

  /*cancel search*/
  cancelSearch() {
    let search = document.getElementById("search");
    let column1 = document.getElementById('column1');
    let column2 = document.getElementById('column2');
    let row_search = document.getElementById('row-search');
    let button = document.getElementById('button');

    row_search.style.display = "block";
    search.style.display = "none";
    button.style.display = "none";
    column1.style.display = "block";
    column2.style.display = "block";
  }


  /* search items*/
  search() {
    this.productsHome = []
    this.producService.searchProducts(this.search_text).subscribe(resp => {
      this.productsHome = resp[0].products
    })
  }

  /* refresh page to Load Data*/
  doRefresh(event) {
    this.loadData(event, true)
  }


  /* loadData infinite scroll*/
  loadData(event?, pull: boolean = false) {

    if (pull) {
      this.productsHome = []
      this.enabled = true;
    }

    this.producService.getInventoryHome(pull).subscribe(resp => {
      this.productsHome.push(...resp[0].product.data);
      if (event) {
        event.target.complete()

        if (resp[0].product.data.length === 0) {
          event.target.disabled = true;
          this.enabled = false;
        }
      }
    })
  }

  /* show modal by search client*/
  async searchClient() {
    const modal = await this.modalController.create({
      component: SearchComponent,
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.getClientId(data.id)
    this.clietService.saveClientStorage(data.id)
  }

  /* get client by id*/
  getClientId(id: number) {
    this.clietService.getClientsId(id).subscribe(resp => {
      this.client.nombre = resp[0].cliente.nombre_cliente;
      this.client.rnc = resp[0].cliente.rnc;
      this.client.telefono = resp[0].cliente.telefono;
      this.client.direccion = resp[0].cliente.direccion;
      this.client.sector = resp[0].cliente.sector;
    });

  }


}
