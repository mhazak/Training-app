import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TrainingComponent } from "./training.component";

const routes: Routes = [
	// needs to be just "", because it is loaded lazily => there is path /training
	{ path: '', component: TrainingComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TrainingRoutingModule {}
