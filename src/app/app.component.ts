import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, Observable, take } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogModel } from './components/confirm-dialog/confirm-dialog.component';

import { Excercise, Set } from './models/exercices';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'working set tracker';
  public newExerciseTitle: string = '';
  public exercises$ : Observable<Excercise[]> = this.storage.myData$;
  public newCardForm: FormGroup ;

  constructor(
    public storage: StorageService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder) {
      this.newCardForm = this.formBuilder.group({
        newExerciseTitle : new FormControl('', [Validators.required])
      });
    }

  public ngOnInit(): void {
    this.storage.loadInfo();
  }


  public createNewCard(): void {
    if (this.newCardForm.invalid) return;
    const newSet = {  title: this.newCardForm.value.newExerciseTitle,
    } as Excercise

    this.exercises$.pipe(take(1)).subscribe(exercises  => {
      if (!exercises) {
        this.storage.setInfo([newSet]);
        return;
      }
      exercises.push(newSet);
    })
    this.storage.saveInfo();
  }

  public saveData(): void {
    this.storage.saveInfo();
  }

  public async deleteCard(exerciceDelete: Excercise): Promise<void> {
    const result = await this.confirmDialog();
    if (!result) return;
    this.exercises$.pipe(take(1)).subscribe(exercises => {
      const newData = exercises.filter((exercise) => exercise !== exerciceDelete );
      this.storage.setInfo(newData);
    });
  }

  confirmDialog(): Promise<any> {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Deletion", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    return firstValueFrom(dialogRef.afterClosed());
  }


}
