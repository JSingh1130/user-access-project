import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Software } from "../entities/Software";

const softwareRepo = AppDataSource.getRepository(Software);

export const createSoftware = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, accessLevels } = req.body;

    const newSoftware = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(newSoftware);

    res.status(201).json({ message: "Software created", software: newSoftware });
  } catch (error) {
    res.status(500).json({ error: "Failed to create software", details: error });
  }
};


export const getAllSoftware = async (req: Request, res: Response): Promise<void> => {
  try {
    const allSoftware = await softwareRepo.find();
    res.status(200).json(allSoftware);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch software" });
  }
};

