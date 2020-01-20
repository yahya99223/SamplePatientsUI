import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Patient } from './patient';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "https://localhost:5001/v1/patients";
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
        catchError(this.handleError('getPatients', []))
      );
  }
  addPatient (Patient): Observable<Patient> {
    const url = `${apiUrl}/patient/`;
    return this.http.post<Patient>(url, Patient, httpOptions).pipe(
      tap((Patient: Patient) => console.log(`added Patient w/ id=${Patient.Id}`)),
      catchError(this.handleError<Patient>('addPatient'))
    );
  }

  deletePatient (id): Observable<Patient> {
    const url = `${apiUrl}/patient/${id}`;
    return this.http.delete<Patient>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Patient id=${id}`)),
      catchError(this.handleError<Patient>('deletePatient'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
