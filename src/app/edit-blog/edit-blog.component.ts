import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Blog } from '../blogs-list/blogs-list.models';
import { BlogsService } from '../blogs-list/blogs.service';
import { EditBlogDialogData, EditBlogDialogResult } from './edit-blog.models';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  form: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: EditBlogDialogData,
    private dialogRef: MatDialogRef<EditBlogComponent>,
    private blogsService: BlogsService,
  ) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
  }

  closeDialog(result?: EditBlogDialogResult) {
    this.dialogRef.close(result);
  }

  save() {
    this.form.disable();

    const placeholderId = -1;
    const blog: Blog = {
      id: this.data.blog?.id ?? placeholderId,
      title: this.form.controls['title'].value,
      subtitle: this.form.controls['subtitle'].value,
      image: this.form.controls['image'].value,
      content: this.form.controls['content'].value,
      date: new Date().toJSON(),
    };

    const createOrUpdate$ = blog.id === placeholderId
      ? this.blogsService.createBlog(blog)
      : this.blogsService.updateBlog(blog);

    this.subscriptions.add(
      createOrUpdate$.subscribe(() => {
        const result: EditBlogDialogResult = {
          refresh: true,
        };
        this.closeDialog(result);
      })
    );
  }

  private buildForm(): FormGroup {
    const form = new FormGroup({
      title: new FormControl(this.data.blog?.title, [Validators.required]),
      subtitle: new FormControl(this.data.blog?.subtitle, [Validators.required]),
      image: new FormControl(this.data.blog?.image, [Validators.required]),
      content: new FormControl(this.data.blog?.content, [Validators.required]),
    });
    return form;
  }
}
