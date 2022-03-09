import { OfferEditComponent } from './offers/offer-edit/offer-edit.component';
import { AuthGuard } from './_guards/auth.guard';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { MyOfferListComponent } from './myOffers/my-offer-list/my-offer-list.component';
import { MessagesComponent } from './messages/messages.component';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';
import { SellerDetailComponent } from './sellers/seller-detail/seller-detail.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "sellers/:id", component: SellerDetailComponent},
  {path: "offer", component: OfferListComponent},
  {path: "offer/:id", component: OfferDetailComponent},
  {path: "offerdetail", component: OfferDetailComponent},
  {
    path:"",
    runGuardsAndResolvers:"always",
    canActivate:[AuthGuard], //user must be logged to use this route
    children: [
      {path: "messages", component: MessagesComponent},
      {path: "myoffers", component: MyOfferListComponent},
      {path: "offer/:id/edit", component: OfferEditComponent},
      {path: "addoffer", component: AddOfferComponent},
    ]
  },
  {path: "**", component: HomeComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
