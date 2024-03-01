import { AttributeFKModel } from "./attributeFKModels";
import { AttributeNormalModel } from "./attributeNormalModels";

export interface AttributeModel {
    typePK:                string;
    namePK:                string;
    isSerial:              boolean;
    nameColumnDB:          string;
    attributeFKModels?:     AttributeFKModel[];
    attributeNormalModels?: AttributeNormalModel[];
}