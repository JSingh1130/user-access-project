import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Request as AccessRequest } from "../entities/Request";
import { User } from "../entities/User";
import { Software } from "../entities/Software";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest"; // adjust path



const requestRepo = AppDataSource.getRepository(AccessRequest);
const userRepo = AppDataSource.getRepository(User);
const softwareRepo = AppDataSource.getRepository(Software);

// ▶ EMPLOYEE: Submit access request
export const createAccessRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { softwareId, accessType, reason } = req.body;
    const userId = (req as any).user.id;

    const user = await userRepo.findOneBy({ id: userId });
    const software = await softwareRepo.findOneBy({ id: softwareId });

    if (!user || !software) {
      res.status(404).json({ message: "User or Software not found" });
      return;
    }

    const newRequest = requestRepo.create({
      user,
      software,
      accessType,
      reason,
      status: "Pending",
    });

    await requestRepo.save(newRequest);
    res.status(201).json({ message: "Access request submitted", request: newRequest });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit request", details: err });
  }
};

// ▶ MANAGER: Get all access requests
export const getAllRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await requestRepo.find({
      relations: ["user", "software"],
      order: { id: "DESC" },
    });

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch requests", details: error });
  }
};

export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestId = parseInt(req.params.id);
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      res.status(400).json({ message: "Invalid status. Use 'Approved' or 'Rejected'." });
      return;
    }

    const request = await requestRepo.findOne({
      where: { id: requestId },
      relations: ["user", "software"],
    });

    if (!request) {
      res.status(404).json({ message: "Request not found" });
      return;
    }

    request.status = status;
    await requestRepo.save(request);

    res.status(200).json({ message: `Request ${status.toLowerCase()}`, request });
  } catch (error) {
    res.status(500).json({ error: "Failed to update request", details: error });
  }
};
export const getOwnRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    const requests = await requestRepo.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ["software"],
    });

    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};