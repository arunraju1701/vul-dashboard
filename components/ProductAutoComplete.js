import { useState } from 'react'
import ProductSuggestions from './ProductSuggestions'
import styles from '../styles/ProductAutoComplete.module.css'
  
import styled from 'styled-components'
const Input = styled.input`
    border: 1px solid #f37748;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0.5rem;
    width: 500px;
    &:not(:last-of-type){
        border-bottom: 1.5px solid rgba(200,200,200,0.4)
    }
    &:focus{
        outline:none;
        border: 1px solid #f37788;
    }`


const constructProducts = (data) => {
    const { cpes } = data.result;
    if (cpes != null && cpes.length > 0) {
        const products = cpes.map(data => {
            return {
                title: data.titles[0].title,
                cpe23Uri: data.cpe23Uri,
                vulnerabilities: data.vulnerabilities
            }
        })
        return products;
    }
}

export default function ProductAutoComplete({setSelectedProduct}) {
    const [loading, setLoading] = useState(false)
    const [canAddProduct, setCanAddProduct] = useState(false)
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [selectedSuggestion, setSelectedSuggestion] = useState({})
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    const onChange = async (e) => {
        setCanAddProduct(false)
        const searchText = e.target.value;
        setInput(searchText);        
        if (searchText && searchText.length > 2) {
            setLoading(true);
            const res = await fetch(`https://services.nvd.nist.gov/rest/json/cpes/1.0/?addOns=cves&keyword=${searchText}`);
            const data = await res.json();
            setLoading(false);
            const products = constructProducts(data);
            setShowSuggestions(true);
            setFilteredSuggestions(products);
            setActiveSuggestionIndex(0)
        }


    };
    const onClick = (suggestion) => {
        setCanAddProduct(true)
        setFilteredSuggestions([]);
        setSelectedSuggestion(suggestion);  
        setSelectedProduct(suggestion);      
        setInput(suggestion.title);
        setShowSuggestions(false);
    };
    return (
        <div>
            <div className={styles['input-container'], {...loading ? styles['input-disabled']: undefined}}>
                <Input type="text" label="product" onChange={onChange}
                    value={input} />
                {loading && <img src="/loader_lg.svg" width="50" />}
            </div>
            {showSuggestions && input
                && <ProductSuggestions
                    
                    onClick={onClick}
                    filteredSuggestions={filteredSuggestions}
                    activeSuggestionIndex={activeSuggestionIndex}
                />}
        </div>
    )
}
