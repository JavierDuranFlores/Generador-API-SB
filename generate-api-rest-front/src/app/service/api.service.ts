import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassModel } from '../generate/interfaces/classModel';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public entity: any = ``
  repo: any = ``
  ser: any = ``
  serImpl: any = ``
  cont: any = ``
  body: any = ``

  constructor(private http: HttpClient) { }

  async getEntity(body: ClassModel): Promise<void> {
    this.body = body
    const response = await this.http.post('http://localhost:8090/generate-entity', body, {responseType: 'text'})
    .toPromise()

    this.entity = response
    localStorage.setItem('entity', JSON.stringify(this.entity));
    
  }

  async getRepository(body: ClassModel)  {
    const response = await this.http.post('http://localhost:8090/generate-repository', body, {responseType: 'text'})
    .toPromise()

    this.repo = response
    localStorage.setItem('repository', JSON.stringify(this.repo));
  }

  async getService(body: ClassModel)  {

    const response = await this.http.post('http://localhost:8090/generate-service', body, {responseType: 'text'})
    .toPromise()

    this.ser = response
    localStorage.setItem('service', JSON.stringify(this.ser));

   
  }

  async getServiceImpl(body: ClassModel)  {
    
    const response = await this.http.post('http://localhost:8090/generate-service-impl', body, {responseType: 'text'})
    .toPromise()
    
    localStorage.setItem('serviceImpl', JSON.stringify(response));
  }

  async getController(body: ClassModel)  {
    
    
    const response = await this.http.post('http://localhost:8090/generate-controller', body, {responseType: 'text'})
    .toPromise()
    
    localStorage.setItem('controller', JSON.stringify(response));

    
  }
  
  getEntityText(): String {
    return this.entity
  }

  setEntity(entity: string): void {
    this.entity = entity;
  }

  
}

