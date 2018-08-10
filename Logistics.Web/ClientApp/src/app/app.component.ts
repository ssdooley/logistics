import { Component, OnInit } from '@angular/core';
import { SidepanelService } from './services/sidepanel.service';
import { ThemeService } from './services/theme.service';
import { Theme } from './models/theme';

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
