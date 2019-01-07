import { BehaviorSubject } from 'rxjs';

export interface IService<T> {
    data: BehaviorSubject<Array<T>>;
}