import request from 'supertest';
import app from '../app1.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Application from '../models/application_model.js';

// Load environment variables from .env.test file
dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  // Connect to the database before running tests
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  // Disconnect from the database after tests
  await mongoose.disconnect();
});

describe('User API', () => {
  let token;
  const userData = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    field_of_interest: 'Software Development',
    experience_level: 'Junior',
  };

  it('should sign up a new user', async () => {
    const response = await request(app).post('/user/signup').send(userData);
    console.log('Signup Response:', response.body);

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('should log in an existing user', async () => {
    const response = await request(app).post('/user/login').send({
      email: userData.email,
      password: userData.password,
    });
    console.log('Login Response:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('should read user information', async () => {
    const response = await request(app)
      .get('/user/me')
      .set('Authorization', `Bearer ${token}`);
    console.log('Read User Response:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe(userData.email);
  });

  it('should update user information', async () => {
    const updatedData = { name: 'Updated User' };
    const response = await request(app)
      .patch('/user/me')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);
    console.log('Update User Response:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
  });

  it('should delete user', async () => {
    const response = await request(app)
      .delete('/user/me')
      .set('Authorization', `Bearer ${token}`);
    console.log('Delete User Response:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id');
  });
});

describe('Recruiter API ', ()=>{
  let token
  const recruiterData={
      name:'Test Recruiter',
      age:30,
      email:'testrecruiter64@example.com',
      password:'pass@123',
      qualification:'BTech',
      current_position:'CEO',
      salary:100000,
      company_id:new mongoose.Types.ObjectId()
  }

  it('should sign up a new recruiter', async()=>{
      const response=await request(app).post('/recruiter/signup').send(recruiterData)
      expect(response.statusCode).toBe(201)
      expect(response.body.recruiter).toHaveProperty('_id')
      token=response.body.token
  })

  it('should login an existing recruiter', async()=>{
    const response=await request(app).post('/recruiter/login').send({
      email:recruiterData.email,
      password:recruiterData.password
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.recruiter).toHaveProperty('_id')
    expect(response.body.token).toBeDefined()

  })

  it('should read recruiter information', async()=>{
    const response=await request(app).get('/recruiter/me').set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('_id')
  })

  it('should delete recruiter', async()=>{
    const response=await request(app).delete('/recruiter/me').set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('_id')
  })

  // it('should accept an application', async()=>{
    
  //   const application= new Application({
  //   user_id: new mongoose.Types.ObjectId(),
  //   job_id: new mongoose.Types.ObjectId(),
  //   recruiter_id:new mongoose.Types.ObjectId(),
  //   status:'Pending',
  //   applied_date:'2005-04-04'
  //   })
    
  //   await application.save()
  //   const applicationId = application._id;
  //   //const id=application._id
    
  //   const response = await request(app).patch(`/recruiter/accept/${applicationId}/accept`) // Adjust the endpoint based on your actual route.set('Authorization', `Bearer ${token}`);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.message).toBe('Congratulations! Your application has been accepted successfully.');
  //   expect(response.body.application.status).toBe('Accepted');
  //   //expect(response.body.application._id).toBe(applicationId.toString());
  // })

})
