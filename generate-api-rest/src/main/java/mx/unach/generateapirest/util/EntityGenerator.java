package mx.unach.generateapirest.util;

import mx.unach.generateapirest.models.AttributeFKModel;
import mx.unach.generateapirest.models.AttributeNormalModel;
import mx.unach.generateapirest.models.Cardinality;
import mx.unach.generateapirest.models.ClaseModel;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EntityGenerator {

    public StringBuilder entity(ClaseModel claseModel) {

        String packageName = claseModel.getPackageName();
        String nameClass = claseModel.getNameClase();
        String nameTable = claseModel.getNameTable();
        StringBuilder codeBuilder = new StringBuilder();

        // Agregar el paquete de la clase
        codeBuilder.append("package ").append(packageName).append(".entity").append(";\n\n");

        // Agregar las importaciones
        codeBuilder.append("import java.io.Serializable;\n");
        codeBuilder.append("import javax.persistence.Column;\n");
        codeBuilder.append("import javax.persistence.Entity;\n");
        codeBuilder.append("import javax.persistence.Id;\n");
        codeBuilder.append("import javax.persistence.Table;\n");
        codeBuilder.append("import lombok.AllArgsConstructor;\n");
        codeBuilder.append("import lombok.Builder;\n");
        codeBuilder.append("import lombok.Getter;\n");
        codeBuilder.append("import lombok.NoArgsConstructor;\n");
        codeBuilder.append("import lombok.Setter;\n");
        codeBuilder.append("import lombok.ToString;\n\n");

        // Agregar la anotación @Entity y @Table
        codeBuilder.append("@Entity\n");
        codeBuilder.append("@Table(name=\"").append(nameTable).append("\")\n");

        // Agregar la declaración de la clase y la implementación de Serializable
        codeBuilder.append("public class ").append((nameClass));
        codeBuilder.append(" implements Serializable {\n\n");

        codeBuilder.append("\t@Id\n");
        if (claseModel.getAttributeModel().getIsSerial()
                && (claseModel.getAttributeModel().getTypePK().equalsIgnoreCase("Integer") ||
                    claseModel.getAttributeModel().getTypePK().equalsIgnoreCase("int") ||
                    claseModel.getAttributeModel().getTypePK().equalsIgnoreCase("Long") ||
                    claseModel.getAttributeModel().getTypePK().equalsIgnoreCase("long")))
            codeBuilder.append("\t@GeneratedValue(strategy = GenerationType.IDENTITY)\n");
        codeBuilder.append("\t@Column(name = \"").append(claseModel.getAttributeModel().getNameColumnDB()).append("\")\n");
        codeBuilder.append("\t@Getter @Setter\n");
        codeBuilder.append("\tprivate ").append(claseModel.getAttributeModel().getTypePK()).append(" ").append(claseModel.getAttributeModel().getNamePK()).append(";\n\n");

        for (AttributeNormalModel attribute : claseModel.getAttributeModel().getAttributeNormalModels()) {
            String type = attribute.getTypeNormal();
            String name = attribute.getNameNormal();
            String nameColumnDB = attribute.getNameColumnDB();

            codeBuilder.append("\t@Column(name = \"").append(nameColumnDB).append("\")\n");
            codeBuilder.append("\t@Getter @Setter\n");
            codeBuilder.append("\tprivate ").append(type).append(" ").append(name).append(";\n\n");
        }

        for (AttributeFKModel attribute : claseModel.getAttributeModel().getAttributeFKModels()) {
            String nameColumnDBPK =claseModel.getAttributeModel().getNameColumnDB();
            codeBuilder.append(cardinalidad(attribute.getCardinality(), attribute, nameClass, nameColumnDBPK)).append("\n");
        }

        return codeBuilder.append("}");

    }




    public static StringBuilder cardinalidad(Cardinality cardinality, AttributeFKModel attributeFKModel, String className, String namePK) {
        String type = attributeFKModel.getTypeFK();
        String name = attributeFKModel.getNameFK();
        String nameColumnDB = attributeFKModel.getNameColumnDB();

        StringBuilder codeBuilder = new StringBuilder();

        switch (cardinality) {
            case UNO_A_UNO :
                codeBuilder.append("\t@OneToOne\n");
                codeBuilder.append("\t@JoinColumn(name = \"").append(nameColumnDB).append("\")\n");
                codeBuilder.append("\tprivate ").append(type).append(" ").append(name).append(";\n");
            break;
            case UNO_A_MUCHOS :
                codeBuilder.append("\t@OneToMany(mappedBy = \"").append(nameColumnDB).append("\")\n");
                codeBuilder.append("\tprivate List<").append(type).append("> ").append(name).append(";\n");
            break;
            case MUCHOS_A_UNO :
                codeBuilder.append("\t@ManyToOne\n");
                codeBuilder.append("\t@JoinColumn(name = \"").append("id_").append(nameColumnDB).append("\")\n");
                codeBuilder.append("\tprivate ").append(type).append(" ").append(name).append(";\n");
            break;
            case MUCHOS_A_MUCHOS :
                codeBuilder.append("\t@ManyToMany\n");
                codeBuilder.append("\t@JoinTable(\n");
                codeBuilder.append("\t\tname = \"").append(camelToSnake(className+"_"+attributeFKModel.getNameFK())).append("\",\n");
                codeBuilder.append("\t\tjoinColumns = @JoinColumn(name = \"").append(camelToSnake(namePK)).append("\",\n");
                codeBuilder.append("\t\tinverseJoinColumns = @JoinColumn(name = \"").append("id_").append(singularize(attributeFKModel.getNameFK())).append("\"\n");
                codeBuilder.append("\t)\n");
                codeBuilder.append("\tprivate Set<").append(type).append("> ").append(name).append(";\n");
                break;
        }
        return codeBuilder;
    }

    public static String camelToSnake(String input) {
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (Character.isUpperCase(c)) {
                result.append("_").append(Character.toLowerCase(c));
            } else {
                result.append(c);
            }
        }

        return result.toString();
    }

    public static int countWords(String input) {
        int wordCount = 0;
        boolean insideWord = false;

        for (char c : input.toCharArray()) {
            if (Character.isLetter(c)) {
                // Estamos dentro de una palabra
                if (!insideWord) {
                    insideWord = true;
                    wordCount++;
                }
            } else {
                // No es una letra, termina la palabra
                insideWord = false;
            }
        }

        return wordCount;
    }

    public static String toCamelCase(String input) {
        StringBuilder result = new StringBuilder();

        boolean capitalizeNext = true;
        for (char c : input.toCharArray()) {
            if (Character.isWhitespace(c)) {
                capitalizeNext = true;
            } else if (capitalizeNext) {
                result.append(Character.toUpperCase(c));
                capitalizeNext = false;
            } else {
                result.append(Character.toLowerCase(c));
            }
        }

        return result.toString();
    }

    public static String capitalize(String phrase) {
        String[] words = phrase.split("\\s+");
        StringBuilder result = new StringBuilder();

        for (String word : words) {
            if (!word.isEmpty()) {
                result.append(Character.toUpperCase(word.charAt(0)));
                if (word.length() > 1) {
                    result.append(word.substring(1).toLowerCase());
                }
            }
        }
        return result.toString();
    }



    // Método para singularizar palabras
    public static String singularize(String word) {
        Pattern pattern = Pattern.compile("\\b\\w+s\\b");
        Matcher matcher = pattern.matcher(word);
        if (matcher.matches()) {
            return word + "s";
        } else {
            return word;
        }
    }


}
