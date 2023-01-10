const { Category } = require('../models')

class Controller {
  static async getAllCategories (req, res, next) {
    try {
      const getAllCategories = await Category.findAll()

      res.status(200).json(getAllCategories)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = Controller
