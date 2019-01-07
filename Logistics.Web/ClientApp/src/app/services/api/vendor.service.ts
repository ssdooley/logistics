import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from '../snacker.service';
import { Vendor } from '../../models';

@Injectable()
export class VendorService {
  private vendors = new BehaviorSubject<Vendor[]>(null);
  private deletedVendors = new BehaviorSubject<Vendor[]>(null);
  private vendor = new BehaviorSubject<Vendor>(null);

  vendors$ = this.vendors.asObservable();
  deletedVendors$ = this.deletedVendors.asObservable();
  vendor$ = this.vendor.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  trackVendors = (vendors: Vendor) => vendors.id;

  getVendors = () => this.http.get<Vendor[]>('/api/vendor/getVendors')
    .subscribe(
      data => this.vendors.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getDeletedVendors = () => this.http.get<Vendor[]>('/api/vendor/getDeletedVendors')
    .subscribe(
      data => this.deletedVendors.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getVendor = (id: number) => this.http.get<Vendor>(`/api/vendor/getVendor/${id}`)
    .subscribe(
      data => this.vendor.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  addVendor = (vendor: Vendor): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/vendor/addVendor', vendor)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${vendor.name} successfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  updateVendor = (vendor: Vendor): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/vendor/updateVendor', vendor)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${vendor.name} successfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  toggleVendorDeleted = (vendor: Vendor): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/vendor/toggleVendorDeleted', vendor.id)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${vendor.name} successfully ${vendor.isDeleted ? 'restored' : 'deleted'}`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  deleteVendor = (vendor: Vendor): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/vendor/deleteVendor', vendor.id)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${vendor.name} permanently deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })
}
