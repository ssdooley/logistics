import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService, PriorityService, SiteService, AuthorizedRegulationService, AttachmentService } from '../../../services';

import { MatDialog } from '@angular/material';
import { Request, RequestItem, RequestAttachment, AuthorizedRegulation, Site, Priority } from '../../../models';
import { ConfirmDialog, AuthorizedRegulationBinDialog, JustificationDialog, RequestItemsDialog } from '../../../dialogs'
import { EventEmitter } from 'events';


@Component({
  selector: 'purchase-request',
  templateUrl: 'purchase-request.component.html',
  styleUrls: ['purchase-request.component.css'],
  providers: [PurchaseRequestService, PriorityService, SiteService, AuthorizedRegulationService, AttachmentService]
})
export class PurchaseRequestComponent implements OnInit {
  selectedPriority = new Priority();
  selectedSite = new Site();
  selectedMission: string;
  selectedRequester: string;
  selectedAuthorizations: Array<AuthorizedRegulation>[];
  itemsArray = new Array<RequestItem>();
  regString: string;
  regConcat: string;
  test: string;
  regCount = 0;  
  newRequest = new Request();  
  formData: FormData;
  files: File[];
  uploading = false;

  constructor(
    public dialog: MatDialog,
    public service: PurchaseRequestService,
    public priorityService: PriorityService,
    public siteService: SiteService,
    public regulationService: AuthorizedRegulationService,
    public attachmentService: AttachmentService
  ) { }

  ngOnInit() {
    this.service.getPurchaseRequests();
    this.priorityService.getPriorities();
    this.siteService.getSites();
    this.regulationService.getAuthorizedRegulations();
    this.attachmentService.getAttachments();
  }

  addPurchaseRequest() {
    
    this.service.addPurchaseRequest(this.newRequest);    
  }

  addMission(event) {
    this.newRequest.mission = event.name;
    console.log(this.newRequest.mission);
  }

  addJustification() {
    this.dialog.open(JustificationDialog, {
      data: this.service, width: '550px'
    })
      .afterClosed()
      .subscribe(result => {
        this.test = result;
        if (this.regCount > 0) {
          this.regString.concat(result);
          this.regCount++;
          var space: string = `\r\n`;
          this.regConcat = this.regString.concat(space, this.test);
          this.regString = this.regConcat;
          this.newRequest.justifications = this.regString;
        }
        if (this.regCount <= 0) {
          this.regString = result;
          this.newRequest.justifications = this.regString;
          this.regCount++
        }
      });
  }

  addItems() {
    this.dialog.open(RequestItemsDialog, { data: this.service, width: '850px' })
      .afterClosed()
      .subscribe((result: RequestItem) => {
        if (result) {
          this.newRequest.requestItems.push(result);
          this.itemsArray.push(result);
        }
        if (!result) {
          console.log("No Items came back from the dialog")
        }
        
      });
  }

  removeItem($event) {
    this.newRequest.requestItems.splice($event)
    console.log($event);
  }

  filesChanged(data: [File[], FormData]) {
    this.files = data[0];
    this.formData = data[1];
  }

  //uploadFiles()  {
  //  if ((this.files && this.files.length > 0) && this.formData) {
  //    this.uploading = true;
  //    const res = this.attachmentService.uploadRequestAttachments(this.newRequest.id, this.formData);
  //    console.log(this.formData);
  //    this.uploading = false;
  //    if (res) {
  //      this.clearFiles();
  //    }
  //  }
  //}

  clearFiles() {
    this.files = null;
    this.formData = null;
  }

}
