import { Router } from 'express';
import dailyexerciseRouter from './dailyexercises'
import exerciseRouter from './exercises'
import waterRouter from './water'
import compileRouter from './compile'
import journalRouter from './journal'
import noteRouter from './notes'
import foodimageRouter from './foodimages'
import entriesRouter from './entries'
import getallexercisesRouter from './getallexercises'
const router = Router();

router.use('/todaysdailyexercises', dailyexerciseRouter);
router.use('/todaysexercises', exerciseRouter);
router.use('/todayswater', waterRouter);
router.use('/todayscompile', compileRouter)
router.use('/todaysjournal', journalRouter);
router.use('/todaysnotes', noteRouter);
router.use('/todaysfoodimages', foodimageRouter);
router.use('/todaysentries', entriesRouter);
router.use('/getallexercises', getallexercisesRouter)


export default router;