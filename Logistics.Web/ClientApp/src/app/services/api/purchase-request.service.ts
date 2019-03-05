import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackerService } from '../snacker.service';

import { Request, RequestAttachment, RequestItem, User, Mission, Attachment } from '../../models';
import { CoreService } from '../core.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class PurchaseRequestService {
  private requests = new BehaviorSubject<Request[]>(null);
  private requestItems = new BehaviorSubject<RequestItem[]>(null);
  private missions = new BehaviorSubject<Mission[]>(null);
  private requestItem = new BehaviorSubject<RequestItem>(null);
  deletedAttachments = new BehaviorSubject<Array<Attachment>>([]);
  uploading = new BehaviorSubject<boolean>(false);
  files = new BehaviorSubject<FormData>(new FormData());
  fileNames = new BehaviorSubject<Array<string>>([]);
  requestId: number;

  requests$ = this.requests.asObservable();
  requestItems$ = this.requestItems.asObservable();
  missions$ = this.missions.asObservable();
  requestItem$ = this.requestItem.asObservable();

  mission = [{ name: '1st' }, { name: '2nd' }];

  constructor(private core: CoreService, private http: HttpClient, private snacker: SnackerService) { }

  trackRequests = (request: Request) => request.id;

  exportRequests() {
    this.http.get('/api/export/ExportRequests', { responseType: 'blob' })
      .subscribe(       
          data => console.log('You recieved data'),
          error => console.log(error)        
      );
  }

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

  addPurchaseRequest = (request: Request, formData: FormData): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/purchaseRequest/AddPurchaseRequest', request)
        .subscribe(
        (id: number) => {
          
          console.log(id);
            this.uploadAttachments(id)
            this.snacker.sendSuccessMessage(`${request.subject} succussfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  //addPurchaseRequest(request: Request, formData: FormData): Observable<Request> {   
  //  return this.http.post('/api/purchaseRequest/AddPurchaseRequest', request)
  //    .
  //    .subscribe(data => {
  //      console.log(`This is from the database : ${ data }`);
  //    });
      
  //}

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

  uploadAttachments(requestId: number) {
    this.http.post('api/attachment/uploadRequestAttachments/' + requestId, this.files.value, { headers: this.core.getUploadOptions() })
      .subscribe(
        (data) => {
          this.snacker.sendSuccessMessage('Request successfully submitted');
          //this.router.navigate(['/request', requestId]);

          console.log(data)
        },
        err => {
          this.snacker.sendErrorMessage(err.error);
        }
      )
  }

  getDeletedAttachments = (id: number) => this.http.get<Array<Attachment>>(`/api/attachment/GetDeletedAttachments/${id}`)
    .subscribe(
      data => this.deletedAttachments.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )
}
