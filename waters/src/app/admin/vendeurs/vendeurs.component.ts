import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-vendeurs',
  templateUrl: './vendeurs.component.html',
  styleUrls: ['./vendeurs.component.css']
})
export class VendeursComponent implements OnInit {

  vendeurs: any[] = [];
  availableUsers: User[] = [];
  selectedVendeur: any = {
    name: '',
    surname: '',
    tel: '',
    mail: '',
    user: ''
  };
  



  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchVendors();
    this.loadAvailableUsers();
  }

  fetchVendors(): void {
    this.adminService.getAllVendors().subscribe(vendors => {
      this.vendeurs = vendors;
    });
  }

  loadAvailableUsers() {
    this.adminService.getAvailableUsers().subscribe(users => {
      this.availableUsers = users;
    });
  }


  openAddVendeurModal() {
    this.selectedVendeur = {};
    this.showModal();
  }

  openEditVendeurModal(vendeur: any) {
    this.selectedVendeur = { ...vendeur };
    this.showModal();
  }


  saveVendeur() {
    if (this.selectedVendeur._id) {
        this.adminService.updateVendor(this.selectedVendeur._id, this.selectedVendeur).subscribe(response => {
            this.adminService.updateUserRole(this.selectedVendeur.user, 'vendor').subscribe(() => {
                this.fetchVendors();
                this.hideModal();
            });
        }, error => {
            console.error('Error while updating vendor:', error);
        });
    } else {
        this.adminService.addVendor(this.selectedVendeur).subscribe(response => {
            this.adminService.updateUserRole(this.selectedVendeur.user, 'vendor').subscribe(() => {
                this.fetchVendors();
                this.hideModal();
            });
        }, error => {
            console.error('Error while adding vendor:', error);
        });
    }
  }


  deleteVendeur(email: string) {
    this.adminService.deleteVendor(email).subscribe(() => {
      this.fetchVendors();
    });
  }

  private showModal() {
    const modalElement = document.getElementById('vendeurModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  private hideModal() {
    const modalElement = document.getElementById('vendeurModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
