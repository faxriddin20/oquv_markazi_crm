import { centers, departements, directions, groups, position, users } from "../db/sequelize.js"
import jwt from "jsonwebtoken"
import { check_admin } from "../utils/check_token.js"
const now_date = new Date()
// admin posts //
export const addCenter = async (req, res) => {
    try {
        res.send(await centers.create({ name: "Najot ta'lim", address: "Chilonzor", closed_date: null }))
    } catch (error) {

    }
}
export const addDepartments = async (req, res) => {
    try {
        const { dep_name, center_ref_id } = req.body
        const { token } = req.headers
        if (dep_name && center_ref_id) {
            const check = await check_admin(token)
            if (check == true) {
                res.send(await departements.create({ dep_name: dep_name, center_ref_id: center_ref_id }))
            } else if (check == false) {
                res.send({ status: 400, data: "you are not an admin" })
            }
        } else { res.send({ status: 400, data: "insufficient data" }) }
    } catch (error) {
        console.log(error.message);
    }
}
export const addPosition = async (req, res) => {
    try {
        const { pos_name, salary, dep_ref_id } = req.body
        const { token } = req.headers
        if (pos_name && salary && dep_ref_id) {
            const check = await check_admin(token)
            if (check == true) {
                res.send(await position.create({ pos_name: pos_name, salary: salary, dep_ref_id: dep_ref_id }))
            } else if (check == false) {
                res.send({ status: 400, data: "you are not an admin" })
            }
        } else (res.send({ status: 400, data: "insufficient data" }))
    } catch (error) {

    }
}
export const addUser = async (req, res) => {
    try {
        const { token } = req.headers
        const { first_name, last_name, gender, contact, email, come_date, password, group_id, pos_ref_id } = req.body
        if (first_name && last_name && gender && contact && email && come_date && password && pos_ref_id) {
            const check = await check_admin(token)
            if (check == true) {
                await users.create({ first_name: first_name, last_name: last_name, gender: gender, contact: contact, email: email, come_date: come_date, password: password, group_id: group_id, pos_ref_id: pos_ref_id })
                const token = jwt.sign({ token: pos_ref_id,email:email }, "parol")
                res.send({ status: 200, data: "user is created", token: token })
                res.send(await position.findAll({ include: { model: users } }))
            } else if (check == false){
                res.send({ status: 400, data: "you are not an admin" })
            }
        } else (res.send({ status: 400, data: "insufficient data" }))
    } catch (error) {
        console.log(error.message);
    }
}
export const addDirections = async(req,res) =>{
    try {
        const {token} = req.headers
        const {dir_name,duration,salary,dep_ref_id} = req.body
        const check = await check_admin(token)
        if(check == true){
            if(dir_name && duration && salary && dep_ref_id){
                res.send(await directions.create({dir_name:dir_name,duration:duration,salary:salary,dep_ref_id:dep_ref_id}))
            }else{res.send({ status: 400, data: "insufficient data" })}
        }else if(check == false){ res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {
    }
}

export const addGroups = async(req,res) => {
    try {
        const {token} = req.headers
        const {gr_number,dir_ref_id} = req.body
        const check = await check_admin(token)
        if(check == true){
            if(gr_number && dir_ref_id){
                res.send(await groups.create({gr_number:gr_number,dir_ref_id:dir_ref_id}))
            }else{res.send({ status: 400, data: "insufficient data" })}
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {}
}

// admin gets //
export const getUsers = async (req, res) => {
    try {
        const { token } = req.headers
        const check = await check_admin(token)
        if (check == true) {
            const {contact,gender,last_name} = req.query
            if(contact){
                res.send(await users.findAll({where:{contact:contact.toLowerCase()}}))
            }else if(gender){
                res.send(await users.findAll({where:{gender:gender.toLowerCase()}}))
            }else if(last_name){
                res.send(await users.findAll({where:{last_name:last_name.toLowerCase()}}))
            }else if(contact && gender){
                res.send(await users.findAll({where:[{contact:contact.toLowerCase()},{gender:gender.toLowerCase()}]}))
            }else if(contact && last_name){
                res.send(await users.findAll({where:[{contact:contact.toLowerCase()},{last_name:last_name.toLowerCase()}]}))
            }else if(gender && last_name){
                res.send(await users.findAll({where:[{gender:gender.toLowerCase()},{last_name:last_name.toLowerCase()}]}))
            }else{
                res.send(await users.findAll())
            }
        } else if (check == false) {
            res.send({ status: 400, data: "you are not an admin" })
        }
    } catch (error) {}
}
export const getDepartementbyId = async(req,res)=>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            if(id){
                res.send(await departements.findOne({include:[{model:directions},{model:position}],where:{id:id}}))
            }
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {}
}
export const getDirectionByID = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            res.send(await directions.findOne({include:{model:groups},where:{id:id}}))
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {
        
    }
}
export const getDirections = async(req,res) =>{
    try {
        const {token} = req.headers
        const {dir_name} = req.query
        const check = await check_admin(token)
        if(check == true){
            if(!dir_name){
                res.send(await directions.findAll({include:{model:groups}}))
            }else if(dir_name){
                res.send(await directions.findOne({include:{model:groups},where:{dir_name:dir_name.toLowerCase()}}))
            }
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {
        
    }
}
export const getPositionsbyId = async(req,res) =>{
    try {   
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            res.send(await position.findOne({include:{model:users},where:{id:id}}))
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {
        
    }
}
export const getPositions = async(req,res) =>{
    try {
        const {token} = req.headers
        const {pos_name} = req.query
        const check = await check_admin(token)
        if(check == true){
            if(!pos_name){
                res.send(await position.findAll({include:{model:users}}))
            }else if(pos_name){
                res.send(await position.findOne({include:{model:users},where:{pos_name:pos_name.toLowerCase()}}))
            }
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {
        
    }
}
export const getDepartement = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            res.send(await departements.findAll({include:[{model:directions},{model:position}]}))
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {res.send({ status: 400, data: "you are not an admin" })}
}
export const getGroupsByID = async(req,res) =>{
    try {   
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            res.send(await groups.findOne({include:{model:users},where:{id:id}}))
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {
        
    }
}
export const getGroups = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            res.send(await groups.findAll({include:{model:users}}))
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {}
} 
// admin deletes //

export const delGroups = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            await groups.update({end_date:now_date},{where:{id:id}})
            res.send({status:200,data:"group is deleted"})
        }else if(check == false){ res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {}
}
export const delUser = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            console.log(now_date);
            await users.update({left_date:now_date},{where:{id:id}})
            res.send({status:200,data:"user is deleted"})
        }else if(check == false){ res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {console.log(error.message)}
}
export const delDepartement = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            await departements.update({deleted_at: "2023-01-02"},{where:{id:id}})
            res.send({status:200,data:"departement is deleted"})
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {
        console.log(error.message);
    }
}
export const delPositions = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            await position.update({delted_at:now_date},{where:{id:id}})
            res.send({status:200,data:"position is deleted"})
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {console.log(error.message)}
}
export const delDirection = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            console.log(now_date);
            await directions.update({end_date:`${now_date}`},{where:{id:id}})
            res.send({status:200,data:"direction is deleted"})
        }else if(check == false ){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {}
}
// login admin //
export const loginAdmin = async(req,res) =>{
    try {
        const {email,password} = req.body
        if(email && password){
            const checkAdmin = await users.findAll({where:[{email:email},{password:password}]})
            const token = jwt.sign({token:checkAdmin[0].pos_ref_id,email:email},"parol")
            res.send({status:200,token:token})
        }else(res.send({ status: 400, data: "insufficient data" }))
    } catch (error) {}
}

// PUT ADMIN //

export const changeDepartment = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {dep_name ,deleted_at,center_ref_id} = req.body
            const {id} = req.params
            if(dep_name || deleted_at){
                const oldDepartment = await departements.findOne({where:{id:id}})
                await departements.update({dep_name:dep_name || oldDepartment.dep_name,deleted_at:deleted_at||oldDepartment.deleted_at,center_ref_id:center_ref_id || oldDepartment.center_ref_id},{where:{id:id}})
                res.send({status:200,data:"department is updated"})
            }else{
                res.send({ status: 400, data: "insufficient data" })
            }
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {}
}
export const changeDirections = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            const {dir_name,duration,salary,end_date,dep_ref_id} = req.body
            if(dir_name || duration || salary || end_date){
                const oldDirection = await directions.findOne({where:{id:id}})
                await directions.update({dir_name:dir_name || oldDirection.dir_name,salary:salary || oldDirection.salary,duration:duration||oldDirection.duration,end_date:end_date|| oldDirection.end_date,dep_ref_id:dep_ref_id || oldDirection.dep_ref_id},{where:{id:id}})
                res.send({status:200,data:"direction is updated"})
            }else{res.send({ status: 400, data: "insufficient data" })}
        }else {
            res.send({ status: 400, data: "you are not an admin" })
        }
    } catch (error) {}
}
export const changePosition  =async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            const {salary,pos_name,deleted_at,dep_ref_id} = req.body
            if(salary || pos_name || deleted_at){
                const oldPosition = await position.findOne({where:{id:id}})
                await position.update({salary:salary || oldPosition.salary,pos_name:pos_name||oldPosition.pos_name,delted_at:deleted_at||oldPosition.delted_at,dep_ref_id:dep_ref_id|| oldPosition.dep_ref_id},{where:{id:id}})
                res.send({status:200,data:"position is updated"})
            }else{res.send({ status: 400, data: "insufficient data" })}
        }else if(check == false){
            res.send({ status: 400, data: "you are not an admin" })
        }
    } catch (error) {}
}

export const changeGroup = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            const {gr_number,end_date,dir_ref_id} = req.body
            if(gr_number || end_date || dir_ref_id){
                const oldGroup = await groups.findOne({where:{id:id}})
                await groups.update({gr_number:gr_number||oldGroup.gr_number,end_date:end_date||oldGroup.end_date,dir_ref_id:dir_ref_id||oldGroup.dir_ref_id},{where:{id:id}})
                res.send({status:200,data:"group is udated"})
            }else {
                res.send({ status: 400, data: "insufficient data" })
            }
        }else{
            res.send({ status: 400, data: "you are not an admin" })
        }
    } catch (error) {}
}
export const changeUser = async(req,res) =>{
    try {
        const {token} = req.headers
        const check = await check_admin(token)
        if(check == true){
            const {id} = req.params
            const {email,contact,password,last_name,first_name,pos_ref_id,group_id,left_date,gender,come_date} = req.body
            if(email || contact || password || last_name || first_name || pos_ref_id || group_id || left_date || gender || come_date){
                const oldUser = await users.findAll({where:{id:id}})
                await users.update({email:email || oldUser.email,contact:contact||oldUser.contact,password:password||oldUser.password,last_name:last_name || oldUser.last_name,first_name:first_name||oldUser.first_name,pos_ref_id:pos_ref_id || oldUser.pos_ref_id,gender:gender||oldUser.gender,come_date:come_date ||oldUser.come_date,left_date:left_date||oldUser.left_date,group_id:group_id||oldUser.group_id},{where:{id:id}})
                res.send({status:200,data:"user is updated"})
            }else{  res.send({ status: 400, data: "insufficient data" })}
        }else if(check == false){res.send({ status: 400, data: "you are not an admin" })}
    } catch (error) {}
}
