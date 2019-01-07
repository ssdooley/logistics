import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from '../snacker.service';
import { AuthorizedRegulation } from '../../models';

@Injectable()
export class AuthorizedRegulationService {
  private authorizedRegulations = new BehaviorSubject<AuthorizedRegulation[]>(null);
  private deletedAuthorizedRegulations = new BehaviorSubject<AuthorizedRegulation[]>(null);
  private authorizedRegulation = new BehaviorSubject<AuthorizedRegulation>(null);

  authorizedRegulations$ = this.authorizedRegulations.asObservable();
  deletedAuthorizedRegulations$ = this.deletedAuthorizedRegulations.asObservable();
  authorizedRegulation$ = this.authorizedRegulation.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  trackAuthorizedRegulations = (authorizedRegulation: AuthorizedRegulation) => authorizedRegulation.id;

  getAuthorizedRegulations = () => this.http.get<AuthorizedRegulation[]>('/api/authorizedRegulation/getAuthorizedRegulations')
    .subscribe(
    data => this.authorizedRegulations.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getDeletedAuthorizedRegulations = () => this.http.get<AuthorizedRegulation[]>('/api/authorizedRegulation/getDeletedAuthorizedRegulations')
    .subscribe(
    data => this.deletedAuthorizedRegulations.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getAuthorizedRegulation = (id: number) => this.http.get<AuthorizedRegulation>(`/api/authorizedRegulation/getAuthorizedRegulation/${id}`)
    .subscribe(
    data => this.authorizedRegulation.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  addAuthorizedRegulations = (authorizedRegulation: AuthorizedRegulation): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/authorizedRegulation/addAuthorizedRegulation', authorizedRegulation)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${authorizedRegulation.name} successfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  updateAuthorizedRegulation = (authorizedRegulation: AuthorizedRegulation): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/authorizedRegulation/updateAuthorizedRegulation', authorizedRegulation)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${authorizedRegulation.name} successfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  toggleAuthorizedRegulationDeleted = (authorizedRegulation: AuthorizedRegulation): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/authorizedRegulation/toggleAuthorizedRegulationDeleted', authorizedRegulation.id)
        .subscribe(
          () => {
            authorizedRegulation.isDeleted ?
              this.snacker.sendSuccessMessage(`${authorizedRegulation.name} successfully restored`) :
              this.snacker.sendSuccessMessage(`${authorizedRegulation.name} successfully deleted`);

            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  deleteAuthorizedRegulation = (authorizedRegulation: AuthorizedRegulation): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/authorizedRegulation/deleteAuthorizedRegulation', authorizedRegulation.id)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${authorizedRegulation.name} permanently deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })
}
