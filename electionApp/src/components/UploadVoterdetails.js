import React, {useState} from 'react';
import {View, Button, Text, Alert} from 'react-native';
import * as XLSX from 'xlsx';
import DocumentPicker from 'react-native-document-picker';

// React Native component to handle file upload and data parsing
const UploadVoterdetails = () => {
  const [data, setData] = useState([]);

  // Function to read and parse the Excel file
  const readExcelFile = async () => {
    try {
      // Allow the user to select the Excel file
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
      });

      // Fetch the selected file and read it as an ArrayBuffer
      const file = res.uri;
      const response = await fetch(file);
      const buffer = await response.arrayBuffer();

      // Parse the Excel buffer into a workbook
      const workbook = XLSX.read(buffer, {type: 'buffer'});

      // Get the first sheet from the Excel file (assuming the data is in the first sheet)
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the sheet data to JSON format
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Display parsed data in the console for debugging
      console.log('Parsed Data:', jsonData);

      // Set the parsed data into the state
      setData(jsonData);

      // Send the parsed data to the backend for saving into MongoDB
      uploadDataToBackend(jsonData);
    } catch (err) {
      console.error('Error reading Excel file:', err);
      Alert.alert('Error', 'Failed to read the Excel file');
    }
  };

  // Function to send parsed data to the backend server
  const uploadDataToBackend = async jsonData => {
    try {
      const response = await fetch('http://localhost:3000/upload-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData), // Send data as JSON
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Data uploaded successfully!');
      } else {
        Alert.alert('Error', result.message || 'Failed to upload data');
      }
    } catch (err) {
      console.error('Error uploading data:', err);
      Alert.alert('Error', 'Failed to upload data');
    }
  };

  return (
    <View>
      <Button title="Upload Excel" onPress={readExcelFile} />
      <Text>Parsed Data: {JSON.stringify(data, null, 2)}</Text>
    </View>
  );
};

export default UploadVoterdetails;
