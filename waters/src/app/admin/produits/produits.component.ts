import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { AdminService } from '../../services/admin.service'; // Assurez-vous que le chemin est correct
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produits: Product[] = [];

  selectedProduct: Product = {
    _id: '',
    name: '',
    image: '',
    wholesalePrice: 0,
    retailerPrice: 0,
    otherPrice: 0
  };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.adminService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.produits = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    );
  }

  openAddProductModal(): void {
    this.selectedProduct = {
      _id: '',
      name: '',
      image: '',
      wholesalePrice: 0,
      retailerPrice: 0,
      otherPrice: 0
    };
    this.showModal();
  }

  openEditProductModal(product: any): void {
    this.selectedProduct = { ...product };
    this.showModal();
  }

  saveProduct(): void {
    if (!this.selectedProduct._id) {
      this.adminService.createProduct(this.selectedProduct).subscribe(
        (newProduct) => {
          this.produits.push(newProduct);
          this.hideModal();
        },
        (error) => {
          console.error('Erreur lors de la création du produit:', error);
        }
      );
    } else {
      this.adminService.updateProduct(this.selectedProduct._id, this.selectedProduct).subscribe(
        (updatedProduct) => {
          const index = this.produits.findIndex(p => p._id === updatedProduct._id);
          if (index !== -1) {
            this.produits[index] = updatedProduct;
          }
          this.hideModal();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du produit:', error);
        }
      );
    }
  }

  deleteProduct(productId: string): void {
    this.adminService.deleteProduct(productId).subscribe(
      () => {
        this.produits = this.produits.filter(p => p._id !== productId);
      },
      (error) => {
        console.error('Erreur lors de la suppression du produit:', error);
      }
    );
  }

  private showModal(): void {
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  private hideModal(): void {
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
