import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInputEmail from './TextInputEmail';

const LoginButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.color,
        paddingVertical: 14,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        elevation: 2,
      }}
      onPress={props.onPress}>
      <Text
        style={{ color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }}>
        {props.teks}
      </Text>

    </TouchableOpacity>
  );
};
export default LoginButton;