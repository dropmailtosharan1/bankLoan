import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  showRegisterForm = signal<boolean>(false);
  http = inject(HttpClient);

  customerObj: any = {
    userId: 0,
    userName: '',
    emailId: '',
    fullName: '',
    password: '',
  };

  loginObj:any={
    "userName": '',
    "password": ''
  }

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password:new FormControl('')
  })
  changeView() {
    this.showRegisterForm.set(!this.showRegisterForm());
  }

  onRegister() {
    // debugger;
    this.http
      .post(
        'https://projectapi.gerasim.in/api/BankLoan/RegisterCustomer',
        this.customerObj
      )
      .subscribe(
        (res: any) => {
          // debugger;
          if (res.result) {
            alert('Customer Data Registered Success');
          } else{
            alert(res.message);
          }
        },
        (error) => {
          alert('Network Error');
        }
      );
  } 

  onLogin(){
    const formValue =  this.loginForm.value;
    this.http
      .post(
        'https://projectapi.gerasim.in/api/BankLoan/login',
        formValue
      )
      .subscribe(
        (res: any) => {
          // debugger;
          if (res.result) {
            sessionStorage.setItem('bankUser',JSON.stringify(res.data));
            alert('Customer Login Success');
          } else{
            alert(res.message);
          }
        },
        (error) => {
          alert('Network Error');
        }
      );
  }
}

