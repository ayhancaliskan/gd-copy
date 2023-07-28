import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Product } from 'src/app/models/product.model';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  commandes: any[] = [];
  produits: Product[] = [];
  drivers: any[] = [];
  selectedCommande: any = this.initializeCommande();
  afficherHistorique: boolean = false;
  productFieldsCount = 1; 
  clients: any[] = [];
  filterDateExpected: string = '';
  filterDriver: string = '';
  filteredCommandes: any[] = [];

  @ViewChild('commandeForm', { static: false }) commandeForm!: NgForm;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadAllOrders();
    this.loadAllProducts();
    this.loadAllDrivers();
    this.loadAllClients();
    this.filteredCommandes = this.commandes;
  }

  // generatePDF() {
  //   const documentDefinition = {
  //     content: [
  //       { text: 'Liste des commandes', style: 'header' },
  //       this.getOrdersTableDefinition()
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //         margin: [0, 0, 0, 10]
  //       }
  //     }
  //   };
  //   pdfMake.createPdf(documentDefinition).download('commandes.pdf');
  // }

  // getOrdersTableDefinition() {
  //   return {
  //     table: {
  //       widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
  //       body: [
  //         ['Produit', 'Quantité', 'Entreprise', 'Date de livraison', 'Date de la commande', 'Chauffeur', 'Prix Total (€)', 'Actions'],
  //         ...this.filteredCommandes.map(commande => [
  //           commande.products.map(prod => prod.product.name).join(", "),
  //           commande.products.map(prod => prod.quantity).join(", "),
  //           commande.client.name,
  //           commande.dateExpected,
  //           commande.dateOrder,
  //           commande.driver?.name,
  //           commande.prixTotal,
  //           ''
  //         ])
  //       ]
  //     }
  //   };
  // }

  initializeCommande() {
    return {
      products: [{ product: '', quantity: 0 }],
      dateExpected: "",
      dateOrder: new Date(),
      driver: '',
      paymentType: 'cash',
      prixTotal: 0
    };
  }

  applyFilters() {
    // Reset du filtre
    this.filteredCommandes = this.commandes;

    // Appliquer le filtre pour la date de livraison
    if (this.filterDateExpected) {
        this.filteredCommandes = this.filteredCommandes.filter(commande => 
            new Date(commande.dateExpected).toDateString() === new Date(this.filterDateExpected).toDateString());
    }

    // Appliquer le filtre pour le chauffeur
    if (this.filterDriver) {
        this.filteredCommandes = this.filteredCommandes.filter(commande => commande.driver?._id === this.filterDriver);
    }
  }

  resetFilters(): void {
    // Réinitialisez vos variables de filtre à leurs valeurs par défaut
    this.filterDateExpected = '';
    this.filterDriver = '';
  
    // Mettez à jour la liste filteredCommandes pour qu'elle affiche toutes les commandes
    this.filteredCommandes = [...this.commandes];
  }

  loadAllOrders(): void {
    this.adminService.getAllOrders().subscribe(data => {
        this.commandes = data;
        this.filteredCommandes = this.commandes; 
    }, error => {
        console.error("Erreur lors de la récupération des commandes:", error);
    });
  }

  loadAllProducts(): void {
    this.adminService.getAllProducts().subscribe(data => {
      this.produits = data;
    }, error => {
      console.error("Erreur lors de la récupération des produits:", error);
    });
  }

  loadAllDrivers(): void {
    this.adminService.getAllDrivers().subscribe(data => {
      this.drivers = data;
    }, error => {
      console.error("Erreur lors de la récupération des chauffeurs:", error);
    });
  }

  loadAllClients(): void {
    this.adminService.getAllClients().subscribe(data => {
      this.clients = data;
    }, error => {
      console.error("Erreur lors de la récupération des clients:", error);
    });
  }

  onClientChange(event: any): void {
    const selectedClientName = event.target.value;
    const selectedClient = this.clients.find((client: any) => client.name === selectedClientName);
    if (selectedClient) {
      this.selectedCommande.adresse = selectedClient.adresse;
    }
  }

  openAddCommandeModal(): void {
    this.selectedCommande = this.initializeCommande();
    this.showModal();
  }

  openEditCommandeModal(commande: any): void {
 
    this.selectedCommande = { ...commande };
    console.log(this.selectedCommande)

    this.showModal();
  }


  saveCommande(): void {

    if (!this.commandeForm.valid) {
      console.error("Le formulaire n'est pas valide.");
      return;
    }

    if (!Array.isArray(this.selectedCommande.products) || this.selectedCommande.products.length === 0) {
      console.error("Le champ 'products' doit être un tableau et ne peut pas être vide.");
      return;
    }

    if (this.selectedCommande._id) {
      console.log('update')
      this.adminService.updateOrder(this.selectedCommande._id, this.selectedCommande).subscribe(() => {
        this.loadAllOrders();
      }, error => {
        console.error("Erreur lors de la mise à jour de la commande:", error);
      });
    } else {
      console.log('insert')
      this.adminService.insertOrder(this.selectedCommande).subscribe(() => {
        this.loadAllOrders();
      }, error => {
        console.error("Erreur lors de l'ajout de la commande:", error);
      });
    }
    this.closeModal();
  }
  


  deleteCommande(reference: string): void {
    this.adminService.deleteOrder(reference).subscribe(() => {
      this.loadAllOrders();
    }, error => {
      console.error("Erreur lors de la suppression de la commande:", error);
    });
  }

  addProductField(): void {
    this.productFieldsCount++;
    this.selectedCommande.products.push({ product: '', quantity: 0 });
  }

  calculateTotalPrice(): void {
    let total = 0;
    for (let prod of this.selectedCommande.products) {
        const product = this.produits.find(p => p._id === prod.product);
        if (product && prod.quantity) {
            total += product.wholesalePrice * prod.quantity; 
        }
    }
    this.selectedCommande.prixTotal = total;
  }


  removeProductField(index: number): void {
    if (this.selectedCommande.products.length > 1) {
      this.selectedCommande.products.splice(index, 1);
    } else {
      console.error("Vous ne pouvez pas supprimer tous les produits.");
    }
  }


  showModal(): void {
    const modalElement = document.getElementById('commandeModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('commandeModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if(modal) {
        modal.hide();
      }
    }
  }

}
