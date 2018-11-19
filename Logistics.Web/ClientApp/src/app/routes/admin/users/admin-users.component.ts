import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../../../services';

@Component({
  selector: 'admin-users',
  templateUrl: 'admin-users.component.html',
})
export class AdminUsersComponent implements OnInit {
  constructor(
    public service: IdentityService
  ) { }

  ngOnInit() {
    this.service.getUsers();
  }
}
