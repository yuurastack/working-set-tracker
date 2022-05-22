import { Injectable } from "@angular/core";
import { BehaviorSubject, take } from "rxjs";
import { exerciseKey } from "../constants/constants";
import { Excercise } from "../models/exercices";
import { LocalStorageRefService } from "./storage.ref.service";


@Injectable({ providedIn: "root" })
export class StorageService {
  private _localStorage: Storage;

  private _myExercises$ = new BehaviorSubject<Excercise[]>(null);
  myData$ = this._myExercises$.asObservable();
  public cache: Excercise[];

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = _localStorageRefService.localStorage;
  }

  setInfo( data: any): void {
    const jsonData = JSON.stringify(data);
    this._localStorage.setItem(exerciseKey, jsonData);
    this._myExercises$.next(data);
    this.cache = data;
  }

  saveInfo () {
   this.setInfo(this.cache);
  }

  saveInfo2 () {
    this.myData$.pipe(take(1)).subscribe(data  => {
      this.setInfo(data);
    })
   }

  loadInfo(): void {
    const data = JSON.parse(this._localStorage.getItem(exerciseKey));
    this._myExercises$.next(data);
    this.cache = data;
  }

  clearInfo() {
    this._localStorage.removeItem(exerciseKey);
    this._myExercises$.next(null);
    this.cache = [];
  }

  clearAllLocalStorage(): void {
    this._localStorage.clear();
    this._myExercises$.next(null);
  }
}