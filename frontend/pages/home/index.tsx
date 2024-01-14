import * as React from "react";
import { NextPage } from "next";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        {/* Use Link component for client-side navigation */}
        <div style={{ display: "flex", gap: "16px" }}>
          {/* Knowledge Icon Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "12rem", // Adjusted width for larger boundary box
              height: "12rem", // Adjusted height for larger boundary box
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px", // Added border radius for rounded corners
              backgroundColor: "transparent", // Set the background color to transparent
              boxShadow: "none", // Remove the box shadow
            }}
          >
            {/* Use Image component for SVG icon */}
            <Image src="/knowledge-icon.svg" alt="Knowledge Icon" width={300} height={150} />
          </Button>

          {/* Tickets Button */}
          <Link href="/tickets" passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "12rem", // Adjusted width for larger boundary box
                height: "12rem", // Adjusted height for larger boundary box
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px", // Added border radius for rounded corners
                backgroundColor: "transparent", // Set the background color to transparent
                boxShadow: "none", // Remove the box shadow
              }}
            >
              {/* Use Image component for SVG icon */}
              <Image src="/tickets-button.svg" alt="Tickets Button" width={300} height={150} />
            </Button>
          </Link>

          {/* FAQ Icon Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "12rem", // Adjusted width for larger boundary box
              height: "12rem", // Adjusted height for larger boundary box
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px", // Added border radius for rounded corners
              backgroundColor: "transparent", // Set the background color to transparent
              boxShadow: "none", // Remove the box shadow
            }}
          >
            {/* Use Image component for SVG icon */}
            <Image src="/faq-icon.svg" alt="FAQ Icon" width={300} height={150} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
