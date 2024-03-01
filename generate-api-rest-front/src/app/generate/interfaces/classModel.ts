import { AttributeModel } from "./attributeModel";

export interface ClassModel {
    packageName:    string;
    nameClase:      string;
    nameTable:      string;
    attributeModel?: AttributeModel;
}