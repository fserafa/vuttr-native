import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

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
            <Text>{tool.name}</Text>
            <Text>{tool.description}</Text>
            <Text>#{tool.tags.join(' #')}</Text>
        </Card>
    )
} 