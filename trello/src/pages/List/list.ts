/**
 * Created by georg on 20.11.2016.
 */
import {Component} from '@angular/core';
import {TrelloApi} from "../../shared/trello-api.service";
import {NavController, NavParams, AlertController} from "ionic-angular";
import {CardPage} from "../Card/card";
import { Observable } from "rxjs/Rx";


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [
    TrelloApi
  ]
})

export class ListPage{

  lists: Observable<any>;
  editMode: boolean = false;
  editItem: any;
  selectedBoard: any;

  gotChanged: boolean = false;

constructor(private nav: NavController, private navParams: NavParams, public alertCtrl: AlertController, private trelloApi: TrelloApi){}


  reloadData(){
    let timer = Observable.timer(3000,5000);
    timer.subscribe(x => this.callGetLists(this.selectedBoard));
    console.log("data got refreshed");
  }


  ionViewDidLoad(){
    this.selectedBoard = this.navParams.data.id;
    console.log("current board: "+this.selectedBoard);
    console.log('lifecycle did actually load');
    this.callGetLists(this.selectedBoard);
    this.reloadData();
  }

  callGetLists(boardID){
    console.log("got lists");
    this.trelloApi.getLists(this.selectedBoard).then(data=> this.lists = data);
    this.gotChanged = false;
  }

  listSelected($event, item){
    console.log(item.name + " got clicked");
    this.nav.push(CardPage, item);
  }


  listUpdateSelected($event, item){
    console.log(item.id + " got clicked");
    this.editMode = true;
    this.editItem = item;
    this.showUpdatePrompt();
  }

  listDeleteSelected($event, item){
    this.editMode = true;
    this.editItem = item;
    this.showDeletePrompt();
  }

  createList(){
    this.showCreatePrompt();
  }

  showUpdatePrompt() {
    let prompt = this.alertCtrl.create({
      title: 'New Listname',
      message: "Please enter a new name",
      inputs: [
        {
          name: 'name',
          placeholder: this.editItem.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.trelloApi.putListName(data.name, this.editItem.id);
            this.gotChanged = true;
            console.log('Saved new Name');
          }
        }
      ]
    });
    prompt.present();
  }

  showDeletePrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Delete List',
      message: "Do you really want to delete the list?",

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data => {
            this.trelloApi.deleteList(this.editItem.id);
            this.gotChanged = true;
            console.log('Deleted List');
          }
        }
      ]
    });
    prompt.present();
  }

  showCreatePrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Create List',
      inputs: [
        {
          name: 'name',
          placeholder: "default"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            this.trelloApi.createList(this.selectedBoard, data.name);
            this.gotChanged = true;
            console.log('created List in: '+this.selectedBoard);
          }
        }
      ]
    });
    prompt.present();
  }


}
