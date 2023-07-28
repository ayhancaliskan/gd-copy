import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { AdminService } from '../../services/admin.service';  // Assurez-vous d'avoir ce service

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: any[] = [];
  selectedClient: any = {};

  @ViewChild('clientForm', { static: false }) clientForm!: NgForm;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.adminService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  openAddClientModal() {
    this.selectedClient = {};
    this.showModal();
  }

  openEditClientModal(client: any) {
    this.selectedClient = { ...client };
    this.showModal();
  }

  saveClient(): void {
    if (!this.clientForm.valid) {
      console.error("Le formulaire n'est pas valide.");
      return;
    }

    if (this.selectedClient._id) {
      this.adminService.updateClient(this.selectedClient).subscribe(() => {
        this.fetchClients();
        this.hideModal();
      });
    } else {
      this.adminService.addClient(this.selectedClient).subscribe(() => {
        this.fetchClients();
        this.hideModal();
      });
    }
  }

  deleteClient(clientId: string) {
    this.adminService.deleteClient(clientId).subscribe(() => {
      this.fetchClients();
    });
  }

  private showModal() {
    const modalElement = document.getElementById('clientModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  private hideModal() {
    const modalElement = document.getElementById('clientModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
