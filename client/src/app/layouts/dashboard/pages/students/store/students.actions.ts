import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateStudentPayload, IStudent } from '../models';

export const StudentsActions = createActionGroup({
  source: 'Students',
  events: {
    'Load Studentss': emptyProps(),
    'Load Studentss Success': props<{ data: IStudent[] }>(),
    'Load Studentss Failure': props<{ error: unknown }>(),
  
    'Create Student': props<{ payload: CreateStudentPayload }>(),
    'Create Student Success': props<{ data: IStudent }>(),
    'Create Student Failure': props<{ error: unknown }>(),

    'Update Student': props<{ id: number, payload: Partial<IStudent> }>(),
    'Update Student Success': props<{ data: IStudent }>(),
    'Update Student Failure': props<{ error: unknown }>(),
    
    'Delete Student By Id': props<{ id:number }>(),
    'Delete Student By Id Success': props<{ data: IStudent }>(),
    'Delete Students By Id Failure': props<{ error: unknown }>(),
  }
});
