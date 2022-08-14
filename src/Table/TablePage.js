import React, { useState, useEffect } from 'react'
import { StyledTable } from './StyledTable'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import axios from 'axios'

const TablePage = () => {

  const [product, setProduct]  = useState('');
  const open = [], high = [], low = [], close = [], volumne =[], key = [], store = [];
  const [ variable, setVariable ] = useState(0);

  const fetchApi = async ()=> {
    await axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo")
   .then( response => {
    const getProduct = response;
    // console.log(getProduct.data["Time Series (5min)"],'product');
    setProduct(getProduct.data["Time Series (5min)"]);
   }
   )
  .catch( error => console.log(error,'error'));
  }

  useEffect(()=>{      
    fetchApi();       
  },[]);

 const keyData = Object.keys(product);
 const valueData = Object.values(product);

 
  keyData.map( (e) => (
    key.push(e)
  ) )
              
  valueData.map((value, date)  => (
    Object.entries(value).map((final,date) => (
          final[0] === '1. open' ? 
            open.push(final[1]):
          final[0] === '2. high' ? 
            high.push(final[1]):
          final[0] === '3. low' ? 
            low.push(final[1]) :
          final[0] === '4. close' ? 
            close.push(final[1]) :
          final[0] === '5. volume' ? 
            volumne.push(final[1]) : null
    ))
) )
      
store.push(key,open,high,low,close,volumne);


const Display = () => {
  for( variable ; variable <= 99; ){
    return(
    <Tr>
    {
      store.map( (e,index) => (
        <Td key={index} style={{textAlign:'center'}}>
          {e[variable]}
        </Td>
      ) )
    }
    </Tr> 
    )
  }
 }

 
  return (
    <StyledTable>
        <Table>
            <Thead>
                <Tr>
                  <Th>DateTime</Th>
                  <Th>Open</Th>
                  <Th>High</Th>
                  <Th>Low</Th>
                  <Th>Close</Th>
                  <Th>Volume</Th>
                </Tr>
            </Thead>
            <Tbody>   

                {Display()}   

            </Tbody>
        </Table>
    </StyledTable>
  )
}

export default TablePage