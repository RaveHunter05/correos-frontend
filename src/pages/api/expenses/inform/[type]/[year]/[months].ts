import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { year, months, type } = req.query;
    if (req.method === 'GET' && year && months) {
        try {
            console.log({ year, months });
            const monthsArray = Array.isArray(months)
                ? months
                : months.split(',');

            const monthsString = monthsArray.join('&months=');

            console.log({ monthsString });

            const getString = `http://localhost:5148/api/expenses/month/${type}/${year}?months=${monthsString}`;

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
