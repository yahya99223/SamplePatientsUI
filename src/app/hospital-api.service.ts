import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Patient,CreateResponse } from './patient';
import{ErrorResponse} from './Error';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:1992/v1/patients";
@Injectable({
  providedIn: 'root'
})
export class HospitalApiService {
  constructor(private http: HttpClient) { }

  getPatients (): Observable<Patient[]> {
    const url = `${apiUrl}`;
    return this.http.get<Patient[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched Patients')),
        catchError(this.handleError('getPatients'))
      );
  }
  addPatient (Patient): Observable<CreateResponse> {
    const url = `${apiUrl}/patient/`;
    return this.http.post<CreateResponse>(url, Patient, httpOptions).pipe(
      tap((Patient: CreateResponse) => console.log(`added Patient w/ id=${Patient.id}`)),
      catchError(this.handleError('addPatient'))
    );
  }
  addPatientPhoto (id: String,photo:File): void {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };
    const url = `${apiUrl}/${id}/photo`;
    const uploadData = new FormData();
    uploadData.append('image', photo, photo.name);
    this.http.post(url, uploadData)
      .subscribe();
  }
  getPatient(id: string): Observable<Patient> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Patient>(url).pipe(
      tap(_ => console.log(`fetched Patient id=${id}`)),
      catchError(this.handleError(`getPatient id=${id}`))
    );
  }
  deletePatient (id): Observable<Patient> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Patient>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Patient id=${id}`)),
      catchError(this.handleError('deletePatient'))
    );
  }
  
  private handleError (operation = 'operation') {
    return (error: any) => {
      console.log(error.error);
      throw(error.error as ErrorResponse);
    };
  }
}
