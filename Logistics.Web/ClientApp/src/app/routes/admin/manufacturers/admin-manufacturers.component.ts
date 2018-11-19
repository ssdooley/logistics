import { Component, OnInit } from '@angular/core';
import { ManufacturerService } from '../../../services';

@Component({
  selector: 'admin-manufacturers',
  templateUrl: 'admin-manufacturers.component.html',
  providers: [ ManufacturerService ]
})
export class AdminManufacturersComponent implements OnInit {
  constructor(
    public service: ManufacturerService
  ) { }

  ngOnInit() {
    this.service.getManufacturers();
  }
}
