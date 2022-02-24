import { OfferEditComponent } from './../offers/offer-edit/offer-edit.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: OfferEditComponent): boolean {
      if (component.editForm.dirty || component.editForm2.dirty) { //Form begin to be dirty if we edit something in form.
        return confirm ("Are you sure you want to continue? Any unsaved changes will be lost");
      }
    return true;
  }

}
