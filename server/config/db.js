const mongoose = require("mongoose");

const URI = process.env.DATABASE;

mongoose
  .connect(URI)
  .then(() => {
    console.log("database connection successfull");
  })
  .catch((error) => {
    console.log(error);
    console.log("error database not connected");
  });

//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
