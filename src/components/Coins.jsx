import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index.js'
import { Container, HStack, Heading, VStack ,Image,Text, Button, RadioGroup, Radio} from '@chakra-ui/react';
import Loader from './Loader.jsx';
import ErrorBox from './ErrorBox.jsx';
import CoinCard from './CoinCard.jsx';

function Coins() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState('inr');
    const currencySymbol =
        currency === 'inr' ? '₹' : currency === "eur" ? '€' :  '$' ;
    const changePage = (page) => {
        setPage(page);
        setLoading(true);
    }
    
    const btns = new Array(132).fill(1);

    useEffect(() => {
        try {
            const fetchCoins = async () => {
            const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
            setCoins(data);
               
            setLoading(false);
        }
        fetchCoins();
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }, [currency,page]);

    if(error) return <ErrorBox message='Error while loading Coins .Try Again !!'/>

    return <Container maxW={'container.xl'}>
        {loading? <Loader/> :<>
        
            <RadioGroup value={currency} onChange={setCurrency}>
                <HStack spacing={'4'} p={'8'}>
                    <Radio value={"inr"}>INR</Radio>
                    <Radio value={"usd"}>USD</Radio>
                     <Radio value={"eur"}>EUR</Radio>
                </HStack>
        </RadioGroup>

            <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
                {
                    coins.map((i) => {
                        return <CoinCard
                            id={i.id}
                            key={i.id}
                            name={i.name}
                            img={i.image}
                            symbol={i.symbol}
                            price={i.current_price}
                            currencySymbol={currencySymbol} />
                        
                    })
                }
            </HStack>
            <HStack w={'full'} overflow={'auto'} p={'8'} >
                {
                    btns.map((item,index) => {
                       return  <Button
                       key={index}
                            bgColor={"blackAlpha.900"}
                            color={'white'}
                            onClick={() => changePage(index+1)}>
                            {index+1}
                        </Button>
                    })
                }
                </HStack>

        
        </>}
        
    
        </Container>
}




export default Coins
