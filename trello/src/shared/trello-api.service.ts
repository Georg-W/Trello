
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
  };

  failureGetBoard: any = function() {
  };

  /////////////////////////////////// Lists //////////////////////////////////////////////

  getLists(boardID){
    this.currentBoardID = boardID;
    return Trello.get('/boards/'+boardID+'/lists');
  }

  putListName(newName, listID){
    Trello.put('/lists/'+listID,{name: newName});
    return this.currentBoardID;
  };

  deleteList(listID){
    Trello.put('/lists/'+listID,{closed: true});
    return this.currentBoardID;
  };

  createList(board, setName){
    Trello.post('/lists/',{name: setName, idBoard: board});
    return this.currentBoardID;
  };

  /////////////////////////////////// Cards //////////////////////////////////////////////

  getCards(listID){
    this.currentListID = listID;
    return Trello.get("/lists/"+listID+"/cards");
  }

}
