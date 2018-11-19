import { Component, OnInit } from '@angular/core';
import { Theme } from './models';

import {
  IdentityService,
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
    public identity: IdentityService,
    public sidepanel: SidepanelService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.identity.getCurrentUser();
    this.themeService.theme$.subscribe((t: Theme) => this.themeClass = t.name);
  }
}
