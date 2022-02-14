import ticketListReducer from "../../reducers/ticket-list-reducer";

describe("ticketListReducer", () => {

  let action;
  const ticketData = {
    names: "Ryan & Aimen",
    location: "4b",
    issue: "Redux action is not working correctly.",
    id: 1
  };

  const testState = {
    1: {
      names: "Ryan & Aimen",
      location: "4b",
      issue: "Redux action is not working correctly.",
      id: 1
    },
    2: {
      names: "Jasmine & Justine",
      location: "2a",
      issue: "Reducer has side effects.",
      id: 2
    }
  };

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(ticketListReducer({}, {
      type: null
    })).toEqual({});
  });

  test("Should successfully add new ticket data to mainTicketList", () => {
    const {
      names,
      location,
      issue,
      id
    } = ticketData;
    action = {
      type: "ADD_TICKET",
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    expect(ticketListReducer({}, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  });

  test("Should successfully edit ticket data already in mainTicketList", () => {
    const {
      names,
      location,
      issue,
      id
    } = ticketData;
    const addAction = {
      type: "ADD_TICKET",
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    const addedTicket = ticketListReducer({}, action);

    const editNames = "Hannah & Anna";
    const editLocation = "5B";
    const editIssue = "Computer is on fire";

    const editAction = {
      type: "ADD_TICKET",
      names: editNames,
      location: editLocation,
      issue: editIssue,
      id: id
    };

    expect(ticketListReducer(addedTicket, editAction)).toEqual({
      [id]: {
        names: editNames,
        location: editLocation,
        issue: editIssue,
        id: id
      }
    });
  });

  test("Should successfully delete a ticket", () => {
    action = {
      type: "DELETE_TICKET",
      id: 1
    };
    expect(ticketListReducer(testState, action)).toEqual({
      2: {
        names: "Jasmine & Justine",
        location: "2a",
        issue: "Reducer has side effects.",
        id: 2
      }
    });
  });
});