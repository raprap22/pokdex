import { Card } from 'antd';
import React from 'react';

const PokemonCard = ({ pokemon }) => {
    if (!pokemon) {
        return null;
    }

    const { id, name, image, types } = pokemon;

    return (
        <Card
            title={`#${id} - ${name}`}
            cover={<img alt={name} src={image} />}
        >
            <p>Type: {types && types.length > 0 ? types.join(', ') : 'Unknown'}</p>
        </Card>
    );
};

export default PokemonCard;
