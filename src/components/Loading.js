import React from 'react';

import { View, Text, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';

export default function Loading(props) {

    return (
        <Overlay
            isVisible={props.loading}
            windowBackgroundColor="rgba(193,193,193, 0.3)"
            overlayBackgroundColor="#fff"
            width="auto"
            height="auto"
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                <Text style={{ marginRight: 10 }}>Loading</Text>
                <ActivityIndicator size="large" color="#3f51b5" />
            </View>
        </Overlay>
    )

}
