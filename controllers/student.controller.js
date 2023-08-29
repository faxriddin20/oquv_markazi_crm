import { groups, users } from "../db/sequelize.js";
import { check_student } from "../utils/check_token.js";
import jwt from "jsonwebtoken"
export const loginStudent = async(req,res) =>{
    try {
        const {email,password} = req.body
        if(email && password){  
            const student = await users.findOne({where:[{email:email},{password:password}]})
            const student_token = jwt.sign({token:student.pos_ref_id,email:student.email},"parol")
            res.send({status:200,data:student_token})
        }else{
            res.send({ status: 400, data: "insufficient data" })
        }
    } catch (error) {}
}
export const getStudentDatas = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = check_student(token)
        if(check == true){
            const userToken = jwt.verify(token,"parol")
            res.send(await users.findOne({where:{email:userToken.email}}))
        }else{
            res.send({ status: 400, data: "you are not an student" })
        }
    } catch (error) {
        
    }
}