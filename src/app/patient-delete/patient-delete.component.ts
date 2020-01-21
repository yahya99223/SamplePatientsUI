import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { HospitalApiService } from '../hospital-api.service';
import { Patient } from '../patient';
@Component({
  selector: 'app-patient-delete',
  templateUrl: './patient-delete.component.html',
  styleUrls: ['./patient-delete.component.css']
})
export class PatientDeleteComponent implements OnInit {
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: HospitalApiService, private router: Router) { }

  ngOnInit() {
  }

}
