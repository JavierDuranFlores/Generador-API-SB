package mx.unach.generateapirest.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClaseModel {

  @Getter @Setter
  private String packageName;

  @Getter @Setter
  private String nameClase;

  @Getter @Setter
  private AttributeModel attributeModel;

  @Getter @Setter
  private String nameTable;

}
