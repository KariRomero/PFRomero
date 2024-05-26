import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map, startWith } from 'rxjs';
import { IStudent } from './pages/students/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  authUser$: Observable<IStudent | null>;

  routeData$:Observable<Data | undefined>;

  constructor(
    private authService : AuthService,
    private router:Router,
    private route:ActivatedRoute
  ){
    this.authUser$ = this.authService.authUser$;
    this.routeData$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.route;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.data;
      }),
      startWith(this.route.snapshot.data)
    );
  }

  logOut():void{
    this.authService.logOut();
    this.router.navigate(['dashboard','home'])
  }
}
