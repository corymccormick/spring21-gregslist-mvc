import CarsController from "./Controllers/CarsController.js";
import JobsController from "./Controllers/CarsController.js";
class App {
  carsController = new CarsController();
  jobsController = new JobsController();
}

window["app"] = new App();
