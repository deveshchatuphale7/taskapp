import {
  Component,
  OnInit,
  AfterViewInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { CommonService } from "../common.service";
import { NbDialogService } from "@nebular/theme";
import { Router } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit, AfterViewInit {
  tempRef: any;
  @ViewChild("viewSelectedTask", { static: false })
  viewSelectedTask: TemplateRef<any>;

  public today: Date = new Date();

  public filterdActiveTasksData: any = [];
  public activeTasksData: any;
  public completedTasksData: any;
  public deletedTasksData: any;

  public searchText: string;
  public searchDate: Date;
  public filterTags: string[] = [];
  public filterLabel: string;
  public noTasksFlag: boolean = true;
  public dataPresent: boolean = false;

  public updateFilterTags(tagName: string) {
    if (this.filterTags.includes(tagName)) {
      this.filterTags.splice(this.filterTags.indexOf(tagName), 1);
    } else {
      this.filterTags.push(tagName);
    }
    // console.log(this.filterTags);
    this.filterActiveTasks();
  }

  public fitlerByDateSelcted() {
    setTimeout(() => {
      this.filterActiveTasks();
    }, 500);
  }


  public ifOverdue(uid:string){
    let ind = this.activeTasksData.findIndex((e) => e.uid == uid);
    let today = moment();
    return today.diff(moment(this.activeTasksData[ind].dueDate),'days')>0; 
  }


  public filterActiveTasks() {
    this.filterdActiveTasksData.splice(0, this.filterdActiveTasksData.length);

    const fileterTags = (tags) => {
      if (this.filterTags.length == 0) {
        return true;
      } else {
        let flag = false;
        this.filterTags.forEach((element) => {
          // console.log("tags.includes(element) ",tags.includes(element));
          if (tags.includes(element)) {
            flag = true;
          }
        });
        return flag;
      }
    };

    this.activeTasksData.forEach((task) => {
      // console.log((task.taskTitle.includes(this.searchText) || this.searchText == undefined));
      // console.log((this.searchDate == undefined  || moment(task.dueDate).format("YYYY-MM-DD") == moment(this.searchDate).format("YYYY-MM-DD")));

      if (
        (task.taskTitle.includes(this.searchText) ||
          this.searchText == undefined) &&
        (this.searchDate == undefined ||
          moment(task.dueDate).format("YYYY-MM-DD") ==
            moment(this.searchDate).format("YYYY-MM-DD")) &&
        fileterTags(task.tags) &&
        (this.filterLabel == undefined || this.filterLabel == "undefined" || this.filterLabel == task.label[0])
      ) {
        this.filterdActiveTasksData.push(task);
      }
    });

    // console.log("this.filterdActiveTasksData ");
    // console.log(this.filterdActiveTasksData);
    // console.log(this.filterLabel)
  }

  public selectedTaskForView: any;
  tags: string[] = ["learning", "office", "other", "work"];
  tagsObj:any = {
    learning:false,
    office:false,
    other:false,
    work:false
  }

  // Function to mark complete the selected task & move it to list of completed tasks
  markTaskComplete(uid: string) {
    let msgTexts = [
      "Great Work !",
      "Kudos !",
      "Wow! Nice work",
      "Keep up the great work!",
      "Congratulations !",
    ];
                
    let ind = this.activeTasksData.findIndex((e) => e.uid == uid);
  
    this.common.runAnimation("#row" + ind, "bounceOutRight");

    setTimeout(() => {
      this.dataPresent = false;

      this.common.showToast(
        "top-right",
        "success",
        msgTexts[Math.floor((Math.random() * 10) % 5)]
      );

    let compsub$ = this.common
        .httpPost("complete", {
          flag: true,
          uid: uid,
          email: localStorage.getItem("email"),
        })
        .subscribe((resu) => {
        let getsub$ = this.common
            .httpPost("retrivetasks", { email: localStorage.getItem("email") })
            .subscribe((res: any) => {
              this.filterTasks(res.data[0].tasks);

              setTimeout(() => {
                compsub$.unsubscribe();
                getsub$.unsubscribe();
              }, 3000);
            });
        });
    },  620);
  }

  // Function to archive the selected task 
  archiveTask(section:string,uid: string,rowid:string) {
    let ind 
    if(section == 'active'){
        ind = this.activeTasksData.findIndex((e) => e.uid == uid);
    }else if(section == 'complete'){ 
      ind = this.completedTasksData.findIndex((e) => e.uid == uid);
    }
    

    this.common.runAnimation("#" + rowid, "bounceOutRight");
    setTimeout(() => {
      this.dataPresent = false;

      let delsub$ = this.common
        .httpPost("delete", {
          flag: true,
          uid: uid,
          email: localStorage.getItem("email"),
        })
        .subscribe((resd) => {
          
          let getsub$ = this.common
            .httpPost("retrivetasks", { email: localStorage.getItem("email") })
            .subscribe((res: any) => {
              this.filterTasks(res.data[0].tasks);

              setTimeout(() => {
                delsub$.unsubscribe();
                getsub$.unsubscribe();
              }, 3000);
            });
        });
    }, 620);
  }

  closeTemplate() {
    this.tempRef.close();
  }

  viewTask(uid: string, dialog: TemplateRef<any>) {
    this.selectedTaskForView = this.activeTasksData.find((e) => e.uid == uid);

    this.dialogService.open(dialog, { context: "" });

    // console.log(this.selectedTaskForView);
    // this.tempRef = this.dialogService.open(this.viewSelectedTask, { context: '' });
  }

  editTask(uid: string) {
    let taskForEdit = this.activeTasksData.find((e) => e.uid == uid);
    localStorage.setItem("taskForEdit", JSON.stringify(taskForEdit));
    this.router.navigate(["home/addtask"]);
  }

  undoTasks(section: string, uid: string, id: string) {
    this.common.runAnimation("#" + id, "bounceOutRight");

    setTimeout(() => {
      this.dataPresent = false;
      let undosub$ = this.common
        .httpPost(section, {
          flag: false,
          uid: uid,
          email: localStorage.getItem("email"),
        })
        .subscribe((resUpdate) => {
          let getsub$ = this.common
            .httpPost("retrivetasks", { email: localStorage.getItem("email") })
            .subscribe((res: any) => {
              this.filterTasks(res.data[0].tasks);

              setTimeout(() => {
                getsub$.unsubscribe();
                undosub$.unsubscribe();
              }, 3000);
            });
        });
    },  620);
  }

  // Filtering tasks based on active,archived & completed
  filterTasks(tasksData: any) {
    this.dataPresent = true;
    localStorage.setItem('allTasks',JSON.stringify(tasksData));
    this.activeTasksData = tasksData.filter(
      (e) => e.completed == false && e.deleted == false
    );
    this.completedTasksData = tasksData.filter(
      (e) => e.completed == true && e.deleted == false
    );
    this.deletedTasksData = tasksData.filter((e) => e.deleted == true);

    this.filterActiveTasks();
  }

  constructor(
    public common: CommonService,
    private dialogService: NbDialogService,
    private router: Router
  ) {}

  ngOnInit() {
    /*
    this.common.httpPost('add-user-db',{"email":"dcdevesh3@gmail.com"}).subscribe((res:any)=>{
       console.log("Added user");
       console.log(res);
     });
*/

    let getsub$ = this.common
      .httpPost("retrivetasks", { email: localStorage.getItem("email") })
      .subscribe((res: any) => {
        this.dataPresent = true;
        this.filterTasks(res.data[0].tasks);
        res.data[0].tasks.length == 0
          ? (this.noTasksFlag = true)
          : (this.noTasksFlag = false);
        
        
          setTimeout(() => {
            getsub$.unsubscribe();
          }, 3000);
        });
  }

  ngAfterViewInit() {}
}
