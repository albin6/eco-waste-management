import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { WalletController } from "../controllers/wallet.controllers";
import { TransactionController } from "../controllers/transaction.controiller";

export class Routes {
  public router: Router;
  private userController: UserController;
  private walletController: WalletController;
  private transactionController: TransactionController;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
    this.userController = new UserController();
    this.walletController = new WalletController();
    this.transactionController = new TransactionController();
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

    this.router.get("/wallet/balance", (req: Request, res: Response) =>
      this.walletController.getWalletBalance(req, res)
    );

    this.router.put("/wallet/balance", (req: Request, res: Response) =>
      this.walletController.updateWalletBalance(req, res)
    );

    this.router.get("/transactions", (req: Request, res: Response) =>
      this.transactionController.getUserTransactions(req, res)
    );

    this.router.post("/transactions", (req: Request, res: Response) =>
      this.transactionController.createTransaction(req, res)
    );
  }
}
