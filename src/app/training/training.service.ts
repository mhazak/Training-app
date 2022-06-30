import { Exercise } from "./exercise.model";
import { Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { UIService } from "../shared/ui.service";

@Injectable()
export class TrainingService {
	constructor (private db: AngularFirestore, private uiservice: UIService, private store: Store<fromTraining.State>) {}

	private availableExercises: Exercise[] = [];
	private runningExercise!: Exercise | null;

	dbSubscription: Subscription[] = [];

	fetchExercises() {
		this.store.dispatch(new UI.StartLoading());
		this.dbSubscription.push(this.db
			.collection('availableExercises')
			.snapshotChanges()
			.pipe(
				map(docData => {
					return docData.map(doc => {
						return {
							id: doc.payload.doc.id,
							name: doc.payload.doc.data()['name'],
							duration: doc.payload.doc.data()['duration'],
							calories: doc.payload.doc.data()['calories'],
						}
					})
				})
			).subscribe((result: Exercise[]) => {
				this.store.dispatch(new UI.StopLoading());
				this.store.dispatch(new Training.SetAvailableExercises(result));
			}, error => {
				this.store.dispatch(new UI.StopLoading());
				this.store.dispatch(new Training.SetAvailableExercises(null))
				this.uiservice.snackbarOpen(error.message, null, { duration: 3000 });
			})
		)
	}

	startExercise(exerciseId: string) {
		this.store.dispatch(new Training.StartTraining(exerciseId));
	}

	completedExercise() {
		if (this.runningExercise)
			this.finishedExercises({...this.runningExercise, date: new Date, state: 'completed' });
		this.store.dispatch(new Training.StopTraining());
	}

	cancelledExercise(progress: number) {
		if (this.runningExercise)
			this.finishedExercises({...this.runningExercise, duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.calories * (progress / 100), date: new Date, state: 'cancelled' });
		this.store.dispatch(new Training.StopTraining());
	}

	getRunningExercise() {
		return this.runningExercise;
	}

	getExerciseHistory () {
		this.dbSubscription.push(this.db
			.collection('finishedExercises')
			.snapshotChanges()
			.pipe(
				map(data => {
					return data.map(x => {
						return {
							id: x.payload.doc.id,
							name: x.payload.doc.data()['name'],
							duration: x.payload.doc.data()['duration'],
							calories: x.payload.doc.data()['calories'],
							// exerciseid: x.payload.doc.data()['id'],
							date: x.payload.doc.data()['date'],
							state: x.payload.doc.data()['state']
						}
					})
				})
			).subscribe((result: Exercise[]) => {
				this.store.dispatch(new Training.SetFinishedExercises(result));
			}))
	}

	private finishedExercises(exercise: Exercise) {
		this.db.collection('finishedExercises').add(exercise);
	}
}
