import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerToggleService {

  private myBehaviorSubject = new BehaviorSubject<boolean>(true);

  constructor() { }

  setValue(value: boolean) {
    this.myBehaviorSubject.next(value);
  }

  getValue() {
    return this.myBehaviorSubject.asObservable();
  }

}
