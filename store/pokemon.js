import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPokemon = createAsyncThunk('pokemon/fetch', async (params) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${params.page * 20}`);
    const data = await response.json();

    const pokemonPromises = data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();

        const formattedPokemon = {
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.other['official-artwork'].front_default,
            types: pokemonData.types.map((type) => type.type.name),
        };

        return formattedPokemon;
    });

    const formattedData = await Promise.all(pokemonPromises);
    return formattedData;
});

export const fetchPokemonTypes = createAsyncThunk('pokemon/types', async () => {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();

    const types = data.results.map((type) => type.name);
    return types;
});

export const getDetailPokemon = createAsyncThunk('pokemon/detail', async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    const formattedPokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        types: data.types.map((type) => type.type.name),
        // Add more details if needed
    };

    return formattedPokemon;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        types: [],
        selectedPokemon: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemon.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchPokemon.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchPokemonTypes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.types = action.payload;
            })
            .addCase(fetchPokemonTypes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getDetailPokemon.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDetailPokemon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedPokemon = action.payload;
            })
            .addCase(getDetailPokemon.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { reducer: pokemonReducer } = pokemonSlice;

export default configureStore({
    reducer: {
        pokemonList: pokemonReducer,
    },
});
