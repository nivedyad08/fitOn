const Category = require("../../models/categoriesMdl");

/****Categories*****/
const categories = async (req, res) => {
  try {
    console.log(5678);
    const categories = await Category.find({});
    if (categories) {
      return res.status(200).json({ categories });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/****Add Category*****/
const addCategory = async (req, res) => {
  try {
    const { category } = req.body
    if (!category)
      return res.status(400).json({ message: "Category is required" });
    const checkCategory = await Category.findOne({ name: { $regex: `${ category }.*`, $options: "i" } });
    if (checkCategory)
      return res.status(400).json({ message: "Category already exist!!!" });

    const newCategory = await Category.updateOne({ name: category }, { $set: { name: category, status: true } }, { upsert: true }, { new: true })

    if (!newCategory)
      return res.status(400).json({ message: "Something went wrong" });
    const updatedCategory = await Category.findById(newCategory.upsertedId)
    return res.status(200).json({ message: "Category added successfully !!", newCategory: updatedCategory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
/****Edit Category*****/
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.query
    const { category } = req.body
    if (!category)
      return res.status(400).json({ message: "Category is required" });
    const updateCategory = await Category.findByIdAndUpdate(categoryId, { name: category })

    if (!updateCategory)
      return res.status(400).json({ message: "Something went wrong" });
    return res.status(200).json({ message: "Category updated successfully !!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
/****Chnage Status Category*****/
const changeStatus = async (req, res) => {
  try {
    const { categoryId } = req.query
    const category = await Category.findById(categoryId)
    const newStatus = !category.status
    const updateStatus = await Category.findByIdAndUpdate(categoryId,
      { status: newStatus }
    );
    if (!updateStatus) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "Status changed successfully !!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  categories,
  addCategory,
  updateCategory,
  changeStatus
}