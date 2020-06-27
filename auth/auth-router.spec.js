const server=require('../api/server');
const db=require('../data/knexfile-config');
const request=require('supertest');




describe('testing the endpoint /register',()=>{
    it('should return status code of 201', async ()=>{
        const result= await request(server)
        .post('/api/auth/register')
        .send({
            username:'user',
            password:'pw'
        })
        expect(result.status).toBe(201)
    })

    it('should return the newly created username', async ()=>{
        const result=await request(server)
        .post('/api/auth/register')
        .send({
            username:'jack',
            password:'pass'
        })
        expect(result.body.username).toBe('jack')
    })


    beforeEach(async () => {
        await db("users").truncate();
    });
})

describe("testing the /login endpoint", () => {
    

    it("creates user", async () => {
        const res = await request(server)
            .post("/api/auth/register")
            .send({
                username:'tran',
                password:'whatever'
            })
    

        expect(res.body.username).toBe('tran');
    });

    it("login should return status 200", async () => {
        const res = await request(server)
            .post("/api/auth/login")
            .send({
                username:'tran',
                password:'whatever'
            })

        expect(res.status).toBe(200)
    });

    it('login should return code 401 with the wrong password', async ()=>{
        const result= await request(server)
        .post('/api/auth/login')
        .send({
            username:'tran',
            password:'notwhatever'
        })
        expect(result.statusCode).toBe(500)
    })

    beforeAll(async () => {
        await db("users").truncate();
    });
});


