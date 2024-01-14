# ./backend/app/main.py
from app.repositories.ticket_repository import TicketRepository
from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TICKET_FILEPATH = "../data/awesome_tickets.json"
ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)

# Placeholder for flagged tickets
flagged_tickets = set()

@app.get("/healthz")
async def root():
    return "OK"

@app.get("/tickets")
async def get_tickets(
    limit: int = 20,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_tickets(limit)
    return JSONResponse(tickets, status_code=200)

@app.post("/flag-ticket/{ticket_id}")
async def flag_ticket(ticket_id: str):
    flagged_tickets.add(ticket_id)
    return {"message": f"Ticket {ticket_id} flagged as not worth answering."}

# Updated endpoint to fetch ticket IDs and corresponding msg URLs
@app.get("/ticket-ids")
async def get_ticket_ids_with_urls(
    limit: int = 20,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    # Get tickets from the repository
    tickets = ticket_repository.get_tickets(limit)
    
    # Exclude flagged tickets
    valid_tickets = [ticket for ticket in tickets if ticket["id"] not in flagged_tickets]

    # Extract ticket IDs and create a list
    ticket_ids = [ticket["id"] for ticket in valid_tickets]

    # Extract msg URLs based on the matching msg_id
    ticket_data_list = []
    for ticket in valid_tickets:
        msg_id = ticket["msg_id"]
        # Find the corresponding message in the "messages" list
        matching_message = next((msg for msg in ticket_repository.data["messages"] if msg["id"] == msg_id), None)
        if matching_message:
            # Retrieve the "msg_url" from the matching message
            msg_url = matching_message.get("msg_url", "")
            content = matching_message.get("content", "")
            ticket_data = {"id": ticket["id"], "content": content, "msg_url": msg_url}
            ticket_data_list.append(ticket_data)

    return JSONResponse(ticket_data_list, status_code=200)

if __name__ == "__main__":
    import uvicorn 
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
