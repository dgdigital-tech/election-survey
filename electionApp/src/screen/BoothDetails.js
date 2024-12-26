import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/Header';
import colors from '../styles/colors';
import VoterDetailsEditCard from '../components/VoterDetailsEditCard';
import EditVoterDetailsModal from '../components/EditVoterDetailsModal';

const BoothDetails = ({route}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVoter, setSelectedVoter] = useState(null);

  // Dynamically access booth number from route params
  const boothNumber = route?.params?.boothNumber || 'Unknown';

  const handleEditPress = voter => {
    setSelectedVoter(voter); // set selected voter
    setModalVisible(true); // open modal
  };

  const handleSave = updatedDetails => {
    console.log('Updated Details:', updatedDetails);
    setModalVisible(false); // close modal after saving
  };

  const voters = Array.from({length: 8}).map((_, index) => ({
    epicId: `10897xxxxxxxx7348${index}`,
    name: `Voter ${index + 1}`,
    contactNo: `+91 35xxxxxxxx${index}`,
    houseNo: `${index + 1}`,
    caste: `Caste ${index + 1}`,
    age: 30 + index,
    partyInclination: 'Party',
  }));

  return (
    <View style={styles.container}>
      {/* Render booth number dynamically */}
      <Header
        title={`Booth ${boothNumber}`}
        isBoothAdmin={false}
        wardName={'Ward Name'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.voterListContainer}>
          {voters.map((voter, index) => (
            <VoterDetailsEditCard
              key={index}
              epicId={voter.epicId}
              name={voter.name}
              contactNo={voter.contactNo}
              houseNo={voter.houseNo}
              caste={voter.caste}
              age={voter.age}
              partyInclination={voter.partyInclination}
              onEditPress={() => handleEditPress(voter)} // pass the voter to edit
            />
          ))}
        </View>
      </ScrollView>

      {/* Only show modal if a voter is selected */}
      {selectedVoter && (
        <EditVoterDetailsModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)} // close modal
          details={selectedVoter} // pass selectedVoter to the modal
          onSave={handleSave} // handle save logic
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  voterListContainer: {
    padding: 10, // Updated with a more descriptive name
  },
});

export default BoothDetails;
