import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Event, Router} from "@angular/router";
import {ApiResult, ApiService} from "../../services/api.service";
import {InfiniteScrollCustomEvent, LoadingController} from "@ionic/angular";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  characters: ApiResult["results"] = [];
  currentPage = 1;
  perPage = 10;
  listData = [];
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private characterService: ApiService, private loadingCtrl: LoadingController, private dataService: DataService) {
    this.loadPage().then();
  }

  ngOnInit() {
    this.loadData().then();
    this.loadChars().then();
  }

  homePage(){
    this.route.navigate(['home']).then();
  }
  goFilms(){
    this.route.navigate(['movies']).then()
  }

  async loadPage(){
    const load = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'dots',
    });
    await load.present();
    await load.dismiss();

  }
  async loadData(){
    this.listData = await this.dataService.getData();
  }

  async loadChars(){
    const load = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'dots',
    });
    await load.present();
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.characterService.getChars(id).subscribe((res) => {
      load.dismiss();
      if(this.characters.length > 0){
        this.characters = [];
      }
      this.characters = [...this.characters, ...res.results];

      if (id != null){
        for (let i = 0; i < this.characters.length; i++) {
          this.characters[i].id = (i+1)+((parseInt(id) - 1)*10);
          if (this.characters[i].id > 16){
            this.characters[i].id++;
          }
        }
      }
    })

  }

  handleChange(event: any){
    const query = event.target.value.toLowerCase();
    this.characters = this.characters.filter(c => c.name.toLowerCase().indexOf(query) > -1);
    if (query == ""){
      this.loadChars().then();
    }
  }

  nextPage(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null){
      if (parseInt(id) == 9){
        this.route.navigate([`characters/page/${parseInt(id) - 8}`]).then();
      }
      else {
        this.route.navigate([`characters/page/${parseInt(id) + 1}`]).then();

      }
    }
  }

  prevPage(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null){
      if (parseInt(id) == 1){
        this.route.navigate([`characters/page/${parseInt(id) + 8}`]).then();
      }
      else {
        this.route.navigate([`characters/page/${parseInt(id) - 1}`]).then();

      }
    }
  }

  redirectToDetails(id: any){
    this.route.navigate([`characters/${id}`])
  }




}
