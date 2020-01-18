import React, { useState } from 'react';
import { Text } from 'react-native'
import api from '../services/api';
import { Input, Card } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export default function Add(props) {
    const [tool, setTool] = useState({
        name: '',
        link: '',
        description: '',
        tags: ''
    })
    const [error, setError] = useState(null);
    const [info, setInfo] = useState(null);

    function handleChange(field, value) {
        if (!value.toLowerCase().startsWith('http')) {
            setError('Link must start with http or https')
        } else {
            setError(null)
        }

        setTool(tool => ({ ...tool, [field]: value }))
    }

    async function handleAdd() {
        if (error) return;

        const setReload = props.navigation.getParam('setReload');

        const _tool = { ...tool };
        _tool.tags = _tool.tags.split(' ');

        await api.post(`/tools/`, _tool);

        setTool({
            name: '',
            link: '',
            description: '',
            tags: ''
        });
        await setReload(reload => !reload);
        props.navigation.navigate('Index');
    }

    return (
        <Card containerStyle={{ borderRadius: 10 }}>
            <Input
                inputStyle={styles.input}
                containerStyle={{ paddingHorizontal: 0 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholderTextColor='#aaa'
                placeholder='Name'
                value={tool.name}
                onChangeText={name => setTool(tool => ({ ...tool, name: name }))}
            />

            <Input
                inputStyle={styles.input}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={{ paddingHorizontal: 0 }}
                placeholderTextColor='#aaa'
                placeholder='Link'
                value={tool.link}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={link => handleChange('link', link)}
            />
            {error && <Text style={styles.errorMessage}>{error}</Text>}

            <Input
                inputStyle={styles.input}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={{ paddingHorizontal: 0 }}
                placeholderTextColor='#aaa'
                placeholder='Description'
                value={tool.description}
                onChangeText={description => setTool(tool => ({ ...tool, description: description }))}

            />
            <Input
                inputStyle={styles.input}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={{ paddingHorizontal: 0 }}
                placeholderTextColor='#aaa'
                placeholder='Tags'
                value={tool.tags}
                onChangeText={tags => setTool(tool => ({ ...tool, tags: tags }))}
                autoCapitalize='none'
                autoCorrect={false}
                onFocus={() => setInfo('Write your tags without # and separeted by space')}
            />
            {info && <Text style={styles.infoMessage}>{info}</Text>}
            <Button
                buttonStyle={{ backgroundColor: '#3f51b5' }}
                icon={{
                    name: "add",
                    size: 20,
                    color: "white"
                }}
                title="Add tool"
                onPress={() => handleAdd()}
            />
        </Card>

    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginBottom: 15,
        borderBottomWidth: 0,
        borderBottomColor: '#fff'
    },
    errorMessage: {
        color: '#f50057',
        paddingHorizontal: 5,
        marginTop: -10,
        marginBottom: 10,
        fontSize: 12
    },
    infoMessage: {
        color: '#3f51b5',
        paddingHorizontal: 5,
        marginTop: -10,
        marginBottom: 10,
        fontSize: 12
    }
})