import { prisma } from "../utils/prisma";

export class VenueService {
  static async addVenue(venuedata: any) {
    try {
      const createdVenue = await prisma.venue.create({ data: venuedata });
      return createdVenue;
    } catch (error) {
      throw error;
    }
  }

  static async getAllVenue() {
    try {
      const venueList = await prisma.venue.findMany();
      return venueList;
    } catch (error) {
      throw error;
    }
  }

  static async getVenue(venueId: string) {
    try {
      const venueDetail = await prisma.venue.findUnique({ where: { id: venueId } });
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
      const venueDetails: any = await VenueService.getVenue(venueId);
      if (typeof venueDetails == "string") {
        return "No Venue Found With the Id";
      }

      if (venueDetails.capacity == 0) {
        return "Venue Reached Maximum Capacity";
      }

      const updatedVenue = await prisma.venue.update({
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
