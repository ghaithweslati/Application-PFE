const { validationResult } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const {
  DeleteSpec,
  UpdateSpec,
  CreateSpec,
  GetOneSpec,
  GetAllSpec,
} = require("./handlerFactorySpec");
const { normalize } = require("../utils/normalize");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

// DONE: create handlerfactory spec
// DONE: create const file for all constants in the app

// deleteOne is a function that delete an instance in the database
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // Getting a response from the delete spec
    const doc = await DeleteSpec(Model, req);

    // Verifying if there is some errors
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    // Return this message if the operation is successful
    res.status(204).json({
      status: `Removed  ${Model.getTableName().charAt(0).toUpperCase() +
        Model.getTableName().slice(1)
        } Successfully.`,
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const result = await UpdateSpec(Model, req);

    if (result.doc[0] === 0) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: `Updated ${Model.getTableName().charAt(0).toUpperCase() +
        Model.getTableName().slice(1)
        } Successfully.`,
      data: {
        row_number: result.doc,
        data: result.returnDoc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const body = await CreateSpec(Model, req);

    const doc = await Model.create(body);
    res.status(201).json({
      status: `Created ${Model.getTableName().charAt(0).toUpperCase() +
        Model.getTableName().slice(1, Model.getTableName().length - 1)
        } Successfully.`,
      data: doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const query = await GetOneSpec(Model, req);

    // if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      res.status(404).json({
        status: "fail",
        message: "customer not found",
      });
    }

    res.status(200).json({
      status: `Fetched ${Model.getTableName().charAt(0).toUpperCase() +
        Model.getTableName().slice(1, Model.getTableName().length - 1)
        } Successfully.`,
      data: doc,
    });
  });

// DONE: pagination functions
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rows } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rows, totalPages, currentPage };
};

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const query = await GetAllSpec(Model, limit, offset, req);

    const doc = await query;
    const response = getPagingData(doc, page, limit);

    // SEND RESPONSE
    res.status(200).json({
      status: `Fetched All ${Model.getTableName().charAt(0).toUpperCase() +
        Model.getTableName().slice(1)
        } Successfully.`,
      results: doc.length,
      data: doc,
    });
  });
