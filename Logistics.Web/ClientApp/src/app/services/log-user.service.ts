import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from './snacker.service';
import { LogUser } from '../models/log-user';

@Injectable()
export class LogUserService {
  private logUsers = new BehaviorSubject<LogUser[]>(null);
  private siteLogUsers = new BehaviorSubject<LogUser[]>(null);
  private logUserSites = new BehaviorSubject<LogUser[]>(null);
  private logUser = new BehaviorSubject<LogUser>(null);

  logUsers$ = this.logUsers.asObservable();
  siteLogUsers$ = this.siteLogUsers.asObservable();
  logUserSites$ = this.logUserSites.asObservable();
  logUser$ = this.logUser.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  getLogUsers = () => this.http.get<LogUser[]>('/api/logUser/getLogUsers')
    .subscribe(
      data => this.logUsers.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getSiteLogUsers = (siteId: number) => this.http.get<LogUser[]>(`/api/logUser/getSiteLogUsers/${siteId}`)
    .subscribe(
      data => this.siteLogUsers.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getLogUserSites = (userId: number) => this.http.get<LogUser[]>(`/api/logUser/getLogUserSites/${userId}`)
    .subscribe(
      data => this.logUserSites.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getLogUser = (siteId: number, userId: number) => this.http.get<LogUser>(`/api/logUser/getLogUser/${siteId}/${userId}`)
    .subscribe(
      data => this.logUser.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  addLogUser = (logUser: LogUser): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/logUser/addLogUser', logUser)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${logUser.user.username} added as logistician for site ${logUser.site.name}`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  updateLogUser = (logUser: LogUser): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/logUser/updateLogUser', logUser)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${logUser.user.username} updated as logistician for site ${logUser.site.name}`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  removeLogUser = (logUser: LogUser): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/logUser/removeLogUser', logUser.id)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${logUser.user.username} removed as logistician for site ${logUser.site.name}`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })
}
