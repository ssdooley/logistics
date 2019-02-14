import { Component, Input } from '@angular/core';
import { Attachment } from '../../models/attachment';

@Component({
  selector: 'attachment-card',
  templateUrl: 'attachment-card.component.html',
  styleUrls: ['attachment-card.component.css']
})
export class AttachmentCardComponent {
  @Input() file = new Attachment();

  //fileChange(event) {
  //  console.log("from attachment card");
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
