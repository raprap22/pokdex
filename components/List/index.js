import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { List, Row, Col, Input, Select, Spin, Button } from 'antd';
import Card from "../Card";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon, fetchPokemonTypes } from '../../store/pokemon';

const { Option } = Select;
const { Search } = Input;

const PokemonList = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pokemonList, setPokemonList] = useState([]);

    const { data, isLoading, types } = useSelector((state) => state.pokemonList);

    useEffect(() => {
        setLoading(isLoading);
        if (data) {
            setPokemonList((prevList) => [...prevList, ...data]);
        }
    }, [isLoading, data]);

    useEffect(() => {
        dispatch(fetchPokemonTypes());
    }, [dispatch]);

    useEffect(() => {
        setPokemonList(data || []);
    }, [data]);


    const handleSearch = (value) => {
        setPage(1);
        setSearchText(value);
    };

    const handleTypeChange = (value) => {
        setPage(1);
        setSelectedType(value);
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const filteredPokemonList = pokemonList.filter((pokemon) => {
        const nameMatch = pokemon.name.toLowerCase().includes(searchText.toLowerCase());
        const typeMatch = selectedType ? pokemon.types.includes(selectedType) : true;
        return nameMatch && typeMatch;
    });

    useEffect(() => {
        dispatch(fetchPokemon({ page }));
    }, [dispatch, page]);

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div>
            <Row gutter={[16, 16]} justify="center" style={{ marginBottom: '16px' }}>
                <Col span={8}>
                    <Search
                        placeholder="Search Pokemon"
                        value={searchText}
                        onChange={handleSearchInputChange}
                        onSearch={handleSearch}
                        enterButton
                    />
                </Col>
                <Col span={8}>
                    <Select
                        placeholder="Filter by Type"
                        onChange={handleTypeChange}
                        style={{ width: '100%' }}
                        value={selectedType}
                    >
                        <Option value="">All</Option>
                        {types.map((type) => (
                            <Option key={type} value={type}>
                                {type}
                            </Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            <Spin spinning={loading}>
                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
                    dataSource={filteredPokemonList}
                    renderItem={(pokemon) => (
                        <List.Item>
                            <Card pokemon={pokemon} />
                        </List.Item>
                    )}
                >
                    {isLoading && filteredPokemonList.length === 0 && <div>Loading...</div>}
                    {filteredPokemonList.length > 0 && (
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: 12,
                                height: 32,
                                lineHeight: '32px',
                            }}
                        >
                            {!isLoading && (
                                <Button onClick={handleLoadMore} type='primary'>
                                    Load More
                                </Button>
                            )}
                        </div>
                    )}
                </List>
            </Spin>
        </div>
    );
};

export default PokemonList;
