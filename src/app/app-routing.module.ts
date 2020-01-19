import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientDeleteComponent } from './patient-delete/patient-delete.component';

const routes: Routes = [
  {
    path: 'patients',
    component: PatientsComponent,
    data: { title: 'List of Patients' }
  },
  {
    path: 'patient-details/:id',
    component: PatientDetailComponent,
    data: { title: 'Patient Details' }
  },
  {
    path: 'patient-add',
    component: PatientAddComponent,
    data: { title: 'Add Patient' }
  },
  {
    path: 'patient-delete/:id',
    component: PatientDeleteComponent,
    data: { title: 'Delete Patient' }
  },
  { path: '',
    redirectTo: '/patients',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
