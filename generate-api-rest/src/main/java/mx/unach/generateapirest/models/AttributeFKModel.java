package mx.unach.generateapirest.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttributeFKModel {
  
  @Getter @Setter
  private String typeFK;

  @Getter @Setter
  private String nameFK;

  @Getter @Setter
  private Cardinality cardinality;

  @Getter @Setter
  private String nameColumnDB;

}
