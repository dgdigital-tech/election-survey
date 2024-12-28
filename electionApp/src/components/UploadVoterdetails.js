import React, {useState} from 'react';
import {View, Button, Text, Alert, FlatList, StyleSheet} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import * as XLSX from 'xlsx';
import base64js from 'base64-js';

const UploadVoterdetails = () => {
  const [data, setData] = useState([]);

  // Function to handle file upload and read the Excel file
  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx, DocumentPicker.types.xls],
      });

      const fileUri = res[0].uri;
      const path = fileUri;

      // Read the file as base64 string
      const base64String = await RNFS.readFile(path, 'base64');
      const byteArray = base64js.toByteArray(base64String);
      const workbook = XLSX.read(byteArray, {type: 'array'});

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Set the parsed data into the state
      setData(jsonData);

      // Send data to the backend
      sendDataToDatabase(jsonData);
    } catch (err) {
      console.error('Error reading Excel file:', err);
      Alert.alert('Error', `Failed to read the Excel file: ${err.message}`);
    }
  };

  // Function to send data to the backend
  const sendDataToDatabase = async data => {
    try {
      const response = await fetch(
        'http://192.168.0.102:5000/voter/uploadData',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Send the data to the backend
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
      // Alert.alert('Error', 'Failed to send data to the database');
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
      <Button title="Upload Excel" onPress={handleFileUpload} />
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
