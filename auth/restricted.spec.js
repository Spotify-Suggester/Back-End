const restricted=require('./restricted');
const server=require('../api/server');
const request=require('supertest');
const db=require('../data/knexfile-config');



describe('testing the restricted middleware', ()=>{
    let user;
    // beforeAll(async()=>{
    //     await db('users').truncate;
    //      request(server)
    //     .post("api/auth/register")
    //     .send({
    //         username:'jack',
    //         password:'whatever'
    //     });
    //     const respond=await request(server)
    //     .post('api/auth/login')
    //     .send({
    //         username:'jack',
    //         password:'whatever'
    //     })
    //     user=respond.body;
    // })

    it('should return the status of 200 when the header contain a valid token', async ()=>{
        const result= await request(server)
        .get('api/users/:id/favorites')
        .set('Authorization', 'dfsdf1231231s')
        expect(result.statusCode).toBe(200)
    })
    
    it('should return the status of 401 when there is no header', async ()=>{
        const result= await request(server)
        .get('api/users/:id/favorites')
        expect(result.statusCode).toBe(401)
    })

    
})