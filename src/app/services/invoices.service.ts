import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  url: string = environment.url;
  constructor(private http: HttpClient) { }

  getInvoices(id: number){
    return this.http.get(`${this.url}/invoices/get_invoices/${id}`)
  }

  getdetailInvoices(id: number){
    return this.http.get(`${this.url}/invoices/get_detail_invoice/${id}`)
  }

  getReports(id: number){
    return this.http.get(`${this.url}/invoices/get_reports/${id}`)
  }

  getReportsCharts(id: number){
    return this.http.get(`${this.url}/invoices/get_reports_user/${id}`)
  }
  
  getReportsDate(date1, date2, id){
    return this.http.get(`${this.url}/invoices/get_reports_date/${date1}/${date2}/${id}`)
  }

  /* save invoices*/
  saveInvoice(token: string, data: any){
    const headers = new HttpHeaders({
      'Authorization': token
    });
    
    
    return this.http.post(`${this.url}/invoices/save_invoice`, data, {headers: headers});
  }

  saveDetailInvoice(data: any){
    const detail = {
      id_producto: data.id,
      precio: data.price,
      costo: data.cost,
      unidad: data.unit,
      cantidad: data.cant,
      cant_unidad: data.cant_unit,
      itbs_grabado: 0,
      nota: data.note
    }

    return this.http.post(`${this.url}/invoices/save_invoice_detail`, detail);
  }

  /* delete invoice*/
  deleteInvoice(token: string, id: number){
    const headers = new HttpHeaders({
      'Authorization': token
    });
    
    
    return this.http.delete(`${this.url}/invoices/delete_invoice/${id}`, {headers: headers});
  }
}
