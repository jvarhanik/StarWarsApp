import { Component, OnInit } from '@angular/core';
import { ApiResult, ApiService } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.page.html',
  styleUrls: ['./character-details.page.scss'],
})
export class CharacterDetailsPage implements OnInit {
  character: ApiResult["results"] = [];
  listData: ApiResult["results"] = [];

  constructor(private route: ActivatedRoute, private characterService: ApiService, private dataService: DataService) { }

  ngOnInit() {
    this.loadData().then();
    const id = this.route.snapshot.paramMap.get('id');
    this.characterService.getCharDetails(id).subscribe((res) => {

      this.character = [res];
      this.character[0].id = this.route.snapshot.paramMap.get('id');
      if (this.listData != null){
        for (let i = 0; i < this.listData.length; i++) {
          if(this.listData[i][0].id == this.character[0].id){
            return;
          }
        }
        this.dataService.addData(this.character).then();
        this.loadData().then();

      }
      this.dataService.addData(this.character).then();
      this.loadData().then();
    });
  }

  async loadData(){
    this.listData = await this.dataService.getData();
  }

}
