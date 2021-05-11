import { Router } from 'express';
import dailyexerciseRouter from './dailyexercises'
import exerciseRouter from './exercises'
import waterRouter from './water'
import compileRouter from './compile'
import journalRouter from './journal'
import noteRouter from './notes'
import foodimageRouter from './foodimages'
import entriesRouter from './entries'
import exerciseDateRouter from './exercisedates'
import contactRouter from './contact'
const router = Router();

router.use('/exercisedates', exerciseDateRouter)
router.use('/dailyexercises', dailyexerciseRouter);
router.use('/exercises', exerciseRouter);
router.use('/water', waterRouter);
router.use('/compile', compileRouter)
router.use('/journal', journalRouter);
router.use('/notes', noteRouter);
router.use('/foodimages', foodimageRouter);
router.use('/entries', entriesRouter);
router.use('/contact', contactRouter)

export default router;