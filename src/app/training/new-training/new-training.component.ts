import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit {

	@ViewChild('selectedExercise') selectedExercise!: any;
	@Output() trainingStarts = new EventEmitter<void>();
	exercises$: Observable<Exercise[]>;
	subscription: Subscription;
	isLoading$: Observable<boolean>;
	loadingSubscription: Subscription;

	constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

	ngOnInit(): void {

		this.isLoading$ = this.store.select(fromRoot.getIsLoading);
		this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
		this.fetchExercises();
  	}

	fetchExercises() {
		this.trainingService.fetchExercises();
	}

	startTraining (form: NgForm) {
		this.trainingService.startExercise(form.value.selectedExercise);
	}
}
