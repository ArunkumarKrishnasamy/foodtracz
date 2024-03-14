const Testing = (req, res) => {
  try {
    res.status(200).json({ message: "authentication success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = Testing;
