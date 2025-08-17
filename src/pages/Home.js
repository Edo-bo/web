import { useEffect, useState } from 'react';
import { dbGet } from '../utils/db';
import Card from '../components/Card';

const Home = () => {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const fetchFeatures = async () => {
            // Fetch features data from the database
            const data = await dbGet('/features');
            setFeatures(data);
        };

        fetchFeatures();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard Siswa</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature) => (
                    <Card key={feature.id} title={feature.title} description={feature.description} />
                ))}
            </div>
        </div>
    );
};

export default Home;