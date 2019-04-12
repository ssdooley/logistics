import { Component, OnInit, ViewChild } from '@angular/core';
import {  } from '@angular/common';
import { SnackerService, PurchaseRequestService, PriorityService, SiteService, AuthorizedRegulationService, AttachmentService } from '../../../services';

import { MatDialog } from '@angular/material';
import { Request, RequestItem, RequestAttachment, AuthorizedRegulation, Site, Priority } from '../../../models';
import { ConfirmDialog, AuthorizedRegulationBinDialog, JustificationDialog, RequestItemsDialog, EditItemsDialog } from '../../../dialogs'
import { EventEmitter } from 'events';



@Component({
  selector: 'new-purchase-request',
  templateUrl: 'new-purchase-request.component.html',
  styleUrls: ['new-purchase-request.component.css'],
  providers: [PurchaseRequestService, PriorityService, SiteService, AuthorizedRegulationService, AttachmentService]
})
export class NewPurchaseRequestComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
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
  fileNameArray: Array<string>;
  colorWarn = 'warn';
  colorPrimary = 'primary';

  constructor(
    public dialog: MatDialog,
    public service: PurchaseRequestService,
    public priorityService: PriorityService,
    public siteService: SiteService,
    public regulationService: AuthorizedRegulationService,
    public attachmentService: AttachmentService,
    public snacker: SnackerService
  ) { }

  ngOnInit() {
    this.service.getPurchaseRequests();
    this.priorityService.getPriorities();
    this.siteService.getSites();
    this.regulationService.getAuthorizedRegulations();
    this.attachmentService.getAttachments();
  }

  addPurchaseRequest(formData: FormData) {    
    this.service.addPurchaseRequest(this.newRequest, formData);    
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

  editItem(item: RequestItem) {
    this.dialog.open(EditItemsDialog, { data: item, width: '850px' })
      .afterClosed()
      .subscribe((result: RequestItem) => {
        if (result) {
          this.removeItem(item);
          this.newRequest.requestItems.push(result);
          this.itemsArray.push(result);
        }
        if (!result) {
          console.log("No Items came back from the dialog")
        }

      });
  }

  async exportToExcel() {
    await this.service.exportRequests();
  }

  removeItem(item: RequestItem) {
    //this.newRequest.requestItems.splice(item);
    console.log(item);
    let index = this.newRequest.requestItems.indexOf(item);
    console.log(index);
    this.newRequest.requestItems.splice(index, 1);
  }

  fileChange(files: [FileList, FormData]) {
    const fileNames = new Array<string>();
    
    if (this.service.fileNames.value.length > 0 && files[0].length == 1) {
      this.snacker.sendErrorMessage("If you wish to upload multiple files, they must be selected at the same time");
    }
    if (files[0].length > 1 && this.service.fileNames.value.length > 0
    || this.service.fileNames.value.length == 0) {
      for (let i = 0; i < files[0].length; i++) {
        fileNames.push(files[0].item(i).name);
        console.log(files[0]);
      }
      this.service.fileNames.next(fileNames);
      this.service.files.next(files[1]);
    }    
  }

  uploadFiles()  {
    if ((this.files && this.files.length > 0) && this.formData) {
      this.uploading = true;
      const res = this.attachmentService.uploadRequestAttachments(this.newRequest.id, this.formData);
      console.log(this.formData);
      this.uploading = false;
      if (res) {
        this.clearFiles();
      }
    }
  }
  

  clearFiles() {
    this.files = null;
    this.formData = null;
  }

}
