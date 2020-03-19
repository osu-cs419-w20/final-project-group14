import { Request, Response } from 'express'

import { tokenVerify } from './googleServiceProvider'

export default [
  {
    path: '/google-token',
    method: 'post',
    handler: tokenVerify
  }
]