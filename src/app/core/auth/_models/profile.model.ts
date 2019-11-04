import { BaseModel } from '../../_base/crud';

export class Profile extends BaseModel {
	id: number;
    name: string;

    clear(): void {
		this.id = undefined;
        this.name = '';
    }
}
