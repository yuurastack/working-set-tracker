import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Excercise, Set } from 'src/app/models/exercices';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss']
})
export class WorkoutCardComponent implements OnInit {
  @Input() public exercise: Excercise;
  @Output() public setAdded = new EventEmitter();
  @Output() public cardDeleted = new EventEmitter();

  private setPattern: string = '[0-9]+[\\s]*[xX]{1}\\s*[0-9]+';
  public setsForm: FormGroup = this.formBuilder.group({
    setReps : new FormControl('', [Validators.pattern(this.setPattern)])
  });

  getErrorMessage() {
    return this.setsForm.controls['setReps'].hasError('pattern') ? 'Not a valid set, try number x number' : '';
  }

  get lastSet() {
    return this.exercise.sets && this.exercise.sets[1] ? this.exercise.sets[1].reps  + ' X ' + this.exercise.sets[1].weight : 'Train more!!!!'
  }

  get firstSet() {
    return this.exercise.sets && this.exercise.sets[0].reps ? this.exercise.sets[0].reps + ' X ' + this.exercise.sets[0].weight : 'Add your first set (ex: 1x1)'
  }


  
  constructor(private formBuilder: FormBuilder) {

  }


  ngOnInit(): void {

  }

  onSubmit(setReps: string): void {
    let [repsStr, weightStr ] = setReps.split('x');
    const reps = parseInt(repsStr);
    const weight = parseInt(weightStr);

    if (isNaN(reps) || isNaN(weight)) return;
    const set = {
      reps,
      weight, 
      time : Date.now()
    } as Set

    if (this.exercise.sets) this.exercise.sets.unshift(set)
    else {
      this.exercise.sets = [];
      this.exercise.sets.unshift(set)
    }

    this.setAdded.emit();
    this.setsForm.reset();
  }

  deleteCard() {
    this.cardDeleted.emit(this.exercise);
  }

}  
