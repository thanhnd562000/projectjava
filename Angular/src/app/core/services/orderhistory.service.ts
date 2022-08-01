import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orderhistory } from 'src/app/common/orderhistory.model';

@Injectable({
  providedIn: 'root'
})
export class OrderhistoryService {
  private baseUrl = "http://localhost:8080/api/orders";

  constructor(private httpClient: HttpClient) { }
 GetOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {
    const orderHistoryUrl=`${this.baseUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}
interface GetResponseOrderHistory
{
  _embedded: {
    orders: Orderhistory[];
  };
}