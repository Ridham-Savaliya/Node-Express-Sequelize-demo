process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // To bypass certificate issues in development

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Ensure the app is imported correctly
const Author = require('../models/author');
const {User} = require("../models/user");
const { where } = require('sequelize');

const { expect } = chai;
chai.use(chaiHttp);

describe('Test API Endpoints', () => {
    // Test to fetch all authors
    it('should fetch all the authors from /authors', async () => {
        const res = await chai.request('https://localhost:3443') // Ensure the server is running on https://localhost:3443
            .get('/authors'); // Ensure this endpoint exists in your routes
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array'); // Ensure the response is an array
    });

    // Test to create a new author
    it('should create a new author and verify in the database', async () => {
        const res = await chai.request("https://localhost:3443")
            .post('/authors/createAuthor') // Adjust to match your route
            .send({
                name: 'eror',
                 // Ensure this matches your expected role
            });

        // Verify the response is correct
        expect(res).to.have.status(201); // Expect status 201 for created resource
        expect(res.body).to.have.property('messege').eql('author created successfully!');
        expect(res.body.author).to.have.property('name')
        expect(res.body.author).to.have.property('role').eql('Author'); // Ensure the role is 'Customer'

        // Verify the new author exists in the database
        const createdAuthor = await Author.findOne({ where: { name: 'eror' } });
        expect(createdAuthor).to.not.be.null; // Ensure the author is created
        expect(createdAuthor).to.have.property('name').eql('eror');
        expect(createdAuthor).to.have.property('role').eql('Author'); // Ensure the role is 'Customer'
    });


        // Test to register a new user

        it("it should create new user and verifies in the database",async () => {
            const res = await chai.request("https://localhost:3443").post('/auth/register').send({
                
                email: "tdefvv@gmail.com",
                password: "Test123.",
                role: "Author"
            })

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message').eql('User registered successfully!');
            expect(res.body).is.an('object');
            expect(res.body.user).to.have.property('email');
            expect(res.body.user).to.have.property('id');
            // expect(res.body.user).to.have.property('password');
            expect(res.body.user).to.have.property('role');
            const email = res.body.user.email
            // verifies the user into the database!
            const verfiyUser = await User.findOne({where:{email}});
            expect(verfiyUser).to.not.be.null;
            expect(verfiyUser).to.have.property('email');
            expect(verfiyUser).to.have.property('password');
            expect(verfiyUser).to.have.property('role');
            expect(verfiyUser).to.have.property('userId');
            expect(verfiyUser).to.have.property('createdAt');
            expect(verfiyUser).to.have.property('updatedAt');

        })
});
