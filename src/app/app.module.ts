import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { BlogsService } from './blogs-list/blogs.service';
import { EditBlogComponent } from './edit-blog/edit-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    BlogsListComponent,
    EditBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    BlogsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
