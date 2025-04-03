import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from './shared/master.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bankLoan';
  loggedUserData : any;
  masterService=inject(MasterService);

  constructor(){
    this.masterService.onLogged$.subscribe((res:boolean)=>{
      if(res){
        this.masterService.readLoggedData();
      }
    })
  }
  
  // constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const loggedData = sessionStorage.getItem('bankUser');
  //     if (loggedData != null) {
  //       this.loggedUserData = JSON.parse(loggedData);
  //     }
  //   }
  // }

  logOff(){
    sessionStorage.removeItem('bankUser');
    this.masterService.loggedUserData = undefined;
  }
}
