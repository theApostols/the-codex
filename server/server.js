const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const multer = require('multer');
const cors = require('cors');

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const {} = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

//setting up multer uploads
//=============================================================
const storage = multer.diskStorage(
{
  destination: '../client/public/images/file-uploads', //setting upload file path
  filename: function(req, file, cb)
  {
    const fileSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); //creates a suffix using the current UNIX time + a random 9-digit number
    const fileName = file.fieldname + '-' + fileSuffix; //uses field name + suffix to create new file name
    file.originalname = fileName;
    cb(null, fileName);
  }
});

const uploadFolder = multer({storage: storage});
//=============================================================

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use("/images", express.static(path.join(__dirname, "../client/public/images")));

  app.post('/file-upload', uploadFolder.single('file'), async (req, res) =>
  {
    console.log('file upload request recieved');
    try
    {
      //attempts to return the uploaded file's name as JSON with a status 200
      res.status(200).json(req.file.originalname);
    }
    catch (error) //catches any errors that occur, log it to console, & respond with a status 500
    {
      console.error(error);
      res.status(500).json(error);
    }
  });

  app.use("/graphql", expressMiddleware(server));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
