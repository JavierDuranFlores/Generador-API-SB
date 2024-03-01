package mx.unach.generateapirest.util;

import mx.unach.generateapirest.models.ClaseModel;

public class ServiceGenerator {

    public StringBuilder service(ClaseModel claseModel) {
        String packageName = claseModel.getPackageName();
        String nameClass = claseModel.getNameClase();
        String nameTable = claseModel.getNameTable();
        String namePK = claseModel.getAttributeModel().getNamePK();
        String typePK = claseModel.getAttributeModel().getTypePK();
        StringBuilder codeBuilder = new StringBuilder();

        // Agregar el paquete de la clase
        codeBuilder.append("package ").append(packageName).append(".service").append(";\n\n");

        // Agregar las importaciones
        codeBuilder.append("import java.util.List;\n");
        codeBuilder.append("import java.util.Optional;\n");
        codeBuilder.append("import ").append(packageName).append(".entity.").append(nameClass).append(";\n\n");

        codeBuilder.append("public interface ").append(nameClass).append("Service").append(" {\n\n");

        String typeReturn = "List<"+nameClass+">";
        String nameMethod = "listAll"+nameClass+"s";
        String parameter = "";
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameter));

        typeReturn = "Optional<"+nameClass+">";
        nameMethod = "findBy"+StringUtils.capitalizeFirstLetter(namePK);
        parameter = typePK+" "+namePK;
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameter));

        typeReturn = nameClass;
        nameMethod = "createOrUpdate"+nameClass;
        parameter = typePK+" "+StringUtils.firstLetterToLowerCase(namePK);
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameter));

        typeReturn = typePK;
        nameMethod = "delete"+nameClass;
        parameter = typePK+" "+namePK;
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameter));

        return codeBuilder.append("}");

    }

    public StringBuilder methodCreate(String typeReturn, String nameMethod, String parameter) {

        StringBuilder codeBuilder = new StringBuilder();

        codeBuilder.append("\tpublic abstract ").append(typeReturn).append(" ").append(nameMethod).append("(").append(parameter).append(");\n");

        return codeBuilder;
    }



}
