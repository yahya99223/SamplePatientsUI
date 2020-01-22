import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Patient } from './patient';
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
  addPatient (Patient): Observable<Patient> {
    const url = `${apiUrl}/patient/`;
    return this.http.post<Patient>(url, Patient, httpOptions).pipe(
      tap((Patient: Patient) => console.log(`added Patient w/ id=${Patient.Id}`)),
      catchError(this.handleError('addPatient'))
    );
  }
  getPatient(id: number): Observable<Patient> {
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
