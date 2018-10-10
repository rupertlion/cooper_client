import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PerformanceDataProvider {

  constructor(private _tokenService: Angular2TokenService) {}

  saveData(data) {
    return this._tokenService.post('performance_data', data).map(data => data);
  }

  getResults() {
    return this._tokenService
      .get('performance_data')
      .map(results => results.json());
  }
}
