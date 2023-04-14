import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
//import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
//import styles from "../styles/Home.module.css";
import { Text, Box, Container, Flex, SimpleGrid, Card, CardBody, Heading, Skeleton, Input, Stack } from "@chakra-ui/react";
import { ethers } from "ethers";
import { ChangeEvent, useState } from "react";
//import { useContract, useContractWrite } from "@thirdweb-dev/react";


  const Home: NextPage = () => {
    const address = useAddress;
    const contractAddress = "0x932e315c860020AD57AAC4B8e176583aCcF493aF";
  
    const {contract} = useContract(contractAddress);
  
    const { data: totalCoffees, isLoading: loadingTotalCoffee } = useContractRead(contract, "getTotalCoffee");
    const { data: recentCoffee, isLoading: loadingRecentCoffee } = useContractRead(contract, "getAllCoffee");
    
    const [message, setMessage] = useState<string>("");
    const [name, setName] = useState<string>("");

    function clearValues(): void {
      setName("");
      setMessage("");
    }
    

    function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
      setName(event.target.value);
    }
    
    function handleMessageChange(event: ChangeEvent<HTMLInputElement>): void {
      setMessage(event.target.value);
    }
    

  return (


    <Container maxW={"1200px"} w={"full"}>
      <Flex justifyContent={"space-between"} alignItems={"center"} py={"20px"} height={"80px"}>
        <Box>
          <Text fontWeight={"bold"}>Buy Me A Coffee</Text>
        </Box>
        <ConnectWallet />
    
      </Flex>

      <SimpleGrid columns={2} spacing={10} mt={"40px"}>
        <Box>
          <Card>
            <CardBody>
              <Heading mb={"20px"}>Buy a Coffee</Heading>
                <Flex direction={"row"}>
                  <Text>Total Coffees:</Text>
                  <Skeleton isLoaded={!loadingTotalCoffee} width={"20px"} ml={"5px"}>
                    {totalCoffees?.toString()}
                  </Skeleton>
                </Flex>
                    <Text fontSize={"2xl"} mt={"10px"} py={"10px"}>Name</Text>
                    <Input
                    placeholder="John Doe"
                    maxLength={16}
                    value={name}
                    onChange={handleNameChange}
                    />
                    <Text fontSize={"2xl"} mt={"10px"} py={"10px"}>Message:</Text>

                    <Input
                    placeholder="Hello"
                    maxLength={80}
                    value={message}
                    onChange={handleMessageChange}
                    />
                    <Box mt={"20px"}>
                    {address() ? (
                      <Web3Button
                      
                      contractAddress="0x932e315c860020AD57AAC4B8e176583aCcF493aF"
                      action={(contract) => {
                      contract.call("buyCoffee", [message, name], {value: ethers.utils.parseEther("0.01")})
                        }}

                        onSuccess={() => clearValues()}                         
                      
                      >{"Buy a Coffee 0.01ETH"}</Web3Button>
                    ) : (
                      <Text>Please connect your wallet</Text>
                    )}
                    
                    <Box>
                      <Card maxH={"60vh"} overflow={"scroll"}>
                        <CardBody>
                          <Text fontWeight={"bold"}>Recent Messages:</Text>
                          {!loadingRecentCoffee ? (
                            <Box>
                                {recentCoffee && recentCoffee.map((coffee:any, index:number) => {
                                  return (
                                    <Card key={index} my={"10px"}>
                                      <CardBody>
                                        <Text fontSize={"2xl"}>{coffee[1]}</Text>
                                        <Text>From: {coffee[2]}</Text>
                                      </CardBody>
                                    </Card>
                                  )
                                })}
                            </Box>

                          ) : (
                            <Stack>
                              <Skeleton height={"100px"} />
                              <Skeleton height={"100px"} />
                              <Skeleton height={"100px"} />
                            </Stack>
                          )}
                          
                        </CardBody>
                      </Card>
                    </Box>

                    </Box>
            </CardBody>
          </Card>
        </Box>


        
      </SimpleGrid>
      
   </Container>   


   


    
  );
};

export default Home;



