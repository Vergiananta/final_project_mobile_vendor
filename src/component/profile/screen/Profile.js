import React, { useContext, useReducer, useState, useEffect } from 'react';
import { View, Image, Text, ImageBackground, StyleSheet, TextInput } from 'react-native';
import { IconButton, Colors, Avatar } from 'react-native-paper';
import { AuthContext } from '../../Account/context/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import * as Services from '../../Account/services/VendorServices';
import { initialState, vendorReducer } from '../../Account/reducers/VendorReducer';
import { SET_LOADING, FETCH_COMPLETE } from '../../Account/reducers/VendorAction';
import bg from '../pictures/backgroundPhotoProfile.png'
import { useForm } from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign'
import VectorIcon from 'react-native-vector-icons/Feather'

const Profile = () => {
    const { signOut } = useContext(AuthContext)
    const [state, dispatch] = useReducer(vendorReducer, initialState)
    const { setValue, register, handleSubmit } = useForm()
    const { form } = state
    const [text, setText] = useState(form)
    const [editable, setEditable] = useState(true)
    const [localState, setLocalState] = useState({ action: 'list' });
    // const [btnDisabled, setBtnDisabled] = useState(true);
    console.log('FORM PROFILE', state.form);
    console.log('ID FORM', form.id);
    const [data, setData] = React.useState({
        check_textInputChange: false,
        secureTextEntry: true,
        isValidPassword: true,
        checked: 'MALE'
    });

    const setLoading = () => dispatch({ type: SET_LOADING })
    const fetchComplete = payload => dispatch({ type: FETCH_COMPLETE, payload })


    const getProfileVendor = async () => {
        try {
            const vendor = await AsyncStorage.getItem('userToken')
            console.log('VENDOR GET SERVICE', vendor);

            setLoading()
            Services.getVendorId(vendor).then(response => {
                console.log('PROFILE RESPONSE', response);
                fetchComplete(response);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const showToast = message => {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    };

    const handleClickEdit = (vendor) => {
        Services.updateVendor(vendor), then(response => {
            localState('update')
            showToast('DATA UPDATED')
        })
    }

    const handleClickSave = () => {
        handleClickEdit(vendor)
        setEditable(true)
    }

    const handleClick = () => {
        setEditable(false)
    }

    const EditIcon = () => <VectorIcon name='edit' size={24} onPress={handleClick} />
    const SaveIcon = () => <VectorIcon name='check-square' size={24} onPress={handleClickSave} />

    useEffect(() => {
        getProfileVendor()
    }, [])

    return (
        <View>
            <ImageBackground style={styles.background} source={bg}>
                <View style={styles.profileView}>
                    <Avatar.Image source={{ uri: `http://e80e6a76b8a8.ngrok.io/vendor/photo/${form.id}` }} size={130} />
                </View>
                <View style={{ paddingLeft: 250, right: 0 }}>
                    {
                        editable ? <EditIcon /> : <SaveIcon />
                    }
                </View>
            </ImageBackground>
            <View style={styles.textInputView}>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Name</Text>
                    <TextInput
                        style={styles.textInput, { marginRight: 10 }}
                        value={form.name}
                        editable={!editable}
                        onChangeText={(form) => setText(form)}
                    />

                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Username</Text>
                    <TextInput
                        style={styles.textInput, { marginRight: 10 }}
                        value={form.username}
                        editable={!editable}
                        onChangeText={(form) => setText(form)}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        value={form.email}
                        editable={!editable}
                        onChangeText={(form) => setText(form)}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Gender</Text>
                    <TextInput
                        style={styles.textInput}
                        value={form.gender}
                        editable={!editable}
                        onChangeText={(form) => setText(form)}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Password</Text>

                    <TextInput
                        style={styles.textInput}
                        value={form.password}
                        secureTextEntry={data.secureTextEntry}
                        editable={!editable}
                        onChangeText={(form) => setText(form)}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Company</Text>
                    <TextInput
                        style={styles.textInput, { marginRight: 10 }}
                        value={form.company}
                        editable={!editable}
                        onChangeText={(form) => setText(form)}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Address</Text>
                    <TextInput
                        style={styles.textInput, { marginRight: 10 }}
                        value={form.address}
                        editable={!editable}
                        onChangeText={(form) => setText(form)}
                    />
                </View>
            </View >
            <View >
                <View style={styles.buttonStyle}>
                    <AntDesign name="logout" style={styles.signOut} size={20} onPress={() => { signOut() }} />

                    <TouchableOpacity onPress={() => { signOut() }} style={styles.signOut}>
                        <Text style={{ fontSize: 14, color: 'blue', fontWeight: 'bold' }}>SIGN OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}

export default Profile;

const styles = StyleSheet.create({
    background: {
        width: 400,
        height: 200,
        alignItems: 'center'
    },
    profileView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        paddingRight: 20
    },
    photoProfile: {
        paddingTop: 20
    },
    textInput: {
        fontSize: 15,

    },
    textInputView: {
        paddingTop: 10,
    },
    formStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    signOut: {
        width: 100,
        height: 30,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 10,
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 20,
        // backgroundColor: '#ebe236'
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
