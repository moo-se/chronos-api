import app from '../server'
import supertest from 'supertest'

describe('GET /', ()=>{
    it('should return hello', async()=>{
        const res = supertest(app)
        .get('/')
        expect((await res).body.message).toBe('hello')
        
    })
})