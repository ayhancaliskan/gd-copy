import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SalesComponent } from './sales/sales.component';
import { AdminComponent } from './admin/admin.component';
import { DriversComponent } from './drivers/drivers.component';
import { ProduitsComponent } from './admin/produits/produits.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { CommandesComponent } from './admin/commandes/commandes.component';
import { VendeursComponent } from './admin/vendeurs/vendeurs.component';
import { ChauffeursComponent } from './admin/chauffeurs/chauffeurs.component';
import { UtilisateursComponent } from './admin/utilisateurs/utilisateurs.component';
import { AdminService } from './services/admin.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SalesComponent,
    AdminComponent,
    DriversComponent,
    ProduitsComponent,
    ClientsComponent,
    CommandesComponent,
    VendeursComponent,
    ChauffeursComponent,
    UtilisateursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
