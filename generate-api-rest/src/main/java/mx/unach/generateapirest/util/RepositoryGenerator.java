package mx.unach.generateapirest.util;

import mx.unach.generateapirest.models.ClaseModel;

public class RepositoryGenerator {

    public StringBuilder repository(ClaseModel claseModel) {

        String packageName = claseModel.getPackageName();
        String nameClass = claseModel.getNameClase();
        String nameTable = claseModel.getNameTable();
        StringBuilder codeBuilder = new StringBuilder();

        // Agregar el paquete de la clase
        codeBuilder.append("package ").append(packageName).append(".repository").append(";\n\n");

        // Agregar las importaciones
        codeBuilder.append("import org.springframework.stereotype.Repository;\n");
        codeBuilder.append("import org.springframework.data.repository.CrudRepository;\n");
        codeBuilder.append("import ").append(packageName).append(".entity.").append(nameClass).append(";\n\n");

        codeBuilder.append("@Repository(\"").append(StringUtils.firstLetterToLowerCase(nameClass)).append("Reposirory").append("\")\n");

        codeBuilder.append("public interface ").append(nameClass).append("Repository").append(" extends CrudRepository<").append(nameClass).append(", ").append(claseModel.getAttributeModel().getTypePK()).append(">{\n\n");
        codeBuilder.append("\t").append(claseModel.getAttributeModel().getTypePK()).append(" deleteBy").append(StringUtils.capitalizeFirstLetter(claseModel.getAttributeModel().getNamePK())).append("(").append(claseModel.getAttributeModel().getTypePK()).append(" ").append(claseModel.getAttributeModel().getNamePK()).append(");\n\n");

        return codeBuilder.append("}");
    }

}
