import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'about',
    component: AboutComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'contact',
    component: ContactComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
