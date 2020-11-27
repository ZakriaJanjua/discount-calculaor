import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Alert, Modal } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import NumberGuesser from './components/AssetExample';

export default function App() {
  const [price, setPrice] = useState('');
  const [percent, setPercent] = useState('');

  function remove() {
    setPrice('');
    setPercent('')
  }

  function compute() {
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Discount Calculator</Text>
      <TextInput
        value={price}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        value={percent}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <View style={styles.fixToText}>
        <Button
          title="  1  "
          value="1"
          color="darkslategrey"
          onPress={()=>setPrice(price.concat("1"))}
        />
        <Button title="  2  " color="darkslategrey" onPress={()=>setResult(result.concat("2"))}/>
        <Button title="  3  " color="darkslategrey" onPress={()=>setResult(result.concat("3"))}/>
      </View>
      <View style={styles.fixToText}>
        <Button title="  4  " color="darkslategrey" onPress={()=>setResult(result.concat("4"))}/>
        <Button title="  5  " color="darkslategrey" onPress={()=>setResult(result.concat("5"))}/>
        <Button title="  6  " color="darkslategrey" onPress={()=>setResult(result.concat("6"))}/>
      </View>
      <View style={styles.fixToText}>
        <Button title="  7  " color="darkslategrey" onPress={()=>setResult(result.concat("7"))}/>
        <Button title="  8  " color="darkslategrey" onPress={()=>setResult(result.concat("8"))}/>
        <Button title="  9  " color="darkslategrey" onPress={()=>setResult(result.concat("9"))}/>
      </View>
      <View style={styles.fixToText}>
        <Button title="  0  " color="darkslategrey" onPress={()=>setResult(result.concat("0"))}/>
        <Button title="remove " color="black" onPress={remove}/>
      </View>
      <View style={styles.fixToText}>
        <Button title="     compute     " color="goldenrod" onPress={compute} />
      </View>
      <View style={styles.fixToText}>
        <Button title="      history      "  />
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
