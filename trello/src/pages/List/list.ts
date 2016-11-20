/**
 * Created by georg on 20.11.2016.
 */
import { Component } from '@angular/core';
import {TrelloApi} from "../../shared/trello-api.service";
import {NavController, NavParams, AlertController} from "ionic-angular";


@Component({
  selector: 'page-board',
  templateUrl: 'list.html',
  providers: [
    TrelloApi
  ]
})

export class ListPage{

  lists: any;
  editMode: boolean = false;
  editItem: any;
  selectedBoard: any;

constructor(private nav: NavController, private navParams: NavParams, public alertCtrl: AlertController, private trelloApi: TrelloApi){}

  ionViewDidLoad(){
  this.selectedBoard = this.navParams.data.id;
  console.log(this.selectedBoard);
    this.trelloApi.getLists(this.selectedBoard).then(data=> this.lists = data);
    console.log('lifecycle didload');
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
            console.log('Saved clicked');
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
            console.log('Deleted List');
          }
        }
      ]
    });
    prompt.present();
  }


}
