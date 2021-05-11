import * as express from 'express';
import db from '../../db';
import { MySQL_Res } from '../../../../utilities';
import { ReqUser } from '../../../../types'
import { tokenCheck } from '../../middleware/auth.mw';

let router = express.Router()

router.get('/:id?', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id;
    let imageid = Number(req.params.id);

    if (!isNaN(imageid)) {
        let thisImage = await db.foodimages.GetFoodImage(imageid, userid)
        res.json(thisImage)
    } else {
        let allImages = await db.foodimages.GetFoodImages(userid)
        res.json(allImages)
    }   
    } catch (error) {
        next(error)
    } 
})

router.post('/', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id
    let body = req.body
    let thisFoodImage = await db.foodimages.CreateFoodImage(userid, body.imagename, body.image)
    res.json(thisFoodImage)
    } catch (error) {
        next(error)
    } 
})

router.put('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let imageid = Number(req.params.id);
    let userid = req.user.id
    let body = req.body
    let image = await db.foodimages.GetFoodImage(imageid, userid)

    if(Object.keys(image).length === 0) {
        res.sendStatus(404);
        return
    }
    let updatedRes = await db.foodimages.UpdateFoodImage(imageid, userid, body.imagename, body.image)
    res.json(updatedRes)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        console.log('FoodImage Delete Router hit')
        let imageid = Number(req.params.id);
        console.log(imageid)
    let userid = req.user.id;
    console.log(userid)
    let deletedRes = await db.foodimages.DeleteFoodImage(imageid, userid);
    console.log(deletedRes)
    res.json(deletedRes)
    } catch (error) {
        next(error)
    }
});

export default router;