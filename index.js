const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const prot = process.env.PROT || 5000;
// password : 9fdiNfW3O97ZeTXU
// userName : CoffeeMangment

app.use(cors());
app.use(express.json());


// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);
// ! IMPORTANT: MongoDB  */
// const uri = "mongodb+srv://CoffeeMangment:9fdiNfW3O97ZeTXU@cluster0.frskr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.frskr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    //  ! APP POST Coffee COLLECTION
    const coffeeCollection = client.db("coffeDB").collection("coffee");
    const userCollection = client.db("coffeDB").collection("users");

    // ! app get
    app.get("/coffee", async (req, res) => {
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const qurey = { _id: new ObjectId(id) };
      const result = await coffeeCollection.findOne(qurey);
      res.send(result);
    });

    // ! app post

    app.post("/coffee", async (req, res) => {
      const newCoffe = req.body;
      console.log(newCoffe);
      // ! insert the document into the new coffee collection

      const result = await coffeeCollection.insertOne(newCoffe);
      res.send(result);
    });

    app.put("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateCoffe = req.body;
      const coffee = {
        $set: {
          name: updateCoffe.name,
          quantity: updateCoffe.quantity,
          supplier: updateCoffe.supplier,
          taste: updateCoffe.taste,
          details: updateCoffe.details,
          photo: updateCoffe.photo,
          category: updateCoffe.category,
        },
      };
      const result = await coffeeCollection.updateOne(filter, coffee, options);
      res.send(result);
    });

    app.delete("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const qurey = { _id: new ObjectId(id) };
      const result = await coffeeCollection.deleteOne(qurey);
      res.send(result);
    });

    // ! =================================== User Related Apils ---------------

    app.get("/users",async(req, res)=>{
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })


    app.post("/users", async (req, res) => {
      const newUsers = req.body;
      console.log("creating new users ", newUsers);
      const result = await userCollection.insertOne(newUsers);
      res.send(result);
    });
    
    app.path("/users/:eamil",async(req, res)=>{
      const email = req.params.email
      const filter = {email}
      const updatedocs = {
        $set :{
          lastLogIntime : req.body?.lastLogIntime

          
        }
      }
    })

    app.delete("/users/:id",async(req, res)=>{
      const id = req.params.id;
      const qurey = {_id: new ObjectId (id)}
      const result = await userCollection.deleteOne(qurey)
      res.send(result)

    })


    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Coffe Making Serve Is Running");
});
app.listen(prot, () => {
  console.log(`Coffee Server Is Running Is Prot ${prot}`);
});
