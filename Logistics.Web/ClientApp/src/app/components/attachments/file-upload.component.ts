import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.css']
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() allowMultiple = true;
  @Input() buttonColor = 'primary';
  @Input() inputLabel = 'Browse...';
  @Output() onSelected = new EventEmitter<[FileList, FormData]>();

  fileChange(event) {
    const files: FileList = event.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(files.item(i).name, files.item(i));
    }

    this.onSelected.emit([files, formData]);    
    this.fileInput.nativeElement.value = null;
  }
}
