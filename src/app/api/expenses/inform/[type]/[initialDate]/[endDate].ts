import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { initialDate, endDate, type } = req.query;
    if (req.method === 'GET' && initialDate && endDate) {
        try {
            const getString = `http://localhost:5148/api/expenses/month/${type}/${initialDate}/${endDate}`;

            const result = await axios.get(getString);

            console.log({ getString, data: result.data });
            return res.send(result.data);
        } catch (error) {
            if (typeof error === 'string') {
                res.send(error.toUpperCase());
            } else if (error instanceof Error) {
                res.send(error.message);
            }
        }
    }
}
