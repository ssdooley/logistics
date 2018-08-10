import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidepanelService {
  private states: string[] = [
    'collapse',
    'thin',
    'full'
  ];

  private statesSubject = new BehaviorSubject<string[]>(this.states);
  private state = new BehaviorSubject<string>(this.statesSubject.value[1]);

  state$ = this.state.asObservable();
  states$ = this.statesSubject.asObservable();

  toggleState() {
    const index = this.states.indexOf(this.state.value);

    index === this.states.length - 1 ?
      this.state.next(this.states[0]) :
      this.state.next(this.states[index + 1]);
  }
}
