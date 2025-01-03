const Papa = require("papaparse");
const fs = require("fs");
const path = require("path");
const Voters = require("../models/VoterDetails"); // Your VoterDetails model

// Function to handle CSV file upload and insertion into DB
exports.uploadVoterDetails = async (req, res) => {
  try {
    // Ensure file is uploaded
    console.log("req.file", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read the CSV file
    const filePath = path.join(__dirname, "../uploads", req.file.filename); // Path to the uploaded file
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Log the content of the CSV to the console for debugging
    console.log("CSV File Content:", fileContent);

    // Parse the CSV content using PapaParse
    Papa.parse(fileContent, {
      header: true, // First row will be treated as header
      skipEmptyLines: true,
      complete: async (result) => {
        const votersData = result.data;

        // Log the parsed CSV data to the console
        console.log("Parsed CSV Data:", votersData);

        // Loop through each voter and insert into the database
        for (const voter of votersData) {
          console.log(`Processing voter with EpicId: ${voter.epicId}`);

          // Check if the epicId already exists
          const existingVoter = await Voters.findOne({ epicId: voter.epicId });

          if (existingVoter) {
            console.log(
              `EpicId ${voter.epicId} already exists. Skipping insertion.`
            );
          } else {
            // Insert new voter data if epicId does not exist
            const newVoter = new Voters({
              epicId: voter.epicId,
              name: voter.name,
              contactNo: voter.contactNo,
              houseNo: voter.houseNo,
              caste: voter.caste,
              age: voter.age,
              partyInclination: voter.partyInclination,
            });

            await newVoter.save();
            console.log(`Data inserted for EpicId: ${voter.epicId}`);
          }
        }

        // Return success response
        res.status(200).json({ message: "Data uploaded successfully" });
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
        res.status(500).json({ message: "Failed to parse CSV file" });
      },
    });
  } catch (err) {
    console.error("Error processing CSV:", err);
    res.status(500).json({ message: "Failed to upload data" });
  }
};

// const Papa = require("papaparse");
// const fs = require("fs");
// const path = require("path");
// const Voters = require("../models/VoterDetails");

// // Function to handle CSV file upload and insertion into DB
// exports.uploadVoterDetails = async (req, res) => {
//   try {
//     // Ensure file is uploaded

//     console.log("req.file", req.file);

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Read the CSV file
//     const filePath = path.join(__dirname, "../uploads", req.file.filename); // Make sure this folder exists
//     const fileContent = fs.readFileSync(filePath, "utf8");

//     // Log the content of the CSV to the console for debugging
//     console.log("CSV File Content:", fileContent);

//     // Parse the CSV content using PapaParse
//     Papa.parse(fileContent, {
//       header: true, // First row will be treated as header
//       skipEmptyLines: true,
//       complete: async (result) => {
//         const votersData = result.data;

//         // Log the parsed CSV data to the console
//         console.log("Parsed CSV Data:", votersData);

//         // Loop through each voter and insert into the database
//         for (const voter of votersData) {
//           console.log(`Processing voter with EpicId: ${voter.epicId}`);

//           // Check if the epicId already exists
//           const existingVoter = await Voters.findOne({ epicId: voter.epicId });

//           if (existingVoter) {
//             console.log(
//               `EpicId ${voter.epicId} already exists. Skipping insertion.`
//             );
//           } else {
//             // Insert new voter data if epicId does not exist
//             const newVoter = new Voters({
//               epicId: voter.epicId,
//               name: voter.name,
//               contactNo: voter.contactNo,
//               houseNo: voter.houseNo,
//               caste: voter.caste,
//               age: voter.age,
//               partyInclination: voter.partyInclination,
//             });

//             await newVoter.save();
//             console.log(`Data inserted for EpicId: ${voter.epicId}`);
//           }
//         }

//         // Return success response
//         res.status(200).json({ message: "Data uploaded successfully" });
//       },
//       error: (err) => {
//         console.error("Error parsing CSV:", err);
//         res.status(500).json({ message: "Failed to parse CSV file" });
//       },
//     });
//   } catch (err) {
//     console.error("Error processing CSV:", err);
//     res.status(500).json({ message: "Failed to upload data" });
//   }
// };

// const Voters = require("../models/VoterDetails");

// exports.uploadVoterDetails = async (req, res) => {
//   try {
//     const data = req.body; // Data sent from the frontend (React Native)
//     console.log(data);

//     // Loop through each item in the data
//     for (const voter of data) {
//       // Check if the epicId already exists in the database
//       const existingVoter = await Voters.findOne({ epicId: voter.epicId });

//       if (existingVoter) {
//         // If epicId exists, log it or handle the case as needed
//         console.log(
//           `EpicId ${voter.epicId} already exists. Skipping insertion.`
//         );
//       } else {
//         // If epicId doesn't exist, insert the new data
//         const newVoter = {
//           epicId: voter.epicId,
//           name: voter.name,
//           contactNo: voter.contactNo,
//           houseNo: voter.houseNo,
//           caste: voter.caste,
//           age: voter.age,
//           partyInclination: voter.partyInclination,
//         };

//         // Insert the new voter data
//         await Voters.create(newVoter);
//         console.log(`Data inserted for EpicId: ${voter.epicId}`);
//       }
//     }

//     res.status(200).json({ message: "Data uploaded successfully" });
//   } catch (err) {
//     console.error("Error inserting data:", err);
//     res.status(500).json({ message: "Failed to upload data" });
//   }
// };

// // Get all voters
// exports.getDetails = async (req, res) => {
//   try {
//     const data = await Voters.find();
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching voters", error: err });
//   }
// };

// // Get a single voter by ID
// exports.getSingleDetails = async (req, res) => {
//   try {
//     const voter = await Voters.findById(req.params.id);
//     if (!voter) {
//       return res.status(404).json({ message: "Voter not found" });
//     }
//     res.status(200).json(voter);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching voter", error: err });
//   }
// };

// // Update voter details
// exports.updateVoterDetails = async (req, res) => {
//   const { contactNo, caste, age, partyInclination } = req.body;

//   try {
//     const updatedVoter = await Voters.findByIdAndUpdate(
//       req.params.id,
//       { contactNo, caste, age, partyInclination },
//       { new: true }
//     );
//     if (!updatedVoter) {
//       return res.status(404).json({ message: "Voter not found" });
//     }
//     res.status(200).json({
//       message: "Voter details updated successfully",
//       voter: updatedVoter,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error updating voter details", error: err });
//   }
// };
