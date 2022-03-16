import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditBlogComponent } from '../edit-blog/edit-blog.component';
import { EditBlogDialogData, EditBlogDialogResult } from '../edit-blog/edit-blog.models';
import { Blog } from './blogs-list.models';
import { BlogsService } from './blogs.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent implements OnInit, OnDestroy {

  blogs?: Blog[];

  private subscriptions = new Subscription();

  constructor(private blogsService: BlogsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getBlogs(): void {
    this.subscriptions.add(
      this.blogsService.getBlogs().subscribe((blogs) => {
        this.blogs = blogs;
      })
    );
  }

  addNewBlog(): void {
    const blog: Blog = {
      id: 0,
      title: 'Representation Matters: Inaugural Chubby Diaries Travel Awards',
      subtitle: 'Representation Matters: Inaugural Chubby Diaries Travel Awards Chubby Diaries is happy to announce that we are presenting the first ever Inaugural Chubby Diaries Travel Awards, the',
      image: './assets/img/blog-logo.png',
      date: '3/3/2022',
    };

    this.subscriptions.add(
      this.blogsService.addBlog(blog).subscribe((_) => {
        this.getBlogs();
      })
    );
  }

  editBlog(blog: Blog): void {
    const data: EditBlogDialogData = {
      blog,
    };
    const dialogRef = this.dialog.open(EditBlogComponent, {
      data,
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result?: EditBlogDialogResult) => {
        if (result?.refresh) this.getBlogs();
      })
    );
  }

  removeBlog(blog: Blog): void {
    this.subscriptions.add(
      this.blogsService.removeBlog(blog).subscribe((blogs) => {
        this.blogs = blogs;
      })
    );
  }
}
