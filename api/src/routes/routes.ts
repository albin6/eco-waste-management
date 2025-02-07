import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controllers";

export class Routes {
  public router: Router;
  private userController: UserController;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
    this.userController = new UserController();
  }

  initializeRoutes() {
    this.router.post("/register", (req: Request, res: Response) =>
      this.userController.createNewUser(req, res)
    );

    this.router.post("/login", (req: Request, res: Response) =>
      this.userController.loginUser(req, res)
    );

    this.router.get("/details", (req: Request, res: Response) =>
      this.userController.getUserDetails(req, res)
    );
  }
}
