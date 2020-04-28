import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { AgendaComponent } from './agenda.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: AgendaComponent,
    children: [
      { path: '', redirectTo: 'calendar', pathMatch: 'full' },
      {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

export const AgendaRoutingModule = RouterModule.forChild(routes);
