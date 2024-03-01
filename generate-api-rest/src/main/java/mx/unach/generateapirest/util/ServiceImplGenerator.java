package mx.unach.generateapirest.util;

import mx.unach.generateapirest.models.ClaseModel;

public class ServiceImplGenerator {

    public StringBuilder serviceImpl(ClaseModel claseModel) {
        String packageName = claseModel.getPackageName();
        String nameClass = claseModel.getNameClase();
        String nameTable = claseModel.getNameTable();
        String namePK = claseModel.getAttributeModel().getNamePK();
        String typePK = claseModel.getAttributeModel().getTypePK();
        StringBuilder codeBuilder = new StringBuilder();

        // Agregar el paquete de la clase
        codeBuilder.append("package ").append(packageName).append(".service.impl").append(";\n\n");

        // Agregar las importaciones
        codeBuilder.append("import java.util.List;\n");
        codeBuilder.append("import java.util.Optional;\n\n");
        codeBuilder.append("import javax.transaction.Transactional;\n\n");

        codeBuilder.append("import org.springframework.beans.factory.annotation.Autowired;\n");
        codeBuilder.append("import org.springframework.beans.factory.annotation.Qualifier;\n");
        codeBuilder.append("import org.springframework.stereotype.Service;\n\n");

        codeBuilder.append("import ").append(packageName).append(".entity.").append(nameClass).append("Entity").append(";\n");
        codeBuilder.append("import ").append(packageName).append(".repository.").append(nameClass).append("Repository").append(";\n");
        codeBuilder.append("import ").append(packageName).append(".service.").append(nameClass).append("Service").append(";\n\n");

        codeBuilder.append("@Service(\"").append(StringUtils.firstLetterToLowerCase(nameClass)).append("ServiceImpl").append("\")\n");
        codeBuilder.append("@Transactional\n");
        codeBuilder.append("public class ").append((nameClass)).append("ServiceImpl");
        codeBuilder.append(" implements ").append(nameClass).append("Service").append(" {\n\n");

        codeBuilder.append("\t@Autowired\n");
        codeBuilder.append("\t@Qualifier(\"").append(StringUtils.firstLetterToLowerCase(nameClass)).append("Repository").append("\")\n");
        codeBuilder.append("\tprivate ").append(nameClass).append("Repository").append(" ").append(StringUtils.firstLetterToLowerCase(nameClass)).append("Repository").append(";\n\n");

        String typeReturn = "List<"+nameClass+">";
        String nameMethod = "listAll"+nameClass+"s";
        String parameter = "";
        codeBuilder.append("\t@Override\n");
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameter));
        codeBuilder.append(bodyMethod("(List<"+nameClass+">) "+StringUtils.firstLetterToLowerCase(nameClass)+"Repository", ".findAll", "();\n"));
        codeBuilder.append("\t}\n\n");

        typeReturn = "Optional<"+nameClass+">";
        nameMethod = "findBy"+StringUtils.capitalizeFirstLetter(namePK);
        parameter = typePK+" "+namePK;
        codeBuilder.append("\t@Override\n");
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameter));
        codeBuilder.append(bodyMethod(StringUtils.firstLetterToLowerCase(nameClass)+"Repository", ".findById(", namePK+")\n"));
        codeBuilder.append("\t}\n\n");

        typeReturn = nameClass;
        nameMethod = "createOrUpdate"+nameClass;
        parameter = typePK+" "+StringUtils.firstLetterToLowerCase(namePK);
        codeBuilder.append("\t@Override\n");
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameter));
        codeBuilder.append(bodyMethod(StringUtils.firstLetterToLowerCase(nameClass)+"Repository", ".save(", StringUtils.firstLetterToLowerCase(namePK)+")\n"));
        codeBuilder.append("\t}\n\n");

        typeReturn = typePK;
        nameMethod = "delete"+nameClass;
        parameter = typePK+" "+namePK;
        codeBuilder.append("\t@Override\n");
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameter));
        codeBuilder.append(bodyMethod(StringUtils.firstLetterToLowerCase(nameClass)+"Repository", ".deleteBy"+StringUtils.capitalizeFirstLetter(claseModel.getAttributeModel().getNamePK())+"(", namePK+")\n"));
        codeBuilder.append("\t}\n\n");

        return codeBuilder.append("}");
    }

    public StringBuilder methodCreate(String typeReturn, String nameMethod, String parameter) {

        StringBuilder codeBuilder = new StringBuilder();

        codeBuilder.append("\tpublic ").append(typeReturn).append(" ").append(nameMethod).append("(").append(parameter).append(");\n");

        return codeBuilder;
    }

    public StringBuilder bodyMethod(String repository, String nameMethodRepository, String parameter) {
        StringBuilder codeBuilder = new StringBuilder();

        codeBuilder.append("\t\treturn ").append(repository).append(nameMethodRepository).append(parameter).append("\n");

        return codeBuilder;

    }

}
