import { IFilter } from '.';
import { ContainerDataSource } from '../datasources';
import { BehaviorSubject } from 'rxjs';

export interface IContainerService<T extends IFilter> {
    data: BehaviorSubject<Array<T>>;
    setContainerSource(dataSource: ContainerDataSource<T>): void;
}
