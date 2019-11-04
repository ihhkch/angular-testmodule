import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'kt-scorcard',
	templateUrl: './scorcard.component.html',
	styleUrls: ['./scorcard.component.css']
})
export class ScorcardComponent implements OnInit {

	@Input() value: string | number;
	@Input() desc: string;

	constructor() {
	}

	ngOnInit() {
	}

}
