import { email } from "./../../node_modules/zod/src/v4/core/regexes";
import { prisma } from "../utils/prisma";
import tr from "zod/v4/locales/tr.cjs";
import { VenueService } from "./venueService";

export class EventService {
  static async getEvents() {
    try {
      const eventList = await prisma.event.findMany();
      return eventList;
    } catch (error) {
      throw error;
    }
  }

  static async getEvent(eventId: string) {
    try {
      const eventData = await prisma.event.findUnique({ where: { id: eventId } });
      return eventData;
    } catch (error) {
      throw error;
    }
  }

  static async checkVenueEvent(venueId: string) {
    try {
      const isEventPresent = await prisma.event.findUnique({ where: { venueId: venueId } });
      if (isEventPresent) {
        return "Venue is Booked with another Event";
      }
      return isEventPresent;
    } catch (error) {
      throw error;
    }
  }

  static async createEvent(eventdata: any, venueid: string) {
    try {
      const checkVenue = await VenueService.getVenue(venueid);
      if (!checkVenue) {
        return "No Venue Found With this Id";
      }

      const checkVenueEvent = await EventService.checkVenueEvent(venueid);
      console.log(typeof checkVenueEvent);
      if (typeof checkVenueEvent == "string") {
        return checkVenueEvent;
      }

      const createdEvent = await prisma.event.create({ data: eventdata });
      return createdEvent;
    } catch (error) {
      throw error;
    }
  }

  static async updateEvent(eventdata: any, eventId: string) {
    try {
      const eventDetails = await EventService.getEvent(eventId);
      if (!eventDetails) {
        return "No Event Found with the Id";
      }
      const updatedEvent = await prisma.event.update({ data: eventdata, where: { id: eventId } });
      return "Event Updated Successfully";
    } catch (error) {
      throw error;
    }
  }

  static async deleteEvent(eventId: string) {
    try {
      const eventDetails = await EventService.getEvent(eventId);
      if (!eventDetails) {
        return "No Event Found with the Id";
      }
      await prisma.event.delete({ where: { id: eventId } });
      return "Event Updated Successfully";
    } catch (error) {
      throw error;
    }
  }

  static async registerAttendee(attendeedata: any, eventId: string) {
    try {
      const eventDetails = await EventService.getEvent(eventId);
      if (!eventDetails) {
        return "No Event Found With the Id";
      }
      const updatedVenue = await VenueService.updateVenueCapacity(eventDetails.venueId);
      if (typeof updatedVenue == "string") {
        return updatedVenue;
      }
      const registeredAttendees = await prisma.attendee.create({
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
      let resultData: any = {};
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
      const attendeeList = eventDetails.map((a) => a.Attendee);
      // console.log(eventDetails);
      const totalAttendeesCount = await prisma.eventAttendee.count({
        where: { eventId: eventId },
      });
      resultData.totalCount = totalAttendeesCount;
      resultData.attendees = attendeeList;
      // Map to flatten out Attendee from wrapper object
      // const formatted = eventDetails.map((ea) => ea.Attendee)
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
