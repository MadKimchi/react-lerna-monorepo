import { Subject } from 'rxjs';

export class ErrorService {
  public onError: Subject<any> = new Subject<any>();

  // TODO: define more error handling methods and events handling here.
}