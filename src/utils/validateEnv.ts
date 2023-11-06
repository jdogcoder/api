/**
 * A function to validate the environment variables, and makes sure they are set.
 * @returns valid: boolean, message: string
 */
export const validateEnv = (): { valid: boolean; message: string } => {
	if (!process.env.NODE_ENV) {
		return {
			valid: false,
			message:
        'Missing Node Env! Please set this to either \'development\' or \'production\' based on your environment.',
		};
	}

	if (!process.env.PORT) {
		return {
			valid: false,
			message:
        'Missing API Port. We use 3000, but select any open port you would like to use on your machine.',
		};
	}

	if (!process.env.POSTGRES_USER) {
		return {
			valid: false,
			message: 'Missing Postgres User. Please create one.',
		};
	}

	if (!process.env.POSTGRES_PASSWORD) {
		return {
			valid: false,
			message:
        'Missing Postgres Password Please create one. We reccomend using \'openssl rand -base64 12\' or a password generator.',
		};
	}

	if (!process.env.POSTGRES_DB) {
		return { valid: false, message: 'Missing Postgres Database Name.' };
	}

	if (!process.env.POSTGRES_HOST) {
		return { valid: false, message: 'Missing Postgres Host.' };
	}

	if (!process.env.POSTGRES_PORT) {
		return { valid: false, message: 'Missing Postgres Port.' };
	}

	// if (!process.env.STRIPE_SECRET_KEY) {
	// 	return { valid: false, message: 'Missing Stripe Secret Key' };
	// }

	if (!process.env.JWT_SECRET) {
		return {
			valid: false,
			message:
        'Missing JWT Secret. You can generate a random one using \'openssl rand -base64 12\'',
		};
	}

	if (!process.env.GOOGLE_SAFE_BROWSING_API_KEY) {
		return {
			valid: false,
			message:
        'Missing Google Safe Browsing API Key. You can locate one here: https://developers.google.com/safe-browsing/v4/get-started',
		};
	}

	if (!process.env.PHISHERMAN_API_KEY) {
		return {
			valid: false,
			message:
        'Missing Phisherman API Key. You can get one at https://phisherman.gg.',
		};
	}

	if (!process.env.IP_QUALITY_SCORE_API_KEY) {
		return {
			valid: false,
			message:
        'Missing ipQualityScore API Key. Aquire one at https://www.ipqualityscore.com.',
		};
	}

	if (!process.env.PHISH_REPORT_API_KEY) {
		return {
			valid: false,
			message: 'Missing Phish Report API Key. Get one at https://phish.report.',
		};
	}

	if (!process.env.URLSCAN_API_KEY) {
		return {
			valid: false,
			message:
        'Missing URLScan API Key. You can find one at https://urlscan.io.',
		};
	}

	if (!process.env.VIRUS_TOTAL_API_KEY) {
		return {
			valid: false,
			message:
        'Missing Virus Total API Key. Go get one at https://www.virustotal.com.',
		};
	}

	if (!process.env.YURI_API_KEY) {
		return { valid: false, message: 'Missing Yuri API Key' };
	}

	return { valid: true, message: 'Environment variables validated!' };
};
