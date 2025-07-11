import { Request, Response } from "express";
import { VenueService } from "../services/venueService";
import {
  addVenueRequest,
  addVenueResponse,
  getVenueResponse,
  getVenuesResponse,
} from "../dto/venue.dto";

export const getAllVenueList = async (req: Request, res: Response) => {
  try {
    const venueList: getVenuesResponse = await VenueService.getAllVenue();
    if (!venueList || venueList.length == 0) {
      res.status(404).json({ message: "No Venue Found" });
      return;
    }
    res.status(200).json({ message: "Venue Fetched Successfully", venueData: venueList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const addVenue = async (req: Request, res: Response) => {
  try {
    const venueBodyData: addVenueRequest = req.body;
    const createdVenue: addVenueResponse = await VenueService.addVenue(venueBodyData);
    res.status(201).json({ message: "Venue Created Successfully", createdVenue: createdVenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const getVenue = async (req: Request, res: Response) => {
  try {
    const venueId: string = req.params.id;
    const venueDetail: getVenueResponse = await VenueService.getVenue(venueId);
    if (!venueDetail) {
      res.status(404).json({ message: "No Venue Found With the Id" });
    }
    res.status(200).json({ message: "Venue Fetched Successfully", venueData: venueDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
