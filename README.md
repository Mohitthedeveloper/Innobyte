1. Go to your folder using the command
   
cd generated_backend

2. Install the dependencies by using
   
npm run setup


3. Create Your .env file

PORT=3000

MONGODB_URI=mongodb://localhost:27017/

JWT_SECRET=your_jwt_secret_key

EMAIL_USER=your_email_id

EMAIL_PASS=your_app_password

 4. Run
 
Start Server:
npm start

5. API testing

Open in url or using an Endpoint tester (postman)

For API testing

By using POST method we can test the SIGNUP

localhost:3000/api/signup

By using POST method we can test the LOGIN

localhost:3000/api/login

By using GET method we can test the GET USER PROFILE

localhost:3000/api/profile

6. For EMAIL_PASS
   
"For the app password gets to your email and initiates the two-factor authorization 
and search for "app passwords" then create the app name, here you find the app password and use it in your .env file"
