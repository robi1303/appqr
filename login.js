import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInputEmail from './src/component/TextInputEmail';
import LoginButton from './src/component/LoginButton';


const login = (props) => {

  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: '#dbe4f3' }}>
      <StatusBar backgroundColor={'#dbe4f3'} barStyle="dark-content" />
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
        <Image
          source={require('./src/image/logo.png')}
          style={{ width: 200, height: 100 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>PT. SugarLabinta</Text>
        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Login</Text>
      </View>

      <TextInputEmail
        state={email}
        set={setMail}
        icon='envelope'
        placeholder='Masukkan email'
        isPassword={false} />

      <TextInputEmail
        state={password}
        set={setPassword}
        icon='lock'
        placeholder='Masukkan password'
        isPassword={true} />

      <LoginButton teks="Login" color="red"/>
      {/* onPress={props.navigation.navigate('beranda')}    */}

      

      <View style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10 }}>
        <TouchableOpacity style={{ flex: 1 }}>
          <Text>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 , justifyContent: 'center', alignItems: 'flex-end'}}>
          <Text>Forgot passwords</Text>
        </TouchableOpacity>


      </View>

    </View>
  );
};

export default login;



// props.navigation.navigate('HomeScreen',
      //         { scan:e.data })