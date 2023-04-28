import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find(); //this becomes an array

    res.status(200).json(overallStats[0]); //there is only one datapoint in the array, that's why we only send this
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};