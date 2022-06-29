import { Exercise } from "./exercise.model";
import { Subject, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { UIService } from "../shared/ui.service";

@Injectable()
export class TrainingService {
	constructor (private db: AngularFirestore, private uiservice: UIService, private store: Store<fromRoot.State>) {}

	private availableExercises: Exercise[] = [];
	private runningExercise!: Exercise | null;

	dbSubscription: Subscription[] = [];
	exerciseStarted = new Subject<Exercise | null>();
	exerciseChanged = new Subject<Exercise[]>();
	completedExercisesChanged = new Subject<Exercise[]>();

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
				this.availableExercises = result;
				this.exerciseChanged.next(result);
			}, error => {
				this.store.dispatch(new UI.StopLoading());
				this.exerciseChanged.next(null);
				this.uiservice.snackbarOpen(error.message, null, { duration: 3000 });
			})
		)
	}

	startExercise(exerciseId: string) {
		const selectedExercise = this.availableExercises.find(x => x.id === exerciseId);
		if (selectedExercise) {
			this.runningExercise = selectedExercise;
			this.exerciseStarted.next(selectedExercise);
		}
	}

	completedExercise() {
		if (this.runningExercise)
			this.finishedExercises({...this.runningExercise, date: new Date, state: 'completed' });
		this.runningExercise = null;
		this.exerciseStarted.next(null);
	}

	cancelledExercise(progress: number) {
		if (this.runningExercise)
			this.finishedExercises({...this.runningExercise, duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.calories * (progress / 100), date: new Date, state: 'cancelled' });
		this.runningExercise = null;
		this.exerciseStarted.next(null);
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
				this.completedExercisesChanged.next(result);
			}))
	}

	cancelSubscriptions() {
		if (this.dbSubscription)
			this.dbSubscription.forEach(subscription => subscription.unsubscribe());
	}

	private finishedExercises(exercise: Exercise) {
		this.db.collection('finishedExercises').add(exercise);
	}
}
