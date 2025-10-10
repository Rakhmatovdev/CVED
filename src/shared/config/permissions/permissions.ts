export const Permissions = {
  AllowAll: "allow_all",
  Visa: {
    Visa: {
      View: "visa.view_visa",
      Add: "visa.add_visa",
      Change: "visa.change_visa",
      Delete: "visa.delete_visa"
    },
    VisaType: {
      View: "visa.view_visatype",
      Add: "visa.add_visatype",
      Change: "visa.change_visatype",
      Delete: "visa.delete_visatype"
    }
  },
  Violations: {
    ImmigrantViolations: {
      View: "violations.view_immigrantviolations",
      Add: "violations.add_immigrantviolations",
      Change: "violations.change_immigrantviolations",
      Delete: "violations.delete_immigrantviolations"
    },
    Violations: {
      View: "violations.view_violations",
      Add: "violations.add_violations",
      Change: "violations.change_violations",
      Delete: "violations.delete_violations"
    }
  },
  Integrations: {
    ImmigrantPlacement: {
      View: "integrations.view_immigrantplacement",
      Add: "integrations.add_immigrantplacement",
      Change: "integrations.change_immigrantplacement",
      Delete: "integrations.delete_immigrantplacement"
    },
    ImmigrantPlacementHistory: {
      View: "integrations.view_immigrantplacementhistory",
      Add: "integrations.add_immigrantplacementhistory",
      Change: "integrations.change_immigrantplacementhistory",
      Delete: "integrations.delete_immigrantplacementhistory"
    },
    Placement: {
      View: "integrations.view_placement",
      Add: "integrations.add_placement",
      Change: "integrations.change_placement",
      Delete: "integrations.delete_placement",
      Manage: "integrations.manage_placement"
    },
    PlacementType: {
      View: "integrations.view_placementtype",
      Add: "integrations.add_placementtype",
      Change: "integrations.change_placementtype",
      Delete: "integrations.delete_placementtype"
    }
  },
  Auth: {
    Group: {
      View: "auth.view_group",
      Add: "auth.add_group",
      Change: "auth.change_group",
      Delete: "auth.delete_group"
    },
    Permission: {
      View: "auth.view_permission",
      Add: "auth.add_permission",
      Change: "auth.change_permission",
      Delete: "auth.delete_permission"
    }
  },
  Helpers: {
    Nationality: {
      View: "helpers.view_nationality",
      Add: "helpers.add_nationality",
      Change: "helpers.change_nationality",
      Delete: "helpers.delete_nationality"
    },
    District: {
      View: "helpers.view_district",
      Add: "helpers.add_district",
      Change: "helpers.change_district",
      Delete: "helpers.delete_district"
    },
    PlacementType: {
      View: "helpers.view_placementtype",
      Add: "helpers.add_placementtype",
      Change: "helpers.change_placementtype",
      Delete: "helpers.delete_placementtype"
    },
    CrossingPoint: {
      View: "helpers.view_crossingpoint",
      Add: "helpers.add_crossingpoint",
      Change: "helpers.change_crossingpoint",
      Delete: "helpers.delete_crossingpoint"
    },
    Country: {
      View: "helpers.view_country",
      Add: "helpers.add_country",
      Change: "helpers.change_country",
      Delete: "helpers.delete_country"
    },
    HistoryModule: {
      View: "helpers.view_historymodule",
      Add: "helpers.add_historymodule",
      Change: "helpers.change_historymodule",
      Delete: "helpers.delete_historymodule"
    },
    TransportType: {
      View: "helpers.view_transporttype",
      Add: "helpers.add_transporttype",
      Change: "helpers.change_transporttype",
      Delete: "helpers.delete_transporttype"
    },
    Holiday: {
      View: "helpers.view_holiday",
      Add: "helpers.add_holiday",
      Change: "helpers.change_holiday",
      Delete: "helpers.delete_holiday"
    },
    TripPurpose: {
      View: "helpers.view_trippurpose",
      Add: "helpers.add_trippurpose",
      Change: "helpers.change_trippurpose",
      Delete: "helpers.delete_trippurpose"
    },
    Region: {
      View: "helpers.view_region",
      Add: "helpers.add_region",
      Change: "helpers.change_region",
      Delete: "helpers.delete_region"
    },
    Organization: {
      View: "helpers.view_organization",
      Add: "helpers.add_organization",
      Change: "helpers.change_organization",
      Delete: "helpers.delete_organization"
    },
    ActionLog: {
      View: "helpers.view_actionlog",
      Add: "helpers.add_actionlog",
      Change: "helpers.change_actionlog",
      Delete: "helpers.delete_actionlog"
    }
  },
  Users: {
    User: {
      View: "users.view_user",
      Add: "users.add_user",
      Change: "users.change_user",
      Delete: "users.delete_user"
    },
    PermissionCategory: {
      View: "users.view_permissioncategory",
      Add: "users.add_permissioncategory",
      Change: "users.change_permissioncategory",
      Delete: "users.delete_permissioncategory"
    },
    PermissionExtension: {
      View: "users.view_permissionextension",
      Add: "users.add_permissionextension",
      Change: "users.change_permissionextension",
      Delete: "users.delete_permissionextension"
    },
    Groups: {
      Add: "users.x_add_groups",
      Delete: "users.x_delete_groups",
      Change: "users.x_change_groups",
      View: "users.x_view_groups"
    },
    Employees: {
      Add: "users.x_add_employees",
      Delete: "users.x_delete_employees",
      Change: "users.x_change_employees",
      View: "users.x_view_employees"
    }
  },
  Immigrants: {
    Immigrant: {
      View: "immigrants.view_immigrant",
      Add: "immigrants.add_immigrant",
      Change: "immigrants.change_immigrant",
      Delete: "immigrants.delete_immigrant",
      Create: "immigrants.x_create_immigrants",
      List: "immigrants.x_list_immigrants",
      Detail: "immigrants.x_detail_immigrants",
      ChangeData: "immigrants.x_change_immigrants"
    },
    UnidentifiedImmigrant: {
      View: "immigrants.view_unidentifiedimmigrant",
      Add: "immigrants.add_unidentifiedimmigrant",
      Change: "immigrants.change_unidentifiedimmigrant",
      Delete: "immigrants.delete_unidentifiedimmigrant",
      Create: "immigrants.x_create_unidentified_immigrants",
      List: "immigrants.x_list_unidentified_immigrants",
      Detail: "immigrants.x_detail_unidentified_immigrants"
    },
    ImmigrantPassportData: {
      View: "immigrants.view_immigrantpassportdata",
      Add: "immigrants.add_immigrantpassportdata",
      Change: "immigrants.change_immigrantpassportdata",
      Delete: "immigrants.delete_immigrantpassportdata"
    },
    ImmigrantHistory: {
      View: "immigrants.view_immigranthistory",
      Add: "immigrants.add_immigranthistory",
      Change: "immigrants.change_immigranthistory",
      Delete: "immigrants.delete_immigranthistory"
    },
    ImmigrationRecord: {
      View: "immigrants.view_immigrationrecord",
      Add: "immigrants.add_immigrationrecord",
      Change: "immigrants.change_immigrationrecord",
      Delete: "immigrants.delete_immigrationrecord"
    },
    ImmigrantFingerprintImages: {
      View: "immigrants.view_immigrantfingerprintimages",
      Add: "immigrants.add_immigrantfingerprintimages",
      Change: "immigrants.change_immigrantfingerprintimages",
      Delete: "immigrants.delete_immigrantfingerprintimages"
    },
    ImmigrantBorderRecord: {
      View: "immigrants.view_immigrantborderrecord",
      Add: "immigrants.add_immigrantborderrecord",
      Change: "immigrants.change_immigrantborderrecord",
      Delete: "immigrants.delete_immigrantborderrecord",
      History: "immigrants.history_of_border_crossing"
    },
    UnidentifiedImmigrantEntryRecord: {
      View: "immigrants.view_unidentifiedimmigrantentryrecord",
      Add: "immigrants.add_unidentifiedimmigrantentryrecord",
      Change: "immigrants.change_unidentifiedimmigrantentryrecord",
      Delete: "immigrants.delete_unidentifiedimmigrantentryrecord"
    },
    BiometricMatchActionRule: {
      View: "immigrants.view_biometricmatchactionrule",
      Add: "immigrants.add_biometricmatchactionrule",
      Change: "immigrants.change_biometricmatchactionrule",
      Delete: "immigrants.delete_biometricmatchactionrule"
    }
  },
  Applications: {
    Requests: {
      View: "applications.view_requests",
      Add: "applications.add_requests",
      Change: "applications.change_requests",
      Delete: "applications.delete_requests",
      Create: "applications.x_create_requests",
      List: "applications.x_list_requests",
      Detail: "applications.x_detail_requests",
      ChangeData: "applications.x_change_requests",
      Attach: "applications.x_attach_requests",
      CancelAttach: "applications.x_cancel_attach_requests"
    },
    RequestSpotentialSimilar: {
      View: "applications.view_requestspotentialsimilar",
      Add: "applications.add_requestspotentialsimilar",
      Change: "applications.change_requestspotentialsimilar",
      Delete: "applications.delete_requestspotentialsimilar"
    }
  },
  DjangoCeleryBeat: {
    PeriodicTask: {
      View: "django_celery_beat.view_periodictask",
      Add: "django_celery_beat.add_periodictask",
      Change: "django_celery_beat.change_periodictask",
      Delete: "django_celery_beat.delete_periodictask"
    },
    PeriodicTasks: {
      View: "django_celery_beat.view_periodictasks",
      Add: "django_celery_beat.add_periodictasks",
      Change: "django_celery_beat.change_periodictasks",
      Delete: "django_celery_beat.delete_periodictasks"
    },
    CrontabSchedule: {
      View: "django_celery_beat.view_crontabschedule",
      Add: "django_celery_beat.add_crontabschedule",
      Change: "django_celery_beat.change_crontabschedule",
      Delete: "django_celery_beat.delete_crontabschedule"
    },
    IntervalSchedule: {
      View: "django_celery_beat.view_intervalschedule",
      Add: "django_celery_beat.add_intervalschedule",
      Change: "django_celery_beat.change_intervalschedule",
      Delete: "django_celery_beat.delete_intervalschedule"
    },
    ClockedSchedule: {
      View: "django_celery_beat.view_clockedschedule",
      Add: "django_celery_beat.add_clockedschedule",
      Change: "django_celery_beat.change_clockedschedule",
      Delete: "django_celery_beat.delete_clockedschedule"
    },
    SolarSchedule: {
      View: "django_celery_beat.view_solarschedule",
      Add: "django_celery_beat.add_solarschedule",
      Change: "django_celery_beat.change_solarschedule",
      Delete: "django_celery_beat.delete_solarschedule"
    }
  },
  Sessions: {
    Session: {
      View: "sessions.view_session",
      Add: "sessions.add_session",
      Change: "sessions.change_session",
      Delete: "sessions.delete_session"
    }
  },
  ContentTypes: {
    ContentType: {
      View: "contenttypes.view_contenttype",
      Add: "contenttypes.add_contenttype",
      Change: "contenttypes.change_contenttype",
      Delete: "contenttypes.delete_contenttype"
    }
  },
  Admin: {
    LogEntry: {
      View: "admin.view_logentry",
      Add: "admin.add_logentry",
      Change: "admin.change_logentry",
      Delete: "admin.delete_logentry"
    }
  }
} as const;

type PermissionValue<T> = T extends Record<string, any>
  ? PermissionValue<T[keyof T]>
  : T;

export type PermissionString = PermissionValue<typeof Permissions>;
