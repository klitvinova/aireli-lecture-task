import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"
import { create } from 'node:domain';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    };

  const newUser: PlatformUser = {
    id: null,
    email,
    password
  };

  const savedUser = createUser(newUser);

  res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: (await savedUser).id,
        email: (await savedUser).email
      }
    });

};