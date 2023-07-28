import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  orders: any[] = [];
  driverId!: string;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.driverId = JSON.parse(localStorage.getItem('currentUser')!)._id;
    this.orderService.getCommandesForDriver(this.driverId).subscribe(data => {
      const today = new Date().toISOString().split('T')[0];
      this.orders = data.filter((order: any) => order.dateExpected.split('T')[0] === today); // Fournir explicitement un type pour "order"
    });
  }

  marquerCommeLivre(orderId: string): void {
    const dateDelivered = new Date();
    this.orderService.updateDeliveryDate(orderId, dateDelivered).subscribe(response => {
      console.log('Livraison mise à jour avec succès', response);
      this.ngOnInit(); // recharger les commandes
    }, error => {
      console.error('Erreur lors de la mise à jour de la livraison:', error);
    });
  }


  afficherDetails(orderId: string): void {
    this.orderService.getCommandeDetails(orderId).subscribe(data => {
      console.log('Détails de la commande:', data);
    }, error => {
      console.error('Erreur lors de la récupération des détails de la commande:', error);
    });
  }

}
