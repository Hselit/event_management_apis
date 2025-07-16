import { Request, Response } from "express";
import { AttendeeService } from "../services/attendeeService";
import { addAttendeeRequest, addAttendeeRes, addAttendeeResponse, getAttendeesResponse } from "../dto/attendee.dto";

export const getAllAttendee = async (req: Request, res: Response) => {
  try {
    const attendeeList: getAttendeesResponse = await AttendeeService.getAllAttendee();
    if (!attendeeList || attendeeList.length == 0) {
      res.status(404).json({ message: "No Attendee Found" });
      return;
    }
    res.status(200).json({ message: "Attendee Fetched Successfully", attendeeData: attendeeList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const addAttendee = async (req: Request, res: Response) => {
  try {
    const attendeeBodyData: addAttendeeRequest = req.body;
    const createdattendee: addAttendeeRes = await AttendeeService.addAttendee(attendeeBodyData);
    if (createdattendee == "Attendee Already present with the Email") {
      res.status(400).json({ message: createdattendee });
      return;
    }
    res.status(201).json({ message: "Attendee Created Successfully", createdattendee: createdattendee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const exportAttendees = async (req: Request, res: Response) => {
  try {
    const attendeeList: getAttendeesResponse = await AttendeeService.getAllAttendee();

    if (!attendeeList || attendeeList.length === 0) {
      return res.status(404).json({ message: "No Students Found to Export" });
    }

    const csv: string = await AttendeeService.parseAttendee(attendeeList);
    res.header("Content-Type", "text/csv");
    res.attachment("attendee.csv");

    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
