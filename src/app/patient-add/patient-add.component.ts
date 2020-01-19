import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalApiService } from '../hospital-api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {
  patientForm: FormGroup;
  name:string='';
  nationality:string='';
  phoneNumber:string='';
  isLoadingResults = false;
  constructor(private router: Router, private api: HospitalApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.patientForm= new FormGroup({
      name: new FormControl(),
      nationality: new FormControl(),
      phoneNumber: new FormControl()
   });
    this.patientForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'nationality' : [null, Validators.required],
      'phoneNumber' : [null, Validators.required]
    });
  }
  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addPatient(form)
      .subscribe(res => {
          this.isLoadingResults = false;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
