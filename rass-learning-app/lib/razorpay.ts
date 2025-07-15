// import Razorpay from 'razorpay'

// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   throw new Error('Razorpay keys are not configured')
// }

// export const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// })

import Razorpay from 'razorpay'

let razorpayInstance: Razorpay | null = null

export function getRazorpay() {
  if (!razorpayInstance) {
    const keyId = process.env.RAZORPAY_KEY_SECRET
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      throw new Error('Razorpay keys are not configured')
    }

    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })
  }

  return razorpayInstance
}

// Export a getter instead of the instance directly
export const razorpay = {
  get orders() {
    return getRazorpay().orders
  },
  get payments() {
    return getRazorpay().payments
  }
}