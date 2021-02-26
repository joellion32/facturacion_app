import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/products_interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.page.html',
  styleUrls: ['./view-products.page.scss'],
})
export class ViewProductsPage implements OnInit {
  products: Product[] = [];
  search_text: string = '';
  enabled: boolean = true;

  constructor(private producService: ProductService) { }

  ngOnInit() {
    this.loadData()
    this.producService.newProduct.subscribe(product => {
      this.products.unshift(product)
    })

    this.producService.delete_Product.subscribe(products => {
      this.products = []
      this.loadData()
    })
  }
  /* search items*/
  onSearchChange(event) {
    this.search_text = event.detail.value;
    this.producService.searchProducts(this.search_text).subscribe(resp => {
      if (this.search_text.length == 0) {
        this.loadData();
      } else {
        this.products = []
        this.products = resp[0].products
      }
    })
  }

 /* refresh page to Load Data*/
 doRefresh(event){
  this.loadData(event, true)
}


/* loadData infinite scroll*/
loadData(event?, pull: boolean = false) {

  if(pull){
    this.products = []
    this.enabled = true;
  }

  this.producService.getInventory(pull).subscribe(resp => {
    this.products.push(...resp[0].product.data);
    if(event){
      event.target.complete()
      if(resp[0].product.data.length === 0){
        event.target.disabled = true;
        this.enabled = false;
      }
    }
  })
}

  /* back to page and reset number page*/
  back(){
    this.producService.page2 = 0;
  }
}
