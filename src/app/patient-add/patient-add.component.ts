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
  selectedFile: File
  patientForm: FormGroup;
  name:string='';
  nationality:string='';
  phoneNumber:string='';
  email:string;
  fileNo:number;
  citizenId:string='';
  birthdate:Date;
  firstVisitDate:Date;
  Gender:string='';
  Vip:boolean;
  message:string='';
  isLoadingResults = false;
  genders: any = ['Male', 'Female']
  constructor(private router: Router, private api: HospitalApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.patientForm= new FormGroup({
      name: new FormControl(),
      nationality: new FormControl(),
      phoneNumber: new FormControl(),
      email:new FormControl(),
      fileNo:new FormControl(),
      citizenId:new FormControl(),
      birthdate:new FormControl(),
      firstVisitDate:new FormControl(),
      Gender:new FormControl(),
      Vip:new FormControl(),

   });
    this.patientForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'nationality' : [null, Validators.required],
      'phoneNumber' : [null, Validators.required],
      'email' : [null, Validators.email],
      'fileNo':[null, Validators.required],
      'citizenId':[null, Validators.required],
      'birthdate':[null],
      'firstVisitDate':[null],
      'Gender':[null, Validators.required],
      'Vip':[null]
    });
  }
  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addPatient(form)
      .subscribe(res => {
        if(this.selectedFile!=null)
        {
          this.api.addPatientPhoto(res.id,this.selectedFile);
        }
          this.isLoadingResults = false;
          this.message="Success!";
        }, (err) => {
          console.log(err);
          this.message = err;
          this.isLoadingResults = false;
        });
  }
onFileChanged(event) {
  this.selectedFile = event.target.files[0];
}
}
