import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldsGalleryMinimalComponent } from './fields-gallery-minimal/fields-gallery-minimal.component';
import { FieldsGalleryComponent } from './fields-gallery/fields-gallery.component';

const routes: Routes = [
	{
		path: 'fields',
		component: FieldsGalleryComponent,
	},
	{
		path: '',
		redirectTo: 'fields',
		pathMatch: 'full',
	},
	{
		path: 'fields/minimal',
		component: FieldsGalleryMinimalComponent,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
