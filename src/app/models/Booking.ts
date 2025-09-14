// models/Booking.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  name: string;
  email: string;
  seats: number;
  createdAt?: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    seats: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
