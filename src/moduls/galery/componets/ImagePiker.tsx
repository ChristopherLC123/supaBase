
import { useEffect } from 'react';

import * as ExpoImagePicker from 'expo-image-picker';

import { Alert } from 'react-native';

// Propiedades que recibe el componente
interface Props {
  tipo: 'galeria' | 'camara';
  onImageSelected: (uri: string) => void;
  onCancel: () => void;
}

export default function ImagePickerComponent({
  tipo,
  onImageSelected,
  onCancel
}: Props) {

  useEffect(() => {

    // Función para abrir galería o cámara
    const abrirSelector = async () => {

      try {

        if (tipo === 'galeria') {

          // Solicitar permiso para la galería
          const permission =
            await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

          if (!permission.granted) {
            Alert.alert(
              'Permiso requerido',
              'Necesitas permitir el acceso a la galería.'
            );
            onCancel();
            return;
          }

          // Abrir galería
          const result =
            await ExpoImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: false,
              quality: 1,
            });

          // Comprobar si se seleccionó una imagen
          if (!result.canceled) {
            onImageSelected(result.assets[0].uri);
          } else {
            onCancel();
          }

        } else {

          // Solicitar permiso para la cámara
          const permission =
            await ExpoImagePicker.requestCameraPermissionsAsync();

          if (!permission.granted) {
            Alert.alert(
              'Permiso requerido',
              'Necesitas permitir el acceso a la cámara.'
            );
            onCancel();
            return;
          }

          // Abrir cámara
          const result =
            await ExpoImagePicker.launchCameraAsync({
              allowsEditing: false,
              quality: 1,
            });

          // Comprobar si se tomó una fotografía
          if (!result.canceled) {
            onImageSelected(result.assets[0].uri);
          } else {
            onCancel();
          }
        }

      } catch (error) {

        Alert.alert(
          'Error',
          'No se pudo abrir la galería o la cámara.'
        );

        onCancel();
      }
    };

    // Ejecutar el selector
    abrirSelector();

  }, [tipo, onImageSelected, onCancel]);

  return null;
}
