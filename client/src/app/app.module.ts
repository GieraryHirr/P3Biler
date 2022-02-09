import { SharedModule } from './_modules/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SellerListComponent } from './sellers/seller-list/seller-list.component';
import { SellerDetailComponent } from './sellers/seller-detail/seller-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import { MyOfferListComponent } from './myOffers/my-offer-list/my-offer-list.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { EditOfferComponent } from './myOffers/edit-offer/edit-offer.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    SellerListComponent,
    SellerDetailComponent,
    ListsComponent,
    MessagesComponent,
    OfferListComponent,
    OfferDetailComponent,
    MyOfferListComponent,
    AddOfferComponent,
    EditOfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
