import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from './contexts/ThemeContext'; 

export default function PokemonDetailScreen() {
  const route = useRoute();
  const { pokemon } = route.params;
  const { isDarkTheme } = useTheme(); 

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Image source={{ uri: pokemon.image.hires }} style={styles.pokemonImage} />
      <Text style={[styles.pokemonName, isDarkTheme ? styles.darkText : styles.lightText]}>{pokemon.name.english}</Text>
      <Text style={[styles.pokemonType, isDarkTheme ? styles.darkText : styles.lightText]}>
        Type: {pokemon.type.join(', ')}
      </Text>
      <Text style={[styles.pokemonDescription, isDarkTheme ? styles.darkText : styles.lightText]}>
        {pokemon.description}
      </Text>
      <Text style={isDarkTheme ? styles.darkText : styles.lightText}>Height: {pokemon.profile.height}</Text>
      <Text style={isDarkTheme ? styles.darkText : styles.lightText}>Weight: {pokemon.profile.weight}</Text>
      <Text style={isDarkTheme ? styles.darkText : styles.lightText}>Species: {pokemon.species}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  pokemonImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    marginTop: 120,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  pokemonType: {
    fontSize: 18,
    marginBottom: 10,
  },
  pokemonDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});
