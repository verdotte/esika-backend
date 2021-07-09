
import { App } from '../../app';
import { routes } from '../../routes';
import supertest from 'supertest';
import { adminData, adminLoginData, adminLoginFailPasswordData, adminLoginFailUsernameData } from '../../__mocks__/dummyData';
import { urlPrefix } from '../../__mocks__/variable'; 
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from '../../constants/statusCodes';
import { initializeDB } from '../../database/initializeDB';

beforeAll(async (done) => {
    jest.setTimeout(50000);
    await initializeDB();
    done();
});

describe('Admin controller', () => {
    describe('POST /admin/signup', () => {
            test('Should signup', async(done) => {
                const app = new App(routes).getServer();
               const result = await supertest(app)
                    .post(`${urlPrefix}/admin/signup`)
                    .send(adminData);
                expect(result.status).toBe(CREATED);
                expect(result.body.message).toBe('admin has been created successfully');
                done();
            });
    });
    describe('POST /admin/login', () => {
        test('Should login', async(done) => {
            const app = new App(routes).getServer();
           const result = await supertest(app)
                .post(`${urlPrefix}/admin/login`)
                .send(adminLoginData);
            expect(result.status).toBe(OK);
            expect(result.body.message).toBe('Login success');
            expect(result.body.data.token).toBeTruthy();
            done();
        });
        test('Should fail to login with wrong username', async(done) => {
            const app = new App(routes).getServer();
           const result = await supertest(app)
                .post(`${urlPrefix}/admin/login`)
                .send(adminLoginFailUsernameData);
            expect(result.status).toBe(NOT_FOUND);
            expect(result.body.message).toBe(`${adminLoginFailUsernameData.username} does not exist`);
            done();
        });
        test('Should fail to login with wrong password', async(done) => {
            const app = new App(routes).getServer();
           const result = await supertest(app)
                .post(`${urlPrefix}/admin/login`)
                .send(adminLoginFailPasswordData);
            expect(result.status).toBe(UNAUTHORIZED);
            expect(result.body.message).toBe('Incorrect password');
            done();
        });
    });
});