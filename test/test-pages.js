import { expect } from 'chai';
import request from 'request';

it('Main page content', function(done) {
    request('http://localhost:3000/' , function(error, response, body) {
        expect(body).to.equal('Hello World');
        expect (response.status).to.equal(201)
        done();
    });
});

// import { equal } from 'assert';
// describe('Array', function () {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });