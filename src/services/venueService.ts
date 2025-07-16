import { addVenueRequest, addVenueResponse, getVenueReponse, getVenueResponse, getVenuesResponse } from "../dto/venue.dto";
import { prisma } from "../utils/prisma";

export class VenueService {
  static async addVenue(venuedata: addVenueRequest) {
    try {
      const createdVenue: addVenueResponse = await prisma.venue.create({ data: venuedata });
      return createdVenue;
    } catch (error) {
      throw error;
    }
  }

  static async getAllVenue() {
    try {
      const venueList: getVenuesResponse = await prisma.venue.findMany();
      return venueList;
    } catch (error) {
      throw error;
    }
  }

  static async getVenue(venueId: string) {
    try {
      const venueDetail: getVenueReponse = await prisma.venue.findUnique({ where: { id: venueId } });
      if (!venueDetail) {
        return "No Venue Found with the Id";
      }
      return venueDetail;
    } catch (error) {
      throw error;
    }
  }

  static async updateVenueCapacity(venueId: string) {
    try {
      const venueDetails: getVenueResponse = await VenueService.getVenue(venueId);
      if (typeof venueDetails == "string") {
        return "No Venue Found With the Id";
      }

      if (venueDetails.capacity == 0) {
        return "Venue Reached Maximum Capacity";
      }

      const updatedVenue: addVenueResponse = await prisma.venue.update({
        where: { id: venueId },
        data: {
          capacity: {
            decrement: 1,
          },
        },
      });
      return updatedVenue;
    } catch (error) {
      throw error;
    }
  }
}
