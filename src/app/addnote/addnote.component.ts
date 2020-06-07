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
  public dueDate:Date;
  public taskLabel:string;

  tags:string[] = ['learning','office','other','work'];
  selectedTags:string[] = [];
  uid:string;

  public toggleTag(tag:string){
    if(this.selectedTags.includes(tag)){
      this.selectedTags.splice(this.selectedTags.indexOf(tag),1);
    }else{
      this.selectedTags.push(tag);
    }
  }


  public openSaveTask(){
    this.saveNote();
  }

  public saveNote(){

    if(this.notesData == '' || this.notesTitle =='' || this.dueDate == undefined || this.taskLabel == undefined){
      this.common.showToast('top-right', 'danger','Please enter title, description & due date of task');
    }else{

      // console.log("saveNote");
    // console.log({"email":"dcdevesh3@gmail.com","task":{"taskTitle":this.notesTitle,"taskDesc":this.notesData,"dueDate":this.dueDate,"tags":["work","other"],"label":["New"]}});
    let sendObj = {"email":"dcdevesh3@gmail.com","task":{"taskTitle":this.notesTitle,"taskDesc":this.notesData,"dueDate":this.dueDate,"tags":this.selectedTags,"label":[this.taskLabel]}};
        if(this.uid != undefined){
          sendObj.task["uid"] = this.uid;
        }
    
        this.common.httpPost('savetask',sendObj).subscribe((res:any)=>{
          // console.log("res ");  
          // console.log(res);
          if(res.statusCode == 200){
            this.common.showToast('top-right', 'success',res.msg);
            
            //Clearing inputs
            this.notesData = '';
            this.notesTitle = '';
            this.dueDate = undefined;
            this.selectedTags.splice(0,this.selectedTags.length); 
            this.taskLabel = undefined
          }
        });

    }
  }

  constructor(private common:CommonService) { }

  ngOnInit() {
    let taskToEdit:any = localStorage.getItem('taskForEdit')
    if(taskToEdit != undefined){
      taskToEdit = JSON.parse(taskToEdit);
      this.uid = taskToEdit.uid;
      this.notesData = taskToEdit.taskDesc;
      this.notesTitle = taskToEdit.taskTitle;
      this.dueDate = taskToEdit.dueDate;
      this.selectedTags = taskToEdit.tags;
      this.taskLabel = taskToEdit.label[0];
      localStorage.removeItem('taskForEdit');
    }
  }

}
