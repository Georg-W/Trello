import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BoardPage } from '../pages/Board/board';
import { ListPage } from '../pages/List/list';
import { CardPage } from "../pages/Card/card";

@NgModule({
  declarations: [
    MyApp,
    BoardPage,
    ListPage,
    CardPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BoardPage,
    ListPage,
    CardPage
  ],
  providers: []
})
export class AppModule {}
