const Order = require('../../models/Order');
const User = require('../../models/User'); // Changed from lowercase 'user' to 'User'


const placeAnOrder = async (userId, orderDescription, address) => {
    const activeOrder = await Order.findOne({ user: userId, orderStatus: 'Pending' });
    const user = await User.findById(userId);
   

    if(!activeOrder || !userData) {
        return {status: 404, data: 'Order or user not found.'};
    }
    activeOrder.orderDescription = orderDescription;
    activeOrder.address = address;
    activeOrder.orderStatus = 'Placed';
    await activeOrder.save();
    
    const newOrder = new Order({
                amount: 0,
                address: 'Default Address',
                orderStatus: 'Pending',
                user: user._id,
            });
            await newOrder.save();
    return {status: 200, data: activeOrder};
};


module.exports = {
    placeAnOrder
    
};