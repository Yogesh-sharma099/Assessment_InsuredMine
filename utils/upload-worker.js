const { workerData } = require('worker_threads');
const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');

const file = workerData.file;
const csvData = [];

fs.createReadStream(file)
 .pipe(csv())
 .on('data', (data) => {
    csvData.push(data);
  })
 .on('end', () => {
    const agents = [];
    const users = [];
    const accounts = [];
    const lobs = [];
    const carriers = [];
    const policies = [];

    csvData.forEach((row) => {
      const agent = new Agent({ name: row['Agent - Agent Name'] });
      agents.push(agent);

      const user = new User({
        firstName: row['User - first name'],
        dob: row['User - DOB'],
        address: row['User - address'],
        phoneNumber: row['User - phone number'],
        state: row['User - state'],
        zipCode: row['User - zip code'],
        email: row['User - email'],
        gender: row['User - gender'],
        userType: row['User - user type']
      });
users.push(user);

      const account = new Account({ name: row['User\'s Account - Account Name'] });
      accounts.push(account);

      const lob = new LOB({ name: row['Policy Category(LOB) - category_name'] });
      lobs.push(lob);

      const carrier = new Carrier({ name: row['Policy Carrier - company_name'] });
      carriers.push(carrier);

      const policy = new Policy({
        policyNumber: row['Policy Info - policy number'],
        policyStartDate: row['Policy Info - policy start date'],
        policyEndDate: row['Policy Info - policy end date'],
        policyCategory: lob,
        companyCollectionId: carrier,
        userId: user
      });
      policies.push(policy);
    });

    mongoose.connect('mongodb://localhost:27017/mydatabase', (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      Agent.insertMany(agents, (err) => {
        if (err) {
          console.error(err);
        }
      });

      User.insertMany(users, (err) => {
        if (err) {
          console.error(err);
        }
      });

      Account.insertMany(accounts, (err) => {
        if (err) {
          console.error(err);
        }
      });

      LOB.insertMany(lobs, (err) => {
        if (err) {
          console.error(err);
        }
      });

      Carrier.insertMany(carriers, (err) => {
        if (err) {
          console.error(err);
        }
      });

      Policy.insertMany(policies, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });