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
public class AttributeModel {
  
  @Getter @Setter
  private String typePK;

  @Getter @Setter
  private String namePK;

  @Getter @Setter
  private String nameColumnDB;

  @Getter @Setter
  private Boolean isSerial;

  @Getter @Setter
  private List<AttributeFKModel> attributeFKModels;

  @Getter @Setter
  private List<AttributeNormalModel> attributeNormalModels;

}
