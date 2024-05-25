import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const StudentsActions = createActionGroup({
  source: 'Students',
  events: {
    'Load Studentss': emptyProps(),
    'Load Studentss Success': props<{ data: unknown }>(),
    'Load Studentss Failure': props<{ error: unknown }>(),
  }
});
