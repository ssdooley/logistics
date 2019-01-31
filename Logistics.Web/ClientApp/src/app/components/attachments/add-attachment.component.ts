import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'add-attachment',
  templateUrl: 'add-attachment.component.html',
  styleUrls: ['add-attachment.component.css']
})
export class AddAttachmentComponent {
  @Output() selected = new EventEmitter<[File[], FormData]>();
  @Output() upload = new EventEmitter();
  @Output() clear = new EventEmitter();
  @Input() uploading = false;
  @Input() files: File[];
}
