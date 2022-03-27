import { Component, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, Observable, share, Subscription, switchMap } from 'rxjs';
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
  @Input() allowEdit = false;
  @Input() maxItems = 100;

  blogs$: Observable<Blog[] | undefined> | undefined;

  private refresh$ = new BehaviorSubject<void>(undefined);
  private subscriptions = new Subscription();

  constructor(
    private blogsService: BlogsService,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    this.blogs$ = this.refresh$.pipe(
      switchMap(() => this.blogsService.getBlogs()),
      map(blogs => blogs.sort((blog1, blog2) => {
        const date1 = new Date(blog1.date).toISOString();
        const date2 = new Date(blog2.date).toISOString();
        return date1.localeCompare(date2);
      })),
      share(),
    );
  }

  ngOnDestroy(): void {
    this.refresh$.complete();
    this.subscriptions.unsubscribe();
  }

  trackBlogs(index: number, blog: Blog): number {
    return blog.id;
  }

  createBlog(): void {
    this.editBlog();
  }

  editBlog(blog?: Blog): void {
    const data: EditBlogDialogData = {
      blog,
    };
    const dialogRef = this.dialog.open(EditBlogComponent, {
      data,
      autoFocus: false,
      viewContainerRef: this.viewContainerRef,
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result?: EditBlogDialogResult) => {
        if (result?.refresh) this.refresh$.next();
      }),
    );
  }

  deleteBlog(blog: Blog): void {
    this.subscriptions.add(
      this.blogsService.deleteBlog(blog).subscribe(() => this.refresh$.next()),
    );
  }
}
