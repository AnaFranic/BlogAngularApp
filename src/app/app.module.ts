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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { MatIconModule } from '@angular/material/icon';
import { BlogListPageComponent } from './blog-list-page/blog-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    BlogsListComponent,
    EditBlogComponent,
    BlogPageComponent,
    BlogListPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    BlogsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
