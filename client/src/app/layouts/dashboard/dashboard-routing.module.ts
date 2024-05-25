import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
  },
  {
    path:'home',
    loadChildren:()=>import('./pages/home/home.module').then((m)=>m.HomeModule)  
  },
  {
    path:'students',
    canActivate:[adminGuard],
    loadChildren:()=>import('./pages/students/students.module').then((m)=>m.StudentsModule)
  },
  {
    path:'courses',
    canActivate:[adminGuard],
    loadChildren:()=>import('./pages/courses/courses.module').then((m)=>m.CoursesModule)
  },
  {
    path:'lessons',
    canActivate:[adminGuard],
    loadChildren:()=>import('./pages/lessons/lessons.module').then((m)=>m.LessonsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
