import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f1f1f1'
    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ff0055'
    },
    touchable:{
        height: 55,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#ff6347',
        borderColor:'#f53355',
        borderWidth:2,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    },
    touchableText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    }
});

export default HomeStyles;