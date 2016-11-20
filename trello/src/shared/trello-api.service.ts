/**
 * Created by georg on 20.11.2016.
 */
import { Observable } from 'rxjs/Observable'
declare let Trello: any;


export class TrelloApi {

  listname: String = "Test";
  activeBoard: any;

  getBoards (){
    return Trello.get('/member/me/boards',{ fields: "name, id"} ,this.successGetBoard, this.failureGetBoard);
  };

  getLists(boardID){
    return Trello.get('/boards/'+boardID+'/lists', this.successGetList, this.failureGetList);
  }

  putListName(newName, listID){
    Trello.put('/lists/'+listID,{name: newName});
  };
  deleteList(listID){
    Trello.put('/lists/'+listID,{closed: true});
  };
  createList(board, name){
    Trello.post('/lists/',board,name,this.creationSuccess);
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
    console.log("gotBoards");
  };

  failureGetBoard: any = function() {
    return Observable.throw("fail getBoard");
  };

  successGetList: any = function(data) {
    console.log("got lists");
  };

  failureGetList: any = function() {
    return Observable.throw("fail getList");
  };

  creationSuccess: any = function(data) {
    //This works
    console.log('Trello callback successfull');
    this.myData = JSON.stringify(data.id);
    //This works and the data returned is available and correct - great.
    console.log('Card created successfully. Data returned:' + this.myData);
  };

}
