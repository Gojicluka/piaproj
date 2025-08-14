import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/test', (_req: Request, res: Response) => {
    res.json({ message: 'API is working!' });
});

export default router;
