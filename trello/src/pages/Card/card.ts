/**
 * Created by georg on 21.11.2016.
 */
import { Component } from '@angular/core';

import {TrelloApi} from '../../shared/trello-api.service';
import {NavController} from "ionic-angular";
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
  providers: [
    TrelloApi
  ]
})

export class CardPage {

  boards: any;


  constructor(private nav: NavController, private trelloApi: TrelloApi){
  }

  boardSelected($event, item){
    console.log(item.name + " got clicked");
  }


  ionViewDidLoad(){
    this.trelloApi.getBoards().then(data=> this.boards = data);
    console.log('lifecycle didload');
  }


}
