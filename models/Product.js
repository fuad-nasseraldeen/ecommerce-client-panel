import mongoose, { model, Schema, models } from 'mongoose'

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPercentage: { type: String },
    rating: { type: String },
    stock: { type: String },
    brand: { type: String },
    tags: [{ type: String }],
    returnPolicy: { type: String },
    shippingInformation: { type: String },
    availabilityStatus: { type: String },
    thumbnail: { type: String },
    reviews: [
      {
        rating: { type: Number },
        comment: { type: String },
        date: { type: Date, default: Date.now },
        reviewerName: { type: String },
        reviewerEmail: { type: String },
        like: { type: Number },
        dislike: { type: Number },
      },
    ],
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    properties: { type: Object },
    quantity: [{ type: String }],
  },
  {
    timestamps: true,
  },
)

export const Product = models.Product || model('Product', ProductSchema)
