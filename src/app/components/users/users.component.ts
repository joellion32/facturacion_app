import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  constructor(private dataService: DataService, public popoverController: PopoverController) { }

  ngOnInit() {
    this.LoadData()
  }

  LoadData(){
    this.dataService.viewUsers().subscribe(resp => {
      this.users = resp[0].usuarios;
    })
  }

  /* dissmis popover send value to the father component*/
  sendId(id: number){
    this.popoverController.dismiss({
      id_user: id
    })
  }
}
