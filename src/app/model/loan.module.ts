import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LoanModule { }

export interface LoanDetails { 
    applicantID: number
    fullName: string
    applicationStatus: string
    panCard: string
    dateOfBirth: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    annualIncome: number
    employmentStatus: string
    creditScore: number
    assets: string
    dateApplied: string
    Loans: Loan[]
    customerId: number
  }
  
  export interface Loan {
    loanID: number
    applicantID: number
    bankName: string
    loanAmount: number
    emi: number
  }

  export interface APIResponse {
    result: boolean
    message: string
    data : any
  }

  
export interface User { 
  userId: number
  userName: string 
  emailid: string
  fullName: string 
  role: string 
  createdDate: string 
  password: string 
  projectName: string
  refreshToken: any
  refreshTokenExpiryTime: any
}


export interface ApplicationList { 
applicantID: number
dateApplied: string 
applicationStatus: string 
fullName: string
email: string
employmentStatus: string 
customerPhone: string 
assignedToBankEmployee: string
pancard: string
}