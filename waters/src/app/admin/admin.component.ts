import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importez le service Router

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public router: Router) { } // Injectez le service Router et rendez-le public pour y accéder depuis le template

  ngOnInit(): void {
  }

}