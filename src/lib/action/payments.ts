import { BASE_URL } from "../config/api"

export const checkoutVerify = async (sessionId: string) => {
    const response = await fetch(`${BASE_URL}/api/transactions/checkout-verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json()
}