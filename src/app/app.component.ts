import { Component, NgModule, ViewChild } from '@angular/core';
import {
  CdkDrag,
  CdkDragStart,
  CdkDropList, CdkDropListGroup, CdkDragMove, CdkDragEnter,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import {ViewportRuler} from "@angular/cdk/overlay";
import { Excercise } from './models/exercices';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workingsettracker2';
  exercises : Excercise[] = [
    {
      title: 'Bench press',
      sets: [
        {
          reps: 10,
          weight: 100
        },
        {
          reps: 9,
          weight: 100
        }
      ]
    },
    {
      title: 'Squats',
      sets: [
        {
          reps: 10,
          weight: 100
        }
      ]
    }
  ];
}
