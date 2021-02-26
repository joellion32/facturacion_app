import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
@Input() sales: any[] = [];
  constructor(private modal: ModalController) { }

  ngOnInit() {
    console.log(this.sales)
  }

  closeModal(){
    this.modal.dismiss();
  }

}
