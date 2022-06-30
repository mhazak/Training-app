import { Component, OnInit } from '@angular/core';
import { Exercise } from './exercise.model';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
	ongoingTraining$: Observable<boolean>;
	subscription!: Subscription;
	runningExercise!: Exercise | null;

  	constructor(private store: Store<fromTraining.State>) { }

  	ngOnInit(): void {
		this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  	}
}
