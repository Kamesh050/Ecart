import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView, // Import TextInput
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import ProfileOptionsModal from '../component/ProfileOptionsModal';
import SafeAreaContainer from '../component/SafeAreaContainer';
import PrimaryButton from '../component/PrimaryButton';
import {PermissionsAndroid} from 'react-native';

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickImage = async () => {
    setShowModal(false); // Close modal
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (!result.didCancel && result.assets?.[0]?.uri) {
      upload(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    setShowModal(false); // Close modal
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back', // You can specify the type of camera (front or back)
      quality: 0.8, // Optional: adjust photo quality
    });

    if (result.didCancel) {
      console.log('User cancelled the photo');
    } else if (result.errorCode) {
      console.log('Error with camera:', result.errorMessage);
    } else {
      const uri = result.assets?.[0]?.uri;
      if (uri) {
        upload(uri); // Call upload function if image is selected
      }
    }
  };

  const upload = (uri: string) => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 1) {
          clearInterval(interval);
          setUploading(false);
          setAvatar(uri);
        }
        return Math.min(p + 0.1, 1);
      });
    }, 200);
  };

  const handleUpdateProfile = () => {
    Alert.alert('Profile updated!');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaContainer>
        <ScrollView style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}>
            {avatar ? (
              <Image source={{uri: avatar}} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text>Upload Avatar</Text>
              </View>
            )}
          </TouchableOpacity>

          {uploading && (
            <Progress.Bar
              progress={uploadProgress}
              width={200}
              style={styles.progress}
            />
          )}
          <View style={{gap: 10, flex: 1, marginVertical: 80}}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your Age"
              value={age}
              onChangeText={setAge}
            />
          </View>
          <PrimaryButton
            title={'Update Profile'}
            onPress={handleUpdateProfile}
            style={styles.ButtonInput}
          />

          <ProfileOptionsModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            onTakePhoto={takePhoto}
            onUploadPhoto={pickImage}
            onRemovePhoto={() => setAvatar(null)}
          />
        </ScrollView>
      </SafeAreaContainer>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  avatar: {width: 120, height: 120, borderRadius: 60, alignSelf: 'center'},
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  progress: {alignSelf: 'center', marginVertical: 10},
  textInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  inputContainer: {
    position: 'relative', // Ensure it doesn't overlap with modal
    zIndex: 1, // Ensure other inputs are rendered under the modal
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure modal appears above other elements
  },
  modalContent: {
    width: '80%',
    borderRadius: 10,
    alignItems: 'stretch',
    zIndex: 11, // Ensure modal content is above other elements
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  spacer: {
    height: 10,
  },
  ButtonInput: {
    marginVertical: 15,
    width: '100%',
    alignSelf: 'center',
  },
});
