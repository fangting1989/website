import { Component, OnInit } from '@angular/core';



import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ModalHelper } from '@delon/theme';
import {WorkflowComponent} from '../workflow/workflow.component';

@Component({
  selector: 'app-worktasklist',
  templateUrl: './worktasklist.component.html',
  styles: []
})
export class WorktasklistComponent implements OnInit {

  constructor(private router: Router,
    private modalHelper:ModalHelper,) { }

  ngOnInit() {
  }


  ProinstWorkFlow(){}


  addHhr(){
    var item = {}
    var data = {HeadText:'客户信息',itemdata:item}
    const modal = this.modalHelper.create(WorkflowComponent,{ data: data},{size:800}).subscribe(res => {
      // this.loadData()
    });
  }
}
