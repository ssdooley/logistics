import { SanitizeUrlPipe } from './sanitize-url.pipe';
import { TruncatePipe } from './truncate.pipe';

export const Pipes = [
  SanitizeUrlPipe,
  TruncatePipe
];

export * from './sanitize-url.pipe';
export * from './truncate.pipe';
