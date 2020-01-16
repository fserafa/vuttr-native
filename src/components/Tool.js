import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

export default function Tool(props) {
    // const styles = useStyles();
    const { tool, handleOpenRemove } = props;

    return (
        // <Card className={styles.card}>
        //     <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        //         <a href={tool.link}><Typography variant="h4">{tool.name}</Typography></a>
        //         <Button
        //             onClick={() => handleOpenRemove(tool)}
        //             variant="contained"
        //             color="secondary"
        //             startIcon={<Delete />}
        //         >
        //             <span>Remove</span>
        //         </Button>
        //     </Box>
        //     <Typography variant="body1" style={{ marginBottom: 20 }}>{tool.description}</Typography>
        //     <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        //         {tool.tags.map((tag, index) => <span key={index}>#{tag} </span>)}
        //     </Typography>
        // </Card>
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