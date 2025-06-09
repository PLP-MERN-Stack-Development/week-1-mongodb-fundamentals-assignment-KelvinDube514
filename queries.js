// ### Task 1: MongoDB Setup

// To install MongoDB on Windows, follow these steps:

// 1. Download the MongoDB Community Server MSI Installer from the official MongoDB Download Center.
// 2. Run the installer by double-clicking on the downloaded.msi file.
// 3. Accept the License Agreement and choose the setup type (Complete or Custom).
// 4. Configure MongoDB to run as a service by selecting "Install MongoDB as a Service".
// 5. Install MongoDB Compass, a powerful GUI tool for interacting with MongoDB databases.
// 6. Initiate the installation and click "Finish".
// 7. Verify the installation and start MongoDB by checking the "Services" application in Windows and looking for a service named MongoDB or MongoDB Community Server.
// 8. Connect using mongosh (MongoDB Shell) by typing mongosh and pressing Enter.
// 9. Confirm the installation by seeing the mongosh prompt, typically showing test> or the database you were in previously.

// After installing MongoDB Community Server on your Windows machine, you can proceed with creating databases and working with your data.

// Create a new database called `plp_bookstore`
// use plp_bookstore

// Create a collection called `books`
// db.createCollection("books")


// ### Task 2: Basic CRUD Operations

// Insert a new book document into the `books` collection
// use plp_bookstore
// db.books.insertOne({
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     genre: "Classic",
//     published_year: 1925,
//     price: 12.99,
//     in_stock: true,
//     pages: 218,
//     publisher: "Charles Scribner's Sons"
// })

// Find all books in the `books` collection
// db.books.find()

// Update the price of a specific book
// db.books.updateOne({ title: "The Great Gatsby" }, { $set: { price: 14.99 } })

// Delete a specific book
// db.books.deleteOne({ title: "The Great Gatsby" })

// ### Task 3: Query Operations

// Find books by a specific author
// db.books.find({ author: "F. Scott Fitzgerald" })

// Find books published after a certain year
// db.books.find({ published_year: { $gt: 2000 } })

// Find books that are both in stock and published after 2010
// db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Use projection to return only the title, author, and price fields
// db.books.find({}, { title: 1, author: 1, price: 1 })

// Implement sorting to display books by price (both ascending and descending)
// db.books.find().sort({ price: 1 })
// db.books.find().sort({ price: -1 })

// Use the `limit` and `skip` methods to implement pagination (5 books per page)
// db.books.find().limit(5).skip(0)
// db.books.find().limit(5).skip(5)
// db.books.find().limit(5).skip(10)

// ### Task 4: Aggregation Pipeline

// aggregation_pipelines.js - Script to run MongoDB aggregation pipelines

// Import MongoDB client
// const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
// const uri = 'mongodb://localhost:27017';

// Database and collection names (from insert_books.js)
// const dbName = 'plp_bookstore';
// const collectionName = 'books';

// async function runAggregations() {
//   const client = new MongoClient(uri);

//   try {
    // Connect to the MongoDB server
//     await client.connect();
//     console.log('Connected to MongoDB server');

    // Get database and collection
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     console.log('\n--- Running Aggregation Pipelines ---');

// 1. Aggregation pipeline to calculate the average price of books by genre
//     console.log('\n--- Average Price of Books by Genre ---');
//     const avgPriceByGenre = await collection.aggregate([
//       {
//         $group: {
//           _id: '$genre', // Group by the 'genre' field
//           average_price: { $avg: '$price' } // Calculate the average of the 'price' field
//         }
//       },
//       {
//         $sort: { _id: 1 } // Sort by genre for better readability
//       }
//     ]).toArray();
//     console.log(JSON.stringify(avgPriceByGenre, null, 2));

// 2. Aggregation pipeline to find the author with the most books in the collection
//     console.log('\n--- Author with the Most Books ---');
//     const authorWithMostBooks = await collection.aggregate([
//       {
//         $group: {
//           _id: '$author', // Group by the 'author' field
//           book_count: { $sum: 1 } // Count the number of books for each author
//         }
//       },
//       {
//         $sort: { book_count: -1 } // Sort in descending order of book_count
//       },
//       {
//         $limit: 1 // Limit to the top author
//       }
//     ]).toArray();
//     console.log(JSON.stringify(authorWithMostBooks, null, 2));

// 3. Aggregation pipeline that groups books by publication decade and counts them
//     console.log('\n--- Books by Publication Decade ---');
//     const booksByDecade = await collection.aggregate([
//       {
//         $addFields: {
           // Calculate the decade: e.g., 1960 -> 1960, 1965 -> 1960
//           decade: {
//             $multiply: [
//               { $floor: { $divide: ['$published_year', 10] } },
//               10
//             ]
//           }
//         }
//       },
//       {
//         $group: {
//           _id: '$decade', // Group by the newly created 'decade' field
//           book_count: { $sum: 1 } // Count the number of books in each decade
//         }
//       },
//       {
//         $sort: { _id: 1 } // Sort by decade for chronological order
//       }
//     ]).toArray();
//     console.log(JSON.stringify(booksByDecade, null, 2));

//   } catch (err) {
//     console.error('Error occurred:', err);
//   } finally {
     // Close the connection
//     await client.close();
//     console.log('\nConnection closed');
//   }
// }

// Run the aggregation function
// runAggregations().catch(console.error);


// ### Task 5: Indexing

// Create an index on the `title` field for faster searches
// db.books.createIndex({ title: 1 });

// Create a compound index on `author` and `published_year`
// db.books.createIndex({ author: 1, published_year: 1 });

// Use the `explain()` method to demonstrate the performance improvement with your indexes
// db.books.find({ author: "F. Scott Fitzgerald" }).explain("executionStats");