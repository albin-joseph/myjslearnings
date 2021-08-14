import React from 'react';
import {SafeAreaView,View, Text, TouchableOpacity} from 'react-native';
import styles from './Home.styles';

const HomeView = (props) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.text}>Home View</Text>
            <TouchableOpacity style={styles.touchable}>
                <Text style={styles.touchableText}>Navigate to Detail Screen</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    
);

export default HomeView;