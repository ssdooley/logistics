import { Component, OnInit } from '@angular/core';
import { PriorityService } from '../../../services';

@Component({
  selector: 'admin-priorities',
  templateUrl: 'admin-priorities.component.html',
  providers: [ PriorityService ]
})
export class AdminPrioritiesComponent implements OnInit {
  constructor(
    public service: PriorityService
  ) { }

  ngOnInit() {
    this.service.getPriorities();
  }
}
