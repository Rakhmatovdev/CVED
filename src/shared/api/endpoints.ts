export type Endpoint<T> = {
  url: string;
  type?: T;
};

export const endpoints = {
  auth: {
    signIn: "/users/sign-in/",
    refresh: "/users/refresh/"
  },
  users: {
    base: "/users/",
    groups: "/users/groups/",
    me: "/users/me/",
    roles: "/users/roles/",
    permissions: "/users/permissions/",
    attach_permission: "/attach-permission/",
    change_password: "/users/change-password/",
    attach_group: "/attach-group/",
    user_groups: "/user-groups/"
  },
  immigrants: {
    base: "/immigrants/",
    add: "/immigrants/add/",
    get: "/immigrants/get",
    uppas: "/update-passport/",
    update: "/update/",
    crossing: "/crossing-history/",
    unidentify: "/immigrants/unidentified-immigrants/",
    record: "/entry-record-list/",
    kogg: "/immigrants/kogg/",
    face_of: "/immigrants/check-photo-of-face/",
    entered_passport: "/immigrants/entered-passport/",
    temporary_registrations: "/registrations/temporary-registrations",
    passport: "/immigrants/search-passport/"
  },
  reports: {
    by_age: "reports/by-age/",
    monthly: "reports/monthly-summary/"
  },
  helpers: {
    bottom: "/helpers/dashboard/bottom-stream-statistics/",
    middle: "/helpers/dashboard/middle-statistics/",
    top: "/helpers/dashboard/top-statistics/",
    county: "helpers/countries/",
    nationality: "helpers/nationalities/",
    regions: "/helpers/regions/",
    districts: "/helpers/districts/",
    actions: "/logs/action-logs/",
    privilege: "/helpers/privilege/",
    holidays: { base: { url: "/helpers/holidays/" } },
    bordering_point: "/helpers/crossing-points/"
  },
  visa: {
    post: "/visa/import-data/",
    requests: "/visa/visa-requests/",
    requestsByPassport: "/visa/visa-requests/by-passport/:passportId",
    requestsSubmit: "/visa/visa-requests/:id/submit/",
    requestFiles: "/visa/visa-request-files/",
    organizations: "/visa/organizations/",
    types: "/visa/visa-types/"
  },
  applications: "/applications/requests/",
  application: {
    cancel: "/cancel-attach-from-request/",
    get: "/applications/requests/"
  },
  connectId: {
    post: "/immigrants/",
    attach: "/attach-immigrant-passport/",
    cancel: "/cancel-attach-immigrant-passport/"
  },
  directory: {
    roomTypes: "/room-types/"
  },
  holidays: "/helpers/holidays",
  hotels: {
    get: "/hotels"
  },
  residence_permit: {
    base: { url: "/immigrants/get/" }
  }
};
