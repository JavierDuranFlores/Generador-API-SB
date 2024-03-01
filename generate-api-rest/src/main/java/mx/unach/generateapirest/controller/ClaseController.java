package mx.unach.generateapirest.controller;

import mx.unach.generateapirest.util.ControllerGenerator;
import mx.unach.generateapirest.util.EntityGenerator;
import mx.unach.generateapirest.util.RepositoryGenerator;
import mx.unach.generateapirest.util.ServiceGenerator;
import mx.unach.generateapirest.util.ServiceImplGenerator;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.unach.generateapirest.models.ClaseModel;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class ClaseController {

  @PostMapping("/generate-entity")
  public StringBuilder generateEntity(@RequestBody ClaseModel claseModel) {

    EntityGenerator e = new EntityGenerator();
   
    return e.entity(claseModel);
  }


  @PostMapping("/generate-repository")
  public StringBuilder generateRepository(@RequestBody ClaseModel claseModel) {

    RepositoryGenerator r = new RepositoryGenerator();

    return r.repository(claseModel);
  }

  @PostMapping("/generate-service")
  public StringBuilder generateService(@RequestBody ClaseModel claseModel) {

    ServiceGenerator s = new ServiceGenerator();

    return s.service(claseModel);
  }

  @PostMapping("/generate-service-impl")
  public StringBuilder generateServiceImpl(@RequestBody ClaseModel claseModel) {

    ServiceImplGenerator si = new ServiceImplGenerator();

    return si.serviceImpl(claseModel);
  }

  @PostMapping("/generate-controller")
  public StringBuilder generateController(@RequestBody ClaseModel claseModel) {
    ControllerGenerator c = new ControllerGenerator();
    return c.controller(claseModel);
  }

  
}
