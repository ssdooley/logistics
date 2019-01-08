import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from '../snacker.service';

import { Request, RequestAttachment, RequestItem, User } from '../../models';

@Injectable()
export class PurchaseRequestService {
  private requests = new BehaviorSubject<Request[]>(null);
  private requestItems = new BehaviorSubject<RequestItem[]>(null);

  requests$ = this.requests.asObservable();
  requestItems$ = this.requestItems.asObservable();

  constructor(private http: HttpClient, private snacker: SnackerService) { }

  trackRequests = (request: Request) => request.id;

  getPurchaseRequests = () => this.http.get<Request[]>('/api/request/GetPurchaseRequests')
    .subscribe(
      data => this.requests.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getPurchaseRequest = (id: number) => this.http.get<Request[]>(`api/request/GetPurchaseRequest/${id}`)
    .subscribe(
      data => this.requests.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getPurchaseRequestByUser = (user: User) => this.http.post<Request[]>('/api/request/GetPurchaseRequestByUser', user)
    .subscribe(
      data => this.requests.next(data),
      err => this.snacker.sendErrorMessage(err.error)
  )
      

  addPurchaseRequest = (request: Request): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/request/AddPurchaseRequest', request)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${request.subject} succussfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  updatePurchaseRequest = (request: Request): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/request/UpdatePurchaseRequest', request)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${request.subject} successfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  getRequestItems = () => this.http.get<RequestItem[]>('/api/request/GetRequestItems')
    .subscribe(
      data => this.requestItems.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  addItems = (request: Request, item: RequestItem): Promise<boolean> =>
    new Promise((resolve) => {
      const data = [request, item];
      this.http.post('/api/request/AddItems', data)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${item.name} successfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  updateItems = (item: RequestItem): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/request/UpdateItems', item)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${item.name} succussfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  deleteItem = (item: RequestItem): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/request/DeleteItem', item)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${item.name} succussfully deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })
}
