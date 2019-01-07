import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from '../snacker.service';
import { Manufacturer } from '../../models';

@Injectable()
export class ManufacturerService {
  private manufacturers = new BehaviorSubject<Manufacturer[]>(null);
  private deletedManufacturers = new BehaviorSubject<Manufacturer[]>(null);
  private manufacturer = new BehaviorSubject<Manufacturer>(null);

  manufacturers$ = this.manufacturers.asObservable();
  deletedManufacturers$ = this.deletedManufacturers.asObservable();
  manufacturer$ = this.manufacturer.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  trackManufacturers = (manufacturer: Manufacturer) => manufacturer.id;

  getManufacturers = () => this.http.get<Manufacturer[]>('/api/manufacturer/getManufacturers')
    .subscribe(
      data => this.manufacturers.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getDeletedManufacturers = () => this.http.get<Manufacturer[]>('/api/manufacturer/getDeletedManufacturers')
    .subscribe(
      data => this.deletedManufacturers.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getManufacturer = (id: number) => this.http.get<Manufacturer>('/api/manufacturer/getManufacturer')
    .subscribe(
      data => this.manufacturer.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  addManufacturer = (manufacturer: Manufacturer): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/manufacturer/addManufacturer', manufacturer)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${manufacturer.name} successfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  updateManufacturer = (manufacturer: Manufacturer): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/manufacturer/updateManufacturer', manufacturer)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${manufacturer.name} successfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  toggleManufacturerDeleted = (manufacturer: Manufacturer): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/manufacturer/toggleManufacturerDeleted', manufacturer.id)
        .subscribe(
          () => {
            manufacturer.isDeleted ?
              this.snacker.sendSuccessMessage(`${manufacturer.name} successfully restored`) :
              this.snacker.sendSuccessMessage(`${manufacturer.name} successfully deleted`);

            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  deleteManufacturer = (manufacturer: Manufacturer): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/manufacturer/deleteManufacturer', manufacturer.id)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${manufacturer.name} permanently deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })
}
