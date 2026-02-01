import type { Request, Response } from "express";

class DirectMessageControllerImpl {
    sendDM(req: Request, res: Response){
    }
}

export const DirectMessageController = new DirectMessageControllerImpl();