import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'drivers', component: DriversComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'produits', component: ProduitsComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'commandes', component: CommandesComponent },
      { path: 'vendeurs', component: VendeursComponent },
      { path: 'chauffeurs', component: ChauffeursComponent },
      { path: 'utilisateurs', component: UtilisateursComponent },
      { path: '', redirectTo: 'produits', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
