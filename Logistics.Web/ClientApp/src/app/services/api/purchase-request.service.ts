import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from '../snacker.service';

import { Request, RequestAttachment, RequestItem } from '../../models';

@Injectable()
export class PurchaseRequestService {
  private requests = new BehaviorSubject<Request[]>(null);

  requests$ = this.requests.asObservable();

  constructor(private http: HttpClient, private snacker: SnackerService) { }

  trackRequests = (request: Request) => request.id;

  getPurchaseRequests = () => this.http.get<Request[]>('/api/request/getPurchaseRequests')
    .subscribe(
      data => this.requests.next(data),
      err => this.snacker.sendErrorMessage(err.error) 
  )

  getPurchaseRequest = (id: number) => this.http.get<Request[]>(`api/request/getPurchaseRequest/${id}`)
    .subscribe(
      data => this.requests.next(data),
      err => this.snacker.sendErrorMessage(err.error)
  )

  addPurchaseRequest = (request: Request): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/request/addPurchaseRequest', request)
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
      this.http.post('api/request/updatePurchaseRequest', request)
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
}
