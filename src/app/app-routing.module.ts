import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListPageComponent } from './blog-list-page/blog-list-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
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
    path: 'blogs',
    component: BlogListPageComponent,
  },
  {
    path: 'blogs/:id',
    component: BlogPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
