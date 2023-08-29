import { incomes, outlay, users } from "../db/sequelize.js";
import { check_accountant } from "../utils/check_token.js";
import jwt from "jsonwebtoken"
export const addOutlay = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_accountant(token)
        if(check == true){
            const {reason,out_time,amount} = req.body
            if(reason && out_time && amount){
                res.send(await outlay.create({reason:reason,out_time:out_time,amount:amount}))
            }else{res.send({ status: 400, data: "insufficient data" })}
        }else if(check == false){res.send({ status: 400, data: "you are not an accountant" })}
    } catch (error) {}
}
export const loginAccountant = async(req,res) => {
    try {
        const {email,password} = req.body
        if(email && password){
            const accountant = await users.findOne({where:[{email:email,password:password}]})
            const token = jwt.sign({token:accountant.pos_ref_id,email:accountant.email},"parol")
            res.send({status:200,data:token})
        }else{
            res.send({ status: 400, data: "insufficient data" })
        }
    } catch (error) {}
}
export const addIncomes = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_accountant(token)
        if(check == true){
            const accountant_token = jwt.verify(token,"parol")
            const accountant  = await users.findOne({where:{email:accountant_token.email}})
            const {reason,amount,inc_time} = req.body
            if(reason && amount && inc_time){
                res.send(await incomes.create({reason:reason,amount:amount,inc_time:inc_time,user_ref_id:accountant.id}))
            }else{
                res.send({ status: 400, data: "insufficient data" })
            }
        }else{
            res.send({ status: 400, data: "you are not an accountant" })
        }
    } catch (error) {}
}
export const getOutlays = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_accountant(token)
        if(check == true){
            const {out_time} = req.query
            if(out_time){
                res.send(await outlay.findAll({where:{out_time:out_time}}))
            }else if(!out_time){
                res.send(await outlay.findAll())
            }
        }else{
            res.send({ status: 400, data: "you are not an accountant" })
        }
    } catch (error) {
        res.send(error.message)
    }
}
export const getIncomes = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_accountant(token)
        if(check == true){
            const {inc_date} = req.query
            if(inc_date){
                res.send(await incomes.findAll({where:{inc_date:inc_date}}))
            }else{
                res.send(await incomes.findAll())
            }
        }else{
            res.send({ status: 400, data: "you are not an accountant" })
        }
    } catch (error) {
        res.send(error.message)
    }
}
export const updateIncomes = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_accountant(token)
        if(check == true){
            const {id} = req.params
            const {reason,amount,inc_time} = req.body
            if(reason || amount || inc_time){
                const oldIncomes = await incomes.findOne({where:{id:id}})
                await incomes.update({reason:reason || oldIncomes.reason,amount:amount||oldIncomes.amount,inc_time:inc_time||oldIncomes.inc_date},{where:{id:id}})
                res.send({status:200,data:"incomes in updated"})
            }else{
                res.send({ status: 400, data: "insufficient data" })
            }
        }else{
            res.send({ status: 400, data: "you are not an accountant" })
        }
    } catch (error) {
        res.send(error.message)
    }
}
export const changeOutlays = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_accountant(token)
        if(check == true){
            const {id}  = req.params
            const {reason,amount,inc_time} = req.body
            if(reason || amount || inc_time){
                const oldOutlay = await outlay.findOne({where:{id:id}})
                await outlay.update({reason:reason||oldOutlay.reason,amount:amount||oldOutlay.amount,inc_time:inc_time||oldOutlay.inc_time},{where:{id:id}})
                res.send({status:200,data:"outlay is updated"})
            }else{
                res.send({ status: 400, data: "insufficient data" })
            }
        }else{
            res.send({ status: 400, data: "you are not an accountant" })
        }
    } catch (error) {}
}
export const delOutlays = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_accountant(token)
        if(check == true){
            const {id} = req.params
            await outlay.destroy({where:{id:id}})
            res.send({status:200,data:`${id} outlay is deleted`})
        }else{res.send({ status: 400, data: "you are not an accountant" })}
    } catch (error) {
        
    }
}
export const delIncomes = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_accountant(token)
        if(check == true){
            const {id} = req.params
            await incomes.destroy({where:{id:id}})
            res.send({status:200,data:"incomes is deleted"})
        }else{
            res.send({ status: 400, data: "you are not an accountant" })
        }
    } catch (error) {}
}