import { Component, Input } from '@angular/core';
import { Attachment } from '../../models/attachment';

@Component({
  selector: 'attachment-card',
  templateUrl: 'attachment-card.component.html',
  styleUrls: ['attachment-card.component.css']
})
export class AttachmentCardComponent {
  @Input() file = new Attachment();
}
