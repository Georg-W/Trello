/**
 * Created by georg on 20.11.2016.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
declare let Trello: any;


@Injectable()
export class TrelloApi {

  myData: any;
  myList: any = "57f67177b6d6dc24e2e36a41";

  newCard = {
    name: '****My New Test Card',
    desc: '****This is the description of our new card.',
    idList: this.myList,
    pos: 'top'
  };

  sendCard: any = function() {
    Trello.post('/cards/', this.newCard, this.creationSuccess.bind(this));
  };

  getBoards (){
    return Trello.get('/member/me/boards',{ fields: "name, id"} ,this.successGetBoard, this.failureGetBoard);
  };

  constructor() {

    Trello.authorize({
      type: "popup",
      interactive: "true",
      name: "My Application",
      scope: {
        read: "true",
        write: "true" },
      expiration: "never",
      success: this.authenticationSuccess,
      error: this.authenticationFailure
    });
  }


  authenticationSuccess: any = function() {
    //This works
    console.log("Successful authentication");
  };
  authenticationFailure: any = function() {
    console.log("Failed authentication");
  };

  successGetBoard: any = function(data) {
    let body = data;
    return body.data || {};
  };

  failureGetBoard: any = function() {
    return Observable.throw("fail getBoard");
  };

  creationSuccess: any = function(data) {
    //This works
    console.log('Trello callback successfull');
    this.myData = JSON.stringify(data.id);
    //This works and the data returned is available and correct - great.
    console.log('Card created successfully. Data returned:' + this.myData);
  };

}
