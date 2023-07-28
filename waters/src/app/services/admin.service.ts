import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/admin'; 

  constructor(private http: HttpClient) { }

  /* user */

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(userId: string, updatedData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${userId}`, updatedData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
  
  getAvailableUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users-without-role`);
  }

  updateUserRole(userId: string, role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/role`, { role });
  }



  // Chauffeurs
  getAllDrivers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/drivers`);
  }

  getDriver(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/drivers/${id}`);
  }

  addDriver(driver: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/drivers`, driver);
  }

  updateDriver(id: string, driver: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/drivers/${id}`, driver);
  }

  deleteDriver(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/drivers/${id}`);
  }

  assignClientsToDriver(driverId: string, clientIds: string[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/drivers/${driverId}/assign-clients`, { clients: clientIds });
  }

  getDriverWithClients(driverId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/drivers/${driverId}/with-clients`);
  }
    
  getUnassignedClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/unassignedClients`);
  }

  removeClientsFromDriver(driverId: string, clientIds: string[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/drivers/${driverId}/remove-clients`, { clients: clientIds });
  }
  
  /*clients*/

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/admin/clients');
  }

  getClients() {
    return this.http.get<any[]>(`${this.apiUrl}/clients`);
  }

  addClient(client: any) {
    return this.http.post(`${this.apiUrl}/clients`, client);
  }

  updateClient(client: any) {
    return this.http.patch(`${this.apiUrl}/clients/${client._id}`, client);
  }

  deleteClient(clientId: string) {
    return this.http.delete(`${this.apiUrl}/clients/${clientId}`);
  }

  /*products*/

  getAllProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  createProduct(product: Product): Observable<any> {
      return this.http.post(`${this.apiUrl}/products`, product);
  }

  updateProduct(productId: string, updatedData: Product): Observable<Product> {
      return this.http.patch<Product>(`${this.apiUrl}/products/${productId}`, updatedData);
  }

  deleteProduct(productId: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }

  /* vendeurs */ 

  getAllVendors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendors`);
  }

  getVendor(vendorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendors/${vendorId}`);
  }

  addVendor(vendor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vendors`, vendor);
  }

  updateVendor(vendorId: string, updatedVendor: any): Observable<any> {
      return this.http.patch(`${this.apiUrl}/vendors/${vendorId}`, updatedVendor);
  }

  deleteVendor(vendorId: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/vendors/${vendorId}`);
  }


  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`);
  }

  getOrder(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/${orderId}`);
  }

  insertOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, order);
  }

  updateOrder(orderId: string, updatedOrder: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orders/${orderId}`, updatedOrder);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/${orderId}`);
  }

}
