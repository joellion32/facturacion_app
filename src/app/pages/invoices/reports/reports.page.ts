import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Chart from 'chart.js';
import { ReportsComponent } from 'src/app/components/reports/reports.component';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  id: number;
  total: any;
  reports = {
    date: '',
    total: 0.00,
    sales: 0.00
  }
  chartsReports: any[] = [];
  sales: any[] = [];
  date1: string;
  date2: string;

  constructor(private invoicesService: InvoicesService, private authService: 
    AuthService, private modalController: ModalController, private components: ComponentsService) { }

  ngOnInit() {
    this.generateChart();
    this.getReportData();
  }

/* view reports*/
    getReportData() {
        this.authService.viewUser().then(resp => {
            const user = resp['user'];
            this.invoicesService.getReports(user.id).subscribe(resp => {
                this.reports.date = resp[0].reports[0].fecha;
                this.reports.total =  resp[0].reports[0].total_ventas;
                this.reports.sales = resp[0].reports[0].ventas;
            });
        })
    }


/* view reports in graphs*/
    generateChart() {
        this.authService.viewUser().then(resp => {
            const user = resp['user'];

            this.invoicesService.getReportsCharts(user.id).subscribe(resp => {
                this.chartsReports = resp[0].reports;

                const ctx = document.getElementById('myChart');
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.chartsReports.map(m => m.mes),
                        datasets: [{
                            label: 'Ventas por mes',
                            data: this.chartsReports.map(m => m.total_ventas),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            });
        })
    }

    // search reports by dates
    searchReports(){
        const date1 = this.date1.slice(0,10)
        const date2 = this.date2.slice(0,10)
        this.authService.viewUser().then(resp => {
            const user = resp['user'];
            this.invoicesService.getReportsDate(date1, date2, user.id).subscribe(resp => {
                this.sales = resp[0].reports
                this.presentModal();
            })
        });
    }


    // present modal reports
    async presentModal() {
        const modal = await this.modalController.create({
            component: ReportsComponent,
            componentProps: {
                sales: this.sales
            }
        });
        return await modal.present();
    }

}
