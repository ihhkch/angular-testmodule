import { Report } from "./report";
import { BaseModel } from "../../core/_base/crud";

export class UserReport {
    idSociety: string;
    societyName: string;
    reports: Report[];
}
