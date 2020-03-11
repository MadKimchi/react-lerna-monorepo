import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { ErrorService } from './error.service';
import { HttpClient } from '../https/http-client';

export class BaseInjectorService {
  protected _httpClient: HttpClient;
  private _errorService: ErrorService;

  constructor() {
    this._errorService = new ErrorService();
    this._httpClient = new HttpClient(this._errorService);
  }

  private _authService!: AuthService;
  public get authService(): AuthService {
    if (!this._authService) {
      this._authService = new AuthService(this._httpClient);
    }

    return this._authService;
  }

  private _messageService!: MessageService;
  public get messageService(): MessageService {
    if (!this._messageService) {
      this._messageService = new MessageService();
    }

    return this._messageService;
  }

  public get errorService(): ErrorService {
    return this._errorService;
  }
}