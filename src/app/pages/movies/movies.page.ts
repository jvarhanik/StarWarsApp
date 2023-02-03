import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiResult, ApiService } from "../../services/api.service";
import { InfiniteScrollCustomEvent,  LoadingController } from "@ionic/angular";
import { DataService } from "../../services/data.service";
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: ApiResult["results"] = [];
  currentPage = 1;
  listData = [];

  constructor(private route: Router, private movieService: ApiService, private loadingCtrl: LoadingController, private dataService: DataService) {
    this.loadPage().then();
  }

  ngOnInit() {
    this.loadMovies().then();
    this.loadData().then();
  }

  homePage(){
    this.route.navigate(['home']).then();
  }

  async loadMovies(et?: InfiniteScrollCustomEvent){
    const load = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'dots',
    });
    await load.present();

    this.movieService.getMovies(this.currentPage).subscribe((res) => {
      load.dismiss();
      if(this.movies.length > 0){
        this.movies = [];
      }
      this.movies = res.results;

      for (let i = 0; i < this.movies.length; i++) {
        this.movies[i].id = i+1;
      }

      et?.target.complete();
    })
  }

  loadMore(et: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies().then();
  }

  handleChange(event: any){
    const query = event.target.value.toLowerCase();
    this.movies = this.movies.filter(c => c.title.toLowerCase().indexOf(query) > -1);
    if (query == ""){
      this.loadMovies().then();
    }
  }

  async loadData(){
    this.listData = await this.dataService.getData();
  }

  async loadPage(){
    const load = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'dots',
    });
    await load.present();
    await load.dismiss();

  }

  goPeople(){
    this.route.navigate(['characters/page/1']).then()
  }


}
