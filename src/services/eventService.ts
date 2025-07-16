import { prisma } from "../utils/prisma";
import { VenueService } from "./venueService";
import { addEventRequest, addEventResponse, eventResponse, getEventResponse, getEventsResponse, updateEventRequest } from "../dto/event.dto";
import { checkVenueResponse, getVenueResponse } from "../dto/venue.dto";
import { addAttendeeRequest, addAttendeeResponse, getAttendeeDetails, getAttendeesResponse, getEventAttendeeResponse } from "../dto/attendee.dto";

export class EventService {
  static async getEvents() {
    try {
      const eventList: getEventsResponse = await prisma.event.findMany();
      return eventList;
    } catch (error) {
      throw error;
    }
  }

  static async getEvent(eventId: string) {
    try {
      const eventData: getEventResponse = await prisma.event.findUnique({ where: { id: eventId } });
      return eventData;
    } catch (error) {
      throw error;
    }
  }

  static async checkEventByVenueId(venueId: string) {
    try {
      const isEventPresent: getEventResponse = await prisma.event.findUnique({ where: { venueId: venueId } });
      if (isEventPresent) {
        return "Venue is Booked with another Event";
      }
      return isEventPresent;
    } catch (error) {
      throw error;
    }
  }

  static async createEvent(eventdata: addEventRequest, venueid: string) {
    try {
      const checkVenue: getVenueResponse = await VenueService.getVenue(venueid);
      if (!checkVenue) {
        return "No Venue Found With this Id";
      }

      const checkVenueEvent: checkVenueResponse = await EventService.checkEventByVenueId(venueid);
      if (typeof checkVenueEvent == "string") {
        return checkVenueEvent;
      }

      const createdEvent: addEventResponse = await prisma.event.create({ data: eventdata });
      return createdEvent;
    } catch (error) {
      throw error;
    }
  }

  static async updateEvent(eventdata: updateEventRequest, eventId: string) {
    try {
      const eventDetails: getEventResponse = await EventService.getEvent(eventId);
      if (!eventDetails) {
        return "No Event Found with the Id";
      }
      const updatedEvent: eventResponse = await prisma.event.update({ data: eventdata, where: { id: eventId } });
      return "Event Updated Successfully";
    } catch (error) {
      throw error;
    }
  }

  static async deleteEvent(eventId: string) {
    try {
      const eventDetails: getEventResponse = await EventService.getEvent(eventId);
      if (!eventDetails) {
        return "No Event Found with the Id";
      }
      await prisma.event.delete({ where: { id: eventId } });
      return "Event Updated Successfully";
    } catch (error) {
      throw error;
    }
  }

  static async registerAttendee(attendeedata: addAttendeeRequest, eventId: string) {
    try {
      const eventDetails: getEventResponse = await EventService.getEvent(eventId);
      if (!eventDetails) {
        return "No Event Found With the Id";
      }
      const updatedVenue: getVenueResponse = await VenueService.updateVenueCapacity(eventDetails.venueId);
      if (typeof updatedVenue == "string") {
        return updatedVenue;
      }
      const registeredAttendees: addAttendeeResponse = await prisma.attendee.create({
        data: {
          name: attendeedata.name,
          email: attendeedata.email,
          eventAttendee: {
            create: {
              eventId: eventId,
            },
          },
        },
      });
      return registeredAttendees;
    } catch (error) {
      throw error;
    }
  }

  static async getAttendeesByEventId(eventId: string) {
    try {
      const eventDetails = await prisma.eventAttendee.findMany({
        where: { eventId: eventId },
        select: {
          Attendee: {
            select: {
              name: true,
              email: true,
              registeredAt: true,
            },
          },
        },
      });
      if (!eventDetails) {
        return "No Event Found with the Id";
      }
      const attendeeList: getAttendeeDetails = eventDetails.map((attendee) => attendee.Attendee);
      const totalAttendeesCount = await prisma.eventAttendee.count({
        where: { eventId: eventId },
      });
      const resultData: getEventAttendeeResponse = {
        totalCount: totalAttendeesCount,
        attendee: attendeeList,
      };
      return resultData;
    } catch (error) {
      throw error;
    }
  }

  static async getEventWithLimits(page: number, limit: number) {
    try {
      const offset = (page - 1) * limit;
      const eventData = await prisma.event.findMany({
        skip: offset,
        take: limit,
      });
      return eventData;
    } catch (error) {
      throw error;
    }
  }
}
