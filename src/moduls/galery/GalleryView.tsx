
import { useCallback, useState } from 'react';

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import ImagePickerComponent from './componets/ImagePiker';
import ImageEditor from './ImageEditor';

export default function GalleryView() {

  // Controlar si se muestra el menú
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  // Guardar si se eligió galería o cámara
  const [tipoSeleccionado, setTipoSeleccionado] = useState<
    'galeria' | 'camara' | null
  >(null);

  // Guardar la imagen que se va a editar
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Guardar todas las imágenes de la galería
  const [images, setImages] = useState<string[]>([]);

  // Mostrar el menú de opciones
  const abrirOpciones = () => {
    setMostrarOpciones(true);
  };

  // Seleccionar galería o cámara
  const seleccionarOpcion = (tipo: 'galeria' | 'camara') => {
    setTipoSeleccionado(tipo);
    setMostrarOpciones(false);
  };

  // Cancelar el menú
  const cancelarOpcion = () => {
    setMostrarOpciones(false);
    setTipoSeleccionado(null);
  };

  // Agregar una imagen al arreglo
  const agregarImagen = (uri: string) => {
    setImages((imagenesAnteriores) => [
      ...imagenesAnteriores,
      uri
    ]);
  };

  // Recibir la imagen seleccionada
  const recibirImagen = useCallback((uri: string) => {
    setSelectedImage(uri);
    setTipoSeleccionado(null);
  }, []);

  // Cancelar la selección de galería o cámara
  const cancelarSelector = useCallback(() => {
    setTipoSeleccionado(null);
  }, []);

  // Mostrar el editor cuando existe una imagen seleccionada
  if (selectedImage !== null) {
    return (
      <ImageEditor
        imageUri={selectedImage}
        onSave={(uri) => {

          // Guardar la imagen editada
          agregarImagen(uri);

          // Cerrar el editor
          setSelectedImage(null);
        }}
        onCancel={() => {

          // Cerrar el editor sin guardar
          setSelectedImage(null);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.title}>
        Mi galería de imágenes
      </Text>

      {/* Botón para agregar imágenes */}
      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={abrirOpciones}
      >
        <Text style={styles.textoAgregar}>+</Text>
      </TouchableOpacity>

      {/* Menú de opciones */}
      {mostrarOpciones && (
        <View style={styles.opciones}>

          {/* Opción galería */}
          <TouchableOpacity
            style={styles.boton}
            onPress={() => seleccionarOpcion('galeria')}
          >
            <Text style={styles.textoBoton}>
              Galería
            </Text>
          </TouchableOpacity>

          {/* Opción cámara */}
          <TouchableOpacity
            style={styles.boton}
            onPress={() => seleccionarOpcion('camara')}
          >
            <Text style={styles.textoBoton}>
              Cámara
            </Text>
          </TouchableOpacity>

          {/* Cancelar */}
          <TouchableOpacity
            style={styles.botonCancelar}
            onPress={cancelarOpcion}
          >
            <Text style={styles.textoBoton}>
              Cancelar
            </Text>
          </TouchableOpacity>

        </View>
      )}

      {/* Mostrar las imágenes guardadas */}
      <FlatList
        style={styles.flatlist}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Todavía no hay imágenes seleccionadas.
          </Text>
        }
      />

      {/* Abrir el selector elegido */}
      {tipoSeleccionado !== null && (
        <ImagePickerComponent
          tipo={tipoSeleccionado}
          onImageSelected={recibirImagen}
          onCancel={cancelarSelector}
        />
      )}

    </View>
  );
}

// Estilos de la galería
const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  botonAgregar: {
    backgroundColor: '#05840c',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  textoAgregar: {
    color: '#ffffff',
    fontSize: 35,
  },

  opciones: {
    gap: 10,
    marginTop: 15,
  },

  boton: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  botonCancelar: {
    backgroundColor: '#eeeeee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBoton: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  image: {
    width: 140,
    height: 140,
    margin: 8,
    borderRadius: 10,
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: 'gray',
  },

  flatlist: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 10,
    marginTop: 15,
  },

});
