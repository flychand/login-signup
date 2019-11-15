
Assingnment-1. 
Note : I am more handy on nodejs, mongodb i have completed this assignment in nodejs, mongodb only.
But I have working knowladge in sql as well.
=====================================================================
       @chandan : chadnan.mca.pu@gmail.com
=====================================================================
Tecnology used : Nodejs, express,mongodb, mongoose,JWT, env,
Note : make sure you have nodejs, mongodb , npm etc already installed.
Steps to run the code: 

step-1 : Clone the git repo
step-2 : Run "npm install" or install one by one
step-3 : Run the project by "node index.js". if failed because of any library install those.
step-4 : If it run successfull then you will get log by saying "Server is up and runningon port numner 1234" .
step-5 : It will run on "localhost:1234"



1. Sign up : 
     Api : localhost:1234/user/signup
     Body : {
        "username" : "chandan",
        "password" : "12345678",
        "email" : "chandan@gmail.com"
    }
    Response :
        {
        "message": "user registered successfully",
        "data": {
            "email": "chandanr@gmail.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5kYW5yQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVkY2U5YTI3NTk3MDg2NWQwMzRhMjIwZCIsImlhdCI6MTU3MzgyMDk2NywiZXhwIjoxNTczOTA3MzY3fQ.CpT-GrFzKOFLND9bXqvM1u-aUVNiOAhyGCvioJuOZIo"
        }
    }
2. login : 
    Api :localhost:1234/user/login 
    Request :
        {
            "email" : "chandan@gmail.com",
            "password" : "12345678"
        }
    Response : 
        {
        "message": "user logedin successfully!",
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5kYW5AZ21haWwuY29tIiwidXNlcklkIjoiNWRjZThiNzM0NmQyYmM1MmVlODBjODAwIiwiaWF0IjoxNTczODE3NzQyLCJleHAiOjE1NzM5MDQxNDJ9.8nNuMfe476GwAoT7RFH3ykN-B0pbkpgqLM19-kOThxc"
        }
    } 

3. Get profile
   Api : localhost:1234/user/profile
   Header : x-token :"hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5kYW5AZ...."
   Response : {
        "message": "user fetched successfully!",
        "data": {
            "_id": "5dce8b7346d2bc52ee80c800",
            "name": "xxxxxan",
            "email": "xxxxdan@gmail.com"
        }
    }
    
4. Update profile
    Api : localhost:1234/user/profile/update
    Header : x-token :"hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5kYW5AZ....",
    Request body : {
        "name" : "ram kumar",
        "address" : "chatra"
    }
    Response : {
        "message": "user updated successfully!",
        "data": {
            "n": 1,
            "nModified": 0,
            "ok": 1
        }
    }

    Here Requirement was accepting name,password as pramas, but i feel its not good ,
    so I change from params to body.
