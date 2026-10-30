import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'
import * as ImagePicker from 'expo-image-picker'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { appStyles } from './styles/styles'

// Definimos las propiedades (props) que el componente Avatar acepta de su componente padre (Account)
interface Props {
  size: number                     // Tamaño en píxeles para el alto y ancho de la imagen
  url: string | null               // Ruta o URL actual del avatar almacenada en la base de datos
  onUpload: (filePath: string) => void // Función que se ejecuta al terminar de subir la imagen con éxito
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  // Estados locales del componente
  const [uploading, setUploading] = useState(false)         // Controla si el botón debe mostrar "Uploading..." y bloquearse
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null) // Almacena la URI o URL lista para renderizar en pantalla
  
  const avatarSize = { height: size, width: size } // Objeto de estilos dinámicos para las dimensiones
  const styles = appStyles

  // Cada vez que la propiedad 'url' cambia (por ejemplo, al cargar el perfil), descargamos/traducimos la imagen
  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  // Función encargada de preparar la ruta para que la etiqueta <Image> pueda mostrarla
  async function downloadImage(path: string) {
    try {
      // 1. Si la ruta ya es una URL web completa o local del teléfono, úsala directamente sin buscar en Supabase
      if (path.startsWith('http') || path.startsWith('file://') || path.startsWith('content://')) {
        setAvatarUrl(path)
        return
      }

      // 2. Si es una ruta corta guardada en la base de datos, obtenemos su URL pública desde el bucket de Supabase
      const { data } = supabase.storage.from('avatars').getPublicUrl(path)

      if (data && data.publicUrl) {
        setAvatarUrl(data.publicUrl)
      }
    } catch (error: any) {
      console.log('Error downloading image: ', error.message)
    }
  }

  // Función que se ejecuta al presionar el botón "Upload" para seleccionar y subir una foto
  async function uploadAvatar() {
    try {
      setUploading(true) // Activamos el estado de carga para bloquear el botón

      // Abrimos la galería del dispositivo utilizando Expo Image Picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],           // Restringimos únicamente a archivos de tipo imagen
        allowsMultipleSelection: false,   // Solo se permite seleccionar una imagen a la vez
        allowsEditing: true,              // Permite recortar o editar la imagen antes de aceptarla
        quality: 1,                       // Calidad de la imagen (1 = máxima calidad)
        exif: false,                      // Omitimos metadatos innecesarios de la foto
      })

      // Si el usuario canceló la selección de la imagen, detenemos el proceso
      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('User cancelled image picker.')
        return
      }

      const image = result.assets[0]
      console.log('Got image', image)

      // Verificamos de forma segura que el archivo tenga una ruta URI válida
      if (!image.uri) {
        throw new Error('No image uri!')
      }


      setAvatarUrl(image.uri)

      const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer())

      const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
      const path = `${Date.now()}.${fileExt}`
      
      // Subimos el archivo binario al bucket 'avatars' en Supabase esta fue la modificacion con respecto del codigo original
      //se cambio por que en el original se usaba fileRider y en expo suele fallar al renderizar imagenes y las elomina de la pantalla 
      const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, arraybuffer, {
          contentType: image.mimeType ?? 'image/jpeg',
        })

      if (uploadError) {
        throw uploadError
      }

      // Notificamos al componente padre (Account) pasándole la ruta del archivo recién subido
      onUpload(data.path)
    } catch (error: any) {
      if (error) {
        Alert.alert(error.message)
      }
    } finally {
      // Sin importar si hubo éxito o error, desactivamos el estado de carga al finalizar
      setUploading(false)
    }
  }

  return (
    <View style={styles.avatarContainer}>
      {/* Si tenemos una URL válida, renderizamos la imagen de perfil; si no, mostramos un contenedor vacío */}
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      
      {/* Botón interactivo para activar el selector de imágenes */}
      <View>
        <TouchableOpacity
          style={[styles.button, uploading && styles.buttonDisabled]}
          onPress={uploadAvatar}
          disabled={uploading}
        >
          <Text style={styles.buttonText}>{uploading ? 'Uploading ...' : 'Upload'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}