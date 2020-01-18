import React from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

export default function Tool(props) {
    const { tool, handleOpenRemove } = props;

    return (
        <Card
            containerStyle={styles.card}
        >
            <View style={styles.row}>
                <Text style={styles.toolTitle}>{tool.name}</Text>
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
                    title='Remove'
                    titleStyle={{ color: '#f50057' }}
                />
            </View>

            <Text style={styles.toolText}>{tool.description}</Text>
            <Text style={styles.toolTags}>#{tool.tags.join(' #')}</Text>
            <Button
                iconRight
                type='outline'
                containerStyle={styles.cardButtonContainer}
                buttonStyle={styles.cardButton}
                titleStyle={{color: '#3f51b5', marginRight: 5}}
                title='Visit' 
                icon={
                    <Icon
                        name="arrow-forward"
                        size={20}
                        color="#3f51b5"
                    />
                }
                onPress={() => Linking.openURL(tool.link)}
                />
        </Card>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    card: {
        borderRadius: 10,
    },
    toolTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    toolText: {
        fontSize: 15,
        marginBottom: 10
    },
    toolTags: {
        fontSize: 15,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    cardButtonContainer: {
        marginHorizontal: -15,
        marginBottom: -15,
        
    },
    cardButton: {
        borderRadius: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0
    }
})