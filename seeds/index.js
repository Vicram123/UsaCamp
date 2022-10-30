const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const URI =
  "mongodb+srv://vicram-camps:vicram-camp@cluster0.zofdhpi.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: "63513c9a0606d2dfbed51542",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dnjau71yo/image/upload/v1667135921/USACamp/v93wjh1z4hrwdi8t6dto.jpg",
          filename: "USACamp/v93wjh1z4hrwdi8t6dto",
        },
        {
          url: "https://res.cloudinary.com/dnjau71yo/image/upload/v1667136286/USACamp/rbzayxehwrcavk2xe7nf.jpg",
          filename: "USACamp/v93wjh1z4hrwdi8t6dto",
        },
        {
          url: "https://res.cloudinary.com/dnjau71yo/image/upload/v1666943415/FinlandCamp/aagi3qvqm4fhi5prnq29.jpg",
          filename: "USACamp/v93wjh1z4hrwdi8t6dto",
        },
        {
          url: "https://res.cloudinary.com/dnjau71yo/image/upload/v1667136286/USACamp/rbzayxehwrcavk2xe7nf.jpg",
          filename: "USACamp/v93wjh1z4hrwdi8t6dto",
        },
        {
          url: "https://res.cloudinary.com/dnjau71yo/image/upload/v1666795720/FinlandCamp/ycctis2nxhsv4dx6yxpa.jpg",
          filename: "USACamp/v93wjh1z4hrwdi8t6dto",
        },
      ],
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
