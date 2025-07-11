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
}
