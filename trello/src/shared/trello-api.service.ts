
/**
 * Created by georg on 20.11.2016.
 */
declare let Trello: any;


export class TrelloApi {

  currentBoardID : any;
  currentListID : any;

  constructor() {

    Trello.authorize({
      type: "redirect",
      interactive: "true",
      name: "Trello",
      scope: {
        read: "true",
        write: "true" },
      expiration: "never",
      success: this.authenticationSuccess,
      error: this.authenticationFailure
    });
  }

/////////////////////////////////// Auth //////////////////////////////////////////////

  authenticationSuccess: any = function() {
    //This works
    console.log("Successful authentication");
  };
  authenticationFailure: any = function() {
    console.log("Failed authentication");
  };


  /////////////////////////////////// Boards //////////////////////////////////////////////

  getBoards (){
    return Trello.get('/member/me/boards',{ fields: "name, id"} ,this.successGetBoard, this.failureGetBoard);
  };

  successGetBoard: any = function(data) {
    console.log("gotBoards");
  };

  failureGetBoard: any = function() {
    console.log("fail get Boards");
  };

  /////////////////////////////////// Lists //////////////////////////////////////////////

  getLists(boardID){
    this.currentBoardID = boardID;
    return Trello.get('/boards/'+boardID+'/lists', this.successGetList, this.failureGetList);
  }

  putListName(newName, listID){
    Trello.put('/lists/'+listID,{name: newName});
  };
  deleteList(listID){
    Trello.put('/lists/'+listID,{closed: true});
  };
  createList(board, setName){
    Trello.post('/lists/',{name: setName, idBoard: board});
  };

  successGetList: any = function(data) {
    console.log("got lists");
  };

  failureGetList: any = function() {
    console.log("fail get lists");
  };


  /////////////////////////////////// Cards //////////////////////////////////////////////


  getCards(listID){
    this.currentListID = listID;
    console.log("cards loaded");
    return Trello.get("/lists/"+listID+"/cards");

  }






}
