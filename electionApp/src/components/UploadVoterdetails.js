import React, {useState} from 'react';
import {View, Button, Text, Alert, FlatList, StyleSheet} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const UploadVoterdetails = () => {
  const [data, setData] = useState([]);

  // Function to handle file upload and read the CSV file
  const handleFileUpload = async () => {
    try {
      // Allow selection of any file type
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allow any file type
      });

      const fileUri = res[0].uri;
      console.log(res);

      // Send the file to the backend
      sendDataToDatabase(fileUri);
    } catch (err) {
      console.error('Error picking file:', err);
      Alert.alert('Error', 'Failed to pick the file');
    }
  };

  // Function to send file data to the backend
  const sendDataToDatabase = async fileUri => {
    try {
      const formData = new FormData();

      // Prepare the file object for FormData
      const file = {
        uri: fileUri,
        type: 'text/csv', // Ensure the file type is CSV
        name: 'voters.csv', // You can name the file as you like
      };

      // Append the file to the FormData object
      formData.append('file', file); // 'file' is the field name in the multer handler

      const response = await fetch(
        'http://192.168.0.102:5000/voter/uploadData',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data', // This tells the server it's a file upload
          },
          body: formData,
        },
      );

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Data uploaded successfully!');
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      Alert.alert('Error', 'Failed to send data to the server.');
    }
  };

  // Render each row of the data
  const renderItem = ({item}) => {
    return (
      <View style={styles.row}>
        {Object.keys(item).map((key, index) => (
          <Text key={index} style={styles.cell}>
            {key}: {item[key]}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Upload CSV" onPress={handleFileUpload} />
      <Text style={styles.heading}>Parsed Data:</Text>

      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text>No data to display</Text>
      )}
    </View>
  );
};

// Styles for the layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default UploadVoterdetails;

// import React, {useState} from 'react';
// import {View, Button, Text, Alert, FlatList, StyleSheet} from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';
// import Papa from 'papaparse'; // Import PapaParse for CSV parsing

// const UploadVoterdetails = () => {
//   const [data, setData] = useState([]);

//   // Function to handle file upload and read the CSV file
//   const handleFileUpload = async () => {
//     try {
//       // Allow selection of CSV files
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles], // Allow plain text (CSV files)
//       });

//       const fileUri = res[0].uri;
//       console.log(res); // Log the selected file details for debugging

//       // Manually check if the selected file is a .csv file based on its extension
//       // if (!fileUri.endsWith('.csv')) {
//       //   Alert.alert('Error', 'Please select a valid CSV file.');
//       //   return;
//       // }

//       const path = fileUri;

//       // Read the CSV file as text (not base64)
//       const fileContent = await RNFS.readFile(path, 'utf8');

//       // Parse the CSV content into a JSON object using PapaParse
//       Papa.parse(fileContent, {
//         complete: result => {
//           console.log('Raw parsed data:', result.data); // Log raw data to debug

//           // Check the headers and log if necessary
//           if (result.meta.fields) {
//             console.log('Parsed Headers:', result.meta.fields); // Log headers to check for correctness
//           }

//           const jsonData = result.data;

//           // Check if the data is not empty
//           if (jsonData.length === 0) {
//             Alert.alert('No Data', 'The CSV file is empty or invalid.');
//             return;
//           }

//           // Map the CSV data to the desired structure
//           const formattedData = jsonData.map(item => ({
//             epicId: item['epicId'] || 'N/A', // Fallback if missing
//             name: item['name'] || 'Unknown',
//             contactNo: item['contactNo'] || 'Unknown',
//             houseNo: item['houseNo'] || 'Unknown',
//             caste: item['caste'] || 'Unknown',
//             age: item['age'] || 'Unknown',
//             partyInclination: item['partyInclination'] || 'Unknown',
//           }));

//           // console.log('Formatted Data:', formattedData); // This will show default values if fields are missing

//           // Set the formatted data into the state
//           setData(formattedData);

//           // Send data to the backend
//           sendDataToDatabase(formattedData);
//         },
//         error: error => {
//           console.error('Error parsing CSV file:', error);
//           Alert.alert(
//             'Error',
//             `Failed to parse the CSV file: ${error.message}`,
//           );
//         },
//         header: true, // Ensure that PapaParse knows the first row is a header
//         skipEmptyLines: true, // Ignore empty lines in the CSV
//       });
//     } catch (err) {
//       console.error('Error reading CSV file:', err);
//       Alert.alert('Error', `Failed to read the CSV file: ${err.message}`);
//     }
//   };

//   // Function to send data to the backend
//   const sendDataToDatabase = async data => {
//     console.log('data', data);

//     try {
//       const response = await fetch(
//         'http://192.168.0.102:5000/voter/uploadData',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data), // Send the data to the backend
//         },
//       );

//       const result = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', 'Data uploaded successfully!');
//       } else {
//         Alert.alert('Error', result.message);
//       }
//     } catch (error) {
//       console.error('Error sending data:', error);
//       Alert.alert('Error', 'Failed to send data to the server.');
//     }
//   };

//   // Render each row of the data
//   const renderItem = ({item}) => {
//     return (
//       <View style={styles.row}>
//         {Object.keys(item).map((key, index) => (
//           <Text key={index} style={styles.cell}>
//             {key}: {item[key]}
//           </Text>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Upload CSV" onPress={handleFileUpload} />
//       <Text style={styles.heading}>Parsed Data:</Text>

//       {data.length > 0 ? (
//         <FlatList
//           data={data}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={renderItem}
//         />
//       ) : (
//         <Text>No data to display</Text>
//       )}
//     </View>
//   );
// };

// // Styles for the layout
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'flex-start',
//   },
//   heading: {
//     fontSize: 20,
//     marginTop: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   row: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   cell: {
//     fontSize: 16,
//     marginVertical: 2,
//   },
// });

// export default UploadVoterdetails;

// import React, {useState} from 'react';
// import {View, Button, Text, Alert, FlatList, StyleSheet} from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';
// import * as XLSX from 'xlsx';
// import base64js from 'base64-js';

// const UploadVoterdetails = () => {
//   const [data, setData] = useState([]);

//   // Function to handle file upload and read the Excel file

//   const handleFileUpload = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.xlsx, DocumentPicker.types.xls],
//       });

//       const fileUri = res[0].uri;
//       const path = fileUri;

//       // Read the file as base64 string
//       const base64String = await RNFS.readFile(path, 'base64');
//       const byteArray = base64js.toByteArray(base64String);
//       const workbook = XLSX.read(byteArray, {type: 'array'});

//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       // Ensure that the data has the required structure
//       const formattedData = jsonData.map(item => ({
//         epicId: item.epicId,
//         name: item.name,
//         contactNo: item.contactNo,
//         houseNo: item.houseNo,
//         caste: item.caste,
//         age: item.age,
//         partyInclination: item.partyInclination,
//       }));

//       // Set the parsed data into the state
//       setData(formattedData);

//       // Send data to the backend
//       sendDataToDatabase(formattedData);
//     } catch (err) {
//       console.error('Error reading Excel file:', err);
//       Alert.alert('Error', `Failed to read the Excel file: ${err.message}`);
//     }
//   };

//   // Function to send data to the backend
//   const sendDataToDatabase = async data => {
//     try {
//       const response = await fetch(
//         'http://192.168.0.102:5000/voter/uploadData',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data), // Send the data to the backend
//         },
//       );

//       const result = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', 'Data uploaded successfully!');
//       } else {
//         Alert.alert('Error', result.message);
//       }
//     } catch (error) {
//       console.error('Error sending data:', error);
//       // Alert.alert('Error', 'Failed to send data to the database');
//     }
//   };

//   // Render each row of the data
//   const renderItem = ({item}) => {
//     return (
//       <View style={styles.row}>
//         {Object.keys(item).map((key, index) => (
//           <Text key={index} style={styles.cell}>
//             {key}: {item[key]}
//           </Text>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Upload Excel" onPress={handleFileUpload} />
//       <Text style={styles.heading}>Parsed Data:</Text>

//       {data.length > 0 ? (
//         <FlatList
//           data={data}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={renderItem}
//         />
//       ) : (
//         <Text>No data to display</Text>
//       )}
//     </View>
//   );
// };

// // Styles for the layout
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'flex-start',
//   },
//   heading: {
//     fontSize: 20,
//     marginTop: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   row: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   cell: {
//     fontSize: 16,
//     marginVertical: 2,
//   },
// });

// export default UploadVoterdetails;
