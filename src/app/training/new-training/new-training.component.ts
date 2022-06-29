import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

import * as fromRoot from '../../app.reducer';

@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit, OnDestroy {

	@ViewChild('selectedExercise') selectedExercise!: any;
	@Output() trainingStarts = new EventEmitter<void>();
	exercises!: Exercise[];
	subscription: Subscription;
	isLoading$: Observable<boolean>;
	loadingSubscription: Subscription;

	constructor(private trainingService: TrainingService, private store: Store<fromRoot.State>) { }

	ngOnInit(): void {

		this.isLoading$ = this.store.select(fromRoot.getIsLoading);
		this.subscription = this.trainingService.exerciseChanged.subscribe((result: Exercise[]) => {
			this.exercises = result;
		});
		this.fetchExercises();
  	}

	fetchExercises() {
		this.trainingService.fetchExercises();
	}

	ngOnDestroy () {
		if (this.subscription)
			this.subscription.unsubscribe();
	}

	startTraining (form: NgForm) {
		this.trainingService.startExercise(form.value.selectedExercise);
	}
}
