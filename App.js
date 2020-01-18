import React from 'react';
import Routes from './routes';
import { StatusBar } from 'react-native';

export default function App() {
    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#3f51b5' />
            <Routes />
        </>
    );
}