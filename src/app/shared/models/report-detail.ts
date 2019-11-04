import { MineSite } from "./mine-site";
import { Equipment } from "./equipment";
import { Componente } from "./componente";

export class ReportDetail {
    idRole: number;
    roleName: string;
    report: string;
    mineSites: MineSite[];
    equipments: Equipment[];
    components: Componente[];
}