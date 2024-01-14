// ./frontend/pages/tickets.tsx
import React, { useEffect, useState } from "react";
import { NextPage } from "next";

const TicketsPage: NextPage = () => {
  const [ticketData, setTicketData] = useState<{ ids: string[]; contents: string[]; msgUrls: string[] }>({
    ids: [],
    contents: [],
    msgUrls: [],
  });

  const [clickedLinks, setClickedLinks] = useState<Set<number>>(new Set());

  // Function to fetch ticket IDs, content, and msg URLs from the backend
  const fetchTicketData = async () => {
    try {
      const response = await fetch("http://localhost:5001/ticket-ids");
      const data = await response.json();
      setTicketData({
        ids: data.map((item: { id: string; content: string; msg_url: string }) => item.id),
        contents: data.map((item: { id: string; content: string; msg_url: string }) => item.content),
        msgUrls: data.map((item: { id: string; content: string; msg_url: string }) => item.msg_url),
      
      });
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  // Function to handle link click and change the color
  const handleLinkClick = (index: number) => {
    const updatedClickedLinks = new Set(clickedLinks);
    updatedClickedLinks.add(index);
    setClickedLinks(updatedClickedLinks);
  };

  // Function to handle "Not Worth Answering" button click
  const handleFlagTicket = async (ticketId: string) => {
    try {
      await fetch(`http://localhost:5001/flag-ticket/${ticketId}`, {
        method: "POST",
      });

      // After flagging the ticket, refresh the ticket data excluding flagged tickets
      fetchTicketData();
    } catch (error) {
      console.error(`Error flagging ticket ${ticketId}:`, error);
    }
  };

  useEffect(() => {
    // Fetch ticket IDs, content, and msg URLs when the component mounts
    fetchTicketData();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Tickets Page</h1>
      {/* Display the fetched ticket IDs, content, and msg URLs in a table */}
      <table style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Question</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ticketData.ids.map((ticketId, index) => (
            <tr key={ticketId}>
              <td>
                <a
                  href={ticketData.msgUrls[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: clickedLinks.has(index) ? "lilac" : "lightblue",
                    textDecoration: "none",
                  }}
                  onClick={() => handleLinkClick(index)}
                >
                  {ticketData.contents[index]}
                </a>
              </td>
              <td>
                <button
                  style={{
                    backgroundColor: "lightcoral",
                    color: "white",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleFlagTicket(ticketId)}
                >
                  Not Worth Answering
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsPage;
