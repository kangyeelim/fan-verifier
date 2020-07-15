# fan-verifier web app
fan-verifier is a web application that allows you to verify yourself and others as true fans of an artist with other features to enjoy.
(on going)

## Usage

* Login via google to save state
* Take a quiz to verify yourself as a fan of an artist
* Find other fans' social media accounts
* Music page to listen to music and find lyrics
* Community space to make posts that can include images to share with other fans

## Setup your own

You would need to sign up for RapidAPI, Google developers, Orion Apiseeds, MongoDB and Cloudinary.
The database that is used is MongoDB which is essential to store all data models.
To listen to the music in the Music Tab, you would need a Deezer account that is signed in.
RapidAPI and Orion Apiseeds are to retrieve the lyrics for songs that are searched for in the Music Tab.
Google developers is needed for the sign in/log in and log out function using GoogleOAuth.
Lastly, Cloudinary is used to host images that are uploaded by users in posts for the Community Tab.

```bash
# Clone repo
$ git clone this repository

$ cd fan-verifier

# Install all dependencies in root
$ npm install

# ENV Variables
# Create a .env file in the root of the directory
# Inside root .env file, insert: 
REACT_APP_GOOGLE_CLIENT_ID=<Your Google Client ID from your google developer's console>
REACT_APP_GOOGLE_CLIENT_SECRET=<Your Google Client Secret from your google developer's console>
REACT_APP_LYRICS_API_KEY=<Your RapidApi API key, this is used for the shazam and genuis API>
REACT_APP_LYRICS_API_KEY_ROM=<Your Orion Apiseeds API key>

# Install all dependencies in /backend directory
$ cd backend
$ npm install

# ENV Variables
# Create a .env file in current directory (/backend)
# Inside /backend .env file, insert:
ATLAS_URI=<Your MongoDB Atlas URI>
API_SECRET=<Your Cloudinary API secret>
API_KEY=<Your Cloudinary API key>
CLOUD_NAME=<Your Cloudinary Cloud name>

# To connect to MongoDB
$ nodemon server

#To run application 
# Open another terminal
$ npm start

#Go to the ip address on browser (http://127.0.0.1:3000/)

```

### DB Schema

Feel free to add your own improvements!

| Schema |      Name      |   Type   |     Owner   |
|--------|----------------|----------|-------------|
| public | users          | table    |             |
| public | sessions        | table    |  |
| public | questions | table |  |
| public | hallOfFameEntries         | table    |  |

Table "users"
|Column |       Type         | Nullable |              Default              |
|------|------------------|----------|----------------------------------------|
| _id    |                    | not null |  |
| name  | String          | not null |				null				   |
| email |      String      | not null |					null			   |
| googleId| String           | not null |					null			   |
| imageUrl  | String           | null |					null			   |
| tokenId  | String          | not null |					null			   |
| timestamp  |           | not null |								   |

Table "sessions"
|Column |       Type         | Nullable |              Default              |
|------|------------------|----------|-------------------------------------------|
| _id    |                    | not null |  |
| googleId| String           | not null |					null			   |
| tokenId  | String          | not null |					null			   |
| timestamp  |           | not null |								   |

Table "sessions"
|Column |       Type         | Nullable |              Default              |
|------|------------------|----------|-------------------------------------------|
| _id    |                    | not null |  |
| question| String           | not null |					null			   |
| options  | Array          | not null |					null			   |
| answer  | Number          | not null |					null			   |
| timestamp  |           | not null |								   |

Table "hallOfFameEntries"
|Column |       Type         | Nullable |              Default              |
|------|------------------|----------|-------------------------------------------|
| _id    |                    | not null |  |
| name  | String          | not null |				null				   |
| social |      String      | not null |					null			   |
| googleId| String           | not null |					null			   |
| timestamp  |           | not null |								   |

Table "posts"
|Column |       Type         | Nullable |              Default              |
|------|------------------|----------|-------------------------------------------|
| _id    |                    | not null |  |
| title| String           | null |					null			   |
| description| String           | null |					null			   |
| tag| String           | null |					null			   |
| images| Array           | null |					null			   |
| isPosted| Boolean           | not null |					null			   |
| googleName  | String          | not null |				null				   |
| social |      String      |  null |					null			   |
| name| String           | null |					null			   |
| googleId| String           | not null |					null			   |
| date| Date           | null |					null			   |
| timestamp  |           | not null |								   |

(images store an Array of image data that is returned when uploaded to Cloudinary.)