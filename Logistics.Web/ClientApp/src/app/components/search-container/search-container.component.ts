import { MatPaginator } from '@angular/material';
import { fromEvent } from 'rxjs';
import { ContainerDataSource } from '../../datasources';
import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IFilter, IContainerService } from '../../interfaces';

@Component({
    selector: 'search-container',
    templateUrl: 'search-container.component.html'
})
export class SearchContainerComponent implements OnInit { 
    @Input() service: IContainerService<IFilter>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    dataSource: ContainerDataSource<IFilter> | null;

    ngOnInit() {
        this.dataSource = new ContainerDataSource<IFilter>();
        this.dataSource.initializeDataSource(this.service, this.paginator);
        this.service. setContainerSource(this.dataSource);
        fromEvent(this.filter.nativeElement, 'keyup')
        .pipe(
            debounceTime(250),
            distinctUntilChanged()
        ).subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
        });
        
    }
}