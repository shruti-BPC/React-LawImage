import React from 'react';
import { useParams } from 'react-router-dom';
import { List2 } from './List2'; // Replace with your actual List2 component

const NestedList2: React.FC = () => {
    const { id } = useParams();

    // Fetch data related to the id and pass it to List2
    // ...

    return <List2 />;
};

export default NestedList2;
