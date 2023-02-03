import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { ApiResult } from "../../services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-last-viewed',
  templateUrl: './last-viewed.page.html',
  styleUrls: ['./last-viewed.page.scss'],
})
export class LastViewedPage implements OnInit {
  allData: ApiResult["results"] = [];
  movieData: ApiResult["results"] = [];
  charsData: ApiResult["results"] = [];

  constructor(private dataService: DataService, private route: Router) {
    this.loadData();
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(){
    this.allData = await this.dataService.getData();
  }

  homePage(){
    this.route.navigate(['home'])
  }

  goFilms(){
    this.route.navigate(['movies'])
  }

}
