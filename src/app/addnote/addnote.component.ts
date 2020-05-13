import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.scss']
})
export class AddnoteComponent implements OnInit {
  public Editor = ClassicEditor;
  public notesData:string='';

  public editorChange(){
    console.log(this.notesData);
  }

  constructor() { }

  ngOnInit() {
  }

}
