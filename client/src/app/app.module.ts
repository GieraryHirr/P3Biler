import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { SharedModule } from './_modules/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SellerDetailComponent } from './sellers/seller-detail/seller-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import { MyOfferListComponent } from './myOffers/my-offer-list/my-offer-list.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { EditOfferComponent } from './myOffers/edit-offer/edit-offer.component';
import { OfferCardComponent } from './offers/offer-card/offer-card.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    SellerDetailComponent,
    ListsComponent,
    MessagesComponent,
    OfferListComponent,
    OfferDetailComponent,
    MyOfferListComponent,
    AddOfferComponent,
    EditOfferComponent,
    OfferCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
