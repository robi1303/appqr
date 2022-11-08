import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TextInputEmail = (props) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
        <View style={{
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#ffffff',
          width: 50,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
          elevation: 5,
        }}>
          <Icon style={{ marginLeft: 15 }} name={props.icon} size={20} color="black" />
        </View>
        <TextInput
          value={props.email}
          style={{
            backgroundColor: '#FFFFFF',
            // marginHorizontal: 20,
            // borderRadius: 15,
            
            flex: 1,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            elevation: 5,
            paddingLeft: 20,
            color:'black',
          }}
          placeholderTextColor={'black'}
          placeholder={props.placeholder}
          onChangeText={text => props.set(text)}
          secureTextEntry={props.isPassword}
          multiline={props.multiline}

        />

      </View>

    </View>
  );
};

export default TextInputEmail;