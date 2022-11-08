import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import TextInputEmail from './TextInputEmail';
import firestore from '@react-native-firebase/firestore';



const EditScreen = ({ navigation, route }) => {
  const {idProps, kodeqr, nama_alat, deskripsi} = route.params;
  const [id, setID] = useState(idProps);  
  console.log(id, nama_alat, deskripsi );
  const [inputText, setInputText] = useState(deskripsi);
  const [alat, setAlat] = useState(nama_alat);
  const [appqr, setAppqr] = useState([]);
  const [qrvalue, setQrvalue] = useState('');
  
  const ref = firestore().collection('Qrdatabase');
  let myQRCode = useRef();

  const updatedata = async () => {
    await firestore()
      .collection('Qrdatabase')
      .doc(id)
      .update({
        nama_alat: alat,
        deskripsi: inputText,
      })
      .then(() => {
        console.log('User update');
      });
      Alert.alert('Sukses')
      
  };

  const hapusdata = async () => {

  await firestore()
    .collection('Qrdatabase')
    .doc(id)
    .delete({
      nama_alat:alat,
      deskripsi: inputText,
    })
    .then(() => {
      console.log('User deleted!');
    });
    Alert.alert('Sukses')
  };
  useEffect(() => {
    setQrvalue(kodeqr);
  }, []);

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
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.inputContainer}>



        <TextInputEmail
          state={alat}
          set={setAlat}
          icon='tools'
          placeholder='Masukkan Nama Alat'
        />
        <TextInputEmail
          state={inputText}
          set={setInputText}
          icon='clipboard-list'
          placeholder='Masukkan Deskripsi'
          multiline={true}
        />
        <TouchableOpacity style={styles.buttonStyle}
          onPress={updatedata}>
          <Text style={styles.buttonTextStyle}>
            Ubah Data
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}
          onPress={hapusdata}>
          <Text style={styles.buttonTextStyle}>
            Hapus Data
          </Text>
        </TouchableOpacity>
      </View>


      {/* <View style={styles.container}> */}


      {/* <Text style={styles.titleStyle}>
          Generation of QR Code in React Native
        </Text> */}
      {/* <QRCode
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
        /> */}
      {/* <Text style={styles.textStyle}>
          Please insert any value to generate QR code
        </Text> */}
      {/* <View style={{flexDirection: 'row',}}>
    
 
        
        </View> */}
      {/* </View> */}
    </SafeAreaView>
  );
};
export default EditScreen;

const styles = StyleSheet.create({
  addtitle: {
    fontSize: 15,
    textAlign: 'left',
    padding: 20,
  },
  container: {
    flex: 1,
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
    marginHorizontal: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    fontSize: 16,
  },
});