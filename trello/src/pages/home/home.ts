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

  constructor(private trelloApi: TrelloApi){
    trelloApi.getBoards();
  }


}
