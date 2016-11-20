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

constructor(private nav: NavController, private navParams: NavParams, public alertCtrl: AlertController, private trelloApi: TrelloApi){}

  ionViewDidLoad(){
  let selectedBoard = this.navParams.data.id;
  console.log(selectedBoard);
    this.trelloApi.getLists(selectedBoard).then(data=> this.lists = data);
    console.log('lifecycle didload');
  }

  listSelected($event, item){
    console.log(item.id + " got clicked");
    this.editMode = true;
    this.editItem = item;
    this.showPrompt();
  }

  showPrompt() {
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


}
