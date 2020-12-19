import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { DataTable } from 'react-native-paper';

function HomeScreen({ navigation }) {
  const [getPrice, setPrice] = useState(0);
  const [getPercent, setPercent] = useState(0);
  const [getResult, setResult] = useState(0);
  const [getList, setList] = useState([]);

  useEffect(() => {
    compute();
  });

  navigation.setOptions({
    headerRight: () => (
      <Button
        title="history"
        onPress={() => {
          navigation.navigate('History', {
            getList: getList,
            setList: setList,
          });
        }}></Button>
    ),
  });

  const addItem = () => {
    setList([
      ...getList,
      {
        key: Math.random().toString(),
        dataPrice: getPrice,
        dataPercent: getPercent,
        dataResult: getResult,
      },
    ]);
    setPrice(0);
    setPercent(0);
    Keyboard.dismiss();
  };

  const compute = () => {
    return setResult(getPrice - getPrice * (getPercent / 100));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Discount Calculator</Text>
      <TextInput
        placeholder="enter price"
        keyboardType="number-pad"
        onChangeText={(getPrice) => setPrice(getPrice)}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={getPrice}
      />
      <TextInput
        placeholder="enter percentage"
        keyboardType="number-pad"
        onChangeText={(getPercent) => setPercent(getPercent)}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={getPercent}
        maxLength={2}
      />

      <View>
        <View style={styles.fixToText}>
          <Button title="save" disabled={getPrice == 0} onPress={addItem} />
        </View>

        <View>
          <Text style={{ fontWeight: 'bold' }}>New Price: {getResult}</Text>
        </View>
      </View>
    </View>
  );
}

function HistoryScreen({ navigation, route }) {
  navigation.setOptions({
    headerRight: () => <Button title="clear" onPress={clearAll}></Button>,
  });

  const list = route.params.getList;
  const setl = route.params.setList;
  const [newList, setNewList] = useState(list);

  const removeItem = (itemKey) => {
    let update = list.filter((item) => item.key !== itemKey);
    console.log(update);
    navigation.setParams(setl(update));
    setNewList(update);
    //setNewList(navigation.setParams(setl(list.filter((item) => item.key !== itemKey))))
  };

  const clearAll = () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to delete history?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => {
          setl([])
          setNewList([])} },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numeric>Original Price</DataTable.Title>
          <DataTable.Title numeric>Discount</DataTable.Title>
          <DataTable.Title numeric>Final Price</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>
      </DataTable>

      {newList.map((item, index) => (
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell numeric>{item.dataPrice}</DataTable.Cell>
            <DataTable.Cell numeric>{item.dataPercent}</DataTable.Cell>
            <DataTable.Cell numeric>{item.dataResult}</DataTable.Cell>
            <DataTable.Cell numeric>
              <TouchableOpacity onPress={() => removeItem(item.key)}>
                <View
                  style={{
                    backgroundColor: 'blue',
                    borderRadius: 45,
                    padding: 3,
                    justifyContent: 'center',
                    width: 30,
                    alignItems: 'center',
                  }}>
                  <Text style={styles.cross}>X</Text>
                </View>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      ))}
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: 'royalblue',
          headerStyle: {
            backgroundColor: 'lightblue',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 9,
  },
  cross: {
    color: 'white',
  },
});
export default App;
