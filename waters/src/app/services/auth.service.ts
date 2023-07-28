import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body, { withCredentials: true })
      .pipe(
        map(response => {
          localStorage.setItem('currentUser', JSON.stringify(response));
  
          switch (response.userRole) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            case 'driver':
              this.router.navigate(['/drivers']);
              break;
            default:
              this.router.navigate(['/sales']);
              break;
          }
  
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Détails de l\'erreur:', error);
          throw error;
        })
      );
}


  isLoggedIn(): boolean {
    // Check if the user is logged in based on your logic
    // For example, you can check if the 'currentUser' is present in localStorage
    const currentUser = localStorage.getItem('currentUser');
    return !!currentUser;
  }

  // ...

}
