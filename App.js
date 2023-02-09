import {useState} from 'react'
import { StyleSheet, Text, View,TextInput, ScrollView, Image,TouchableHighlight,Modal } from 'react-native';
import axios from 'axios'
export default function App() {
  const apiurl = 'http://www.omdbapi.com/?apikey=13f13e32'
  const [state,setState] = useState({
    s:"Enter a movie...",
    results:[],
    selected:{}
  })
  const looking = () => {
    axios(apiurl + "&s=" + state.s).then(({data}) => {
      let results = data.Search
      setState(prevState => {
        return {...prevState, results: results}
      })
    })
  }
  const openPopup = id => {
    axios(apiurl + '&i=' + id).then(({data}) => {
      let results = data;
     setState(prevState => {
      return{...prevState, selected:results}
     })
    })
  }
  return (
<View style={styles.container}>
      <Text style={styles.title}>Movie DB</Text>
      <TextInput style={styles.search} value={state.s}
      onChangeText={text => setState(prevState => {
        return {...prevState, s:text}
      })}
      onSubmitEditing={looking}
      />
      <ScrollView style={styles.results}>
{state.results.map(result => (
    <TouchableHighlight key={result.imdbID} 
    onPress={() => openPopup(result.imdbID)}
    >
 <View  style={styles.result}>
    <Text style={styles.heading}>{result.Title}</Text>
    <Image source={{uri: result.Poster}}  
    style={{width:'100%', height:300}}
    resizeMode="cover"
/>
  </View>
  </TouchableHighlight>
))}
      </ScrollView>
<Modal 
animationType="fade" transparent={false} 
visible={(typeof state.selected.Title != "undefined")}
>
<ScrollView>
  <View style={styles.popup} >
  
    <Text
    style={styles.poptitle}
    >{state.selected.Title}</Text>
  <Text style={{marginBottom:20}}>Rating: {state.selected.imdbRating}</Text>
  <Text>{state.selected.Plot}</Text>
  <Image source={{uri: state.selected.Poster}}  
    style={{width:'100%', height:500}}
    resizeMode="cover"
/>
  <Text>Actors : {state.selected.Actors}</Text>
  <Text>BoxOffice : {state.selected.BoxOffice}</Text>
  </View>
  <TouchableHighlight 
  onPress={() => setState(prevState => {
    return{...prevState, selected:{}}
  })}
  >
    <Text style={styles.closeBtn}>Close</Text>
  </TouchableHighlight>
  </ScrollView>
</Modal>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop:70,
    paddingHorizontal:20,
  },
  title:{
    color:'#FFF',
    fontSize:32,
    fontWeight:"700",
    marginBottom:20
  },
  search:{
    fontSize:20,
    fontWeight:"300",
    padding:20,
    width:"100%",
    backgroundColor:"#FFF",
    borderRadius:8,
    marginBottom:40
  }, 
  results :{
    flex:1
  },
  result:{
    flex:1,
    width:'100%',
    marginBottom:20,
  },
  heading: {
    color:'#FFF',
    fontSize:18,
    fontWeight:"700",
    padding:20,
    backgroundColor:"#445565"
  },
  popup:{
    padding:20
  }, 
  poptitle :{
    fontSize:24,
    fontWeight:'700',
    marginBottom:5
  },
  closeBtn:{
    padding:20,
    fontSize:20,
    fontWeight:'700',
    backgroundColor:'#2464C4',
    color:'#FFF'
  }
});
