import { getUserResponse, userBaseResponse, userListResponse, userRequest, userResponse } from "../dto/user.dto";
import { ecryptPassword, generateToken, verifyPassword } from "../middleware/loginMiddleware";
import { prisma } from "../utils/prisma";

export class UserService {
  static async addUser(userdata: userRequest) {
    try {
      const isUserExist: userResponse = await UserService.getUserbyUsername(userdata);
      if (typeof isUserExist !== "string") {
        return "Username Already Exists";
      }
      const hashedpass: string = await ecryptPassword(userdata.password);
      const createdUser: userBaseResponse = await prisma.user.create({
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

  static async getUserbyUsername(logindata: userRequest) {
    try {
      const userdata: getUserResponse = await prisma.user.findUnique({ where: { username: logindata.username } });
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
      const usersList: userListResponse = await prisma.user.findMany();
      if (!usersList) {
        return "No User Found";
      }
      return usersList;
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(logindata: userRequest) {
    try {
      const isUserExist: userResponse = await UserService.getUserbyUsername(logindata);
      if (typeof isUserExist == "string") {
        return isUserExist;
      }
      const checkpassword: boolean = await verifyPassword(logindata.password, isUserExist.password);
      if (!checkpassword) {
        return "Invalid Password";
      }
      const token: string = await generateToken(logindata.username, isUserExist.role);
      return token;
    } catch (error) {
      throw error;
    }
  }
}
