
import { useState } from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    View
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function CameraComponent() {

  // Estado para guardar la dirección de la imagen
  const [image, setImage] = useState<string | null>(null);

  // FUNCION PARA SELECCIONAR UNA IMAGEN
  const pickImage = async () => {

    // Solicitar permiso para acceder a la galería
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Comprobar si se concedió el permiso
    if (!permissionResult.granted) {
      Alert.alert(
        'Permiso requerido',
        'Necesitas permitir el acceso a tus imágenes.'
      );
      return;
    }

    // Abrir la galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Comprobar si se seleccionó una imagen
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // FUNCION PARA TOMAR UNA FOTOGRAFIA
  const takePhoto = async () => {

    // Solicitar permiso para utilizar la cámara
    const permissionResult =
      await ImagePicker.requestCameraPermissionsAsync();

    // Comprobar el permiso
    if (!permissionResult.granted) {
      Alert.alert(
        'Permiso requerido',
        'Necesitas permitir el acceso a la cámara.'
      );
      return;
    }

    // Abrir la cámara
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Comprobar si se tomó una fotografía
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>

      <Button
        title="Seleccionar imagen"
        onPress={pickImage}
      />

      <Button
        title="Tomar fotografía"
        onPress={takePhoto}
      />

      {/* Mostrar imagen seleccionada */}
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  image: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 10,
  },
});
