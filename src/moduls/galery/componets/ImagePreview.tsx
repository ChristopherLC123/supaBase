
import { Image, StyleSheet, View } from 'react-native';

interface Props {
  uri: string | null;
}
//recibe y extrae las propiedades de uri
interface Props {
  tipo: 'galeria' | 'camara';
  onImageSelected: (uri: string) => void;
  onCancel: () => void;
}

  return (
    <View>
      <Image
      //Indica al componente Image la ubicación de la fotografía.
        source={{ uri: uri }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginTop: 20,
  },
});
