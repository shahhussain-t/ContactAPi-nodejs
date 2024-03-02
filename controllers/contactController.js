const asyncHandler=require('express-async-handler')
const Contact=require('../models/contactModel')
//@desc Get all contacts
//@route Get /api/contacts
//@access  private
const getContacts = asyncHandler(async(req, res) => {
    
    const contacts=await Contact.find({user_id:req.user.id})
 
    res.status(200).json({ contacts})
}
)

//@desc Get single contacts
//@route Get /api/contacts/:id
//@access private

const getContact =asyncHandler( async(req, res) => {

    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact NOt Found")
    }
 

    res.status(200).json(contact)
})

//@desc create New Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async(req, res) => {

    const {name,email,phone}=req.body

    if(!name || !email ||!phone){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const contact=await Contact.create({

        name,
        email,
        phone,
        user_id:req.user.id
    })

    console.log("The request body is: ",req.body)
    res.status(201).json(contact)
}
)


//@desc Update Contact
//@route PUT /api/contacts
//@access public
const updateContact = asyncHandler(async(req, res) => {

    
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact NOt Found")
    }
 
    if(contact.user_id.toString()!==req.user.id){

        res.status(403)
        throw new Error("User don't have permisson to update other user contacts")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true})

    res.status(200).json(updatedContact)

   
}
)

//@desc Delete Contact
//@route DELETE /api/contacts
//@access public
const deleteContact =asyncHandler(async (req, res) => {

    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact NOt Found")
    }

    if(contact.user_id.toString()!==req.user.id){

        res.status(403)
        throw new Error("User don't have permisson to delete other user contacts")
    }
    console.log(contact)
    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json(contact)
}

)

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}