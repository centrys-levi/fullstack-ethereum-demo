import { Router } from 'express';
import addWalletRoutes from './wallet';
import addExplorerRoutes from './explorer';

export default ({ smartContractsService }) => {
	const router = Router();
  addWalletRoutes(router, smartContractsService.wallet);
  addExplorerRoutes(router, smartContractsService.explorer);

	return router;
}
