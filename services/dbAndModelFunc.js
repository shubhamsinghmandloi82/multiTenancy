
const multiDb = require('./switchDB')
const companySchema  = require('../models/companySchema')
const employeeSchema  = require( '../models/employeeSchema')

// Indicates which Schemas are used by whom

const CompanySchemas = new Map([['company', companySchema]])
const EmployeeSchemas = new Map([['employee', employeeSchema]])


module.exports.createCompany = async (data) => {
    const companyDB = await multiDb.switchDB('MyDigitCompany', CompanySchemas)
    const companyModel = await multiDb.getDBModel(companyDB, 'company')
    const companyDetails = await companyModel.create({
    name : data.username,
    email : data.email,
    password : data.password,
    companyName : data.companyName,
    })
    return companyDetails

}

module.exports.getAllCompanyDetails = async () => {
    const companyDB = await multiDb.switchDB('MyDigitCompany', CompanySchemas)
    const companyModel = await multiDb.getDBModel(companyDB, 'company')
    const companyDetails = await companyModel.find({})
    return companyDetails
}

module.exports.createEmployees = async (company,userName) => {
    const createEmployees =await company.map(async (data) => {
            const companyDB = await multiDb.switchDB(data.companyName, EmployeeSchemas)
            const employeeModel = await multiDb.getDBModel(companyDB, 'employee')
            let checkUser = await employeeModel.findOne({name:userName})
            if(checkUser){
                return 0
            }else{
                return employeeModel.create({
                    employeeId: Math.floor(Math.random() * 10000).toString(),
                    name: userName,
                    companyName: data.companyName,
                    })
            }
           
    })
    const results = await Promise.all(createEmployees)
    return results

}