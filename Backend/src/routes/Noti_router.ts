import { Router } from "express";
import asyncHandler from "express-async-handler";
import { NotificationView } from "../views/NotificationView";

const router = Router()


router.get("/:userId",asyncHandler(
    async (_req, res) => {
      const notifications = await (new NotificationView().getUserNotifications(_req))
      res.send(notifications)
    })
)



export default router