import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/driver'; 

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Gestion des erreurs
  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getCommandesForDriver(driverId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/${driverId}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  marquerCommeLivre(commandeId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orders/detail/${commandeId}`, { statut: 'Livré' }, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getCommandeDetails(commandeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/detail/${commandeId}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  updateDeliveryDate(orderId: string, dateDelivered: Date): Observable<any> {
    return this.http.patch(`http://localhost:3000/orders/${orderId}/deliver`, { dateDelivered });
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post('http://localhost:3000/orders', orderData);
  }
  
  getAllOrders(): Observable<any> {
    return this.http.get('http://localhost:3000/orders');
  }

}
