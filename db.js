const Sequelize = require('sequelize')
const { UUID, UUIDV4, STRING } = Sequelize

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_api')


const User = conn.define('user', 
{
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false
    }
})

const Department = conn.define('department', 
{
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false
    }
})

User.belongsTo(Department)

const sync = async() =>
{
    await conn.sync( { force: true })
    const [admin, engineering, hr] = await Promise.all([
        Department.create({ name: 'Admin'}),
        Department.create({ name: 'Engineering'}),
        Department.create({ name: 'HR'})
    ])
    await Promise.all([
        User.create({ name: 'Jonathan', departmentId: engineering.id }),
        User.create({ name: 'Josh', departmentId: admin.id }),
        User.create({ name: 'Peet', departmentId: hr.id }),
        User.create({ name: 'Prof', departmentId: hr.id })
    ])
    const users = await User.findAll()
    const departments = await Department.findAll()

    return {
        users,
        departments
    }
}

const models = {
    User,
    Department
}

module.exports = {
    sync,
    models
}
