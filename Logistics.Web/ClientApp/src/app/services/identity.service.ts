import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from './snacker.service';
import { User, ADUser } from '../models';
import { ContainerDataSource } from '../datasources';
import { IContainerService } from '../interfaces';

@Injectable()
export class IdentityService implements IContainerService<User> {
  hasDataSource = new BehaviorSubject<boolean>(false);
  dataSource = new BehaviorSubject<ContainerDataSource<User>>(new ContainerDataSource<User>());
  get data(): BehaviorSubject<Array<User>> { return this.users }

  private currentUser = new BehaviorSubject<User>(null);
  private adminUsers = new BehaviorSubject<User[]>(null);
  private deletedUsers = new BehaviorSubject<User[]>(null);
  private users = new BehaviorSubject<User[]>(null);
  private domainUsers = new BehaviorSubject<User[]>(null);
  private user = new BehaviorSubject<User>(null);
  private searchUsers = new BehaviorSubject<User[]>(null);
  private sourceUsers = new BehaviorSubject<User[]>(null);

  adminUsers$ = this.adminUsers.asObservable();
  currentUser$ = this.currentUser.asObservable();
  deletedUsers$ = this.deletedUsers.asObservable();
  users$ = this.users.asObservable();
  domainUsers$ = this.domainUsers.asObservable();
  user$ = this.user.asObservable();
  searchUsers$ = this.searchUsers.asObservable();
  sourceUsers$ = this.sourceUsers.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  clearSearchUsers = () => this.searchUsers.next(null);

  setContainerSource(dataSource: ContainerDataSource<User>) {
    this.dataSource.next(dataSource);
    this.hasDataSource.next(true);
  }

  setSourceUsers = (data: User[]) => this.sourceUsers.next(data);

  private mapUser = (u): User => Object.assign(new User(), u);

  getCurrentUser = () => this.http.get<User>('/api/identity/getCurrentUser')
    .subscribe(
      data => this.currentUser.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getUsers = () => this.http.get<User[]>('/api/identity/getUsers')
    .subscribe(
      data => this.users.next(data.map(this.mapUser)),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getAdminUsers = () => this.http.get<User[]>('/api/identity/getAdminUsers')
    .subscribe(
      data => this.adminUsers.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getDeletedUsers = () => this.http.get<User[]>('/api/identity/getDeletedUsers')
    .subscribe(
      data => this.deletedUsers.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getUser = (id: number) => this.http.get<User>(`/api/identity/getUser/${id}`)
    .subscribe(
      data => this.user.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  findDomainUser = (user: string) => this.http.get<User[]>(`/api/identity/findDomainUser/${user}`)
    .subscribe(
      data => this.searchUsers.next(data.map(this.mapUser)),
      err => this.snacker.sendErrorMessage(err.error)
    )

  addUser = (user: ADUser): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/identity/addUser', user)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${user.displayName} successfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  updateUser = (user: User): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/identity/updateUser', user)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${user.username} successfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  toggleUserIsAdmin = (user: User): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/identity/toggleUserIsAdmin', user.id)
        .subscribe(
          () => {
            user.isAdmin ?
              this.snacker.sendSuccessMessage(`Admin permissions removed from ${user.username}`) :
              this.snacker.sendSuccessMessage(`Admin permissions granted to ${user.username}`);

            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  toggleUserIsDeleted = (user: User): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/identity/toggleUserIsDeleted', user.id)
        .subscribe(
          () => {
            user.isDeleted ?
              this.snacker.sendSuccessMessage(`${user.username} successfully restored`) :
              this.snacker.sendSuccessMessage(`${user.username} successfully deleted`);

            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })
}
