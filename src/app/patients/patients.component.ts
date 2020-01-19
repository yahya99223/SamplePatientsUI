import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HospitalApiService } from '../hospital-api.service';
import { Patient } from '../patient';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  displayedColumns: string[] = ['Id','Name', 'Gender','Vip'];
  data: Patient[] = [];
  isLoadingResults = true;
  constructor(private api: HospitalApiService) { }

  ngOnInit() {
    this.api.getPatients()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
