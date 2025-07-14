# Getting Started

## Prerequisites

Before running this project, you need to have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB Compass

### Connect to localhost(localhost:27017/) MongoDB Compass or you can use MongoDB Atlas create cluster

    - (mongoose.connect("mongodb://127.0.0.1:27017/pinterest-clone")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });)

## Install dependencies:

    npm install
