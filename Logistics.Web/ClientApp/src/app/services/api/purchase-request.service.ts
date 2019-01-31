import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from '../snacker.service';

import { Request, RequestAttachment, RequestItem, User, Mission } from '../../models';
import { CoreService } from '../core.service';

@Injectable()
export class PurchaseRequestService {
  private requests = new BehaviorSubject<Request[]>(null);
  private requestItems = new BehaviorSubject<RequestItem[]>(null);
  private missions = new BehaviorSubject<Mission[]>(null);
  private requestItem = new BehaviorSubject<RequestItem>(null);
  files = new BehaviorSubject<FormData>(new FormData());

  requests$ = this.requests.asObservable();
  requestItems$ = this.requestItems.asObservable();
  missions$ = this.missions.asObservable();
  requestItem$ = this.requestItem.asObservable();

  mission = [{ name: '1st' }, { name: '2nd' }];

  constructor(private core: CoreService, private http: HttpClient, private snacker: SnackerService) { }

  trackRequests = (request: Request) => request.id;

  getPurchaseRequests = () => this.http.get<Request[]>('/api/purchaseRequest/GetPurchaseRequests')
    .subscribe(
      data => this.requests.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getPurchaseRequest = (id: number) => this.http.get<Request[]>(`/api/purchaseRequest/GetPurchaseRequest/${id}`)
    .subscribe(
      data => this.requests.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getPurchaseRequestByUser = (user: User) => this.http.post<Request[]>('/api/purchaseRequest/GetPurchaseRequestByUser', user)
    .subscribe(
      data => this.requests.next(data),
      err => this.snacker.sendErrorMessage(err.error)
  )
      

  addPurchaseRequest = (request: Request): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/purchaseRequest/AddPurchaseRequest', request)
        .subscribe(
        () => {
        //(id: number) => {
           // this.uploadAttachments(id, formData)
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
      this.http.post('/api/purchaseRequest/UpdatePurchaseRequest', request)
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

  getRequestItems = (id: number) => this.http.get<RequestItem[]>(`/api/purchaseRequest/GetRequestItems/${id}`)
    .subscribe(
      data => this.requestItems.next(data),
      err => this.snacker.sendErrorMessage(err.error)
  )

  getRequestItem = (id: number) => this.http.get<RequestItem>(`/api/purchaseRequest/GetRequestItem/${id}`)
    .subscribe(
    data => this.requestItem.next(data),
    err => this.snacker.sendErrorMessage(err.error)
    )

  addItems = (request: Request, item: RequestItem): Promise<boolean> =>
    new Promise((resolve) => {
      const data = [request, item];
      this.http.post('/api/purchaseRequest/AddItems', data)
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
      this.http.post('/api/purchaseRequest/UpdateItems', item)
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
      this.http.post('/api/purchaseRequest/DeleteItem', item)
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

  uploadAttachments(requestId: number, formData: FormData) {
    console.log('from uploadAttachments ' + requestId + " : " + formData)
    this.http.post('api/attachment/uploadRequestAttachments' + requestId, formData, { headers: this.core.getUploadOptions() })
      .subscribe(
        () => {
          this.snacker.sendSuccessMessage('Request successfully submitted');
          //this.router.navigate(['/request', requestId]);
        },
        err => {
          this.snacker.sendErrorMessage(err.error);
        }
      )
  }
}
