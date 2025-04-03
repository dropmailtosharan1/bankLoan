import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MasterService } from '../../shared/master.service';
import { APIResponse } from '../../model/loan.module';

@Component({
  selector: 'app-new-loan-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-loan-form.component.html',
  styleUrl: './new-loan-form.component.scss',
})
export class NewLoanFormComponent {
  loanAplicationForm!: FormGroup;

  formbuilder = inject(FormBuilder);
  masterService = inject(MasterService);

  constructor() {
    this.initializeForm();
    if (this.masterService.loggedUserData) {
      this.loanAplicationForm.controls['customerId'].setValue(this.masterService.loggedUserData.userId);
    }
  }

  initializeForm() {
    this.loanAplicationForm = this.formbuilder.group({
      applicantID: [0],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      applicationStatus: ['', Validators.required],
      panCard: [
        '',
        [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')],
      ],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      annualIncome: [0, [Validators.required, Validators.min(0)]],
      employmentStatus: ['', Validators.required],
      creditScore: [
        0,
        [Validators.required, Validators.min(300), Validators.max(850)],
      ],
      assets: ['', Validators.required],
      dateApplied: [new Date(), Validators.required],
      loans: this.formbuilder.array([this.createLoanGroup()]),
      customerId: [0, Validators.required],
    });
  }

  createLoanGroup(): FormGroup {
    return this.formbuilder.group({
      loanID: [0],
      applicantID: [0],
      bankName: [''],
      loanAmount: [0],
      emi: [0],
    });
  }

  get loanList(): FormArray {
    return this.loanAplicationForm.get('loans') as FormArray;
  }

  addNewLoan() {
    this.loanList.push(this.createLoanGroup());
  }

  removeLoan(index:number){
    // debugger;
    this.loanList.removeAt(index);
  }

  onSave(){
    // debugger;
    const formValue = this.loanAplicationForm.value;
    this.masterService.onSaveLoan(formValue).subscribe((res:APIResponse)=>{
      if(res.result){
        alert('Loan Application Created Success')
      } else {
        alert(res.message);
      }
    })
  }
} 
