import { Component, OnInit } from '@angular/core';
import { Theme } from './models';

import {
  SidepanelService,
  ThemeService
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  themeClass = 'default';

  constructor(
    public sidepanel: SidepanelService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.theme$.subscribe((t: Theme) => this.themeClass = t.name);
  }
}
