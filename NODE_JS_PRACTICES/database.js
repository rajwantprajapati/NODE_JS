const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

const dbConnection = async () => {
  const client = new MongoClient(uri);

  try {
    // Create / Get database
    const database = client.db("sample_mflix");
    console.log("Database connection successful");

    const movies = database.collection("movies");

    // Create a document to insert
    const movie = {
      title: "The Matrix",
      year: 1999,
      genres: ["Action", "Sci-Fi"],
    };

    // inser document
    await movies.insertOne(movie);

    const moviesList = [
      {
        title: "The Matrix Reloaded",
        year: 2003,
        genres: ["Action", "Sci-Fi"],
      },
      {
        title: "The Matrix Revolutions",
        year: 2003,
        genres: ["Action", "Sci-Fi"],
      },
      {
        title: "The Matrix Resurrections",
        year: 2021,
        genres: ["Action", "Sci-Fi"],
      },
    ];

    // Insert multiple documents
    const result = await movies.insertMany(moviesList);

    console.log("Inserted movies:", result.insertedCount);
    
    
  } catch (error) {
    console.error(error);
  }
};

dbConnection();
