import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HttpProvider]
})
export class HomePage {

  // Declaração de Variáveis
  novosSismos: any;
  lati: any;
  long: any;
  loading: any;

  constructor(public navCtrl: NavController, private httpProvider: HttpProvider, public loadingCtrl: LoadingController) {

    this.loading = this.loadingCtrl.create({
      content: `
      <ion-spinner></ion-spinner> `
    });

    this.obterdados();

  }
  // Obtem dados do provider
  obterdados(){
    this.loading.present();
      this.httpProvider.obterDadosSismos().subscribe(
        resultados => {
          this.novosSismos = resultados.features;
        },
        err => {
          console.error("Erro: " + err);
        },
        () => {
          this.loading.dismiss();
          console.log("Informações obtidas com sucesso");
        }
      );
  }

  // Atualização de dado (Pull Refresh)
  doRefresh(refresher){
    this.httpProvider.obterDadosSismos().subscribe(
      resultados => {
        this.novosSismos = resultados.features;
      })

      setTimeout(() =>{
        this.httpProvider.obterDadosSismos().subscribe(
          resultados => {
            this.novosSismos = resultados.features;
            refresher.complete();
          })
      }, 2000);
  }
}
