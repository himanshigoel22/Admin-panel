const Contact = require("../models/contact-model") ;

const contactForm = async(req , res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.json({msg: "message sent successfully"});

    } 
    catch (error) {
        return res.json({msg: "could not send message"});
    }
}

module.exports = contactForm;