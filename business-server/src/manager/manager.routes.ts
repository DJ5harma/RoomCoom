import { Router } from "express";
import { ManagerController } from "./manager.controller";

export const managerRouter = Router();

managerRouter.get("/my-rooms", ManagerController.getMyRooms);
managerRouter.post("/create-room", ManagerController.createRoom);
