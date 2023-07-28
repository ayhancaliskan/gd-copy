import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

interface Driver {
  _id?: string;
  name: string;
  tel?: string;
  mail?: string;
  isActif?: boolean;
  orders?: any[];
  clients?: any[];
  user?: string;
}


@Component({
  selector: 'app-chauffeurs',
  templateUrl: './chauffeurs.component.html',
  styleUrls: ['./chauffeurs.component.css']
})


export class ChauffeursComponent implements OnInit {

  chauffeurs: Driver[] = [];
  clients: any[] = [];
  selectedChauffeur: Driver = { name: '' };
  selectedClients: any[] = [];
  clientsToRemove: string[] = [];
  unassignedClients: any[] = [];
  availableUsers: User[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchDrivers();
    this.loadAvailableUsers();
  }


  fetchDrivers(): void {
    this.adminService.getAllDrivers().subscribe(drivers => {
      this.chauffeurs = drivers;
      drivers.forEach((driver: Driver) => {
        this.adminService.getDriverWithClients(driver._id || 'defaultId').subscribe(data => {
          driver.clients = data.clients;
        });
      });
    });
  }

  loadUnassignedClients() {
    this.adminService.getUnassignedClients().subscribe(data => {
      this.unassignedClients = data;
    });
  }

  loadAvailableUsers() {
    this.adminService.getAvailableUsers().subscribe(users => {
      this.availableUsers = users;
    });
  }

  saveChauffeur() {
    // Si le chauffeur sélectionné a un ID, cela signifie qu'il s'agit d'une mise à jour
    if (this.selectedChauffeur && this.selectedChauffeur._id) {
        const driverId = this.selectedChauffeur._id;

        // Mise à jour du chauffeur
        this.adminService.updateDriver(driverId, this.selectedChauffeur).subscribe(response => {
            
            // Assignation des clients au chauffeur
            this.adminService.assignClientsToDriver(driverId, this.selectedClients).subscribe(assignResponse => {
                
                // Si un utilisateur est associé au chauffeur, mise à jour du rôle de l'utilisateur
                if (this.selectedChauffeur.user) {
                    this.adminService.updateUserRole(this.selectedChauffeur.user, 'driver').subscribe(() => {
                        this.hideModal();
                        this.fetchDrivers();
                    });
                } else {
                    this.hideModal();
                    this.fetchDrivers();
                }
            });
        });
    } 
    // Si le chauffeur sélectionné n'a pas d'ID, cela signifie qu'il s'agit d'une création
    else {
        this.adminService.addDriver(this.selectedChauffeur).subscribe(response => {
            const newDriverId = response._id;

            // Assignation des clients au nouveau chauffeur
            this.adminService.assignClientsToDriver(newDriverId, this.selectedClients).subscribe(assignResponse => {
                
                // Si un utilisateur est associé au chauffeur, mise à jour du rôle de l'utilisateur
                if (this.selectedChauffeur.user) {
                    this.adminService.updateUserRole(this.selectedChauffeur.user, 'driver').subscribe(() => {
                        this.hideModal();
                        this.fetchDrivers();
                    });
                } else {
                    this.hideModal();
                    this.fetchDrivers();
                }
            });
        });
    }
}

  

  deleteChauffeur(id: string | undefined): void {
    if (id) {
      this.adminService.deleteDriver(id).subscribe(() => {
        this.fetchDrivers();
      });
    }
  }

  openAddChauffeurModal(): void {
    this.selectedChauffeur = {
      name: '',
    };
    this.loadUnassignedClients();
    this.loadAvailableUsers();
    this.showModal();
  }

  openEditChauffeurModal(chauffeur: any) {
    this.selectedChauffeur = { ...chauffeur };
    this.selectedClients = chauffeur.clients.map((client: any) => client._id);
    this.loadAvailableUsers();
    this.showModal();
  }

  saveAssignedClients() {
    if (this.selectedChauffeur._id) {
      const selectedClientIds = this.clients.filter(c => c.isSelected).map(c => c._id);
      this.adminService.assignClientsToDriver(this.selectedChauffeur._id, selectedClientIds).subscribe(() => {
        alert('Clients assigned successfully.');
        this.hideModal();
      });
    }
  }

private showModal(): void {
  const modalElement = document.getElementById('chauffeurModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

private hideModal(): void {
  const modalElement = document.getElementById('chauffeurModal');
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  }
}
}

