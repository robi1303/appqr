import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Share,
} from 'react-native';
 import QRCode from 'react-native-qrcode-svg';
import TextInputEmail from './TextInputEmail';
import firestore from '@react-native-firebase/firestore';
 
const GenerateQRScreen = () => {
  const [inputText, setInputText] = useState('');
  const [alat, setAlat] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const [ appqr, setAppqr ] = useState([]);

  const ref = firestore().collection('Qrdatabase');
  let myQRCode = useRef();

  async function tambahdata() {
    await ref.add({
      kodeqr : inputText,
      nama_alat : alat,
      deskripsi : deskripsi,
    });
  }
 
  const shareQRCode = () => {
    myQRCode.toDataURL((dataURL) => {
      console.log(dataURL);
      let shareImageBase64 = {
        title: 'React Native',
        url: `data:image/png;base64,${dataURL}`,
        subject: 'Share Link', //  for email
      };
      Share.share(shareImageBase64).catch((error) => console.log(error));
    });
  };
 
  return (
    <View style={{flex: 1}}>
    <SafeAreaView>
      
      <View style={styles.inputContainer}>
        
        <TextInputEmail
        state={inputText}
        set={setInputText}
        icon='qrcode'
        placeholder='Masukkan Kode QR'
       />
       
       <TextInputEmail
        state={alat}
        set={setAlat}
        icon='tools'
        placeholder='Masukkan Nama Alat'
       />
       <TextInputEmail
        state={deskripsi}
        set={setDeskripsi}
        icon='clipboard-list'
        placeholder='Masukkan Deskripsi'
        multiline={true}
       />
       <TouchableOpacity style={styles.buttonStyle} 
       onPress={tambahdata}>
          <Text style={styles.buttonTextStyle}>
            Submit
          </Text>
        </TouchableOpacity>
       </View>
       

      
    </SafeAreaView>
    <View style={styles.container}>
        
        
    <Text style={styles.titleStyle}>
      Generation of QR Code
    </Text>
    <QRCode
      getRef={(ref) => (myQRCode = ref)}
      // ref={myQRCode}
      //QR code value
      value={qrvalue ? qrvalue : 'NA'}
      //size of QR Code
      size={150}
      //Color of the QR Code (Optional)
      color="black"
      //Background Color of the QR Code (Optional)
      backgroundColor="white"
      //Center Logo size  (Optional)
      logoSize={30}
      //Center Logo margin (Optional)
      logoMargin={2}
      //Center Logo radius (Optional)
      logoBorderRadius={15}
      //Center Logo background (Optional)
      logoBackgroundColor="yellow"
    />
    <Text style={styles.textStyle}>
      Please insert any value to generate QR code
    </Text>
    <View style={{flexDirection: 'row',}}>
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => setQrvalue(inputText)}>
      <Text style={styles.buttonTextStyle}>
        Generate QR Code
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={shareQRCode}>
      <Text style={styles.buttonTextStyle}>
        Share QR Code
      </Text>
    </TouchableOpacity>
    </View>
  </View>
  </View>
  );
};
export default GenerateQRScreen;
 
const styles = StyleSheet.create({
  addtitle:{
    fontSize: 15,
    textAlign: 'left',
    padding: 20,
  },
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    
    paddingVertical: 70,
  },
  titleStyle: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  textInputStyle: {
    flexDirection: 'row',
    color: 'black',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: 'blue',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: 'blue',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
    marginHorizontal:10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal:10,
    fontSize: 16,
  },
});