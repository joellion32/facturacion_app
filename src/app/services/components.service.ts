import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(private toastController: ToastController, private loadingController: LoadingController, private alertController: AlertController, 
    private auth: AuthService) { }
  loading: any;

  
  // present message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  //loading
  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Cargando...',
    });
      return this.loading.present();
  }

  closeLoading(){
    return this.loading.dismiss();
  }

// present alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Para establecer los cambios debe cerrar sesion',
      buttons: [
        {
          text: 'Continuar',
          handler: (blah) => {
            this.auth.Logout()
          }
        }
      ]
    });

    await alert.present();
  }


}
