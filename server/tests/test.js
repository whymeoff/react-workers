const request = require('supertest')
const mongoose = require('mongoose')
const mocha = require('mocha')
const chai = require('chai')
const app = require('../src/app')

const expect = chai.expect
let cookie

before((done) => {
    mongoose.connect(process.env.MONGO_URL_TEST, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        return mongoose.connection.db.dropDatabase()
    })
    .then(() => done())
})

describe('Workers App test', () => {
    const employeeFixture = { fullname: 'Fullname', gender: 'male', phoneNumber: '0741249912', salary: 12345, position: 'Some position' }
    let _id

    it('Check if user created', async () => {
        await request(app)
            .post('/users/register')
            .send({ email: 'test@test.com', password: '12345678', username: 'admin' })
            .expect(201)
    })
    it('Check if user loged in', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({ email: 'test@test.com', password: '12345678' })
            .expect(200)

        cookie = res.header['set-cookie']
    })
    it('Check if employee created', async () => {
        const res = await request(app)
            .post('/employees')
            .set('Cookie', cookie)
            .send({ ...employeeFixture })
            .expect(201)

        const { employee } = res.body
        
        for (key in employeeFixture) {
            expect(employee[key]).to.equal(employeeFixture[key])   
        }

        _id = employee._id
    })
    it('Check if employees get sended', async () => {
        const res = await request(app)
            .get(`/employees?search=`)
            .set('Cookie', cookie)
            .send()
            .expect(200)

        const { employees } = res.body
        
        for (key in employeeFixture) {
            expect(employees[0][key]).to.equal(employeeFixture[key])   
        }
    })
    it('Check if employee updated', async () => {
        const res = await request(app)
            .patch(`/employees/${_id}`)
            .set('Cookie', cookie)
            .send({ fullname: 'Fullname1', salary: 4321 })
            .expect(200)

        const { employee } = res.body
        
        expect(employee.fullname).to.equal('Fullname1')
        expect(employee.salary).to.equal(4321)
    })
    it('Check if employee get found by name', async () => {
        const res = await request(app)
            .get('/employees?search=Fullname1')
            .set('Cookie', cookie)
            .send()
            .expect(200)

        const { employees } = res.body

        expect(employees.length).to.equal(1)
        expect(employees[0].fullname).to.equal('Fullname1')
    })
    it('Check if employee deleted', async () => {
        await request(app)
            .delete(`/employees/${_id}`)
            .set('Cookie', cookie)
            .send()
            .expect(200)

        const res = await request(app)
            .get(`/employees?search=`)
            .set('Cookie', cookie)
            .send()
            .expect(200)

        const { employees } = res.body

        expect(employees.length).to.equal(0)
    })
    it('Check if user loged out', async () => {
        await request(app)
            .post('/users/logout')
            .set('Cookie', cookie)
            .send()
            .expect(200)

        await request(app)
            .get('/employees?search=')
            .set('Cookie', cookie)
            .send()
            .expect(403)
    })
})