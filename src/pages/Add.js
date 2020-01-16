import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import api from '../services/api';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Add(props) {
    const [tool, setTool] = useState({
        name: '',
        link: '',
        description: '',
        tags: ''
    })

    async function handleAdd() {
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
        <View>
            <Input
                placeholder='Name'
                value={tool.name}
                onChangeText={name => setTool(tool => ({ ...tool, name: name }))}
            />

            <Input
                placeholder='Link'
                value={tool.link}
                onChangeText={link => setTool(tool => ({ ...tool, link: link }))}
            />
            <Input
                placeholder='Description'
                value={tool.description}
                onChangeText={description => setTool(tool => ({ ...tool, description: description }))}

            />
            <Input
                placeholder='Tags'
                value={tool.tags}
                onChangeText={tags => setTool(tool => ({ ...tool, tags: tags }))}
            />
            <Button
                icon={{
                    name: "add",
                    size: 15,
                    color: "white"
                }}
                title="Add tool"
                onPress={() => handleAdd()}
            />

        </View>

    )
}