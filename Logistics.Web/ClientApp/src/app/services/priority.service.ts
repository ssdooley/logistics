import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from './snacker.service';
import { Priority } from '../models/priority';

@Injectable()
export class PriorityService {
  private priorities = new BehaviorSubject<Priority[]>(null);
  private deletedPriorities = new BehaviorSubject<Priority[]>(null);
  private priority = new BehaviorSubject<Priority>(null);

  priorities$ = this.priorities.asObservable();
  deletedPriorities$ = this.deletedPriorities.asObservable();
  priority$ = this.priority.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  getPriorities = () => this.http.get<Priority[]>('/api/priority/getPriorities')
    .subscribe(
      data => this.priorities.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getDeletedPriorities = () => this.http.get<Priority[]>('/api/priority/getDeletedPriorities')
    .subscribe(
      data => this.deletedPriorities.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getPriority = (id: number) => this.http.get<Priority>(`/api/priority/getPriority/${id}`)
    .subscribe(
      data => this.priority.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  addPriority = (priority: Priority): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/priority/addPriority', priority)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${priority.label} successfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  updatePriority = (priority: Priority): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/priority/updatePriority', priority)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${priority.label} successfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  togglePriorityDeleted = (priority: Priority): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/priority/togglePriorityDeleted', priority.id)
        .subscribe(
          () => {
            priority.isDeleted ?
              this.snacker.sendSuccessMessage(`${priority.label} successfully restored`) :
              this.snacker.sendSuccessMessage(`${priority.label} successfully deleted`);

            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  deletePriority = (priority: Priority): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/priority/deletePriority', priority.id)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${priority.label} permanently deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })
}
