﻿using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Security.Principal;
using System.Text;

namespace Logistics.Identity
{
    public class ADUser
    {
        public DateTime? AccountExpirationDate { get; set; }
        public DateTime? AccountLockoutTime { get; set; }
        public int BadLogonCount { get; set; }
        public string Description { get; set; }
        public string DisplayName { get; set; }
        public string DistinguishedName { get; set; }
        public string EmailAddress { get; set; }
        public string EmployeeId { get; set; }
        public bool? Enabled { get; set; }
        public string GivenName { get; set; }
        public Guid? Guid { get; set; }
        public string HomeDirectory { get; set; }
        public string HomeDrive { get; set; }
        public DateTime? LastBadPasswordAttempt { get; set; }
        public DateTime? LastLogon { get; set; }
        public DateTime? LastPasswordSet { get; set; }
        public string MiddleName { get; set; }
        public string Name { get; set; }
        public bool PasswordNeverExpires { get; set; }
        public bool PasswordNotRequired { get; set; }
        public string SamAccountName { get; set; }
        public string ScriptPath { get; set; }
        public SecurityIdentifier Sid { get; set; }
        public string Surname { get; set; }
        public bool UserCannotChangePassword { get; set; }
        public string UserPrincipalName { get; set; }
        public string VoiceTelephoneNumber { get; set; }

        public static ADUser CastToADUser(UserPrincipal user)
        {
            return new ADUser
            {
                AccountExpirationDate = user.AccountExpirationDate,
                AccountLockoutTime = user.AccountLockoutTime,
                BadLogonCount = user.BadLogonCount,
                Description = user.Description,
                DisplayName = user.DisplayName,
                DistinguishedName = user.DistinguishedName,
                EmailAddress = user.EmailAddress,
                EmployeeId = user.EmployeeId,
                Enabled = user.Enabled,
                GivenName = user.GivenName,
                Guid = user.Guid,
                HomeDirectory = user.HomeDirectory,
                HomeDrive = user.HomeDrive,
                LastBadPasswordAttempt = user.LastBadPasswordAttempt,
                LastLogon = user.LastLogon,
                LastPasswordSet = user.LastPasswordSet,
                MiddleName = user.MiddleName,
                Name = user.Name,
                PasswordNeverExpires = user.PasswordNeverExpires,
                PasswordNotRequired = user.PasswordNotRequired,
                SamAccountName = user.SamAccountName,
                ScriptPath = user.ScriptPath,
                Sid = user.Sid,
                Surname = user.Surname,
                UserCannotChangePassword = user.UserCannotChangePassword,
                UserPrincipalName = user.UserPrincipalName,
                VoiceTelephoneNumber = user.VoiceTelephoneNumber
            };
        }
    }
}
