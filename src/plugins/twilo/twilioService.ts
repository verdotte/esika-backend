import dotenv from 'dotenv/';
import { twilioClient } from './twilio';
import { ITwilioResponse } from '../../interfaces/twilio.interface';
dotenv.config();

const { TWILIO_SERVICE_ID, TWILIO_CHANNEL } = process.env;

/**
 * Twilio Service
 */
export class TwilioService {
  /**
   * Send Verication Code
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {string} phoneNumber
   * @returns {Promise<ITwilioResponse>} twilio response
   * @memberof TwilioService
   */
  sendVericationCode = async (
    phoneNumber: string,
  ): Promise<ITwilioResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await twilioClient.verify
          .services(`${TWILIO_SERVICE_ID}`)
          .verifications.create({
            to: phoneNumber,
            channel: `${TWILIO_CHANNEL}`,
          });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  /**
   * Verify Code
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {string} phoneNumber
   * @param {string} code
   * @returns {Promise<ITwilioResponse>} twilio response
   * @memberof TwilioService
   */
  verifyCode = async (
    phoneNumber: string,
    code: string,
  ): Promise<ITwilioResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await twilioClient.verify
          .services(`${TWILIO_SERVICE_ID}`)
          .verificationChecks.create({
            to: phoneNumber,
            code,
          });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
}
