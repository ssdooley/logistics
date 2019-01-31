import { Component, Input } from '@angular/core';
import { Attachment } from '../../models';

@Component({
  selector: 'attachment-list',
  templateUrl: 'attachment-list.component.html'
})
export class AttachmentListComponent {
  @Input() files: Attachment[];
}
