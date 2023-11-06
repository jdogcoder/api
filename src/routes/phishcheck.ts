import * as express from 'express';

import domainRoutes from './phishcheck/domain';
import emailRoutes from './phishcheck/email';
import linkRoutes from './phishcheck/link';
import phoneNumberRoutes from './phishcheck/phoneNumber';

const router = express.Router();

router.use('/link', linkRoutes);
router.use('/domain', domainRoutes);
router.use('/email', emailRoutes);
router.use('/phonenumber', phoneNumberRoutes);

export default router;
