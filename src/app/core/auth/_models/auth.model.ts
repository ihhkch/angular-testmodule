import { BaseModel } from '../../_base/crud';
import { Society } from './society.model';
import { Country } from './country.model';
import { Profile } from './profile.model';

export class AuthUser extends BaseModel {
    idUser: string;
    status: string;
    idToken: string;
    firstName: string;
    lastName: string;
	society: Society;
	country: Country;
	profile: Profile;

    clear(): void {
        this.idUser = undefined;
        this.status = '';
        this.idToken = '';
        this.firstName = '';
        this.lastName = '';
		this.society = new Society();
		this.society.clear();
		this.country = new Country();
		this.country.clear();
		this.profile = new Profile();
		this.profile.clear();
	}

	get fullname(): string {
		return this.firstName + ' ' + this.lastName;
	}
}
