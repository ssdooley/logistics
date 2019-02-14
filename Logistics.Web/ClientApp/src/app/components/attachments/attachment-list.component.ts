import { Component, Input } from '@angular/core';
import { Attachment } from '../../models';

@Component({
  selector: 'attachment-list',
  templateUrl: 'attachment-list.component.html'
})
export class AttachmentListComponent {
  @Input() files: Attachment[];

  //fileChange(event) {
  //  console.log("from attachment list");
  //  let fileList: FileList = event.target.files;
  //  if (fileList.length > 0) {
  //    let file: File = fileList[0];
  //    let fileSize: number = fileList[0].size;
  //    if (fileSize <= 10485760) {
  //      let formData: FormData = new FormData();
  //      formData.get(file.name);
  //    }
  //  }
  //}
}
