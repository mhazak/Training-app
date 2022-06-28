import { Exercise } from "./exercise.model";
import { Observable, Subject, Subscription } from "rxjs";
import { map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";

@Injectable()
export class TrainingService {
	constructor (private db: AngularFirestore) {}

	private availableExercises: Exercise[] = [];
	private runningExercise!: Exercise | null;

	dbSubscription: Subscription[];
	exerciseStarted = new Subject<Exercise | null>();
	exerciseChanged = new Subject<Exercise[]>();
	completedExercisesChanged = new Subject<Exercise[]>();


	fetchExercises() {
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
				this.availableExercises = result;
				this.exerciseChanged.next(result);
			}))
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
		this.dbSubscription.forEach(subscription => subscription.unsubscribe());
	}

	private finishedExercises(exercise: Exercise) {
		this.db.collection('finishedExercises').add(exercise);
	}
}
