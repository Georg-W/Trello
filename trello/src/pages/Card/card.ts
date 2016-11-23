/**
 * Created by georg on 21.11.2016.
 */
import { Component } from '@angular/core';

import {TrelloApi} from '../../shared/trello-api.service';
import {NavController, NavParams} from "ionic-angular";
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
  providers: [
    TrelloApi
  ]
})

export class CardPage {

  cards: any;
  selectedListID: any;


  constructor(private nav: NavController, private navParams: NavParams, private trelloApi: TrelloApi){
  }

  boardSelected($event, item){
    console.log(item.name + " got clicked");
  }

  ionViewDidLoad(){
    this.selectedListID = this.navParams.data.id;
    this.trelloApi.getCards(this.selectedListID).then(data=> this.cards = data);
    console.log('lifecycle didload');
  }


}
