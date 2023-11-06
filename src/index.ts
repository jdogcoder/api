import * as dotenv from 'dotenv';
import * as http from 'http';
import App from './app';
import * as logger from './utils/logger';
import { validateEnv } from './utils/validateEnv';

dotenv.config();

void (async () => {
	logger.debug('Starting server...');

	logger.debug('Validating environment variables...');

	const env = validateEnv();
	if (!env.valid) {
		logger.error(env.message);
		return process.exit(1);
	} else {
		logger.debug(env.message);

		const port = process.env.PORT || 3000;

		App.set('port', port);
		const server = http.createServer(App);
		server.listen(port);

		server.on('listening', function (): void {
			const addr = server.address();
			const bind =
        typeof addr === 'string' ? `pipe ${addr}` : `port: ${addr!.port}`;
			logger.info(`🎧 Server now listening on is now running on ${bind}`);
		});
	}
})();
