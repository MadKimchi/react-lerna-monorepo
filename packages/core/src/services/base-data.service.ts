import { BaseURLEnum } from '../enums';
import { HttpClient } from '../https/http-client';

export class BaseDataService {
  protected _baseUrl: BaseURLEnum = BaseURLEnum.appService;

  constructor(protected _httpClient: HttpClient) {}
}