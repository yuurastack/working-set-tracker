import { Component, Input, OnInit } from '@angular/core';
import { Excercise } from 'src/app/models/exercices';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss']
})
export class WorkoutCardComponent implements OnInit {
  @Input() public exercise: Excercise;
  
  constructor() { }


  ngOnInit(): void {

  }

}
