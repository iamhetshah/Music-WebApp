import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { ServerService } from './services/server/server.service';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ResultCardComponent } from './components/search-results/result-card/result-card.component';
import { AudioService } from './services/audio/audio.service';
import { PlayerComponent } from './components/player/player.component';

const appRoutes: Routes = [
  {
    path: '',
    component: SearchResultsComponent,
  },
  {
    path: 'search',
    component: SearchResultsComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchResultsComponent,
    ResultCardComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ServerService, AudioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
