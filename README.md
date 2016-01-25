# DraftService
OUT OF DATE
draft service is running on localhost:8080

current state:
- run json-server db.json
- npm start

to connect, require in the socket.io-client lib file to your client and run socket.connect('https://localhost:8080')

there is no auth right now. TBI.

client is assumed to already know about characters & self. 

draft-service will pull data to educate self on character id list and league data. need to configure path to get draft service the correct league id to pull proper data. 

dummy client served at .../
