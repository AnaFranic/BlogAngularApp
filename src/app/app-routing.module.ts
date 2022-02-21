import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'blogs-list',
    component: BlogsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
