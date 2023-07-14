import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index.js'
import { Container, HStack, Heading, VStack ,Image,Text} from '@chakra-ui/react';
import Loader from './Loader.jsx';
import ErrorBox from './ErrorBox.jsx';

function Exchange() {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            const fetchExchanges = async () => {
            const { data } = await axios.get(`${server}/exchanges`);
            setExchanges(data);
            
            setLoading(false);
        }
        fetchExchanges();
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }, []);

    if(error) return <ErrorBox message='Error while loading Exchanges .Try Again !!'/>

    return <Container maxW={'container.xl'}>
        {loading? <Loader/> :<>
        
            <HStack wrap={'wrap'}>
                {
                    exchanges.map((i) => {
                        return <ExchangeCard key={ i.id} name={i.name} img={i.image } rank={i.trust_score_rank} url={i.url} />
                    })
                }
            </HStack>
        
        </>}
        
        
        </Container>
}

const ExchangeCard = ({id,name,img,rank,url}) => {
    return <a href={url} target={'blank'}>
        
        <VStack w={'52'} shadow={'lg'} p={'8'} boxShadow={'lg'} transition={'all 0.3s'}
            m={'4'}
            css={{
                "&:hover": {
                    transform:'scale(1.1)',
                }
            }}
        >
            
            <Image
                src={img}
                w={'10'}
                h={'10'}
                objectfit={'contain'}
                alt={'exchange'}
            />
            <Heading size={'md'} noOfLines={1}>
                {rank}</Heading>
            <Text>{ name}</Text>
        </VStack>
    </a>
}


export default Exchange
