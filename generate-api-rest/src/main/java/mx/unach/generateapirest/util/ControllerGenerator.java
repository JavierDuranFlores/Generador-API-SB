package mx.unach.generateapirest.util;

import mx.unach.generateapirest.models.ClaseModel;

public class ControllerGenerator {

  public StringBuilder controller(ClaseModel claseModel) {

        String packageName = claseModel.getPackageName();
        String nameClass = claseModel.getNameClase();
        String nameClassEntity = claseModel.getNameClase()+"Entity";
        String namePK = claseModel.getAttributeModel().getNamePK();
        String typePK = claseModel.getAttributeModel().getTypePK();
        String nameTable = claseModel.getNameTable();
        StringBuilder codeBuilder = new StringBuilder();

        // Agregar el paquete de la clase
        codeBuilder.append("package ").append(packageName).append(".controller").append(";\n\n");

        // Agregar las importaciones
        codeBuilder.append("import java.util.List;\n");
        codeBuilder.append("import java.util.Optional;\n\n");

        codeBuilder.append("import org.springframework.beans.factory.annotation.Autowired;\n");
        codeBuilder.append("import org.springframework.beans.factory.annotation.Qualifier;\n");
        codeBuilder.append("import org.springframework.web.bind.annotation.CrossOrigin;\n");
        codeBuilder.append("import org.springframework.web.bind.annotation.DeleteMapping;\n");
        codeBuilder.append("import org.springframework.web.bind.annotation.GetMapping;\n");
        codeBuilder.append("import org.springframework.web.bind.annotation.PathVariable;\n");
        codeBuilder.append("import org.springframework.web.bind.annotation.PostMapping;\n");
        codeBuilder.append("import org.springframework.web.bind.annotation.PutMapping;\n");
        codeBuilder.append("import org.springframework.web.bind.annotation.RequestBody;\n");
        codeBuilder.append("import org.springframework.web.bind.annotation.RequestMapping;\n");
        codeBuilder.append("import org.springframework.web.bind.annotation.RestController;\n\n");


        codeBuilder.append("import ").append(packageName).append(".entity.").append(nameClassEntity).append(";\n");
        codeBuilder.append("import ").append(packageName).append(".service.impl.").append(nameClass).append("ServiceImpl").append(";\n\n");

        codeBuilder.append("@RestController\n");

        codeBuilder.append("@RequestMapping(\"/\")\n");
        codeBuilder.append("@CrossOrigin(origins=\"*\")\n");
        codeBuilder.append("public class ").append(nameClass).append("Controller {\n\n");
        codeBuilder.append("\t@Autowired\n");
        codeBuilder.append("\t@Qualifier(\"").append(StringUtils.firstLetterToLowerCase(nameClass)).append("ServiceImpl").append("\")\n");
        codeBuilder.append("\tprivate ").append(nameClass).append("ServiceImpl").append(" ").append(StringUtils.firstLetterToLowerCase(nameClass)).append("ServiceImpl").append(";\n\n");

        String typeReturn = "List<"+nameClassEntity+">";
        String nameMethod = "findAll"+nameClass+"s";
        String parameters[] = new String[2];
        String annotacions[] = new String[2];
        String path = "/"+StringUtils.firstLetterToLowerCase(nameClass)+"s";
        codeBuilder.append(methodHttp("@GetMapping", path));
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameters, annotacions));
        codeBuilder.append(bodyMethod(StringUtils.firstLetterToLowerCase(nameClass)+"ServiceImpl", ".findAll" + nameClass, "s();"));
        codeBuilder.append("\t}\n\n");

        typeReturn = "Optional<"+nameClassEntity+">";
        nameMethod = "findBy"+StringUtils.capitalizeFirstLetter(namePK);
        parameters[0] = typePK+" "+namePK;
        annotacions[0] = "@PathVariable";
        codeBuilder.append(methodHttp("@GetMapping", path+"/{"+namePK+"}"));
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameters, annotacions));
        codeBuilder.append(bodyMethod(StringUtils.firstLetterToLowerCase(nameClass)+"ServiceImpl", ".findById" + nameClass + "(", namePK+");")); 
        codeBuilder.append("\t}\n\n");

        typeReturn = nameClassEntity;
        nameMethod = "create"+nameClass;
        parameters[0] = nameClassEntity+" "+StringUtils.firstLetterToLowerCase(nameClass);
        annotacions[0] = "@RequestBody";
        codeBuilder.append(methodHttp("@PostMapping", path));
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameters, annotacions));
        codeBuilder.append(bodyMethod(StringUtils.firstLetterToLowerCase(nameClass)+"ServiceImpl", ".createOrUpdate" + nameClass + "(", StringUtils.firstLetterToLowerCase(nameClass)+");"));
        codeBuilder.append("\t}\n\n");

        typeReturn = nameClassEntity;
        nameMethod = "update"+nameClass;
        parameters[0] = nameClassEntity+" "+StringUtils.firstLetterToLowerCase(nameClass);
        annotacions[0] = "@RequestBody";
        parameters[1] = typePK+" "+namePK;
        annotacions[1] = "@PathVariable";
        codeBuilder.append(methodHttp("@PutMapping", path+"/{"+namePK+"}"));
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameters, annotacions));
        codeBuilder.append("\t\tOptional<").append(nameClassEntity).append(">").append(" actualizar = ").append(StringUtils.firstLetterToLowerCase(nameClass)).append("ServiceImpl").append(".findById"+nameClass+"(").append(namePK).append(");\n");
        codeBuilder.append("\t\t").append(StringUtils.firstLetterToLowerCase("actualizar")).append(".get().set").append(StringUtils.capitalizeFirstLetter(namePK)).append("(").append(StringUtils.firstLetterToLowerCase(nameClass)).append(".get").append(StringUtils.capitalizeFirstLetter(namePK)).append("());\n");
        codeBuilder.append(bodyMethod(StringUtils.firstLetterToLowerCase(nameClass)+"ServiceImpl", ".createOrUpdate" + nameClass+ "(", StringUtils.firstLetterToLowerCase("actualizar.get()")+");"));
        codeBuilder.append("\t}\n\n");

        typeReturn = typePK;
        nameMethod = "deleteById"+nameClass;
        parameters[0] = typePK+" "+namePK;
        annotacions[0] = "@PathVariable";
        parameters[1] = "";
        annotacions[1] = "";
        codeBuilder.append(methodHttp("@DeleteMapping", path+"/{"+namePK+"}"));
        codeBuilder.append(methodCreate(typeReturn, nameMethod, parameters, annotacions));
        codeBuilder.append(bodyMethod(StringUtils.firstLetterToLowerCase(nameClass)+"ServiceImpl", ".deleteBy"+StringUtils.capitalizeFirstLetter(claseModel.getAttributeModel().getNamePK())+"(", namePK+");"));
        codeBuilder.append("\t}\n\n");

        return codeBuilder.append("}");
  }

  public StringBuilder methodHttp(String http, String path) {
    return new StringBuilder("\t"+http+"(path=\"").append(path).append("\", produces={\"application/json\"})\n");
}

  public StringBuilder methodCreate(String typeReturn, String nameMethod, String[] parameters, String[] annotacion) {
    StringBuilder codeBuilder = new StringBuilder();
    codeBuilder.append("\tpublic ").append(typeReturn).append(" ").append(nameMethod).append("(");

    if (parameters[0]!=null)
      if (!parameters[0].isBlank()) {
        codeBuilder.append(annotacion[0]).append(" ");
        codeBuilder.append(parameters[0]);
      }

    if (parameters[1]!=null)
      if (!parameters[1].isBlank()) {
        codeBuilder.append(", ");
        codeBuilder.append(annotacion[1]).append(" ");
        codeBuilder.append(parameters[1]);
      }


    return codeBuilder.append(") {\n");

  }

  public StringBuilder bodyMethod(String repository, String nameMethodRepository, String parameter) {
    StringBuilder codeBuilder = new StringBuilder();
    codeBuilder.append("\t\treturn ").append(repository).append(nameMethodRepository).append(parameter).append("\n");
    return codeBuilder;
  }

}
