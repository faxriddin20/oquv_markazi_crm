import jwt from "jsonwebtoken"
export async function check_admin(token) {
    if (token) {
        const returned_token = jwt.verify(token, "parol")
        if (returned_token) {
            if (returned_token.token == 1) {
                return true
            } else { return false }
        } else { return false }
    }else{return false}
}
export async function check_accountant (token){
    if(token){
        const accountant_token = jwt.verify(token,"parol")
        if(accountant_token.token == 4){
            return true
        }else{
            return false
        }
    }else{return false}
}
export function check_student (token) {
    if(token){
        const student_token = jwt.verify(token,"parol")
        if(student_token.token == 3){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}
export function check_teacher (token) {
    if(token){
        const check_teacher_token = jwt.verify(token,"parol")
        if(check_teacher_token.token == 2){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}