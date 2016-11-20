import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BoardPage } from '../pages/board/board';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BoardPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BoardPage
  ],
  providers: []
})
export class AppModule {}
