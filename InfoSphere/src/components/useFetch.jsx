import {useState, useEffect} from 'react';

function useFetch(url, options) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => { 
        const fetchData = async () => {
            try {
                const response = await fetch(url, {...options});
                if (!response.ok) {
                    throw new Error("Errror al hacer la petición");
                }
                const data = await response.json();
                // console.log(data)
                setData(data);
                setLoading(false);
                
            } catch (error) {
                console.log(error)
                setError(error);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [url, options]); 

    return {data, loading, error}
 }


export default useFetch;