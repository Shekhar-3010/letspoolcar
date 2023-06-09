import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker, MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function CreateTrip() {
  const [tripName, setTripName] = useState("");
  const [tripDate, setTripDate] = useState(new Date());
  const [tripDest, setTripDest] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tripName === "") {
      alert("Please enter a trip name");
      return;
    }

    console.log("tripDate", tripDate);
    fetch("https://poolserver.hop.sh/createTrip", {
      headers: {
        name: tripName,
        tripDate: tripDate,
        destination: tripDest,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/display?tripId=${data.channelId}`);
      });
  };
  return (
    <>
      <Box
        height="100vh"
        weight="100vw"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "gray",
          
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Typography 
            variant="h1" 
            align="center" 
            fontSize="60px">
            Create Trip
          </Typography>
          <Stack
            justifyContent="center"
            spacing={2}
            sx={{
              backgroundColor: "white",
              padding: "8%",
              borderRadius: "20px",
            }}
          >
            <TextField
              required
              id="tripName"
              label="what's the trip name"
              variant="outlined"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
            {window.innerWidth < 600 &&
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={tripDate}
                  onChange={(val) => setTripDate(val)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            }
            {window.innerWidth >= 600 && 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={tripDate}
                  onChange={(val) => setTripDate(val)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            }

            <TextField
              id="tripDest"
              label="Destination"
              variant="outlined"
              value={tripDest}
              onChange={(e) => setTripDest(e.target.value)}
            />
            <></>
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
