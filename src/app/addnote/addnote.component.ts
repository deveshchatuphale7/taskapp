import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {
  public Editor = ClassicEditor;
  public notesData:string = '';
  public notesTitle:string = '';
  public dueDate:Date
  public addTitleInputFlag:boolean = false;

  public editorChange(){
    console.log(this.notesData);
  }

  constructor(private common:CommonService) { }

  ngOnInit() {
  }

}
