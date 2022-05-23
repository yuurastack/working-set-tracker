import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Excercise, Set } from 'src/app/models/exercices';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss']
})
export class WorkoutCardComponent {
  @Input() public exercise: Excercise;
  @Output() public setAdded = new EventEmitter();
  @Output() public cardDeleted = new EventEmitter();

  private setPattern: string;
  public setsForm: FormGroup ;

  
  get lastSet(): string {
    return this.exercise.sets && this.exercise.sets[1] ? new Date(this.exercise.sets[0].time).toDateString()
    + ':\xa0\xa0' + this.exercise.sets[1].reps  + ' X ' + this.exercise.sets[1].weight : 'Add another set to see progress'
  }
  
  get firstSet(): string {
    return this.exercise.sets && this.exercise.sets[0].reps ? new Date(this.exercise.sets[0].time).toDateString()
    + ':\xa0\xa0' + this.exercise.sets[0].reps + ' X ' + this.exercise.sets[0].weight : 'Add your first set (ex: reps x weight)'
  }

  get setDifference(): string {
    if (!this.exercise.sets) return '0 % up';
    const diff = (this.getOneRepMaxEpley(this.exercise.sets[0]) / this.getOneRepMaxEpley(this.exercise.sets[1]) -1)* 100;
    const diffStr = diff.toFixed(2);
    return  diff > 0 ? diffStr + '% up' : diffStr+ '% down'
  }

  get errorMessage(): string {
    return this.setsForm.controls['setReps'].hasError('pattern') ? 'Not a valid set, try number x number' : '';
  }
  
  constructor(private formBuilder: FormBuilder) {
    this.setPattern =  '[0-9]+[\\s]*[xX]{1}\\s*[0-9]+';
    this.setsForm = this.formBuilder.group({
      setReps : new FormControl('', [Validators.pattern(this.setPattern)])
    });
  }
  
  public getOneRepMaxEpley(set: Set ): number {
    return set? parseFloat((set.weight * (1 + set.reps/30)).toFixed(1)) : 0;
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

  deleteCard(): void {
    this.cardDeleted.emit(this.exercise);
  }

}  
