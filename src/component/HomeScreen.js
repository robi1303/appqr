import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';




const HomeScreen = ({ navigation, route }) => {
  const [appqr, setAppqr] = useState([]);
  const [query, setQuery] = useState(null);
  const [isi, setIsi] = useState([]);

  const ref = firestore().collection('Qrdatabase');

  const onResult = (querySnapshot) => {
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
  }

  const onError = (error) => {
    console.log(error);
  }

  useEffect(() => {
    return ref.onSnapshot(onResult, onError);

  }, []);

  useEffect(() => {
    if (route.params?.scan) {
      setQuery(route.params?.scan);
      filterIsi(route.params?.scan);
    }
  }, [route.params?.scan]);

  const filterItem = event => {
    var query = event.nativeEvent.text;
    setQuery(query);
    if (query == '') {
      setIsi(appqr);
    } else {
      var data = appqr;
      query = query.toLowerCase();
      data = data.filter(l => l.nama_alat.toLowerCase().match(query));

      setIsi(data);
    }
  };
  const filterIsi = (e) => {
    var kueri = e;
    var data = appqr;
    console.log(kueri);
    data = data.filter(l => l.kodeqr.match(kueri));

    setIsi(data);
    console.log(data);
  };
  const refresh = () => {
    setIsi(appqr);
  };

  // const separator = () => {
  //   return (
  //     <View style={{ height: 10, width: '100%', backgroundColor: '#e5e5e5' }} />
  //   );
  // };

  // console.log(appqr)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TextInput
                    placeholder="Enter Text..."
                    placeholderTextColor="gray"
                    value={query}
                    onChange={filterItem.bind()}
                    style={styles.input}
                />
        </View>
      {/* <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 40,
          height: 55,
          fontFamily: 'Arial, Helvetica, sans-serif'
        }}>Title</Text> */}
      {/* <View style={styles.header}>
      <TextInput
        placeholder="Enter Text..."
        placeholderTextColor="gray"
        value={query}
        onChange={filterItem}
        style={styles.input}
      />
    </View> */}
      <FlatList
        style={{ height: "100%", width: "100%", backgroundColor: "transparent" }}
        data={isi}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate('editScreen', {
                idProps: item.id,
                nama_alat: item.nama_alat,
                kodeqr: item.kodeqr,
                deskripsi: item.deskripsi
              });
            }}
          >
            <View style={{
              backgroundColor: "white",
              borderColor: 'blue',
              borderWidth: 1,
              marginVertical: 3,
              borderRadius: 5,
              paddingLeft: 10,
            }}
            >
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>ID-{item.kodeqr}</Text>
              <Text style={{ color: 'black' }}>{item.nama_alat}</Text>
              <Text style={{ color: 'black' }}>{item.deskripsi}</Text>
            </View>
          </TouchableOpacity>
        )}

      />

      <View style={styles.tabsStyle}>
        <TouchableOpacity style={styles.bottomTabs} >
          <Icon name="home" size={25} color="#0082F7" />
          <Text style={{ color: 'blue' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTabs}
          onPress={() => (navigation.navigate('ScanScreen'))}>
          <Icon name="scan" size={25} color="#0082F7" />
          <Text style={{ color: 'blue' }}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTabs}
          onPress={() => (navigation.navigate('GenerateQRScreen'))}>
          <Icon name="qr-code" size={25} color="#0082F7" />
          <Text style={{ color: 'blue' }}>
            Generator QR
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
        style={styles.bottomTabs}
        onPress={() => (refresh)}>
        <Icon name="qr-code" size={25} color="#0082F7" />
        <Text style={{ color: 'blue' }}>
          Refresh
        </Text>
      </TouchableOpacity> */}

      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    

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
