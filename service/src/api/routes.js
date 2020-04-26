import Router from "express";

import handler from './memes/handler.js'

const routes = Router();

routes.get('/memes/:id', handler.getMeme)
routes.get('/memes',handler.listMemes)
routes.post('/memes', handler.createMeme)
routes.delete('/memes/:id', handler.deleteMeme)

export default routes;