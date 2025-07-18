import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { userListResponse, userRequest, userResponse } from "../dto/user.dto";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const userList: userListResponse = await UserService.getAllUsers();
    if (!userList || userList.length == 0) {
      res.status(404).json({ message: "No Users Found" });
      return;
    }
    res.status(200).json({ message: "User Fetched Successfully", data: userList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const userBodyData: userRequest = req.body;
    const createduser: userResponse = await UserService.addUser(userBodyData);
    if (typeof createduser === "string") {
      res.status(400).json({ message: "Username Already Exists" });
    }
    // res.redirect("/login");
    res.status(201).json({ message: "User Created Successfully", data: createduser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const logindata: userRequest = req.body;
    const result: string = await UserService.loginUser(logindata);
    if (result === "No User Found with the Username") {
      return res.status(404).json({ message: result });
    }
    if (result === "Invalid Password") {
      return res.status(401).json({ message: result });
    }
    res.cookie("token", result);
    res.status(200).json({ message: "Logged In Successfully", token: result });
    // res.render("home");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
