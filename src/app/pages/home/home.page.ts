import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from "../services/data.service";
import {ApiResult} from "../services/movie.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  listData: ApiResult["results"] = [];

  constructor(private route: Router, private dataService: DataService, private loadingCtrl: LoadingController) {
    this.loadData().then();

  }


  homePage(){
    this.route.navigate(['home']).then()
  }
  goFilms(){
    this.route.navigate(['movies']).then()
  }

  goPeople(){
    this.route.navigate(['characters']).then()
  }

  async loadData(){
    this.listData = await this.dataService.getData();
    console.log(this.listData);
  }

  async loadPage(){
    const load = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'dots',
    });
    await load.present();
    await load.dismiss();
  }




}
