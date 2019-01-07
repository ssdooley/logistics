import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from '../snacker.service';
import { Site } from '../../models';

@Injectable()
export class SiteService {
  private sites = new BehaviorSubject<Site[]>(null);
  private deletedSites = new BehaviorSubject<Site[]>(null);
  private site = new BehaviorSubject<Site>(null);

  sites$ = this.sites.asObservable();
  deletedSites$ = this.deletedSites.asObservable();
  site$ = this.site.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  trackSites = (site: Site) => site.id;

  getSites = () => this.http.get<Site[]>('/api/site/getSites')
    .subscribe(
      data => this.sites.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getDeletedSites = () => this.http.get<Site[]>('/api/site/getDeletedSites')
    .subscribe(
      data => this.deletedSites.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getSite = (id: number) => this.http.get<Site>(`/api/site/getSite/${id}`)
    .subscribe(
      data => this.site.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  addSite = (site: Site): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/site/addSite', site)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${site.name} successfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  updateSite = (site: Site): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/site/updateSite', site)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${site.name} successfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  toggleSiteDeleted = (site: Site): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/site/toggleSiteDeleted', site.id)
        .subscribe(
          () => {
            site.isDeleted ?
              this.snacker.sendSuccessMessage(`${site.name} successfully restored`) :
              this.snacker.sendSuccessMessage(`${site.name} successfully deleted`);

            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  deleteSite = (site: Site): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/site/deleteSite', site.id)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${site.name} permanently deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })
}
