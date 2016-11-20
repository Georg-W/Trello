import { Component } from '@angular/core';

import { TrelloApi } from '../../shared/trello-api.service';
import {NavController} from "ionic-angular";
import {BoardPage} from "../board/board";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    TrelloApi
  ]
})

export class HomePage {

  private errorMessage = "fail";
  boards: any;

  constructor(private nav: NavController, private trelloApi: TrelloApi){
  }

  boardSelected($event, item){
    console.log(item.name + " got clicked");
    this.nav.push(BoardPage);
  }

  getBoards(){
    this.trelloApi.getBoards().subscribe(
      boards => this.boards = boards,
    error => this.errorMessage = <any>error);
  }



  ionViewDidLoad(){
    this.trelloApi.getBoards().then(data=> this.boards = data);
    console.log('lifecycle didload');
  }








}
