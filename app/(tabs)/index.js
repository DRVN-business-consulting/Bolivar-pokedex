import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext'; 

export default function AllPokemons() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const { currentTheme } = useTheme(); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokemon-api-nssw.onrender.com/pokemon');
        const data = await response.json();
        setPokemonList(data);
        setFilteredPokemonList(data);

        const allTypes = new Set();
        data.forEach(pokemon => {
          pokemon.type.forEach(type => allTypes.add(type));
        });
        setTypes(Array.from(allTypes));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, []);

  const handlePress = async (pokemon) => {
    try {
      const response = await fetch(`https://pokemon-api-nssw.onrender.com/pokemon/${pokemon.id}`);
      const data = await response.json();
      navigation.navigate('PokemonDetailScreen', { pokemon: data[0] });
    } catch (error) {
      console.error(error);
    }
  };

  const filterByType = (type) => {
    if (type === 'All') {
      setFilteredPokemonList(pokemonList);
    } else {
      const filteredList = pokemonList.filter(pokemon => pokemon.type.includes(type));
      setFilteredPokemonList(filteredList);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <ScrollView horizontal style={styles.typeFilterContainer}>
        <TouchableOpacity onPress={() => filterByType('All')} style={[styles.typeButton, { backgroundColor: currentTheme.button }]}>
          <Text style={[styles.typeButtonText, { color: currentTheme.text }]}>All</Text>
        </TouchableOpacity>
        {types.map((type, index) => (
          <TouchableOpacity key={`type-${index}`} onPress={() => filterByType(type)} style={[styles.typeButton, { backgroundColor: currentTheme.button }]}>
            <Text style={[styles.typeButtonText, { color: currentTheme.text }]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredPokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={[styles.pokemonItem, { borderBottomColor: currentTheme.border }]}>
              <Image source={{ uri: item.image.hires }} style={styles.pokemonImage} />
              <View style={styles.pContainer}>
                <Text style={[styles.pokemonName, { color: currentTheme.text }]}>{item.name.english}</Text>
                <Text style={{ color: currentTheme.text }}>Type: {item.type.join(', ')}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Image
                  source={favorites.some(fav => fav.id === item.id)
                    ? require('../../assets/heart-active.png')
                    : require('../../assets/heart.png')
                  }
                  style={styles.heartIcon}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  typeFilterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  typeButton: {
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pokemonItem: {
    padding: 16,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pokemonImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  pContainer: {
    flex: 1,
  },
  pokemonName: {
    fontWeight: 'bold',
  },
  heartIcon: {
    width: 50,
    height: 50,
  },
});
