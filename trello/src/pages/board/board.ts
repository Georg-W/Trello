/**
 * Created by georg on 20.11.2016.
 */
import { Component } from '@angular/core';
import {TrelloApi} from "../../shared/trello-api.service";
import {NavController, NavParams} from "ionic-angular";


@Component({
  selector: 'page-board',
  templateUrl: 'board.html',
  providers: [
    TrelloApi
  ]
})

export class BoardPage{

  //lists: any;
  //private errorMessage = "fail";

constructor(nav: NavController){}

  ionViewDidLoad(){
  //  this.trelloApi.getLists().then(data=> this.lists = data);
    console.log('lifecycle didload');
  }

  /*getLists(){
    this.trelloApi.getLists().subscribe(
      lists => this.lists = lists,
      error => this.errorMessage = <any>error);
  }*/

}
