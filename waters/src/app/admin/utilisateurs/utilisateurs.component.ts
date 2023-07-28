import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { AdminService } from '../../services/admin.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  utilisateurs: User[] = [];
  selectedUtilisateur: User = this.resetUser();

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  resetUser(): User {
    return {
      _id: '',
      username: '',
      password: '',
      userRole: null,
      isAdmin: false
    };
}


  fetchUsers(): void {
    this.adminService.getAllUsers().subscribe(data => {
      this.utilisateurs = data;
    });
  }

  openAddUtilisateurModal(): void {
    this.selectedUtilisateur  = this.resetUser();
    this.showModal();
  }

  openEditUtilisateurModal(utilisateur: User): void {
    this.selectedUtilisateur = { ...utilisateur };
    this.showModal();
  }

  saveUtilisateur(): void {
    if (this.selectedUtilisateur._id) {
      this.selectedUtilisateur.userRole = this.selectedUtilisateur.isAdmin ? 'admin' : this.selectedUtilisateur.userRole;
      this.adminService.updateUser(this.selectedUtilisateur._id, this.selectedUtilisateur).subscribe(() => {
        this.fetchUsers();
        this.hideModal();
      });
    } else {
      this.selectedUtilisateur.userRole = this.selectedUtilisateur.isAdmin ? 'admin' : null;
      this.adminService.createUser(this.selectedUtilisateur).subscribe(() => {
        this.fetchUsers();
        this.hideModal();
      });
    }
  }

  deleteUtilisateur(userId?: string): void {
    if (!userId) return;
    this.adminService.deleteUser(userId).subscribe(() => {
        this.fetchUsers();
    });
  }

  private showModal() {
    const modalElement = document.getElementById('utilisateurModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  private hideModal() {
    const modalElement = document.getElementById('utilisateurModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
