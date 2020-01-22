import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalApiService } from '../hospital-api.service';
import { Patient } from '../Patient';
@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient = { Id: '', Name: '', Nationality: '',FileNo:0, PhoneNumber: '', Birthdate: null, Address1:'',Address2:'',CitizenId:'',
City:'',ContactPerson:'',ContactPhone:'',ContactRelation:'',Country:'',Email:'',FirstVisitDate:null,Gender:'',Photo:'',RecordCreationDate:null,
Street:'',VIP:false};
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: HospitalApiService, private router: Router) { }

  ngOnInit() {
    this.getPatientDetails(this.route.snapshot.params['id']);
  }
  getPatientDetails(id) {
    this.api.getPatient(id)
      .subscribe(data => {
        this.patient = data;
        console.log(this.patient);
        this.isLoadingResults = false;
      });
  }
  deletePatient(id) {
    this.isLoadingResults = true;
    this.api.deletePatient(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/patients']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
