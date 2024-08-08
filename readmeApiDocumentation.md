## API Documentation

# Users

1. Sign Up
   localhost:4001/users
   Method:POST
   Required:req.body
   {
   "email":"youremail@gmail.com"
   "password":"yourpassword"
   }
   Response:
   {
   "success": true,
   "data": {
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI4NjEzOGEzZTU4NGE5ZWYiLCJlbWFpbCI6IlJvbmFsZG9AZ21haWwuY29tIiwidXNlckFnZW50IjoiUG9zdG1hblJ1bnRpbWUvNy40MS4wIiwiaXNzIjoic29jaWFsX21lZGlhX2V2ZW50IiwiaWF0IjoxNzIzMTAzMTM4fQ.pyAJiMdwgvF_HHDnkqReuG8gfQw5xyHErOgb3OkzsKc",
   "user": {
   "id": "286138a3e584a9ef",
   "name": "Ronaldo",
   "email": "Ronaldo@gmail.com",
   "profile": null,
   "inserted": "2024-08-08T07:45:38.600Z",
   "updated": "2024-08-08T07:45:38.879Z",
   "totalFollower": "2",
   "totalEventPosted": "1"
   }
   },
   "message": "User Registered Successfully"
   }

2. Login
   localhost:4001/users/login
   Method: POST
   Required:req.body
   {
   "email":"youremail@gmail.com"
   "password":"yourpassword"
   }
   Response:
   {
   "success": true,
   "data": {
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ4N2RkNzQ0OTE1MTZiNGUiLCJlbWFpbCI6IlNoeWFtZ2hhcnRpQGdtYWlsLmNvbSIsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuNDEuMCIsImlzcyI6InNvY2lhbF9tZWRpYV9ldmVudCIsImlhdCI6MTcyMzEwMjc0MX0.su0njzWVPXYDYm79HmCsZN_sYxg0ZE8JkyoySWPdq1g",
   "user": {
   "id": "d87dd74491516b4e",
   "name": "Shyam Gharti Magar",
   "email": "Shyamgharti@gmail.com",
   "profile": null,
   "inserted": "2024-08-08T07:03:33.189Z",
   "updated": "2024-08-08T07:39:01.695Z",
   "totalFollower": "0",
   "totalEventPosted": "0"
   }
   },
   "message": "Login success"
   }

3. Own Profile
   localhost:4001/users/profile
   Method: GET
   Required: Authorization Headers
   Response:
   {
   "success": true,
   "data": {
   "id": "d87dd74491516b4e",
   "name": "Shyam Gharti Magar",
   "email": "Shyamgharti@gmail.com",
   "profile": null,
   "inserted": "2024-08-08T07:03:33.189Z",
   "updated": "2024-08-08T07:39:01.695Z",
   "totalFollower": "0",
   "totalEventPosted": "0"
   },
   "message": "Profile Fethched Successfully"
   }

4. Update
   localhost:4001/users
   Method: PATCH
   Required: Authorization Headers, req.body
   {
   "name":"update name"
   }
   Response:
   {
   "success": true,
   "data": {
   "id": "d87dd74491516b4e",
   "name": "Shyam Magar",
   "email": "Shyamgharti@gmail.com",
   "profile": null,
   "inserted": "2024-08-08T07:03:33.189Z",
   "updated": "2024-08-08T07:44:36.845Z",
   "totalFollower": "0",
   "totalEventPosted": "0"
   },
   "message": "User Updated"
   }

5. Update Profile Image
   localhost:4001/users/profile-image
   Method: PATCH
   Required: Authorization Headers, Formdata.profile
   Response:
   {
   "success": true,
   "data": {
   "id": "d87dd74491516b4e",
   "name": "Shyam Magar",
   "email": "Shyamgharti@gmail.com",
   "profile": "/public/image/6a67aab6f5b2a233c8d7d9738dc6ce6f.jpg",
   "inserted": "2024-08-08T07:03:33.189Z",
   "updated": "2024-08-08T07:45:12.726Z",
   "totalFollower": "0",
   "totalEventPosted": "0"
   },
   "message": "Profile Picture Updated Successfully"
   }

6. Get Other Users Profile
   localhost:4001/users/286138a3e584a9ef
   Method:GET
   Required: Authorization Headers, req.params(userId)
   Response:
   {
   "success": true,
   "data": {
   "id": "286138a3e584a9ef",
   "name": "Ronaldo",
   "email": "Ronaldo@gmail.com",
   "profile": null,
   "inserted": "2024-08-08T07:45:38.600Z",
   "updated": "2024-08-08T07:45:38.879Z",
   "totalFollower": "0",
   "totalEventPosted": "0",
   "isFollowing": "0" //Wheather this user is being followed by me(self) "0"=No, "1"=Yes
   },
   "message": "Users details"
   }

7. Change Password
   localhost:4001/users/change-password
   Method: Patch
   Required: Authorization Headers, req.body
   {
   "oldPassword":"Hello@1234",
   "newPassword":"Hello@123"
   }
   Response:
   {
   "success": true,
   "message": "Password changed"
   }

8. Logout
   localhost:4001/users/logout
   Method:GET
   Required: Authorization Headers
   Response:
   {
   "success": true,
   "message": "Logout success"
   }

# Categories

1.  Get Categories
    localhost:4001/categories
    Method:GET
    Required: Authorization Headers
    Response: {
    "success": true,
    "data": {
    "count": 3,
    "rows": [
    {
    "id": "6c9904794f56e51e",
    "name": "Sports",
    "inserted": "2024-08-08T07:00:26.470Z",
    "updated": "2024-08-08T07:00:26.470Z"
    },
    {
    "id": "0d3172b9ca46ae32",
    "name": "Music",
    "inserted": "2024-08-08T07:00:26.470Z",
    "updated": "2024-08-08T07:00:26.470Z"
    },
    {
    "id": "a57ed7e029bb8225",
    "name": "Tech",
    "inserted": "2024-08-08T07:00:26.470Z",
    "updated": "2024-08-08T07:00:26.470Z"
    }
    ]
    },
    "message": "Event Categories Fetched Successfully"
    }

    # Events

    1.  Create
        localhost:4001/events
        Method: POST
        Required: Authorization Headers, Formdata(title,description,time(ISO format),categoryId,location,image(file))
        Response:
        {
        "success": true,
        "data": {
        "id": "f2e908bd95faf551",
        "categoryId": "6c9904794f56e51e",
        "description": "Doha Sports Feast",
        "location": "Qatar",
        "title": "Sports Events",
        "time": "2024-06-06T08:45:00.000Z",
        "userId": "286138a3e584a9ef",
        "image": "/public/image/85e991b25c7d360b08a2241d161b800a.jpg",
        "updated": "2024-08-08T08:12:53.604Z",
        "inserted": "2024-08-08T08:12:53.604Z"
        },
        "message": "Event Created Successfully"
        }

        2. Update
           localhost:4000/v1/events/f2e908bd95faf551
           Method: PUT
           Required: Authorization Headers, Req.params(eventId), req.body
           {
           "title":"Sports Events",
           "description":"Sports Fest Events",
           "time":"2024-05-06T14:30:00+05:45",
           "image": "/public/image/83bab002ce98c4fe4ed5b3d4b70a3d11.jpg",
           "categoryId":"a57ed7e029bb8225",
           "location":"Dubai"
           }
           Response:
           {
           "success": true,
           "data": {
           "id": "f2e908bd95faf551",
           "title": "Sports Events",
           "description": "Sports Fest Events",
           "time": "2024-05-06T08:45:00.000Z",
           "location": "Dubai",
           "image": "/public/image/83bab002ce98c4fe4ed5b3d4b70a3d11.jpg",
           "userId": "286138a3e584a9ef",
           "categoryId": "a57ed7e029bb8225",
           "inserted": "2024-08-08T08:12:53.604Z",
           "updated": "2024-08-08T08:17:01.793Z"
           },
           "message": "Event Updated Successfully"
           }
        3. Update Image
           localhost:4001/events/image/92e4fe28f7dd5e3e
           Method: PATCH
           Required: Authorization Headers, Req.params(eventId), formdata.image(file)
           Response:
           {
           "success": true,
           "data": {
           "id": "92e4fe28f7dd5e3e",
           "title": "Sports Events India",
           "description": "Sports Fest Events",
           "time": "2024-05-06T08:45:00.000Z",
           "location": "India",
           "image": "/public/image/fd7625391d9b3951a50e7bfd14155921.jpg",
           "userId": "286138a3e584a9ef",
           "categoryId": "a57ed7e029bb8225",
           "inserted": "2024-08-08T08:21:35.391Z",
           "updated": "2024-08-08T08:29:59.637Z"
           },
           "message": "Event Image Updated Successfully"
           }

        4. Delete
           localhost:4001/events/274783dcf5ebdb3b
           Method: DELETE
           Required: Authorization Headers, req.params(eventId)

        5. Get Own Events(queries optional)
           localhost:4001/events/own?page=1&size=10&categoryId=a57ed7e029bb8225&fromDateTime=2024-04-06T08:45:00.000Z&toDateTime=2024-05-06T08:45:00.000Z&searchKeyword=India
           Method:GET
           Optional: req.query
           Required: Authorization Headers
           Response:
           {
           "success": true,
           "data": {
           "count": 2,
           "rows": [
           {
           "id": "92e4fe28f7dd5e3e",
           "title": "Sports Events India",
           "description": "Sports Fest Events",
           "time": "2024-05-06T08:45:00.000Z",
           "location": "India",
           "image": "/public/image/fd7625391d9b3951a50e7bfd14155921.jpg",
           "userId": "286138a3e584a9ef",
           "categoryId": "a57ed7e029bb8225",
           "inserted": "2024-08-08T08:21:35.391Z",
           "updated": "2024-08-08T08:29:59.637Z",
           "totalLike": "0",
           "totalComment": "0",
           "isLiked": "0",
           "category": {
           "id": "a57ed7e029bb8225",
           "name": "Tech"
           },
           "user": {
           "id": "286138a3e584a9ef",
           "name": "Ronaldo",
           "profile": null
           }
           },
           {
           "id": "f2e908bd95faf551",
           "title": "Sports Events",
           "description": "Sports Fest Events",
           "time": "2024-05-06T08:45:00.000Z",
           "location": "Dubai",
           "image": "/public/image/83bab002ce98c4fe4ed5b3d4b70a3d11.jpg",
           "userId": "286138a3e584a9ef",
           "categoryId": "a57ed7e029bb8225",
           "inserted": "2024-08-08T08:12:53.604Z",
           "updated": "2024-08-08T08:20:57.358Z",
           "totalLike": "0",
           "totalComment": "0",
           "isLiked": "0",
           "category": {
           "id": "a57ed7e029bb8225",
           "name": "Tech"
           },
           "user": {
           "id": "286138a3e584a9ef",
           "name": "Ronaldo",
           "profile": null
           }
           }
           ]
           },
           "message": "Your Events Fetched Successfully"
           }

        6. Get Feeds Event(queries optional)
           localhost:4001/events/feeds?page=1&size=10&categoryId=a57ed7e029bb8225&fromDateTime=2024-04-06T08:45:00.000Z&toDateTime=2024-05-06T08:45:00.000Z&searchKeyword=Fest
           Method:GET
           Optional: req.query
           Required: Authorization Headers

        7. Get Events of User()
           localhost:4001/events?userId=286138a3e584a9ef&page=1&size=10&categoryId=a57ed7e029bb8225&fromDateTime=2024-04-06T08:45:00.000Z&toDateTime=2024-05-06T08:45:00.000Z&searchKeyword=Fest
           Method:GET
           Optional:(queries except req.query.userId)
           Required: Authorization Headers, req.query.userId
           Response:
           {
           "success": true,
           "data": {
           "count": 2,
           "rows": [
           {
           "id": "92e4fe28f7dd5e3e",
           "title": "Sports Events India",
           "description": "Sports Fest Events",
           "time": "2024-05-06T08:45:00.000Z",
           "location": "India",
           "image": "/public/image/fd7625391d9b3951a50e7bfd14155921.jpg",
           "userId": "286138a3e584a9ef",
           "categoryId": "a57ed7e029bb8225",
           "inserted": "2024-08-08T08:21:35.391Z",
           "updated": "2024-08-08T08:29:59.637Z",
           "totalLike": "0",
           "totalComment": "0",
           "isLiked": "0",
           "category": {
           "id": "a57ed7e029bb8225",
           "name": "Tech"
           },
           "user": {
           "id": "286138a3e584a9ef",
           "name": "Ronaldo",
           "profile": null
           }
           },
           {
           "id": "f2e908bd95faf551",
           "title": "Sports Events",
           "description": "Sports Fest Events",
           "time": "2024-05-06T08:45:00.000Z",
           "location": "Dubai",
           "image": "/public/image/83bab002ce98c4fe4ed5b3d4b70a3d11.jpg",
           "userId": "286138a3e584a9ef",
           "categoryId": "a57ed7e029bb8225",
           "inserted": "2024-08-08T08:12:53.604Z",
           "updated": "2024-08-08T08:20:57.358Z",
           "totalLike": "0",
           "totalComment": "0",
           "isLiked": "0",
           "category": {
           "id": "a57ed7e029bb8225",
           "name": "Tech"
           },
           "user": {
           "id": "286138a3e584a9ef",
           "name": "Ronaldo",
           "profile": null
           }
           }
           ]
           },
           "message": " Events Fetched Successfully"
           }

    # Likes

    1. Toogle Like
       localhost:4001/likes/toggle/event/92e4fe28f7dd5e3e
       Method: POST
       Required: Authorization Headers, req.params(eventId)
       Responses:
       {
       "success": true,
       "data": "liked",
       "message": "Like Status Toggled"
       },
       or
       {
       "success": true,
       "data": "unliked",
       "message": "Like Status Toggled"
       }

    # Comments

    1. Create
       localhost:4001/comments
       Method: POST
       Required: Authorization headers, req,body
       {
       "eventId":"f2e908bd95faf551",
       "description":"Great Event"
       }
       Response:
       {
       "success": true,
       "data": {
       "id": "536f53893c5e9bb6",
       "userId": "d87dd74491516b4e",
       "description": "Great Event",
       "eventId": "f2e908bd95faf551",
       "updated": "2024-08-08T09:01:20.324Z",
       "inserted": "2024-08-08T09:01:20.324Z"
       },
       "message": "Comment Posted Successfully"
       }

    2. Update
       localhost:4001/comments/536f53893c5e9bb6
       Method: PUT
       Required: Authorization Headers, req.params(commentId), req.body
       {
       "description":"Great to hear"
       }
       Response:
       {
       "success": true,
       "data": {
       "id": "536f53893c5e9bb6",
       "description": "Great to hear",
       "userId": "d87dd74491516b4e",
       "eventId": "f2e908bd95faf551",
       "inserted": "2024-08-08T09:01:20.324Z",
       "updated": "2024-08-08T09:03:44.513Z",
       "user": {
       "id": "d87dd74491516b4e",
       "name": "Shyam Magar",
       "profile": "/public/image/6a67aab6f5b2a233c8d7d9738dc6ce6f.jpg"
       }
       },
       "message": "Comment Updated Successfully"
       }

    3. Delete
       localhost:4001/comments/7d8cb3ca209657af
       Method: DELETE
       Required: Authorization Headers, req.params(commentId)

    4. Get By Event Id(Pagination required)
       localhost:4001/comments/event/f2e908bd95faf551?page=1&size=10
       Method: GET
       Required: Authorization Headers, req.params(eventId), req.query(page & size)
       Response:
       {
       "success": true,
       "data": {
       "count": 1,
       "rows": [
       {
       "id": "536f53893c5e9bb6",
       "description": "Great to hear",
       "userId": "d87dd74491516b4e",
       "eventId": "f2e908bd95faf551",
       "inserted": "2024-08-08T09:01:20.324Z",
       "updated": "2024-08-08T09:03:44.513Z",
       "user": {
       "id": "d87dd74491516b4e",
       "name": "Shyam Magar",
       "profile": "/public/image/6a67aab6f5b2a233c8d7d9738dc6ce6f.jpg"
       }
       }
       ]
       },
       "message": "Comments Fetched Successfully"
       }

    # Followers

    1.  Toggle Follow
        localhost:4001/followers/toggle/host/286138a3e584a9ef
        Method: POST
        Required: Authorization Headers, req.params(hostId)
        Response:
        {
        "success": true,
        "data": "followed",
        "message": "Follow Status Toggled"
        }
        or
        {
        "success": true,
        "data": "unfollowed",
        "message": "Follow Status Toggled"
        }

    2.  Get Own Folllowers(required pagination)
        localhost:4001/followers/own?page=1&size=10
        Method: GET
        Required: Authorization Headers, req.query(size & page)
        Response:
        {
        "success": true,
        "data": {
        "count": 1,
        "rows": [
        {
        "id": "06b479360d9a3116",
        "hostId": "286138a3e584a9ef",
        "followerId": "d87dd74491516b4e",
        "inserted": "2024-08-08T09:21:42.505Z",
        "updated": "2024-08-08T09:21:42.505Z",
        "follower": {
        "id": "d87dd74491516b4e",
        "name": "Shyam Magar",
        "profile": "/public/image/6a67aab6f5b2a233c8d7d9738dc6ce6f.jpg"
        }
        }
        ]
        },
        "message": "Followers Fetched"
        }

    3.  Get User Followers(Pagination Required)
        localhost:4001/followers/user/1f2548882b9048eb?page=1&size=10
        Method: GET
        Required: Authorization Headers, req.params(userId(host)), req.query(page,size)
        Response:
        {
        "success": true,
        "data": {
        "count": 1,
        "rows": [
        {
        "id": "06b479360d9a3116",
        "hostId": "286138a3e584a9ef",
        "followerId": "d87dd74491516b4e",
        "inserted": "2024-08-08T09:21:42.505Z",
        "updated": "2024-08-08T09:21:42.505Z",
        "follower": {
        "id": "d87dd74491516b4e",
        "name": "Shyam Magar",
        "profile": "/public/image/6a67aab6f5b2a233c8d7d9738dc6ce6f.jpg"
        }
        }
        ]
        },
        "message": "Followers Fetched"
        }

    # Notification

    1. Get All Notification(Pagination Required)
       localhost:4001/notifications?page=1&size=10
       Method: GET
       Required: Authorization Headers
       Response:
       {
       "success": true,
       "data": {
       "count": 6,
       "rows": [
       {
       "id": "32c8ab358e44c12a",
       "title": "Shyam Magar liked your event",
       "description": "Shyam Magar has liked your event Sports Events India.",
       "userId": "286138a3e584a9ef",
       "eventId": "92e4fe28f7dd5e3e",
       "notificationType": "like",
       "inserted": "2024-08-08T08:54:02.516Z",
       "updated": "2024-08-08T08:54:02.516Z"
       },
       {
       "id": "4237f910a035786c",
       "title": "Shyam Magar liked your event",
       "description": "Shyam Magar has liked your event Sports Events India.",
       "userId": "286138a3e584a9ef",
       "eventId": "92e4fe28f7dd5e3e",
       "notificationType": "like",
       "inserted": "2024-08-08T08:56:16.062Z",
       "updated": "2024-08-08T08:56:16.062Z"
       },
       {
       "id": "fe3bc248a3d61651",
       "title": "Shyam Magar liked your event",
       "description": "Shyam Magar has liked your event Sports Events.",
       "userId": "286138a3e584a9ef",
       "eventId": "f2e908bd95faf551",
       "notificationType": "like",
       "inserted": "2024-08-08T08:56:35.488Z",
       "updated": "2024-08-08T08:56:35.488Z"
       },
       {
       "id": "82528303cc0c8978",
       "title": "Shyam Magar commented your event Sports Events",
       "description": "Shyam Magar has commented \"Great Event\" on your event \"Sports Events\".",
       "userId": "286138a3e584a9ef",
       "eventId": "f2e908bd95faf551",
       "notificationType": "comment",
       "inserted": "2024-08-08T09:01:20.404Z",
       "updated": "2024-08-08T09:01:20.404Z"
       },
       {
       "id": "83553539866e1729",
       "title": "Someone followed you",
       "description": "Shyam Magar has followed you.",
       "userId": "286138a3e584a9ef",
       "eventId": null,
       "notificationType": "follow",
       "inserted": "2024-08-08T09:18:19.418Z",
       "updated": "2024-08-08T09:18:19.418Z"
       },
       {
       "id": "f21544fb7531fa3b",
       "title": "Someone followed you",
       "description": "Shyam Magar has followed you.",
       "userId": "286138a3e584a9ef",
       "eventId": null,
       "notificationType": "follow",
       "inserted": "2024-08-08T09:21:43.314Z",
       "updated": "2024-08-08T09:21:43.314Z"
       }
       ]
       },
       "message": "Notification Fetched Successfully"
       }
