process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // To bypass certificate issues in development
const chai = require("chai");
const chaihttp = require("chai-http");
const Book = require("../../models/book");
const app = require("../../app");
const { request } = require("https");
const exp = require("constants");

chai.use(chaihttp);

describe("Testing Book API", () => {
  // force sync the database before testing!
  // before(async()=>{
  //     await Book.sync({force:true});
  // })

  // Test to fetch all books

  describe("Routes testing for the bookRoutes!", () => {
    it("it should returns all the books records", async () => {
      const res = await chai.request("https://localhost:3443").get("/books");
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).is.an("object");
      chai.expect(res.body.books).is.an("array");

      res.body.books.forEach((book) => {
        chai.expect(book).to.have.property("title");
        chai.expect(book).to.have.property("price");
        chai.expect(book).to.have.property("createdAt");
        chai.expect(book).to.have.property("updatedAt");
        chai.expect(book).to.have.property("authors");
      });

      //   check tge book record in the database and verify the response
      const book = await Book.findAll();
      res.body.books.forEach((book, index) => {
        chai.expect(book.id).to.not.be.null;
        chai.expect(book.title).to.be.string;
        chai.expect(book.title).to.not.be.null;
        chai.expect(book.price).to.not.be.null;
      });
    });
  });

  it("it should creats a new book and verify in the database", async () => {
    const res = await chai
      .request("https://localhost:3443")
      .post("/books/createBook")
      .send({
        title: "The Alchemist",
        price: 200,
      });
      chai.expect(res.status).to.be.equal(201);
      chai.expect(res.body).to.be.an("object");
      chai.expect(res.body).to.have.property("message").eql("Book added");
      chai.expect(res.body.book).to.have.property("id");
      chai.expect(res.body.book).to.have.property("price");
      chai.expect(res.body.book).to.have.property("title");


    //   verify the book in the database
    const book = await Book.findOne({where:{id:res.body.book.id}});
    chai.expect(book.id).to.be.equal(res.body.book.id);
    chai.expect(book.id).to.not.be.null;
    chai.expect(book.title).to.be.equal(res.body.book.title);
    chai.expect(book.price).to.be.equal(res.body.book.price);
  });
});
