import Porfolio from "../models/portfolio.js";

export async function createPortfolio(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "You are Unauthorized to create a portfolio. Please login first",
      });
    }
    const userId = req.user.userId;
    const username = req.user.username;
    const existing = await Porfolio.findOne({ user: userId });

    if (existing) {
      return res.status(400).json({
        message: "You already have a portfolio",
      });
    }

    await Porfolio.create({
      ...req.body,
      user: userId,
      username: username,
    });

    res.status(201).json({
      message: "Portfolio created successfully",
    });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      message: "Portfolio creation failed",
      error: e.message,
    });
  }
}

export async function getPortfolio(req, res) {
  try {
    const username = req.params.username;
    const portfolio = await Porfolio.findOne({ username });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }
    return res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}
export async function updatePortfolio(req, res) {
  try {
    const oldUsername = req.params.username;
    const newUsername = req.body.username;

    if (oldUsername !== newUsername) {
      return res.status(400).json({
        message: "Username cannot be changed",
      });
    }

    await Porfolio.updateOne({ username: req.params.username }, req.body);
    res.status(200).json({
      message: "Portfolio updated successfully",
    });
  } catch (e) {
    req.status(400).json({
      message: "Portfolio update failed",
      error: e,
    });
  }
}

export async function deletePortfolio(req, res) {
  try {
    await Porfolio.deleteOne({ username: req.params.username });
    res.status(200).json({
      message: "Portfolio deleted successfully",
    });
  } catch (e) {
    req.status(400).json({
      message: "Portfolio deletion failed",
      error: e,
    });
  }
}
