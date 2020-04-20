import Router from "express";

import handler from './memes/handler.js'

const routes = Router();

routes.get('/memes', handler.getMeme)
routes.post('/memes', handler.createMeme)
routes.delete('/memes', handler.deleteMeme)

export default routes