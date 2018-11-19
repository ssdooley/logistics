import { CoreService } from './core.service';
import { IdentityService } from './identity.service';
import { ObjectMapService } from './object-map.service';
import { SidepanelService } from './sidepanel.service';
import { SnackerService } from './snacker.service';
import { ThemeService } from './theme.service';

export const Services = [
  CoreService,
  IdentityService,
  ObjectMapService,
  SidepanelService,
  SnackerService,
  ThemeService
];

export * from './core.service';
export * from './identity.service';
export * from './object-map.service';
export * from './sidepanel.service';
export * from './snacker.service';
export * from './theme.service';
export * from './api/item-category.service';
export * from './api/log-user.service';
export * from './api/manufacturer.service';
export * from './api/priority.service';
export * from './api/site.service';
export * from './api/vendor.service';
