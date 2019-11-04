import {Component, Input, OnChanges, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {Chart} from 'chart.js';

@Component({
	selector: 'app-grafico',
	templateUrl: './grafico.component.html',
	styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
	@ViewChild('canvas') canvas: ElementRef;
	@Input() public tituloGrafico: string;
	@Input() public grafico: Object;
	@Input() public actualizarGrafico: boolean;
	@Input() public width: number = 0;
	@Input() public height: number = 0;

	chart = [];
	intervalUpdate: any = null;

	constructor() {
		this.actualizarGrafico = true;
	}

	ngOnInit() {
	}

	ngOnChanges() {
		setTimeout(function () {
			this.chart.update();
		}.bind(this), 100);
	}

	ngAfterViewInit() {
		this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), this.grafico);
	}

	public ngOnDestroy(): void {
		clearInterval(this.intervalUpdate);
	}
}
