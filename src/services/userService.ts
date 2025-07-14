import { ecryptPassword, generateToken, verifyPassword } from "../middleware/loginMiddleware";
import { prisma } from "../utils/prisma";

export class UserService {
  static async addUser(userdata: any) {
    try {
      const hashedpass = await ecryptPassword(userdata.password);
      const createdUser = await prisma.user.create({
        data: {
          username: userdata.username,
          password: hashedpass,
          role: "User",
        },
      });
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserbyUsername(logindata: any) {
    try {
      const userdata = await prisma.user.findUnique({ where: { username: logindata.username } });
      if (!userdata) {
        return "No User Found with the Username";
      }
      return userdata;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const usersList = await prisma.user.findMany();
      if (!usersList) {
        return "No User Found";
      }
      return usersList;
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(logindata: any) {
    try {
      const isUserExist = await UserService.getUserbyUsername(logindata);
      if (typeof isUserExist == "string") {
        return isUserExist;
      }
      const checkpassword = await verifyPassword(logindata.password, isUserExist.password);
      if (!checkpassword) {
        return "Invalid Password";
      }
      const token = await generateToken(logindata.username, isUserExist.role);
      return token;
    } catch (error) {
      throw error;
    }
  }
}
