/**
 * Created by georg on 20.11.2016.
 */
import { Component } from '@angular/core';
import {TrelloApi} from "../../shared/trello-api.service";
import {NavController, NavParams} from "ionic-angular";


@Component({
  selector: 'page-board',
  templateUrl: 'list.html',
  providers: [
    TrelloApi
  ]
})

export class ListPage{

  lists: any;

constructor(private nav: NavController, private navParams: NavParams, private trelloApi: TrelloApi){}

  ionViewDidLoad(){
  let selectedBoard = this.navParams.data.id;
  console.log(selectedBoard);
    this.trelloApi.getLists(selectedBoard).then(data=> this.lists = data);
    console.log('lifecycle didload');
  }


}
