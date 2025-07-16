import { Request, Response } from "express";
import { EventService } from "../services/eventService";
import { addEventRequest, addEventResponse, getEventResponse, getEventsResponse, updateEventRequest } from "../dto/event.dto";
import { addAttendeeRequest, getEventAttResponse } from "../dto/attendee.dto";

export const getAllEventList = async (req: Request, res: Response) => {
  try {
    const eventList: getEventsResponse = await EventService.getEvents();
    if (!eventList || eventList.length == 0) {
      res.status(404).json({ message: "No Event Found" });
      return;
    }
    res.status(200).json({ message: "Event Fetched Successfully", eventData: eventList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const bookVenueForEvent = async (req: Request, res: Response) => {
  try {
    const eventBodyData: addEventRequest = req.body;
    const createdEvent: addEventResponse = await EventService.createEvent(eventBodyData, eventBodyData.venueId);
    res.status(201).json({ message: "Event Created Successfully", createdEvent: createdEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventBodyData: updateEventRequest = req.body;
    const eventId: string = req.params.id;
    const updatedEvent: string = await EventService.updateEvent(eventBodyData, eventId);
    res.status(201).json({ message: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId: string = req.params.id;
    const deletedEvent: string = await EventService.deleteEvent(eventId);
    if (deletedEvent == "No Event Found with the Id") {
      res.status(404).json({ message: deletedEvent });
      return;
    }
    res.status(201).json({ message: deletedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const eventId: string = req.params.id;
    const eventDetail: getEventResponse = await EventService.getEvent(eventId);
    if (!eventDetail) {
      res.status(404).json({ message: "No Event Found With the Id" });
    }
    res.status(200).json({ message: "Event Fetched Successfully", eventData: eventDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const registerAttendee = async (req: Request, res: Response) => {
  try {
    const attendeeDetails: addAttendeeRequest = req.body;
    const eventId: string = req.params.id;
    const registerResponse = await EventService.registerAttendee(attendeeDetails, eventId);
    if (typeof registerResponse == "string") {
      res.status(400).json({ message: registerResponse });
    }
    res.status(200).json({ message: "Attendee Registered Succesfully", attendeeData: registerResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const getEventAttendees = async (req: Request, res: Response) => {
  try {
    const eventId: string = req.params.id;
    const eventAttendeesList: getEventAttResponse = await EventService.getAttendeesByEventId(eventId);
    if (!eventAttendeesList) {
      res.status(404).json({ message: "No Attendees Found" });
    }
    res.status(200).json({ message: "Event Attendees Fteched Successfully", attendeesList: eventAttendeesList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const getEventByPage = async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 0;

    const eventData: getEventsResponse = await EventService.getEventWithLimits(page, limit);
    if (!eventData || eventData.length == 0) {
      res.status(404).json({ message: "No Events Found" });
    }
    res.status(200).json({ message: "Event Fetched Successfully", eventData: eventData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
