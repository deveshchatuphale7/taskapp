import { Component, OnInit,AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';
import * as moment from 'moment';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit,AfterViewInit {
allTasksData:any;
dataPresent:boolean = true;
private generateCompletenDue(){
  if(this.allTasksData == undefined || this.allTasksData.length==0){
    this.dataPresent = false;
  }else{
    this.dataPresent = true;
    let active = this.allTasksData.filter(
      (e) => e.completed == false && e.deleted == false
      );
    
      let completed = this.allTasksData.filter(
      (e) => e.completed == true && e.deleted == false); 

      echarts.dispose(document.getElementById('CompletenDue'));
      let CompletenDue = echarts.init(document.getElementById('CompletenDue'));
      
      let pieOptions = {
      
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
        toolbox: {
          show:false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            // restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        legend: {
          orient: 'vertical',
          top: 'top',
          bottom: 10,
          left: 'left',
          data: ['Completed','Active'],
          type: 'scroll'
        },
        series: [{
          name: 'Disc',
          type: 'pie',
          color: ['#67b7dc', '#6794dc', '#6771dc', '#8067dc', '#a367dc', '#c767dc', '#dc6788', '#dc67ab', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#009688', '#00bcd4', '#03a9f4'],
          radius: '77%',
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{name:'Completed',value:completed.length},{name:'Active',value:active.length}],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      CompletenDue.setOption(pieOptions);
  }
}  

private generateOntimenOverdue(){

  if(this.allTasksData == undefined || this.allTasksData.length==0){
    this.dataPresent = false;
  }else{
    this.dataPresent = true;
    let active = this.allTasksData.filter(
      (e) => e.completed == false && e.deleted == false);
      let overDueCnt = 0;
      this.allTasksData.forEach(task => {
        let today = moment();
        // console.log(today.diff(moment(task.dueDate)))
        if(today.diff(moment(task.dueDate),'days')>0){
          overDueCnt+=1;
        }

        // console.log(overDueCnt)
      });

        let onTimeCnt = active.length - overDueCnt;
      echarts.dispose(document.getElementById('OntimenOverdue'));
      let OntimenOverdue = echarts.init(document.getElementById('OntimenOverdue'));
      
      let pieOptions = {
      
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
        toolbox: {
          show:false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            // restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        legend: {
          orient: 'vertical',
          top: 'top',
          bottom: 10,
          left: 'left',
          data: ['Overdue','On time'],
          type: 'scroll'
        },
        series: [{
          name: 'Disc',
          type: 'pie',
          color: ['#67b7dc', '#6794dc', '#6771dc', '#8067dc', '#a367dc', '#c767dc', '#dc6788', '#dc67ab', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#009688', '#00bcd4', '#03a9f4'],
          radius: '77%',
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{name:'Overdue',value:overDueCnt},{name:'On time',value:onTimeCnt}],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      OntimenOverdue.setOption(pieOptions);
    }
}


constructor() { }

  ngOnInit() {
  
  }

  ngAfterViewInit(){
   this.allTasksData = JSON.parse(localStorage.getItem('allTasks'));
   this.generateCompletenDue();
   this.generateOntimenOverdue();
  }

}
