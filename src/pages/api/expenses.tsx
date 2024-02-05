import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export const expensesAPI = async () => {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const response = await axios.get(
                'http://localhost:5148/api/expenses',
                {
                    headers: {
                        Authorization: req.headers.authorization,
                    },
                }
            );
            res.send(response.data);
        } catch (error) {
            if (typeof error === 'string') {
                res.send(error.toUpperCase());
            } else if (error instanceof Error) {
                res.send(error.message);
            }
        }
    }
}
