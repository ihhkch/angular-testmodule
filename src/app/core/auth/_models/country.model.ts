import { BaseModel } from '../../_base/crud';

export class Country extends BaseModel {
	idCountry: string;
	countryName: string;

	clear(): void {
		this.idCountry = undefined;
		this.countryName = '';
	}
}
