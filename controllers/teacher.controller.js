import { users,check, groups } from "../db/sequelize.js";
import { check_teacher } from "../utils/check_token.js";
import jwt from "jsonwebtoken"
export const loginTeacher = async(req,res) =>{
    try {
        const {email,password} = req.body
        if(email && password){
            const teacher = await users.findOne({where:[{email:email},{password:password}]})
            if(teacher){
                const teacher_token = jwt.sign({token:teacher.pos_ref_id,email:teacher.email},"parol")
                res.send({status:200,data:teacher_token})
            }else{
                res.send({status:401,data:"Unautorized"})
            }
        }else{
            res.send({ status: 400, data: "insufficient data" })
        }
    } catch (error) {}
}

export const addCheck = async(req,res) =>{
    try {
        const {token} = req.headers
        const check_t = check_teacher(token)
        if(check_t == true){
            const {gr_ref_id,add_date,not_in_class} = req.body
            if( gr_ref_id && add_date){
                const teacher_token = jwt.verify(token,"parol")
                const teachers = await users.findOne({where:{email:teacher_token.email}})
                res.send(await check.create({not_in_class:not_in_class,gr_ref_id:gr_ref_id,add_date:add_date,user_ref_id:teachers.id}))
            }
        }else{  
            res.send({ status: 400, data: "you are not an teacher" })
        }
    } catch (error) {
        res.send(error)
    }
}
export const changeCheck = async(req,res) =>{
    try {
        const {token} = req.headers
        const check_t = check_teacher(token)
        if(check_t == true){
            const {id} = req.params
            const {not_in_class} = req.body
            if(not_in_class){
                await check.update({not_in_class:not_in_class},{where:{id:id}})
                res.send({status:200,data:"check is updated"})
            }else{
            res.send({ status: 400, data: "insufficient data" })
            }
        }else{
            res.send({ status: 400, data: "you are not an teacher" })
        }
    } catch (error) {
        
    }
}
export const getGroups = async(req,res) =>{
    try {
        const {token} = req.headers
        const check_t = check_teacher(token)
        if(check_t == true){
            const t_token = jwt.verify(token,"parol")
            const searched_teacher = await users.findOne({where:{email:t_token.email}})
            res.send(await groups.findAll({where:{id:searched_teacher.group_id}}))
        }else{
            res.send({ status: 400, data: "you are not an teacher" })
        }
    } catch (error) {
        
    }
}
export const getUsersInClass = async(req,res) =>{
    try {
        const {token} = req.headers
        const check_t = check_teacher(token)
        if(check_t == true){
            const t_token = jwt.verify(token,"parol")
            const searched_teacher = await users.findOne({where:{email:t_token.email}})
            res.send(await users.findAll({where:[{group_id:searched_teacher.group_id},{pos_ref_id:3}]}))
        }else{
            res.send({ status: 400, data: "you are not an teacher" })
        }
    } catch (error) {}
}

export const getGroupsByID = async(req,res) =>{
    try {
        const {token} = req.headers
        const check_t = check_teacher(token)
        if(check_t == true){
            const t_token = jwt.verify(token,"parol")
            const {id} = req.params
            const searched_teacher = await users.findOne({where:{email:t_token.email}})
            res.send(await groups.findAll({where:[{id:searched_teacher.group_id},{id:id}]}))
        }else{
            res.send({ status: 400, data: "you are not an teacher" })
        }
    } catch (error) {
        
    }
}