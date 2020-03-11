const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')
app.use(express.json())
app.use(require('cors')())
const { User, Department } = db.models

//User API Routes
app.get('/api/users', (req, res, next) =>
{
    User.findAll()
    .then( users => res.send(users) )
    .catch(next)
})
app.post('/api/users', (req, res, next) =>
{
    User.create(req.body)
    .then( users => res.status(201).send(users) )
    .catch(next)
})
app.put('/api/users/:id', (req, res, next) =>
{
    User.findByPk(req.params.id)
    .then( user => user.update(req.body))
    .then( users => res.send(users) )
    .catch(next)
})
app.delete('/api/users/:id', (req, res, next) =>
{
    User.findByPk(req.params.id)
    .then( user => user.destroy())
    .then( () => res.sendStatus(204) )
    .catch(next)
})

//Departments API Routes
app.get('/api/departments', (req, res, next) =>
{
    Department.findAll()
    .then( departments => res.send(departments) )
    .catch(next)
})
app.post('/api/departments', (req, res, next) =>
{
    Department.create(req.body)
    .then( departments => res.status(201).send(departments) )
    .catch(next)
})
app.put('/api/departments/:id', (req, res, next) =>
{
    Department.findByPk(req.params.id)
    .then( department => department.update(req.body))
    .then( departments => res.send(departments) )
    .catch(next)
})
app.delete('/api/departments/:id', (req, res, next) =>
{
    Department.findByPk(req.params.id)
    .then( department => department.destroy())
    .then( () => res.sendStatus(204) )
    .catch(next)
})

const port = process.env.PORT || 3000

db.sync()
.then( () => {
    
    app.listen(port, () => {`Listenging on port ${port}`})
})

module.exports = {
    app,
    cors
}
