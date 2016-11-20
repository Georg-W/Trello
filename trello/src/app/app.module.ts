import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BoardPage } from '../pages/Board/board';
import { ListPage } from '../pages/List/list';

@NgModule({
  declarations: [
    MyApp,
    BoardPage,
    ListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BoardPage,
    ListPage
  ],
  providers: []
})
export class AppModule {}
