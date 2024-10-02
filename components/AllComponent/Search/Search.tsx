import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Entypo name="magnifying-glass" size={20} color="#999" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width: "100%",
        marginTop: -20
    },
    searchContainer: {
        position: 'relative', 
        backgroundColor: '#FFB6C1',
        borderRadius: 10,
        width: '100%',
    },
    icon: {
        position: 'absolute',
        left: 10, 
        top: 8, 
        color:"black"
    },
    input: {
        height: 36,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 40, 
        color: 'black',
        fontFamily:"Playfair"
        
    },
});

export default Search;
