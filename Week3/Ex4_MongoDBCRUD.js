"use strict";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.pogxt.mongodb.net/world?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
const city = client.db("world").collection("city");

const docs = {
  newCity: {
    Name: "ImaginaryCity",
    CountryCode: "XXX",
    District: "Wonderland",
    Population: 100,
  },
  update: {
    $set: { Population: 200 },
  },
  filterName: { Name: "ImaginaryCity" },
  filterCode: { CountryCode: "XXX" },
};

const modifyDatabase = async () => {
  try {
    await client.connect();

    // Create:

    const insertRes = await city.insertOne(docs.newCity);

    console.log(`\nInserted with _id: ${insertRes.insertedId}`);

    // Update:

    const updateRes = await city.updateOne(docs.filterName, docs.update);

    console.log(`\nUpdated ${updateRes.modifiedCount} document`);

    // Read:

    const readResults = await Promise.all([
      city.findOne(docs.filterName),
      city.findOne(docs.filterCode),
    ]);

    console.log(`\n${readResults}`);

    // Delete:

    const deleteRes = await city.deleteOne(docs.filterName);

    if (deleteRes.deletedCount === 1) {
      console.log(`\nDocument deleted successfully`);
    } else {
      console.log(`\nDocument not found`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

modifyDatabase();
