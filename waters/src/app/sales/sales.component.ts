import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { AdminService } from '../services/admin.service'; // Importez le service AdminService
import * as bootstrap from 'bootstrap';
import { OrderService } from '../services/order.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  produits: Product[] = [];
  clients: any[] = [];
  selectedClient: any = null;
  clientInfo = {
    name: '',
    address: '',
    contact: '',
    tel: '',
    mail: '',
    type: '',
  };
  quantiteErrors: boolean[] = [];
  showNewClientForm: boolean = false;
  showTotalPrice: boolean = false;


  @ViewChild('panierModalRef', { static: true }) panierModalRef?: ElementRef;

  constructor(
    private cartService: CartService,
    private adminService: AdminService,
    private orderService: OrderService,
    private clientService: ClientService
  ) { }


  ngOnInit(): void {
    this.loadProducts();
    this.loadClients();
    this.produits.forEach(() => this.quantiteErrors.push(false));
  }



  loadProducts(): void {
    this.adminService.getAllProducts().subscribe(data => {
      this.produits = data;
    });
  }

  loadClients(): void {
    this.adminService.getAllClients().subscribe(data => {
      this.clients = data;
    }, error => {
      console.error("Erreur lors de la récupération des clients:", error);
    });
  }

  ajouterAuPanier(produit: Product, quantite: number, index: number): void {
    if (quantite <= 0 || isNaN(quantite)) {
      this.quantiteErrors[index] = true;
    } else {
      this.quantiteErrors[index] = false;
      this.cartService.addToCart(produit, quantite);
    }
  }

  get cart() {
    return this.cartService.getCart();
  }

  get nombreProduits(): number {
    return this.cartService.getTotalQuantity();
  }

  get prixTotal(): number {
    let totalPrice = 0;
    const client = this.clients.find((client) => client._id === this.selectedClient);
    const products = this.cartService.getCart();
  
    for (const item of products) {
      const product = item.product;
      const quantity = item.quantity;
  
      // Appliquer les règles de calcul en fonction du type de client
      if (client.type === "marchand") {
        totalPrice += product.retailerPrice * quantity;
      } else if (client.type === "grossiste") {
        totalPrice += product.wholesalePrice * quantity;
      } else {
        totalPrice += product.otherPrice * quantity;
      }
    }
  
    return totalPrice;
  }

  ouvrirPanierModal(): void {
    if (this.panierModalRef) {
      const modal = new bootstrap.Modal(this.panierModalRef.nativeElement);
      modal.show();
    }
  }

  validerCommande(): void {
    const orderData = {
      products: this.cartService.getCart(),
      client: this.selectedClient,
      dateOrder: new Date(),
      dateExpected: null,
      paymentType: null,
      driver: null,
    };

    this.adminService.insertOrder(orderData).subscribe(response => {
      console.log('Commande créée avec succès', response);
      if (this.panierModalRef && this.panierModalRef.nativeElement) {
        const modal = bootstrap.Modal.getInstance(this.panierModalRef.nativeElement);
        if (modal) {
          modal.hide();
        }
      }
    }, error => {
      console.error("Erreur lors de l'ajout de la commande:", error);
    });
  }

  addNewClient(clientData: any): void {
    this.adminService.addClient(clientData).subscribe(response => {
      console.log('Client ajouté avec succès', response);
      this.loadClients();
      this.showNewClientForm = false;
    }, error => {
      console.error('Erreur');
    });
  }

  toggleNewClientForm(): void {
    this.showNewClientForm = !this.showNewClientForm;
  }

  onClientSelectionChange(): void {
    // Mettre à jour showTotalPrice si un client est sélectionné
    this.showTotalPrice = !!this.selectedClient;
  }
}
