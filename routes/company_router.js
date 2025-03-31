import express from 'express'
const router= new express.Router()

import company_controller from'../controllers/company_controller.js'

//COMPANY
//create company profiles
router.post('/companyprof',company_controller.CreateCompany)

//read company
router.get('/read', company_controller.ReadCompanies)

//Delete company
router.delete('/delete/:id', company_controller.DeleteCompany)

export default router
