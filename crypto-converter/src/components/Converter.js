import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select } from "antd";
import { GiCoins } from 'react-icons/gi';

function Converter() {
  const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";

  const defaultFistSelectValue = "Bitcoin";
  const defaultSecondSelectValue = "Ether";

  const [cryptoList, setCryptoList] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(defaultFistSelectValue);
  const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue);
  const [result, setResult]= useState("0");

  const names = [
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "disabled",
      label: "Disabled",
    },
    {
      value: "Yiminghe",
      label: "yiminghe",
    },
  ];

  useEffect(() => { 
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();

    // console.log(jsonData);
    const data = jsonData.rates;
    // console.log(data);

    // console.log(Object.entries(data));
    // const tempArray=[];
    // Object.entries(data).forEach(item=>{
    //     const tempObj={
    //         value: item[1].name,
    //         label: item[1].name,
    //         rate: item[1].value
    //     }
    //     tempArray.push(tempObj);
    // })
    // console.log(tempArray);

    const tempArray = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value,
      };
    });
    // console.log(tempArray);

    setCryptoList(tempArray);
    // console.log(cryptoList);
  }

  useEffect(()=>{
    // console.log(inputValue, firstSelect,secondSelect);
    if(cryptoList.length==0) return;

    const firstSelectRate=cryptoList.find((item)=>{
        return item.value===firstSelect;
    }).rate

    const secondSelectRate=cryptoList.find((item)=>{
        return item.value===secondSelect;
    }).rate

    const resultValue=(inputValue*secondSelectRate)/firstSelectRate;

    setResult(resultValue.toFixed(6));
  },[inputValue,firstSelect,secondSelect])

  return (
    <div className="container">
      <Card className="crypto-card" title={<h1><GiCoins/>Crypto-Converter</h1>}>
        Crypto-Converter
        <Form size='large'>
          <Form.Item>
            <Input
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            ></Input>
          </Form.Item>
        </Form>
        <div className="select-box">
          <Select
            style={{ width: "160px" }}
            defaultValue={defaultFistSelectValue}
            options={cryptoList}
            onChange={(value)=>setFirstSelect(value)}
          />
          <Select
            style={{ width: "160px" }}
            defaultValue={defaultSecondSelectValue}
            options={cryptoList}
            onChange={(value)=>setSecondSelect(value)}
          />
        </div>
        <p>{inputValue} {firstSelect} = {result} {secondSelect}</p>
      </Card>
    </div>
  );
}

export default Converter;
