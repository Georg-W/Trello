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
  refreshSub: any;
  gotChanged: boolean = false;

constructor(private nav: NavController, private navParams: NavParams, public alertCtrl: AlertController, private trelloApi: TrelloApi){}


///////////////////////////////////Lifecycle Events/////////////////////////////////////77

  ionViewDidLoad(){
    this.selectedBoard = this.navParams.data.id;
    this.callGetLists(this.selectedBoard);
  }

  ionViewWillLeave() {
    this.refreshSub.unsubscribe();
  }

  ionViewDidEnter(){
    this.reloadData();
  }

  listSelected($event, item){
    this.nav.push(CardPage, item);
  }

  reloadData(){
    let timer = Observable.timer(3000,2000);
    this.refreshSub = timer.subscribe(x => this.callGetLists(this.selectedBoard));
  }

  callGetLists(boardID){
    this.trelloApi.getLists(this.selectedBoard).then(data=> this.lists = data);
    this.gotChanged = false;
  }

  listUpdateSelected($event, item){
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
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.trelloApi.putListName(data.name, this.editItem.id);
            this.gotChanged = true;
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
          }
        },
        {
          text: 'Delete',
          handler: data => {
            this.trelloApi.deleteList(this.editItem.id);
            this.gotChanged = true;
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
          placeholder: "list name"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Create',
          handler: data => {
            this.trelloApi.createList(this.selectedBoard, data.name);
            this.gotChanged = true;
          }
        }
      ]
    });
    prompt.present();
  }

}
