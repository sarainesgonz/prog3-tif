import {useState, useEffect} from 'react';

function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => { 
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error("Errror al hacer la petición");
                }
                if (response.status !== 204) {
                    const result = await response.json();
                    setData(result);
                } else {
                    setData({message: "Eliminación exitosa"})
                }
               
                // console.log(result)
                setLoading(false);
                
                
            } catch (error) {
                console.log(error)
                setError(error);
                setLoading(false)
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [url]); 

    return {data, loading, error}
 }


export default useFetch;