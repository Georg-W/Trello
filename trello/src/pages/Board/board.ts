import { Component } from '@angular/core';

import { TrelloApi } from '../../shared/trello-api.service';
import {NavController} from "ionic-angular";
import {ListPage} from "../List/list";
@Component({
  selector: 'page-home',
  templateUrl: 'board.html',
  providers: [
    TrelloApi
  ]
})

export class BoardPage {

  boards: any;

  constructor(private nav: NavController, private trelloApi: TrelloApi){
  }

  boardSelected($event, item){
    console.log(item.name + " got clicked");
    this.nav.push(ListPage, item);
  }


  ionViewDidLoad(){
    this.trelloApi.getBoards().then(data=> this.boards = data);
    console.log('lifecycle didload');
  }


}
