import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { APIResponse, LoanDetails, User } from '../model/loan.module';
import { Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  http=inject(HttpClient);
  loggedUserData!:any;
  onLogged$:Subject<boolean>=new Subject<boolean>();

  constructor(@Inject(PLATFORM_ID) private platformId: object) { 
   this.readLoggedData();
  }

  readLoggedData(){
    if (isPlatformBrowser(this.platformId)) {
      const loggedData = sessionStorage.getItem('bankUser');
      if (loggedData !== null) {
        this.loggedUserData = JSON.parse(loggedData);
      }
    }
  }
  onSaveLoan(obj:LoanDetails){
    return this.http.post<APIResponse>('https://projectapi.gerasim.in/api/BankLoan/AddNewApplication', obj);
  }
 
  getMyApplications(id:number): Observable<APIResponse> {
    return this.http.get<APIResponse>('https://projectapi.gerasim.in/api/BankLoan/GetMyApplications?customerId=' + id);
  }
  getApplicationsAssigned(id:number){
    return this.http.get<APIResponse>('https://projectapi.gerasim.in/api/BankLoan/GetApplicationAssigneedToMe?bankEmployeeId=' + id);
  }

  changeStatus(panNum:string, status: string){
    return this.http.get<APIResponse>('https://projectapi.gerasim.in/api/BankLoan/CheckApplicationStatus?panNo='+panNum+'&status=' + status);
  }
}
