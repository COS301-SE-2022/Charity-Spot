import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {LoginMobile} from '@charity-spot/client-mobile/login-mobile';


const App = () => {

  return (
    
    
    <View>

      <Text style={styles.titleText}>
        This is Main()
      </Text>

      <LoginMobile/>

    </View>
      
      
     
    
  );
}

const styles = StyleSheet.create({

  background: {
    backgroundColor: "blue"
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue"
  },

});

export default App;

