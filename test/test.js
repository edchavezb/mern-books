process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert
const expect = chai.expect
const should = chai.should()

const app = require("../server")

chai.use(chaiHttp)

describe('A general test for the GET /test endpoint', function() {

    it('it should get the response successfully', (done) => {
        
        chai.request(app)
            .get('/test')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            });
    });

/*     it('should return false if the number is odd', function() {

        let book = {
            "name": "Some book name",
            "author": "Some author",
            "summary": "Some summary",
            "image": "https://someimageurl.com",
            "url" : "https://someurl.com"
        }
    }) */

})