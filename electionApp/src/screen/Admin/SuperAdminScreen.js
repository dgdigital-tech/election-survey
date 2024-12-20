import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import InputBox from '../../components/InputBox'; // Ensure this path is correct
import RadioGroup from 'react-native-radio-buttons-group';

const SuperAdminScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('WardAdmin');
  const [isLoading, setIsLoading] = useState(false);

  const initialRoleOptions = [
    {
      id: '1',
      size: 18,
      borderSize: 3,
      label: 'Ward Admin',
      value: 'WardAdmin',
      selected: role === 'WardAdmin',
      color: role === 'WardAdmin' ? '#944dff' : '#5391B4',
    },
    {
      id: '2',
      size: 18,
      color: 'black',
      borderSize: 3,
      label: 'Booth Admin',
      value: 'BoothAdmin',
      selected: role === 'BoothAdmin',
      color: role === 'BoothAdmin' ? '#944dff' : '#5391B4',
    },
  ];

  const [roleOptions, setRoleOptions] = useState(initialRoleOptions);

  const handleCreateSubAdmin = async () => {
    console.log(role);

    if (!name || !email || !password || !confirmPassword || !phone || !role) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://192.168.218.108:5000/subadmins',
        {
          name,
          email,
          password,
          phone,
          role,
        },
      );

      if (response.data.success) {
        Alert.alert('Success', 'Sub-admin created successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        setRole('WardAdmin');
        setRoleOptions(initialRoleOptions); // Reset role options
      } else {
        Alert.alert(
          'Failed',
          response.data.message || 'Failed to create sub-admin.',
        );
      }
    } catch (error) {
      console.error('Error creating sub-admin:', error);
      Alert.alert('Error', 'An error occurred while creating the sub-admin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRole = selectedRoleId => {
    console.log('Selected Role ID:', selectedRoleId); // Debugging

    // Find the selected role by its ID
    const updatedRoles = roleOptions.map(role => ({
      ...role,
      selected: role.id === selectedRoleId, // Update selection based on
      color: role.id === selectedRoleId ? '#944dff' : '#5391B4', // Change color
    }));

    const selectedRole = updatedRoles.find(role => role.selected);

    if (selectedRole) {
      setRole(selectedRole.value); // Update the role state
    }

    setRoleOptions(updatedRoles); // Update the role options state
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Sub-Admin</Text>
      <InputBox
        label="Full Name"
        placeholder="Enter full name"
        value={name}
        setValue={setName}
        iconname="person"
      />
      <InputBox
        label="Email"
        placeholder="Enter email"
        value={email}
        setValue={setEmail}
        iconname="email"
        keyboardType="email-address"
      />
      <InputBox
        label="Phone Number"
        placeholder="Enter phone number"
        value={phone}
        setValue={setPhone}
        iconname="phone"
        keyboardType="phone-pad"
      />
      <InputBox
        label="Password"
        placeholder="Enter password"
        value={password}
        setValue={setPassword}
        iconname="lock"
        secureTextEntry
      />
      <InputBox
        label="Confirm Password"
        placeholder="Confirm password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        iconname="lock"
        secureTextEntry
      />
      <Text style={styles.roleLabel}>Role</Text>
      <RadioGroup
        radioButtons={roleOptions}
        onPress={data => {
          console.log('Radio Group Callback Data:', data); // Inspect the data passed
          handleSelectRole(data);
        }}
        containerStyle={styles.radioGroup}
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateSubAdmin}
        disabled={isLoading}>
        <Text style={styles.createButtonText}>
          {isLoading ? 'Creating...' : 'Create Sub-Admin'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  roleLabel: {
    fontSize: 18,
    marginVertical: 10,
  },
  createButton: {
    backgroundColor: '#944dff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    // marginTop: 30,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default SuperAdminScreen;
