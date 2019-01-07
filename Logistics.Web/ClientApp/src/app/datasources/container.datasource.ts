import { MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { IFilter, IContainerService } from '../interfaces';

export class ContainerDataSource<T extends IFilter> {
    filterChange = new BehaviorSubject<string>('');
    filteredData: Array<T> = new Array<T>();
    private service: IContainerService<T>;
    private paginator: MatPaginator;
    get filter(): string { return this.filterChange.value; }
    set filter(filter: string) { this.filterChange.next(filter); }

    initializeDataSource(service: IContainerService<T>, paginator: MatPaginator) {
        this.service = service;
        this.paginator = paginator;
    }

    connect(): Observable<T[]> {
        const displayDataChanges = [
            this.service.data,
            this.filterChange,
            this.paginator.page
        ];
        
        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                    return this.service.data.value ?
                        this.setFilteredData(this.service.data.value) :
                        null;
                })
            );
    }

    setFilteredData = (data: T[]) => {
        this.filteredData = data.slice().filter((item: T) => {
            const searchStr = item.filter.toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        let startIndex = this.paginator.pageIndex * this.paginator.pageSize;

        if (startIndex > this.filteredData.length) {
            startIndex = 0;
            this.paginator.pageIndex = 0;
        }

        return this.filteredData.slice().splice(startIndex, this.paginator.pageSize);
    }
}