import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IStudent } from './pages/students/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  authUser$: Observable<IStudent | null>;

  constructor(
    private authService : AuthService,
    private router:Router
  ){
    this.authUser$ = this.authService.authUser$;
  }

  logOut():void{
    this.authService.logOut();
    this.router.navigate(['dashboard','home'])
  }
}
