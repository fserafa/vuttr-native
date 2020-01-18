import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import api from '../services/api';
import Tool from '../components/Tool';
import { SearchBar,CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons'
import Loading from '../components/Loading';

function Index(props) {
    const [tools, setTools] = useState([]);
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true);
    const [tagsOnly, setTagsOnly] = useState(false);
    const [search, setSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [term, setTerm] = useState('');


    useEffect(() => {
        async function getData() {
            setLoading(true);
            const response = await api.get('/tools');
            setTools(response.data.reverse());
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
                { text: 'Cancel', onPress: () => null, style: 'destructive' },
                { text: 'Yes, remove', onPress: () => handleRemove(tool.id) },
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={{ flex: 1, paddingBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
                <SearchBar
                    inputStyle={styles.searchInput}
                    inputContainerStyle={styles.searchInputContainer}
                    containerStyle={styles.searchContainer}
                    searchIcon={{ color: '#fff' }}
                    clearIcon={{ color: '#fff' }}
                    placeholder="Search VUTTR"
                    onChangeText={term => handleSearch(term)}
                    value={term}
                    platform="default"
                    cancelIcon={false}
                    placeholderTextColor='#fff'
                />

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={{ flexDirection: 'column' }}
                        size={18}
                        center={{ flexDirection: 'column' }}
                        textStyle={styles.checkboxText}
                        containerStyle={styles.checkboxContainer}
                        checked={tagsOnly}
                        onPress={() => setTagsOnly(tagsOnly => !tagsOnly)}
                        checkedColor='#fff'
                        uncheckedColor='#fff'
                    />
                    <Text style={styles.checkboxText}>tags only</Text>
                </View>
            </View>

            <Loading loading={loading} />

            {search && searchResults.length === 0 ? (
                <Text style={{ paddingHorizontal: 15, fontSize: 12, marginTop: 10 }}>No tools found</Text>
            ) : null}

            {!search ?
                <View>
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
                    />
                </View> :
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

            <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('Add', { setReload: setReload })}>
                <MaterialIcons
                    name="add"
                    size={35}
                    color='#fff'
                />
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    button: {
        height: 60,
        width: 60,
        backgroundColor: '#3f51b5',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    searchContainer: {
        width: '80%',
        backgroundColor: '#4d5ec1',
        paddingHorizontal: 5,
        borderTopColor: '#3f51b5',
        borderBottomColor: '#3f51b5'
    },
    searchInputContainer: {
        backgroundColor: '#3f51b5',
        borderRadius: 30
    },
    searchInput: {
        color: '#fff',
        backgroundColor: '#3f51b5',
        borderRadius: 30
    },
    checkboxContainer: {
        width: '20%',
        borderRadius: 0,
        borderColor: '#4d5ec1',
        backgroundColor: '#4d5ec1',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        marginHorizontal: 0,
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
    },
    checkboxText: {
        textAlign: 'center',
        color: '#fff',
        margin: 0,
        marginLeft: 2,
        marginTop: 2
    },
    checkbox: {
        borderColor: '#fff',
        color: '#fff'
    }

})




export default Index;