
import { useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator';

// Propiedades que recibe el editor
interface Props {
  imageUri: string;
  onSave: (uri: string) => void;
  onCancel: () => void;
}

export default function ImageEditor({
  imageUri,
  onSave,
  onCancel,
}: Props) {

  // Guardar los grados de rotación
  const [rotation, setRotation] = useState(0);

  // Controlar el proceso de guardado
  const [loading, setLoading] = useState(false);

  // Gira la imagen 
  const rotateImage = () => {
    setRotation((actual) => (actual + 90) % 360);
  };

  // Restablecer la imagen a su posición original
  const resetImage = () => {
    setRotation(0);
  };

  // Guardar la imagen editada
  const saveImage = async () => {
    try {
      setLoading(true);

      // Aplicar la rotación a la imagen original
      const result = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          {
            rotate: rotation,
          },
        ],
        {
          compress: 1,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      // Enviar la imagen editada a GalleryView
      onSave(result.uri);

    } catch (error) {

      // Mostrar un mensaje si ocurre un error
      Alert.alert('Error', 'No se pudo guardar la imagen.');

      console.log(error);

    } finally {

      // Finalizar el proceso de guardado
      setLoading(false);

    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Mi editor de imágenes
      </Text>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={[
            styles.image,
            { transform: [{ rotate: `${rotation}deg` }] },
          ]}
          resizeMode="contain"
        />
      </View>


      <TouchableOpacity
        style={styles.button}
        onPress={rotateImage}
      >
        <Text style={styles.buttonText}>
          Girar 90°
        </Text>
      </TouchableOpacity>

  
      <TouchableOpacity
        style={styles.resetButton}
        onPress={resetImage}
      >
        <Text style={styles.buttonText}>
          Restablecer
        </Text>
      </TouchableOpacity>

      {/* Botones, guardar o cancelar */}
      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onCancel}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            Cancelar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveImage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Guardar
            </Text>
          )}
        </TouchableOpacity>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  imageContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },

  image: {
    width: '90%',
    height: '90%',
  },

  button: {
    backgroundColor: '#087f23',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  resetButton: {
    backgroundColor: '#666666',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#777777',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  saveButton: {
    flex: 1,
    backgroundColor: '#05840c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

});
