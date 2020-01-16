import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import api from '../services/api';
import Tool from '../components/Tool';
import { Button, Header, Input, SearchBar, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function Index(props) {
  const [tools, setTools] = useState([]);
  const [reload, setReload] = useState(false)
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tagsOnly, setTagsOnly] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [term, setTerm] = useState('');
  const [tool, setTool] = useState('');

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await api.get('/tools');
      setTools(response.data);
      setLoading(false);
    }

    getData();
  }, [reload])

  useEffect(() => {
    handleSearch(term)
  }, [tools])

  async function handleRemove(id) {
    setLoading(true);
    await api.delete(`/tools/${id}`);
    setReload(reload => (!reload));
    setLoading(false);
  }

  function handleSearch(term) {
    setTerm(term)
    if (term === '') { return setSearch(false); }

    setSearch(true);
    let results = [];
    if (!tagsOnly) {
      results = tools.filter(tool => (
        (tool.name.toLowerCase().includes(term.toLowerCase())) ||
        (tool.description.toLowerCase().includes(term.toLowerCase()))
      ))
    }
    else {
      tools.map(tool => {
        if (tool.tags.join(' ').toLowerCase().includes(term.toLowerCase())) {
          results = [...results, tool]
        }
      })
    }
    setSearchResults(results);
  }

  function handleOpenRemove(tool) {
    Alert.alert(
      'Remove Tool',
      `Are you sure you want to remove ${tool.name}?`,
      [
        { text: 'Cancel', onPress: () => null },
        { text: 'Yes, remove', onPress: () => handleRemove(tool.id) },
      ],
      { cancelable: false }
    )
  }
  return (
    // <Container style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
    //     <Typography variant="h3">VUTTR</Typography>
    //     <Typography variant="h4">Very Useful Tools To Remember</Typography>
    //     <Box display="flex" justifyContent="center">
    //         {loading && <CircularProgress />}
    //     </Box>

    //     <Box display='flex' justifyContent="space-between" mt="40px" mb="40px">
    //         <Grid container spacing={1} alignItems="center">
    //             <TextField
    //                 label="Search"
    //                 onChange={e => handleSearch(e.target.value)}
    //                 InputProps={{
    //                     startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
    //                 }}
    //                 variant="outlined"
    //                 style={{ marginRight: 10 }}
    //             />
    //             <FormControlLabel
    //                 control={
    //                     <Checkbox
    //                         checked={tagsOnly}
    //                         onChange={e => setTagsOnly(e.target.checked)}
    //                         value="tagsOnly"
    //                         color="primary" />
    //                 }
    //                 label="search in tags only"
    //             />
    //         </Grid>
    //         <Button
    //             onClick={() => setOpenAdd(true)}
    //             variant="contained"
    //             color="primary"
    //             startIcon={<Add />}
    //         >
    //             <span>Add</span>
    //         </Button>
    //     </Box>

    //     <ModalAdd open={openAdd} handleCloseAdd={handleCloseAdd} handleAdd={handleAdd} />
    //     <ModalRemove open={openRemove} handleCloseRemove={handleCloseRemove} tool={tool} handleRemove={handleRemove} />

    //     {!search ?
    //         tools.map((item) => (
    //             <Tool key={item.id} tool={item} handleOpenRemove={handleOpenRemove} />
    //         )) :
    //         searchResults.map((item, index) => (
    //             <Tool key={index.toString()} tool={item} handleOpenRemove={handleOpenRemove} />
    //         ))
    //     }
    // </Container >
    <View style={{ flex: 1 }}>

      {loading && <ActivityIndicator size="large" color="#3f51b5" />}

      <View >
        <SearchBar
          placeholder="Search"
          onChangeText={term => handleSearch(term)}
          value={term}
          platform="android"
          cancelIcon={false}
        />
        <CheckBox
          center
          title='Search for tags only'
          checked={tagsOnly}
          onPress={() => setTagsOnly(tagsOnly => !tagsOnly)}
          checkedColor='#3f51b5'
        />
      </View>


      {!search ?
        <FlatList
          data={tools}
          renderItem={({ item }) => (
            <Tool tool={item} handleOpenRemove={handleOpenRemove} />
          )}
          extraData={tools}
          keyExtractor={item => item.id}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
        /> :
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <Tool tool={item} handleOpenRemove={handleOpenRemove} />
          )}
          extraData={tools}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
        />
      }
      <Button
        icon={{
          name: "add",
          size: 15,
          color: "white"
        }}
        title="Add tool"
        onPress={() => props.navigation.navigate('Add', { setReload: setReload })}
      />
    </View>
  )
}




export default Index;