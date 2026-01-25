import { Router } from "express";
import { io } from "../../../main";
import type { Data, uuid } from "../../../types";

export const testRouter = Router();

testRouter.post("/sendMessage", (req, res) => {
    const {containerId} = req.params as {containerId: uuid};
    const {data} = req.body as {data: Data}
    io.to(containerId).emit("test-message", data);
    res.send();
})