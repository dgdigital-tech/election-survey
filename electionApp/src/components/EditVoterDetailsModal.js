import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../styles/colors';

const EditVoterDetailsModal = ({visible, onClose, details, onSave}) => {
  const [contactNo, setContactNo] = useState('');
  const [caste, setCaste] = useState('');
  const [age, setAge] = useState('');
  const [partyInclination, setPartyInclination] = useState('');

  // Set initial state when details change
  useEffect(() => {
    if (details) {
      setContactNo(details.contactNo);
      setCaste(details.caste);
      setAge(details.age);
      setPartyInclination(details.partyInclination);
    }
  }, [details]);

  const handleSave = () => {
    // Basic validation (optional)
    if (!contactNo || !caste || !age || !partyInclination) {
      Alert.alert('Please fill all fields');
      return;
    }

    // Additional validation (optional)
    const phonePattern = /^[+]?[0-9]{10,15}$/;
    if (!phonePattern.test(contactNo)) {
      Alert.alert('Invalid Contact No', 'Please enter a valid contact number.');
      return;
    }

    if (isNaN(age) || age <= 0) {
      Alert.alert('Invalid Age', 'Please enter a valid age.');
      return;
    }

    const updatedDetails = {
      contactNo,
      caste,
      age,
      partyInclination,
    };

    onSave(updatedDetails); // Passing updated details back to parent
    setContactNo(''); // Clear input fields
    setCaste('');
    setAge('');
    setPartyInclination('');
    onClose(); // Closing the modal after saving
    Alert.alert('Success', 'Voter details updated successfully!');
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="cross" type="font-awesome" size={25} color={'white'} />
        </TouchableOpacity>

        <Text style={styles.modalTitle}>Updated Voter Details</Text>
        <View style={styles.Itemsrow}>
          <Text style={styles.lable}>Contact no :</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact No"
            value={contactNo}
            onChangeText={setContactNo}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.Itemsrow}>
          <Text style={styles.lable}>Age :</Text>
          <TextInput
            style={styles.inputSecond}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder="Age"
          />
          <Text style={styles.lable}>Caste :</Text>
          <TextInput
            style={styles.inputSecond}
            placeholder="Caste"
            value={caste}
            onChangeText={setCaste}
          />
        </View>

        <View style={styles.Itemsrow}>
          <Text style={styles.lable}>Party Inclination :</Text>
          <TextInput
            style={styles.input}
            value={partyInclination}
            onChangeText={setPartyInclination}
            placeholder="Party Inclination"
          />
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: wp(5),
    fontFamily: 'Roboto-Italic',
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9) / 2,
    marginTop: -35,
  },
  modalTitle: {
    fontSize: wp(5),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Roboto-Bold',
    marginBottom: hp(2),
  },
  Itemsrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
    gap: wp(2),
  },
  lable: {
    color: colors.textPrimary,
    fontFamily: 'Roboto-Regular',
    fontSize: wp(4),
  },
  input: {
    height: hp(4.5),
    width: '60%',
    borderColor: colors.textSecondary,
    borderWidth: 1,
    paddingLeft: wp(5),
    borderRadius: 8,
    // fontSize: wp(3),
  },
  inputSecond: {
    height: hp(4.5),
    width: '30%',
    borderColor: colors.textSecondary,
    borderWidth: 1,
    paddingLeft: wp(5),
    borderRadius: 8,
    // fontSize: wp(3),
  },
  updateButton: {
    backgroundColor: colors.secondary,
    marginTop: wp(3),
    padding: wp(1.5),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(35),
    alignSelf: 'center',
  },
  updateButtonText: {
    color: colors.primary,
    fontFamily: 'Roboto-Regular',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});

export default EditVoterDetailsModal;
