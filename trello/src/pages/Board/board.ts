import { Component } from '@angular/core';

import {TrelloApi} from '../../shared/trello-api.service';
import {NavController} from "ionic-angular";
import {ListPage} from "../List/list";
@Component({
  selector: 'page-board',
  templateUrl: 'board.html',
  providers: [
    TrelloApi
  ]
})

export class BoardPage {

  boards: any;

  constructor(private nav: NavController, private trelloApi: TrelloApi){}

  //////////////////////////Lifecycle Hooks/////////////////////////////////
  ionViewDidLoad(){
    this.trelloApi.getBoards().then(data=> this.boards = data);
  }

  boardSelected($event, item){
    this.nav.push(ListPage, item);
  }
}
