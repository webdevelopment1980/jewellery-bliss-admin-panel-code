import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Checkbox,
  VStack,
  Heading,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { AdminState } from "../context/context";

function DealerSelectors2({ selectedDealers, setSelectedDealers, formData }) {
  const [dealers, setDealers] = useState([]);

  const { API_LOCAL_URL, token } = AdminState();

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${API_LOCAL_URL}/api/user-details/`); // Replace "API_URL" with your actual API endpoint
  //       setDealers(response.data);
  //       console.log("response.data:", response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch dealers:", error);
  //     }
  //   };
  //   console.log("fetchedddddd");
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  const fetchData = async () => {
    try {
      console.log("fetchedddddd");
      const response = await axios.get(`${API_LOCAL_URL}/api/user-details/`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch dealers:", error);
      return null;
    }
  };

  // Use useMemo to memoize the fetchData function
  const memoizedFetchData = useMemo(() => fetchData, []);
  // Use memoizedFetchData instead of fetchData in fetchDealers
  const memoizedFetchDealers = useCallback(async () => {
    const dealersData = await memoizedFetchData();
    if (dealersData) {
      setDealers(dealersData);
      console.log("response.data:", dealersData);
    }
  }, [memoizedFetchData]);

  const fetchDealers = useCallback(async () => {
    const dealersData = await memoizedFetchDealers();
    if (dealersData) {
      setDealers(dealersData);
      console.log("response.data:", dealersData);
    }
  }, []);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  const handleCheckboxChange = (dealerId) => {
    if (selectedDealers.includes(dealerId)) {
      setSelectedDealers((prevSelectedDealers) =>
        prevSelectedDealers.filter((id) => id !== dealerId)
      );
    } else {
      setSelectedDealers((prevSelectedDealers) => [
        ...prevSelectedDealers,
        dealerId,
      ]);
    }
    console.log("selectedDealers:", selectedDealers);
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="md" mb={4}>
        Select dealers
      </Heading>
      {dealers.length > 0 && (
        <SimpleGrid columns={2} spacing={4}>
          {dealers?.map(({ user, brandName }, index) => (
            <Flex key={user._id} alignItems="center">
              {console.log("user:", user._id, brandName)}
              <Checkbox
                isChecked={
                  selectedDealers?.includes(user._id) ||
                  formData?.dealers?.includes(user._id) ||
                  false
                }
                onChange={() => handleCheckboxChange(user._id)}
                mr={2}
              />
              <HStack alignItems="flex-start">
                <Box>{user.name}</Box>
                <Box fontWeight="bold">{brandName}</Box>
              </HStack>
            </Flex>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default DealerSelectors2;
