import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage-angular";

const STORAGE_KEY = 'list';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage) {
    this.init();
  }

  init(){
    this.storage.create().then();
  }

  getData(){
    return this.storage.get(STORAGE_KEY).then() || [];
  }

  async addData(item: any){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async removeItem(index: any){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, storedData);
  }
}
