import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../../../services/identity.service';

@Component({
  selector: 'admin-users',
  templateUrl: 'admin-users.component.html',
  providers: [ IdentityService ]
})
export class AdminUsersComponent implements OnInit {
  constructor(
    public service: IdentityService
  ) { }

  ngOnInit() {
    this.service.getUsers();
  }
}
