import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

export default function Tool(props) {
    const { tool, handleOpenRemove } = props;

    return (
        <Card>
            <View style={styles.row}>
                <Text>{tool.name}</Text>
                <Button
                    icon={
                        <Icon
                            name="delete"
                            size={20}
                            color={'#f50057'}
                        />
                    }
                    type="clear"
                    onPress={() => handleOpenRemove(tool)}
                />
            </View>

            <Text>{tool.description}</Text>
            <Text>#{tool.tags.join(' #')}</Text>
        </Card>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})