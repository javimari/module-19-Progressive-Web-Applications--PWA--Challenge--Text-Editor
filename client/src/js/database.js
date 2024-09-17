import { openDB } from 'idb';  // Import the IndexedDB library

// Initialize the database
const initdb = async () =>
  // Create a new database named 'jate' with version 1
  openDB('jate', 1, {
    // This upgrade function runs if the database hasn't been initialized or needs to be upgraded
    upgrade(db) {
      // Check if the 'jate' object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;  // Exit if the store exists, no need to create again
      }
      // Create a new object store called 'jate' with an auto-incrementing 'id' as the key
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to add or update content in the database
export const putDb = async (content) => {
  // Open the 'jate' database at version 1
  const jateDb = await openDB('jate', 1);
  // Start a new transaction with 'readwrite' privileges to allow changes
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open the 'jate' object store
  const store = tx.objectStore('jate');
  // Use the 'put' method to add or update the content (with id: 1)
  const request = store.put({ id: 1, value: content });
  // Await the result of the 'put' request
  const result = await request;
  // Log the result to confirm the data has been saved
  console.log('Data saved to the database', result);
};

// Function to retrieve all content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Open the 'jate' database at version 1
  const jateDB = await openDB('jate', 1);
  // Start a new transaction with 'readonly' privileges to retrieve data
  const tx = jateDB.transaction('jate', 'readonly');
  // Open the 'jate' object store
  const store = tx.objectStore('jate');
  // Retrieve all data from the store using 'getAll'
  const request = store.getAll();
  // Await the result of the request
  const result = await request;
  // Log the retrieved data
  console.log(result);
  // Return the retrieved data
  return result;
};

// Call the function to initialize the database
initdb();
