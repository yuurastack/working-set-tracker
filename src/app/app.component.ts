import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { exerciseKey } from './constants/constants';

import { Excercise, Set } from './models/exercices';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'workingsettracker2';
  public newExerciseTitle: string = '';
  public exercises$ : Observable<Excercise[]> = this.storage.myData$;

  public lele: Excercise[];

  constructor(public storage: StorageService) {
    this.lele = this.storage.cache;
  }

  public ngOnInit(): void {
    this.storage.loadInfo();
  }


  public createNewCard() {
    const newSet = {  title: this.newExerciseTitle,
    } as Excercise

    this.exercises$.pipe(take(1)).subscribe(data  => {
      data.push(newSet);
    })
    //this.storage.cache.push(newSet);
    this.storage.saveInfo2();
  }

  public saveData() {
    console.log('save data');
    this.storage.saveInfo2();
  }

  public deleteCard(exercice: Excercise) {
    console.log('delete card')
    console.log(exercice);
    this.exercises$.pipe(take(1)).subscribe(data => {
      const newData = data.filter((element) => element !== exercice );
      this.storage.setInfo(newData);
    })
  }


}
