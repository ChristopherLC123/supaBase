import { StyleSheet } from 'react-native'

export const appStyles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b1d1e',
    marginBottom: 6,
  },
  input: {
    borderWidth: 5,
    borderColor: '#09522e',
    borderRadius: 15,
    padding: 10,
    fontSize: 18,
  },
  inputDisabled: {
    backgroundColor: '#eff2ef',
    borderColor: '#055311',
    color: '#042765',
  },
  button: {
    backgroundColor: 'rgb(19, 68, 44)',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  avatar: {
    borderRadius: 25,
    overflow: 'hidden',
    maxWidth: '100%',
    marginBottom: 20,
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(200, 200, 200)',
    borderRadius: 5,
  },
})