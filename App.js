import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Alert, Modal } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import NumberGuesser from './components/AssetExample';

export default function App() {
  const [price, setPrice] = useState('');
  const [percent, setPercent] = useState('');
  const orgp = ['original price']
  const disc = ['discount']
  const newp = ['new price']

  function remove() {
    setPrice('');
    setPercent('')
  }

  function compute() {
    let ans
    ans = price - (price * (percent/100))
    orgp.push(price)
    disc.push(percent)
    newp.push(ans)
    Alert.alert('the new price is '+ ans)
    console.log('the new price is', ans)

  }


  function history(){
    console.log(orgp[0],'-', disc[0],'-', newp[0])
    for (let i=1; i<orgp.length; i++){
      console.log(orgp[i],'-',disc[i],'-',newp[i])
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Discount Calculator</Text>
      <TextInput
        value={price}
        placeholder='enter price'
        onChangeText={(price)=>setPrice(price)}
        keyboardType='number-pad'
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        value={percent}
        placeholder='enter percentage'
        onChangeText={(percent)=>setPercent(percent)}
        keyboardType='number-pad'
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <View style={styles.fixToText}>
        <Button title="      remove      " color="black" onPress={remove}/>
      </View>
      <View style={styles.fixToText}>
        <Button title="     compute     " color="goldenrod" onPress={compute} />
      </View>
      <View style={styles.fixToText}>
        <Button title="      history      "  onPress={history}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
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
    backgroundColor: 'lightgrey',
  },
});
