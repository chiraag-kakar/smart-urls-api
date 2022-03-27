import { Request, Response, NextFunction } from "express";
import Joi from 'joi';
export const validateUrl = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      longUrl: Joi.string()
        .required()
        .custom((value, helper) => {
          let urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
              '(\\#[-a-z\\d_]*)?$',
            'i'
          ); // fragment locator
  
          if (!urlPattern.test(value)) {
              console.log('Please provide a valid URL!');
            // helper.message = 'Please provide a valid url!';
          } else {
            return true;
          }
        }),
    });
  
    let { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      return next();
    }
  };