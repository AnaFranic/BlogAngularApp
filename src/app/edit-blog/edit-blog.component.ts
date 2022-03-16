import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditBlogDialogData } from './edit-blog.models';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: EditBlogDialogData) { }

  ngOnInit(): void {
  }

}
