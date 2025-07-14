import { Parser } from "json2csv";
import { prisma } from "../utils/prisma";

export class AttendeeService {
  static async getAllAttendee() {
    try {
      const attendeeList = await prisma.attendee.findMany();
      return attendeeList;
    } catch (error) {
      throw error;
    }
  }

  static async addAttendee(attendeeData: any) {
    try {
      const createdAttendee = await prisma.attendee.create({ data: attendeeData });
      return createdAttendee;
    } catch (error) {
      throw error;
    }
  }

  static async parseAttendee(attendeeList: any) {
    try {
      // const attendeeList = await AttendeeService.getAllAttendee();
      // if (!attendeeList || attendeeList.length == 0) {
      //   return "No Students Found to Export";
      // }

      const fields = ["id", "name", "email", "registeredAt"];
      const parser = new Parser({ fields: fields });
      const csv: string = parser.parse(attendeeList);
      return csv;
    } catch (error) {
      throw error;
    }
  }
}
