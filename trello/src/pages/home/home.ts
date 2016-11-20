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

  boards: any;

  constructor(private nav: NavController, private trelloApi: TrelloApi){
  }

  boardSelected($event, item){
    console.log(item.name + " got clicked");
    this.nav.push(BoardPage, item);
  }


  ionViewDidLoad(){
    this.trelloApi.getBoards().then(data=> this.boards = data);
    console.log('lifecycle didload');
  }








}
