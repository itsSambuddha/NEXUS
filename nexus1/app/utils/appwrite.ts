import {Client, Account} from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://nyc.cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('689b850f00199aea512f'); // Your project ID

export const account = new Account(client);

export {ID} from 'appwrite';
