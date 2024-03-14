package mx.unach.generateapirest.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttributeNormalModel {
  
  @Getter @Setter
  private String tipo;

  @Getter @Setter
  private String nombre;

  @Getter @Setter
  private String columna;

}

