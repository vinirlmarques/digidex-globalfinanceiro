import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiConsumerService {
  private baseUrl = 'https://digimon-api.vercel.app/api';

  constructor(private http: HttpClient) {}

  getAllDigimons() {
    return this.http.get(`${this.baseUrl}/digimon`);
  }

  getDigimonByName(name: string) {
    return this.http.get(`${this.baseUrl}/digimon/name/${name}`);
  }

  getDigimonByLevel(level: string) {
    return this.http.get(`${this.baseUrl}/digimon/level/${level}`);
  }
}
