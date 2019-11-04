import { BaseModel } from '../../_base/crud';

export class Society extends BaseModel {
	idSociety: string;
	societyName: string;
	idCountry: string;

	clear(): void {
		this.idSociety = undefined;
		this.societyName = '';
		this.idCountry = undefined;
	}
}
