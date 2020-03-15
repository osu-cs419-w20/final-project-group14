import { Request, Response } from 'express'
import { google } from 'googleapis'
import dotenv from 'dotenv'


export async function tokenVerify(req: Request, res: Response) {
  res.status(200).send("GoogleTokenVerify")
}