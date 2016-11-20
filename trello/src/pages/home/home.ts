import { Component } from '@angular/core';

import { TrelloApi } from '../../shared/trello-api.service';
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

  constructor(private trelloApi: TrelloApi){
    //this.getBoards();
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
