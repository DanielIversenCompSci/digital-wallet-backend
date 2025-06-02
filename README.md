## Independent Service Architecture
service/
├─ src/
│  ├─ routes/
│  │   └─ example.route.js
│  └─ controllers/
│      └─ example.controller.js
├─ .gitignore
└─ package.json

## How to run the application
### Step 1:
- OPS: START AT THE ROOT
- Copy and paste the following lines into terminal:
***********************
cd CredentialProvider
npm i
cd ..
cd UserWallet
npm i
cd ..
cd RelyingParty
npm i
cd ..
***********************

### Step 2:
- Build the dist, translate TypeScript into JS
- Run the following in a terminal located at the root of the directory:
***********************
cd CredentialProvider
npm run build
cd ..
cd UserWallet
npm run build
cd ..
cd RelyingParty
npm run build
cd ..
***********************

### Step 3:
- Finally, run an instance of each service, in each their respective terminal
- This is done to simulate three independent web servers running, which can then communicate with eachother
- Open terminal 1 and navigate to digital-wallet/CredentialProvider, run following command in the terminal: "npm run start"
- Open terminal 2 and navigate to digital-wallet/UserWallet, run following command in the terminal: "npm run start"
- Open terminal 3 and navigate to digital-wallet/RelyingParty, run following command in the terminal: "npm run start"

### Step 4:
- Open a 4th terminal and perform an intent to interact with the following curl:
***********************
curl -X POST http://localhost:3001/credentialprovider/issue \
-H "Content-Type: application/json" \
-d '{}'
***********************