import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateLessonPayload, ILesson } from '../models';

export const LessonActions = createActionGroup({
  source: 'Lesson',
  events: {
    'Load Lessons': emptyProps(),
    'Load Lessons Success': props<{ data: ILesson[] }>(),
    'Load Lessons Failure': props<{ error: unknown }>(),

    'Create Lesson': props<{ payload: CreateLessonPayload }>(),
    'Create Lesson Success': props<{ data: ILesson }>(),
    'Create Lesson Failure': props<{ error: unknown }>(),

    'Update Lesson': props<{ id: number, payload: Partial<ILesson> }>(),
    'Update Lesson Success': props<{ data: ILesson }>(),
    'Update Lesson Failure': props<{ error: unknown }>(),

    'Delete Student By Id': props<{ id:number }>(),
    'Delete Student By Id Success': props<{ data: ILesson }>(),
    'Delete Students By Id Failure': props<{ error: unknown }>(),
  }
});
