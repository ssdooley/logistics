import { Component, ViewChild } from '@angular/core';
import { PurchaseRequestService, SnackerService, AttachmentService } from '../../services';

@Component({
  selector: "inventory",
  templateUrl: 'inventory.component.html',
  styleUrls: ['inventory.component.css']
})
export class InventoryComponent {
  @ViewChild('fileInput') fileInput;
  formData: FormData;
  files: File[];
  uploading = false;


  constructor(public service: PurchaseRequestService, public attachmentService: AttachmentService , public snacker: SnackerService) { }

  async exportToExcel() {
    await this.service.exportRequests();
  }

  fileChange(files: [FileList, FormData]) {
    const fileNames = new Array<string>();

    if (this.service.fileNames.value.length > 0 && files[0].length == 1) {
      this.snacker.sendErrorMessage("Please do not upload more than one file. Select Clear to upload a different file");
    }
    if (files[0].length > 1 && this.service.fileNames.value.length > 0
      || this.service.fileNames.value.length == 0) {
      for (let i = 0; i < files[0].length; i++) {
        fileNames.push(files[0].item(i).name);
      }
      this.service.fileNames.next(fileNames);
      this.service.files.next(files[1]);
      this.service.uploadExcel();
      console.log("length of fileNames : " + this.service.fileNames.value.length);
    }    
  }
  
  clearFiles() {
    this.service.clearUploads()
  }

}
