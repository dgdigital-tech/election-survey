import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InputBox = ({
  label,
  placeholder,
  value,
  setValue,
  iconname,
  CheckValuePresent,
  ...props
}) => {
  return (
    <View
      style={[
        styles.InputContainer,
        CheckValuePresent && {borderColor: 'red'},
      ]}>
      <View style={styles.lableContainer}>
        <Text style={styles.lable}>{label}</Text>
      </View>

      <TextInput
        {...props}
        style={styles.input}
        // placeholder={placeholder}
        placeholderTextColor={'#BEBEBE'}
        value={value}
        onChangeText={setValue}
        autoCapitalize="none"
      />
      <View style={styles.partitionBorder}></View>
      <Icon name={iconname} size={20} color="#223265" />
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#223265',
    marginTop: 40,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  lableContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderColor: '#000000',
    borderRadius: 8,
    top: -15,
    left: 9,
    overflow: 'hidden',
  },
  lable: {
    color: '#223265',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  input: {
    paddingLeft: 14,
    padding: 10,
    fontFamily: 'Roboto-Regular',
    color: '#223265',
    flex: 1, // Allow text input to take full width
  },
  partitionBorder: {
    borderLeftWidth: 2,
    borderColor: '#f2f2f2',
    height: '75%',
    paddingRight: '2%',
  },
});

export default InputBox;
