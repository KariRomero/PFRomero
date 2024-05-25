import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonsComponent } from './lessons.component';
import { SharedModule } from '../../../../shared/shared.module';
import { LessonsDialogComponent } from './lessons-dialog/lessons-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { LessonEffects } from './store/lesson.effects';
import { StoreModule } from '@ngrx/store';
import { lessonFeature } from './store/lesson.reducer';


@NgModule({
  declarations: [
    LessonsComponent,
    LessonsDialogComponent
  ],
  imports: [
    CommonModule,
    LessonsRoutingModule,
    SharedModule,
    StoreModule.forFeature(lessonFeature),
    EffectsModule.forFeature([LessonEffects])
  ]
})
export class LessonsModule { }
