import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiResult, ApiService } from "../../services/api.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: ApiResult["results"] = [];
  listData: ApiResult["results"] = [];

  constructor(private route: ActivatedRoute, private movieService: ApiService, private dataService: DataService) { }

  ngOnInit() {
    this.loadData().then();
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe((res) => {

      this.movie = [res];
      this.movie[0].id = this.route.snapshot.paramMap.get('id');
      if (this.listData != null){
        for (let i = 0; i < this.listData.length; i++) {
          if(this.listData[i][0].id == this.movie[0].id){
            return;
          }
        }
        this.dataService.addData(this.movie).then();
        this.loadData().then();

      }
      this.dataService.addData(this.movie).then();
      this.loadData().then();
    });
  }

  async loadData(){
    this.listData = await this.dataService.getData();
  }

}
