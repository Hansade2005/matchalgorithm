const mongoose = request('mongoose');

const ClientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: number, required: true },
    phoneNumber: { type: number, required: true },
    coachAssigned: {type: mongoose.Schema.Types.ObjectId, ref: 'Coach' }, // the value here is set from the list of assignable coaches.
    termsCondition: { type: Boolean, required: true } 
    // termsCondition this field holds the value indicatiing 
    // the agreement of the client to the sites terms and condition.
    // it is required to be a true 
})