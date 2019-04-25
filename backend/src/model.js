const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    x: String,
    y: String,
    facing: String
  },
  { timestamps: true }
);

const DataModel = mongoose.model("Data", DataSchema);

const addMove = async (position)  => {
  return await DataModel.create(position)
  .then(result => {
    return result;
  });
}

const getCurrentPosition = async () => {
  return DataModel.findOne().sort({'createdAt' : 'descending'  }).limit(1)
      .exec()
      .then((position) => {
        return position;
      })
      .catch((err) => {
        return 'error occured';
      });

      // return {facing: 'EAST', x: 1, y: 2};
};

module.exports = { Data: DataModel, getCurrentPosition, addMove};