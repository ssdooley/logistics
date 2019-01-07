import { IFilter } from "../interfaces";

export class ADUser implements IFilter {

  accountExpirationDate: Date;
  accountLockoutTime: Date;
  badLogonCount: number;
  description: string;
  displayName: string;
  distinguishedName: string;
  emailAddress: string;
  employeeId: string;
  enabled: boolean;
  givenName: string;
  guid: string;
  homeDirectory: string;
  homeDrive: string;
  lastBadPasswordAttempt: Date;
  lastLogon: Date;
  lastPasswordSet: Date;
  middleName: string;
  name: string;
  passwordNeverExpires: boolean;
  passwordNotRequired: boolean;
  samAccountName: string;
  scriptPath: string;
  securityIdentifier: string;
  surname: string;
  userCannotChangePassword: boolean;
  userPrincipalName: string;
  voiceTelephoneNumber: string;

  get filter(): string { return `${this.displayName}` }
}
