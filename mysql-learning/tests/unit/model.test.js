const chai = require('chai');
const {expect} = require('chai')
const {User} = require('../../models/user')
const chaiHttp = require('chai-http');
const app  = require('../../app');
const e = require('express');

chai.use(chaiHttp);


describe('User Modal testing!',()=> {

    before(async()=>{
        await User.sync({force:true}); // 🔄 Reset 🗃️ database
    })

    it('it should create a new user',async()=>{
        const user = await User.create({email:"ridham@gmail.com",password:"Test123.",role:"Author"});
        expect(res).to.have.status(201);
        expect(user.password).to.equal('Test123.');
        expect(user.email).to.equal('ridham@gmail.com')
    });

    it("it should not let user to create without email!",async()=>{
        try{
            const user = await User.create({email:"balo@gmail.com",password:"Test123.",role:"Author"});
        }
        catch(error)
        {
            expect(error.name).to.equal('SequelizeValidationError');
        }
    });
})

