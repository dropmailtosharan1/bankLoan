import { Component, inject } from '@angular/core';
import { MasterService } from '../../shared/master.service';
import { APIResponse, ApplicationList } from '../../model/loan.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-application-list',
  imports: [CommonModule],
  templateUrl: './loan-application-list.component.html',
  styleUrl: './loan-application-list.component.scss'
})
export class LoanApplicationListComponent {
  
  masterService=inject(MasterService);
  applicationList:ApplicationList[]=[];

  constructor(){
    // if(this.masterService.loggedUserData.role == 'Customer') {
    //     this.getCustomerApplication();
    // } else {
    //     this.getAssignedApplication();
    // }
  }

  getCustomerApplication(){
    this.masterService.getMyApplications(this.masterService.loggedUserData.userId).subscribe((res:APIResponse)=>{
      this.applicationList=res.data;
    })
  }

  getAssignedApplication(){
    this.masterService.getMyApplications(this.masterService.loggedUserData.userId).subscribe((res:APIResponse)=>{
      this.applicationList=res.data;
    })
  } 

  setStatus(event:any, panNo:string){
    this.masterService.changeStatus(panNo, event.target.value).subscribe((res:APIResponse)=>{
     if(res.result){
      alert('Status Changed');
     } else {
      alert(res.message);
     }
  })
}
}
