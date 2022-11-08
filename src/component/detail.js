import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';



const Detail = (props) => {
  const [appqr, setAppqr] = useState([]);
  const [query, setQuery] = useState(null);
  const [isi, setIsi] = useState([]);
  const {scan} = props.route.paramsimport;
  
  const ref = firestore().collection('Qrdatabase');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { kodeqr, nama_alat, deskripsi } = doc.data();
        list.push({
          id: doc.id,
          kodeqr,
          nama_alat,
          deskripsi
        });
      });

      setAppqr(list);
      setIsi(list);


    });
   
  }, []);
  useEffect(() => {
    setQuery(scan);
    console.log(scan);
    filterIsi;
  }, []);

const filterItem = event => {
  var query = event.nativeEvent.text;
  setQuery(query);
  if (query == '') {
    setIsi(appqr);
  } else {
    var data = appqr;
    query = query.toLowerCase();
    data = data.filter(l => l.kodeqr.toLowerCase().match(query));

    setIsi(data);
  }
};
const filterIsi = () => {
    var data = appqr;
    query = query.toLowerCase();
    data = data.filter(l => l.kodeqr.toLowerCase().match(query));

    setIsi(data);
};

// const separator = () => {
//   return (
//     <View style={{ height: 10, width: '100%', backgroundColor: '#e5e5e5' }} />
//   );
// };

// console.log(appqr)
return (
  <View style={styles.container}>
    {/* <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 40,
          height: 55,
          fontFamily: 'Arial, Helvetica, sans-serif'
        }}>Title</Text> */}
    <View style={styles.header}>
      <TextInput
        placeholder="Enter Text..."
        placeholderTextColor="gray"
        value={query}
        onChange={filterItem}
        style={styles.input}
      />
    </View>
    <FlatList
      style={{ height: "100%", width: "100%", backgroundColor: "transparent" }}
      data={isi}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        <TouchableOpacity onPress={(item) => {
          props.navigation.navigate('editScreen',
            { id: item.id, kodeqr: item.kodeqr, nama_alat: item.nama_alat, deskripsi: item.deskripsi })
        }}>
          <View style={{
            backgroundColor: "white",
            borderColor: 'black',
            borderWidth: 1,
            marginVertical: 3,
            borderRadius: 10,
          }}
          >
            <Text style={{ color: 'black' }}>No : {item.kodeqr}</Text>
            <Text style={{ color: 'black' }}>Nama :{item.nama_alat}</Text>
            <Text style={{ color: 'black' }}>Deskripsi :{item.deskripsi}</Text>
          </View>
        </TouchableOpacity>}

    />

    <View style={styles.tabsStyle}>
      <TouchableOpacity style={styles.bottomTabs} >
        <Icon name="home" size={25} color="#0082F7" />
        <Text style={{ color: 'blue' }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomTabs}
        onPress={() => (props.navigation.navigate('ScanScreen'))}>
        <Icon name="scan" size={25} color="#0082F7" />
        <Text style={{ color: 'blue' }}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomTabs}
        onPress={() => (props.navigation.navigate('GenerateQRScreen'))}>
        <Icon name="qr-code" size={25} color="#0082F7" />
        <Text style={{ color: 'blue' }}>
          Generator QR
        </Text>
      </TouchableOpacity>

    </View>
  </View>
);
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'

  },
  layoutStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabsStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 3,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5
  },
  bottomTabs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  header: {
    height: 80,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 45,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
  },
})
