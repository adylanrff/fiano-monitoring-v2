import { useEffect, useState } from "react";
import _ from 'lodash';

export function goTo(url) {
    window.location.replace(url)
}

export function toCamel(obj) {
    if (Array.isArray(obj)) {
        return obj.map(v => toCamel(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [_.camelCase(key)]: toCamel(obj[key]),
            }),
            {},
        );
    }
    return obj;
}

export function getCurrency(number) {
    return 'Rp ' + new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 3 }).format(number);
}

export function useDataFetching(url) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const token = window.localStorage.getItem('jwt_token')
    const headers = token ? {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    } : {}
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetch(url, headers);
                const json = await data.json();
                if (json) {
                    console.log(json)
                    setLoading(false);
                    setResults(toCamel(json));
                }
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }

            setLoading(false);
        }

        fetchData();
    }, [url]);

    return [error, loading, results]
}
