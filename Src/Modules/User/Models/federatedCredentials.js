import mongoose from "mongoose";

const federatedCredentialSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

const federatedCredentialModel = mongoose.model(
  "federatedCredential",
  federatedCredentialSchema
);
export default federatedCredentialModel;
