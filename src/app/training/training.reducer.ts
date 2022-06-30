import { Exercise } from "./exercise.model";
import * as fromRoot from '../app.reducer';
import * as TRActions from './training.actions';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface TrainingState {
	availableExercises: Exercise[];
	finishedExercises: Exercise[];
	activeTraining: Exercise
}
// this module is loaded lazily, we can't put it into app.reducer, so we will just extend its State
export interface State extends fromRoot.State {
	training: TrainingState
}

const initialState: TrainingState = {
	availableExercises: [],
	finishedExercises: [],
	activeTraining: null
}

export function trainingReducer(state = initialState, action: TRActions.TrainingActions) {
	switch (action.type) {
		case TRActions.SET_AVAILABLE_TRAININGS:
			return {
				...state,
				availableExercises: action.payload
			};

		case TRActions.SET_FINISHED_TRAININGS:
			return {
				...state,
				finishedExercises: action.payload
			};

		case TRActions.START_TRAINING:
			return {
				...state,
				activeTraining: action.payload
			 };

		case TRActions.STOP_TRAINING:
			return {
				...state,
				activeTraining: null
			};

		default:
			return state;
	}

}

// name of feature selector needs to be same as defined in module
export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
