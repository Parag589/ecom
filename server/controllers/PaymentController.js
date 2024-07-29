const Payment = require('../models/Payment')

const makePayment = async (req,res) => {
    try {
        const {userID,orderId, paymentMethod, paymentDate, amount} = req.body;
        const user = await Payment.findOne({userID});

        if(user){
           res.status(400).json({msg: 'Payment already done.'})
        }else{
            const Payment = new Payment({
                userID,
                orderId,
                paymentMethod,
                paymentStatus:"Done",
                paymentDate,
                amount
            });
            await Payment.save();
            res.status(200).json({msg: 'Payment successful.'});
        }
        
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' });
    }
}
