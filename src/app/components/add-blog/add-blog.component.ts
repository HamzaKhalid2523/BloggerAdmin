import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  title = 'Post Editor';
  editorText = '';

  constructor() { }

  ngOnInit(): void {
  }

  changeEditor(event: EditorChangeContent | EditorChangeSelection) {
      console.log('Editor got changed. ', event);
      this.editorText = event['editor']['root']['innerHTML'];
  }

  editorModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      ['link', 'image', 'video']                         // link and image, video
    ]
  };
  placeholder = 'Words can be like x-rays if you use them properly...';
}
