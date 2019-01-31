import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from './core.service';
import { SnackerService } from './snacker.service';
import { Attachment } from '../models';

@Injectable()
export class AttachmentService {

  constructor(private core: CoreService, private snacker: SnackerService, private http: HttpClient) { }

  private attachments = new BehaviorSubject<Attachment[]>(null);
  private deletedAttachments = new BehaviorSubject<Attachment[]>(null);

  attachments$ = this.attachments.asObservable();
  deletedAttachments$ = this.deletedAttachments.asObservable();

  getAttachments = () => this.http.get<Attachment[]>('/api/attachment/getAttachments')
    .subscribe(
      data => this.attachments.next(data),
      err => this.snacker.sendErrorMessage(err.error)
  )

  getDeletedAttachments = () => this.http.get<Attachment[]>('/api/attachment/getDeletedAttachments')
    .subscribe(
    data => this.deletedAttachments.next(data),
    err => this.snacker.sendErrorMessage(err.error)
  )

  uploadOrderAttachments = (orderId: number, formData: FormData): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/attachment/uploadOrderAttachments' + orderId, formData, { headers: this.core.getUploadOptions() })
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage('Files successfully uploaded');
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  uploadRequestAttachments = (requestId: number, formData: FormData): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/attachment/uploadRequestAttachments' + requestId, formData, { headers: this.core.getUploadOptions() })
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage('Files successfully uploaded');
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  toggleAttachmentDeleted = (attachment: Attachment): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/attachment/toggleAttachmentDeleted', attachment.id)
        .subscribe(
          () => {
            attachment.isDeleted ?
              this.snacker.sendSuccessMessage(`${attachment.name} succussfully restored`) :
              this.snacker.sendSuccessMessage(`${attachment.name} succsussfully deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);

          });
    })

  deleteAttachment = (attachment: Attachment): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/attachment/deleteAttachment', attachment)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${attachment.name} permanantly deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })
}
