const express=require('express')
const router= new express.Router()
const controller= require('../controllers/controller1')

//Create

router.post('/create',controller.create)

//Read

router.get('/read', controller.read)

//Update

router.patch('/update/:id', controller.update)

//Delete

router.delete('/delete/:id', controller.delete)

module.exports=router