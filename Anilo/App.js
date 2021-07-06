// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=f7b67d9afdb3c971d4419fa4cb667fbf',
    )
      .then(response => response.json())
      .then(responseJson => {
        setFilteredDataSource(responseJson.results);
        setMasterDataSource(responseJson.results);
        console.log(responseJson.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text.length > 2) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(item => {
        // Applying filter for the inserted text in search bar
        const itemData = item.original_title
          ? item.original_title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <View style={styles.itemStyle}>
        <Text style={{fontWeight: 'bold'}}>
          {item.original_title.toUpperCase()}
        </Text>
        <Text style={{paddingTop: 7}}>{item.overview}</Text>
        <Text style={{fontSize: 15, paddingTop: 10}}>
          Rating : {item.vote_average == 0 ? 'Coming Soon' : item.vote_average}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const xButton = () => {
    return setFilteredDataSource(masterDataSource), setSearch('');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.textInputStyle}>
          <TextInput
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search By Title"
          />
          <TouchableOpacity style={styles.xButton} onPress={xButton}>
            <Text style={{fontSize: 18}}>X</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 15,
  },
  itemStyle: {
    padding: 10,
    flexDirection: 'column',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xButton: {
    alignSelf: 'center',
  },
});

export default App;
