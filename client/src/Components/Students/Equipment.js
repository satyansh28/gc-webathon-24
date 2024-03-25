import React, { useState, useEffect, useContext } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Chip,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add, Remove, TouchApp } from "@mui/icons-material";
import UserContext from "../UserContext";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "rgb(0,0,0)",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "rgb(0,0,0)",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const availableEquipmentsData = [
  { type: "Weight Benches", quantity: 6 },
  { type: "Dumbbells (various sets)", quantity: 10 },
  { type: "Yoga Mats", quantity: 20 },
  { type: "Exercise Balls", quantity: 15 },
  { type: "Jump Ropes", quantity: 10 },
  { type: "Basketball", quantity: 2 },
  { type: "Volleyball", quantity: 1 },
  { type: "Soccer Balls", quantity: 0 },
  { type: "Tennis Rackets", quantity: 3 },
  { type: "Ping Pong Paddles", quantity: 4 },
  { type: "Pool Cues", quantity: 8 },
  { type: "Chess Boards", quantity: 5 },
  { type: "Board Games", quantity: 8 },
];

const issuedEquipmentsData = [
  { type: "Volleyball", quantity: 2 },
  { type: "Soccer Balls", quantity: 3 },
  { type: "Tennis Rackets", quantity: 4 },
  { type: "Ping Pong Paddles", quantity: 2 },
  { type: "Pool Cues", quantity: 4 },
];

const Equipment = () => {
  const navigate = useNavigate();
  const [sectionType, setSectionType] = useState("Issue");
  const [isLoading, setIsLoading] = useState(true);
  const [issuedEquipments, setIssuedEquipments] = useState(null);
  const [availableEquipments, setAvailableEquipments] = useState(null);
  // curentEquipment = [{type: "basketball", count: 0}]
  const [currentEquipments, setCurrentEquipments] = useState(null);

  const handleSubmit = (event) => {
    let updatedAvailableEquipmentsData = [];
    let updatedIssuedEquipmentsData = [];
    if (sectionType === "Issue") {
      updatedAvailableEquipmentsData = currentEquipments.map((equipment) => {
        return {
          type: equipment.type,
          quantity: equipment.totalQuantity - equipment.quantity,
        };
      });
      const issuedData = {};
      currentEquipments.map((equip) => {
        if (equip.quantity > 0) {
          issuedData[equip.type] = equip.quantity;
        }
      });

      issuedEquipments.map((equip) => {
        if (equip.quantity > 0) {
          issuedData[equip.type] += equip.quantity;
        }
      });
      Object.entries(issuedData).forEach(([key, value]) => {
        updatedIssuedEquipmentsData.push({ type: key, quantity: value });
      });
    } else {
      const availableData = {};
      currentEquipments.map((equip) => {
        if (equip.quantity > 0) {
          availableData[equip.type] = equip.quantity;
        }
      });

      availableEquipments.map((equip) => {
        if (equip.quantity > 0) {
          availableData[equip.type] += equip.quantity;
        }
      });
      Object.entries(availableData).forEach(([key, value]) => {
        updatedAvailableEquipmentsData.push({ type: key, quantity: value });
      });

      updatedIssuedEquipmentsData = currentEquipments
        .map((equip) => {
          return {
            type: equip.type,
            quantity: equip.totalQuantity - equip.quanti,
          };
        })
        .filter((equip) => {
          return equip.quantity > 0;
        });
    }
    // api call to send `updatedIssuedEquipmentsData` and `updatedAvailableEquipmentsData`
    console.log("updated Issued Equipments: ", updatedAvailableEquipmentsData);
    console.log("updated available Equipments: ", updatedIssuedEquipmentsData);
    navigate("/courses");
    event.preventDefault();
  };

  const handleChange = (event, updatedSectionType) => {
    if (updatedSectionType === "Issue" || updatedSectionType === "ISSUE") {
      setSectionType(updatedSectionType);
      const updatedCurrentEquipments = availableEquipments.map((equipment) => {
        return {
          type: equipment.type,
          totalQuantity: equipment.quantity,
          quantity: 0,
        };
      });
      setCurrentEquipments(updatedCurrentEquipments);
    } else if (
      updatedSectionType === "Return" ||
      updatedSectionType === "RETURN"
    ) {
      setSectionType(updatedSectionType);
      const updatedCurrentEquipments = issuedEquipments.map((equipment) => {
        return {
          type: equipment.type,
          totalQuantity: equipment.quantity,
          quantity: 0,
        };
      });
      setCurrentEquipments(updatedCurrentEquipments);
    }
  };

  useEffect(() => {
    // api call to get `issuedEquipmentsData` and `availableEquipmentsData`
    console.log(availableEquipmentsData);
    setAvailableEquipments(availableEquipmentsData);
    setIssuedEquipments(issuedEquipmentsData);
    const initialCurrentEquipments = availableEquipmentsData.map(
      (equipment) => {
        return {
          type: equipment.type,
          totalQuantity: equipment.quantity,
          quantity: 0,
        };
      }
    );
    setCurrentEquipments(initialCurrentEquipments);
    setIsLoading(false);
  }, []);

  const updateCurrentEquipments = (index, newEquipment) => {
    const updatedCurrentEquipments = [...currentEquipments];
    updatedCurrentEquipments[index] = newEquipment;
    setCurrentEquipments(updatedCurrentEquipments);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  const oppositeAction = { Issue: "Return", Return: "Issue" };
  const columnsDetails = [
    { columnName: "Equipment type", columnType: "text", align: "left" },
    {
      columnName: `${sectionType} Quantity`,
      columnType: "text",
      align: "center",
    },
    {
      columnName: oppositeAction[sectionType],
      columnType: "chip",
      align: "right",
    },
  ];
  console.log(sectionType);
  return (
    <Box sx={{ height: "95vh", overflow: "hidden" }}>
      <Box sx={{ width: "100%", height: "92%" }} className="d-flex flex-column">
        <Tabs
          value={sectionType}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab value="Issue" label="Issue" />
          <Tab value="Return" label="Return" />
        </Tabs>
        <TableContainer
          component={Paper}
          className="shadow flex-grow-1"
          sx={{ overflowY: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {columnsDetails.map((columnDetails, index) => {
                  return (
                    <TableCell
                      className="tauri-regular"
                      sx={{ fontWeight: 600, fontSize: "1.05em" }}
                      key={index}
                      align={columnDetails.align}
                    >
                      {columnDetails.columnName}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentEquipments.map((equipment, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="poppins-medium" align="left">
                      {equipment.type}
                    </TableCell>
                    <TableCell className="poppins-medium" align="center">
                      {equipment.totalQuantity}
                    </TableCell>
                    <TableCell className="poppins-medium" align="right">
                      <ThemeProvider theme={theme}>
                        <Chip
                          // style={{ width: "10em" }}
                          label={
                            <Box className="d-flex align-items-center">
                              <Button
                                onClick={() => {
                                  const currentQuantity = equipment.quantity;
                                  if (currentQuantity > 0) {
                                    const newEquipment = {
                                      ...equipment,
                                      quantity: currentQuantity - 1,
                                    };
                                    updateCurrentEquipments(
                                      index,
                                      newEquipment
                                    );
                                  }
                                }}
                              >
                                <Remove style={{ fontSize: "medium" }} />
                              </Button>
                              <Typography style={{ fontWeight: 600 }}>
                                {equipment.quantity}
                              </Typography>
                              <Button
                                onClick={() => {
                                  const currentQuantity = equipment.quantity;
                                  if (
                                    currentQuantity < equipment.totalQuantity
                                  ) {
                                    const newEquipment = {
                                      ...equipment,
                                      quantity: currentQuantity + 1,
                                    };
                                    updateCurrentEquipments(
                                      index,
                                      newEquipment
                                    );
                                  }
                                }}
                              >
                                <Add style={{ fontSize: "medium" }} />
                              </Button>
                            </Box>
                          }
                          // color={chipColour}
                        />
                      </ThemeProvider>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box className="d-flex justify-content-center" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default Equipment;
