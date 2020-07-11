# fan-verifier web app
fan-verifier is a web application that allows you to verify yourself and others as true fans of an artist with other features to enjoy.
(on going)

## Usage

* Login via google to save state
* Take a quiz to verify yourself as a fan of an artist
* Find other fans' social media accounts
* Music page to listen to music and find lyrics

## Setup your own

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
|------|------------------|----------|---------|----------------------------------|
| _id    |                    | not null |  |
| name  | String          | not null |				null				   |
| email |      String      | not null |					null			   |
| googleId| String           | not null |					null			   |
| imageUrl  | String           | null |					null			   |
| tokenId  | String          | not null |					null			   |
| timestamp  |           | not null |								   |

Table "sessions"
|Column |       Type         | Nullable |              Default              |
|------|------------------|----------|---------|----------------------------------|
| _id    |                    | not null |  |
| googleId| String           | not null |					null			   |
| tokenId  | String          | not null |					null			   |
| timestamp  |           | not null |								   |

Table "sessions"
|Column |       Type         | Nullable |              Default              |
|------|------------------|----------|---------|----------------------------------|
| _id    |                    | not null |  |
| question| String           | not null |					null			   |
| options  | Array          | not null |					null			   |
| answer  | Number          | not null |					null			   |
| timestamp  |           | not null |								   |

Table "hallOfFameEntries"
|Column |       Type         | Nullable |              Default              |
|------|------------------|----------|---------|----------------------------------|
| _id    |                    | not null |  |
| name  | String          | not null |				null				   |
| social |      String      | not null |					null			   |
| googleId| String           | not null |					null			   |
| timestamp  |           | not null |								   |
