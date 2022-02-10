import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AuthGuard } from './_guards/auth.guard';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { EditOfferComponent } from './myOffers/edit-offer/edit-offer.component';
import { MyOfferListComponent } from './myOffers/my-offer-list/my-offer-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';
import { SellerDetailComponent } from './sellers/seller-detail/seller-detail.component';
import { SellerListComponent } from './sellers/seller-list/seller-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "sellers", component: SellerListComponent},
  {path: "sellers/:id", component: SellerDetailComponent},
  {path: "offers", component: OfferListComponent},
  {path: "offers/:id", component: OfferDetailComponent},
  {
    path:"",
    runGuardsAndResolvers:"always",
    canActivate:[AuthGuard], //user must be logged to use this route
    children: [

      {path: "lists", component: ListsComponent},
      {path: "messages", component: MessagesComponent},
      {path: "myoffers", component: MyOfferListComponent},
      {path: "myoffers/:id", component: EditOfferComponent},
      {path: "addoffer", component: AddOfferComponent},
    ]
  },

  {path: "errors", component: TestErrorsComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: "server-error", component: ServerErrorComponent},
  {path: "**", component: NotFoundComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
