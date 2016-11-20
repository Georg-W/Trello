import { Component } from '@angular/core';

declare var Trello: any;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  fileEntry: any;
  myData: any;
  myList: any = "57f67177b6d6dc24e2e36a41";


  newCard = {
    name: '****My New Test Card',
    desc: '****This is the description of our new card.',
    idList: this.myList,
    pos: 'top'
  };

  readTrello: any = function() {
    //Trello.post('/cards/', this.newCard, this.creationSuccess.bind(this));
  };

  getBoards: any = function() {
    Trello.get('/member/me/boards',{ fields: "id, name"} ,this.successGetBoard, this.failureGetBoard);
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

    this.readTrello();
    this.getBoards();


  }


  authenticationSuccess: any = function() {
    //This works
    console.log("Successful authentication");
  };
  authenticationFailure: any = function() {
    console.log("Failed authentication");
  };

  successGetBoard: any = function(data) {
    for (let i of data) {
      console.log(i.id + " " + i.name);
    }

  };

  failureGetBoard: any = function() {
    console.log("Fail");
  };

  creationSuccess: any = function(data) {
    //This works
    console.log('Trello callback successfull');
    this.myData = JSON.stringify(data.id);
    //This works and the data returned is available and correct - great.
    console.log('Card created successfully. Data returned:' + this.myData);
  };

}
