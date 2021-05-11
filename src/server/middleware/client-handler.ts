import * as path from 'path';
import { Request, Response, NextFunction } from 'express';

export const CLIENT_ROUTES = ['/register', '/null', '/contact', '/oops', '/login', '/input', '/history', '/journal', '/profile', '/home', '/why', '/settings', '/entries', '/healthhistory', '/notehistory', '/journalhistory', '/foodimagehistory'];

export function clientHandler(req: Request, res: Response, next: NextFunction) {
	res.sendFile(path.join(__dirname, '../public/index.html'));
}
