import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  private myBehaviorSubject = new BehaviorSubject<string>("");

  constructor() { }

  setValue(value: string) {
    this.myBehaviorSubject.next(value);
  }

  getValue() {
    return this.myBehaviorSubject.asObservable();
  }

}
