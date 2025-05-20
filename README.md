# digital-wallet-backend
Code repository related to research project about a danish implementation of of the so called 'European Digital Identity Framework'. This paper explores the development of digital identity solutions in Europe and takes a closer look at the Danish implementation, known as the dk-wallet.

## Independent Service Architecture
service/
├─ src/
│  ├─ routes/
│  │   └─ example.route.js
│  └─ controllers/
│      └─ example.controller.js
├─ .gitignore
└─ package.json

## After cloning/pulling
- Before working on a service always fetch npm modules
- Run following in the root of the directory:
- OPS: START AT THE ROOT
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
- Follow up with a npm run build
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