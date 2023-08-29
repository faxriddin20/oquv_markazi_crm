import { Sequelize,DataTypes, BelongsToMany } from "sequelize";
const sequelize = new Sequelize("postgres://wohtnfzz:z5w5YHfRBex80wu-Tnmqzu2K-zRKaUZi@arjuna.db.elephantsql.com/wohtnfzz")
try {
    sequelize.authenticate()
    console.log("connected...");
} catch (error) {
    
}
export const outlay = sequelize.define("outlay",{
    reason:DataTypes.STRING,
    amount:DataTypes.STRING,
    out_time:DataTypes.DATE
})
export const centers = sequelize.define("centers",{
    name:DataTypes.STRING(50),
    address:DataTypes.STRING(128),
    closed_date:DataTypes.DATE
})
export const departements = sequelize.define("departemens",{
    dep_name:DataTypes.STRING(60),
    deleted_at:DataTypes.STRING
})
centers.hasMany(departements,{foreignKey:"center_ref_id"})
export const directions = sequelize.define("directions",{
    dir_name:DataTypes.STRING,
    duration:DataTypes.INTEGER,
    salary:DataTypes.INTEGER,
    end_date:DataTypes.DATE
})
export const position = sequelize.define("positions",{
    salary:DataTypes.INTEGER,
    pos_name:DataTypes.STRING,
    delted_at:DataTypes.DATE
})
departements.hasMany(directions,{foreignKey:"dep_ref_id"})
departements.hasMany(position,{foreignKey:"dep_ref_id"})
export const groups = sequelize.define("groups",{
    gr_number:DataTypes.INTEGER,
    end_date:DataTypes.DATE
})
directions.hasMany(groups,{foreignKey:"dir_ref_id"})
export const users = sequelize.define("users",{
    first_name:DataTypes.STRING,
    last_name:DataTypes.STRING,
    gender:DataTypes.STRING,
    contact:DataTypes.STRING,
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    come_date:DataTypes.DATE,
    left_date:DataTypes.DATE,
    password:DataTypes.STRING
})
groups.hasMany(users,{foreignKey:"group_id"})
position.hasMany(users,{foreignKey:"pos_ref_id"})
export const incomes  = sequelize.define("incomes",{
    reason:DataTypes.STRING,
    amount:DataTypes.INTEGER,
    inc_date:DataTypes.DATE
})
users.hasMany(incomes,{foreignKey:"user_ref_id"})
export const check = sequelize.define("checks",{
    not_in_class:DataTypes.ARRAY(DataTypes.BIGINT),
    add_date:DataTypes.DATE
})
// check.hasMany(users,{foreignKey:"not_in_class"})
users.hasMany(check,{foreignKey:"user_ref_id"})
groups.hasMany(check,{foreignKey:"gr_ref_id"})

// await sequelize.sync({force:true})   