import * as express from 'express';

import phishcheckRoutes from './routes/phishcheck';

const router = express.Router();

/**
 * GET /
 * @summary The root endpoint, simply directs to the documentation page with a 418 status code
 * @tags Main API Endpoints
 * @return {object} 418 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/', (req, res) => {
	res
		.status(418)
		.send(
			"Hi! You can find the documentation at GET /docs, our Terms of Service at GET /tos, and our Privacy Policy at GET /privacy.",
		);
});

/**
 * GET /tos
 * @summary This serves the terms of service page
 * @tags Misc Endpoints
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/tos', (req, res) => {
	// send the file, located in src/public/html/tos.html
	res.sendFile('tos.html', { root: './src/public/html' });
});

/**
 * GET /privacy
 * @summary This serves the privacy policy page
 * @tags Misc Endpoints
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/privacy', (req, res) => {
	// send the file, located in src/public/html/privacy.html, with the css styling applied
	res.sendFile('privacy.html', { root: './src/public/html' });
});

router.use('/phishcheck', phishcheckRoutes);

export default router;
