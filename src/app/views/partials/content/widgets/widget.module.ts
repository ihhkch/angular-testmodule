import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, } from '@angular/material';
import { CoreModule } from '../../../../core/core.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// Datatable
import { DataTableComponent } from './general/data-table/data-table.component';
// General widgets
import { Widget1Component } from './widget1/widget1.component';
import { Widget4Component } from './widget4/widget4.component';
import { Widget5Component } from './widget5/widget5.component';
import { Widget12Component } from './widget12/widget12.component';
import { Widget14Component } from './widget14/widget14.component';
import { Widget26Component } from './widget26/widget26.component';
import { Timeline2Component } from './timeline2/timeline2.component';
// Demo
import { ScorcardComponent } from './scorcard/scorcard.component';
import { ChartBar1Component } from './chart-bar-1/chart-bar-1.component';
import { ChartBar2Component } from './chart-bar-2/chart-bar-2.component';
import { ChartHistogram1Component } from './chart-histogram-1/chart-histogram-1.component';
import { ChartScatter1Component } from './chart-scatter-1/chart-scatter-1.component';
import { ChartScatter2Component } from './chart-scatter-2/chart-scatter-2.component';
import { ChartHbar1Component } from './chart-hbar-1/chart-hbar-1.component';
import { ChartHbar2Component } from './chart-hbar-2/chart-hbar-2.component';

@NgModule({
	declarations: [
		DataTableComponent,
		// Widgets
		Widget1Component,
		Widget4Component,
		Widget5Component,
		Widget12Component,
		Widget14Component,
		Widget26Component,
		Timeline2Component,
		ScorcardComponent,
		ChartBar1Component,
		ChartBar2Component,
		ChartHistogram1Component,
		ChartScatter1Component,
		ChartScatter2Component,
		ChartHbar1Component,
		ChartHbar2Component,
	],
	exports: [
		DataTableComponent,
		// Widgets
		Widget1Component,
		Widget4Component,
		Widget5Component,
		Widget12Component,
		Widget14Component,
		Widget26Component,
		Timeline2Component,
		ScorcardComponent,
		ChartBar1Component,
		ChartBar2Component,
		ChartHistogram1Component,
		ChartScatter1Component,
		ChartScatter2Component,
		ChartHbar1Component,
		ChartHbar2Component,
	],
	imports: [
		CommonModule,
		PerfectScrollbarModule,
		MatTableModule,
		CoreModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatSortModule,
	]
})
export class WidgetModule {
}
