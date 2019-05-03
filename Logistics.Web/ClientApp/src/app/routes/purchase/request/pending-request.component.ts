import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { PurchaseRequestService } from '../../../services';
import { Request } from '../../../models';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';


@Component({
  selector: 'pending-request',
  templateUrl: 'pending-request.component.html',
  styleUrls: ['pending-request.component.css']
})
export class PendingRequestComponent implements OnInit {
  requests = new Array<Request>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  displayedColumns: string[] = ['id', 'subject']
  dataSource = new MatTableDataSource<Request>(this.service.dataRequests);

  
  constructor(public service: PurchaseRequestService) { }

  ngOnInit() {
    this.service.getPurchaseRequests();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
