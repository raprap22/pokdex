import React from 'react';
import { useRouter } from 'next/router';

const PokemonDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Detail Pokemon #{id}</h1>
            {/* Tampilkan detail Pokemon */}
        </div>
    );
};

export default PokemonDetail;
