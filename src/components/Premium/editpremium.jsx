// EditMakingChargesForm.js (New Component)

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";

const EditPremiumForm = ({ makingChargesData, onClose, refreshTable }) => {
  const [editedMakingCharges, setEditedMakingCharges] = useState(
    makingChargesData.makingcharges || "" // Initialize with an empty string
  );

  const handleSaveChanges = async () => {
    try {
      // Make an API request to update making charges here
      await axios.put(
        `http://localhost:5009/api/premium/update/${makingChargesData._id}`,
        {
          premiumcharges: editedMakingCharges,
        }
      );

      // Close the modal and refresh the making charges table
      onClose();
      refreshTable();
    } catch (error) {
      console.error("Error updating making charges:", error);
    }
  };

  return (
    // <Modal isOpen={true} onClose={onClose}>
    //   <ModalOverlay />
    //   <ModalContent>
    //     <ModalHeader>Edit Making Charges</ModalHeader>
    //     <ModalBody>
    //       <FormControl>
    //         <FormLabel>Making Charges (%)</FormLabel>
    //         <Input
    //           type="number"
    //           value={editedMakingCharges}
    //           onChange={(e) => setEditedMakingCharges(e.target.value)}
    //         />
    //       </FormControl>
    //     </ModalBody>
    //     <ModalFooter>
    //       <Button colorScheme="blue" onClick={handleSaveChanges}>
    //         Save Changes
    //       </Button>
    //       <Button variant="ghost" onClick={onClose}>
    //         Cancel
    //       </Button>
    //     </ModalFooter>
    //   </ModalContent>
    // </Modal>
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Premium Charges</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Premium Charges (%)</FormLabel>
            <Input
              type="number"
              value={editedMakingCharges}
              onChange={(e) => setEditedMakingCharges(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
//   );
// };

export default EditPremiumForm;
