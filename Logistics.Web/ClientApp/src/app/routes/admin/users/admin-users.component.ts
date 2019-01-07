import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { IdentityService } from '../../../services';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { User, ADUser } from '../../../models';
import { ConfirmDialog, UserBinDialog } from '../../../dialogs';

@Component({
  selector: 'admin-users',
  templateUrl: 'admin-users.component.html',
})
export class AdminUsersComponent implements OnInit {
  @ViewChild('search') search: ElementRef;
  debounce = false;
  saving = false;


  constructor(
    public service: IdentityService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getUsers();

    this.service.hasDataSource.subscribe(bool => {
      if (bool) {
        this.service.dataSource.subscribe(source => {
          source.connect().subscribe(data => {
            this.service.setSourceUsers(data);
          });
        });
      }
    });

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.search.nativeElement.value && this.search.nativeElement.value.length > 0) {
          this.debounce = true;
          this.service.findDomainUser(this.search.nativeElement.value);
        } else {
          this.debounce = false;
          this.service.clearSearchUsers();
        }
      });
  }

  async addUser(u: ADUser) {
    this.saving = true;
    const res = await this.service.addUser(u);
    this.saving = false;

    if (res) {
      this.service.getUsers();
      this.search.nativeElement.value = null;
      this.search.nativeElement.focus();
      this.debounce = false;
      this.service.clearSearchUsers();
    }
  }

  async updateUser(u: User) {
    const res = await this.service.updateUser(u);
    if (res) {
      this.service.getUsers();
    }
  }

  async toggleIsAdmin(user: User) {
    const res = await this.service.toggleUserIsAdmin(user);
    if (res) {
      this.service.getUsers();
    }
  }

  toggleUserDeleted(user: User) {
    this.dialog.open(ConfirmDialog)
      .afterClosed()
      .subscribe(async result => {
        if (result) {
          const res = await this.service.toggleUserIsDeleted(user);
          if (res) {
            this.service.getUsers();
          }
        }
      });
  }

  showUserBin() {
    this.dialog.open(UserBinDialog, {
      data: this.service, width: '420px'
    })
      .afterClosed()
      .subscribe(() => this.service.getUsers());
  }
}
