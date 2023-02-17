const mongoose= require("mongoose");
const companySchema  = require('../models/companySchema')
const employeeSchema  = require( '../models/employeeSchema')
const databaseFunctions = require('../services/dbAndModelFunc')


// Indicates which Schemas are used by whom

const CompanySchemas = new Map([['company', companySchema]])
const EmployeeSchemas = new Map([['employee', employeeSchema]])


module.exports.createCompany = async (req, res) => {
    const transactionOptions = {
        readConcern: { level: 'snapshot' },
        writeConcern: { w: 'majority' },
        readPreference: 'primary'
      };
    const session = await mongoose.startSession();
    try {
        session.startTransaction(transactionOptions);
        let { companyName } = req.body ;
        let company = true ;
        let checkCompany = await databaseFunctions.getAllCompanyDetails();
        let data = await checkCompany.map(result => {
            if(result.companyName == companyName){
                company = false ;
            }
        })
        if(company){
            let company = await databaseFunctions.createCompany(req.body);
            if(company){
                await session.commitTransaction();
              res.json({
                  status: true,
                  statusCode: 201,
                  message: "Company Created Successfully",
                  data: company
              })
            }else{
                await session.abortTransaction();
                res.json({
                    status: false,
                    statusCode: 400,
                    message: "Something Went Wrong",
                    data: ""
                })
              } 
        }
      else{
        await session.abortTransaction();
        res.json({
            status: true,
            statusCode: 200,
            message: "Company Already Exits",
            data: ""
        })
      }    
    } catch (error) {
        await session.abortTransaction();
        res.json({
            status: false,
            statusCode: 400,
            message: error.message,
            data: ""
        })
    }
    finally {
        await session.endSession();
      }
}

module.exports.createEmployee = async (req, res) => {
    try {
       
        let { userName ,companyName} = req.body
        let company = false ;
        let checkCompany = await databaseFunctions.getAllCompanyDetails();
        let companyArray = [] ;
        let data = await checkCompany.map(result => {
            if(result.companyName == companyName){
                company = true ;
                companyArray.push(result)
            }
        })
        console.log(company,'company')
        if(company){
            let employee = await databaseFunctions.createEmployees(companyArray,userName);
             if(employee.length > 0 && employee[0] != 0){
                res.json({
                    status: true,
                    statusCode: 201,
                    message: "Employee Created Successfully",
                    data: ""
                })
             }else{
                res.json({
                    status: true,
                    statusCode: 200,
                    message: "Employee Already Registered With This Company",
                    data: ""
                })
             }
        }else{
            res.json({
                status: true,
                statusCode: 200,
                message: "This Company Is Not Registered With Us.",
                data: ""
            }) 
        } 
    } catch (error) {
        res.json({
            status: false,
            statusCode: 400,
            message: error.message,
            data: ""
        })
    }
}
