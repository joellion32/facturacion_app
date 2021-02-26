import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() products: any[] = [];
  @Input() search_text: string = '';
  @Input() detail: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void { }



  navigate(id: number) {
    if (this.detail == true) {
      this.router.navigateByUrl(`detail-product/${id}`)
    } else {
      this.router.navigateByUrl(`detail-product2/${id}`)
    }
  }



}
