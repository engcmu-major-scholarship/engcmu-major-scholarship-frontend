export enum Api {
  APPLICATION = '/application',
  APPLICATION_SUBMIT = '/application/submit',
  APPLICATION_HISTORY = '/application/history',
  CURRENT_YEAR_APPLICATION = '/application/current-year',
  RECIPIENT = '/application/recipient',
  CONSIDER = '/application/consider',
  APPROVE = '/application/approve',

  SCHOLARSHIP = '/scholarship',
  APPLYABLE_SCHOLARSHIP = '/scholarship/applyable',

  ANNOUNCEMENT = '/announcement',

  SETTING = '/setting',
  CURRENT_YEAR_SEMESTER = '/setting/current-year-semester',
  YEARS_SEMESTERS = '/setting/years-and-semesters',

  STUDENT = '/student',

  ADVISOR = '/advisor',

  SIGNIN = '/auth/signin',
  RESOLVE_TOKEN = '/auth/resolve-token',
}
