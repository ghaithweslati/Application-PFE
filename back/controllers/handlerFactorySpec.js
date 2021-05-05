const models_names = require("../constant/models_names");
const { normalize } = require("../utils/normalize");
var Sequelize = require("sequelize");


const Expert = require("../models/Expert");
const Demandeur = require("../models/Demandeur");
const Disponibilite = require("../models/Disponibilite");
const PeriodeSeance = require("../models/PeriodeSeance");
const Sujet = require("../models/Sujet");
const Frais = require("../models/Frais");
const Participation = require("../models/Participation");
const Op = Sequelize.Op;

const DeleteSpec = async (Model, req) => {
  let doc;
  let userId;
  let dressingId;
  let productId;

  switch (Model.getTableName()) {
    case models_names.frais:
      doc = await Model.destroy({
        where: { sujetId: req.params.id },
      });
      break;
    case models_names.customers:
      userId = req.user.id;
      doc = await Model.destroy({
        where: { id: req.params.id, userId: userId },
      });
      break;
    case models_names.dressings:
      dressingId = req.params.dressingId;
      userId = req.user.id;
      doc = await Model.destroy({
        where: { id: dressingId, userId: userId },
      });
      break;
    case models_names.looks:
      dressingId = req.params.dressingId;
      lookId = req.params.lookId;
      userId = req.user.id;
      doc = await Model.destroy({
        where: { id: lookId, userId: userId, dressingId: dressingId },
      });
      break;
    case models_names.products:
      productId = req.params.productId;
      doc = await Model.destroy({
        where: { id: productId },
      });
      break;
    case models_names.productItems:
      lookId = req.params.lookId;
      productId = req.params.productId;
      doc = await Model.destroy({
        where: { lookId: lookId, productId: productId },
      });
      break;
    default:
      console.log(Model.getTableName());
      doc = await Model.destroy({ where: { id: req.params.id } });
  }
  return doc;
};

const UpdateSpec = async (Model, req) => {
  let doc;
  let userId;
  let dressingId;
  let productId;
  let returnDoc;
  switch (Model.getTableName()) {
    case models_names.customers:
      userId = req.user.id;
      doc = await Model.update(req.body, {
        where: { id: req.params.id, userId: userId },
      });

      returnDoc = await Model.findOne({
        where: { id: req.params.id, userId: userId },
      });
      break;
    case models_names.dressings:
      dressingId = req.params.dressingId;
      userId = req.user.id;
      doc = await Model.update(req.body, {
        where: { id: dressingId, userId: userId },
      });

      returnDoc = await Model.findOne({
        where: { id: dressingId, userId: userId },
      });
      break;
    case models_names.looks:
      lookId = req.params.lookId;
      userId = req.user.id;
      doc = await Model.update(req.body, {
        where: { id: lookId, userId: userId },
      });

      returnDoc = await Model.findOne({
        where: { id: lookId, userId: userId },
      });
      break;
    case models_names.products:
      productId = req.params.productId;
      doc = await Model.update(req.body, {
        where: { id: productId },
      });

      returnDoc = await Model.findOne({
        where: { id: productId },
      });
      break;
    default:
      doc = await Model.update(req.body, {
        where: { id: req.params.id },
      });

      returnDoc = await Model.findOne({ where: { id: req.params.id } });
  }
  return { doc, returnDoc };
};

const CreateSpec = async (Model, req) => {
  let body;
  let userId;
  let customerId;
  let dressingId;
  let productId;
  let categoryId;

  switch (Model.getTableName()) {
    case models_names.sujets:
      userId = req.user.id;
      body = { ...req.body, expertId: userId };
      break;
    case models_names.consultations:
      const demandeurId = req.user.id;
      /*sujetId = req.params.sujetId;
      periodeSeanceId = req.params.periodeSeanceId*/
      body = { ...req.body, demandeurId: demandeurId };
      break;
    case models_names.customers:
      userId = req.user.id;
      body = { ...req.body, userId: userId };
      break;
    case models_names.disponibilites:
      utilisateurId = req.user.id;
      body = { ...req.body, utilisateurId: utilisateurId };
      break;
    case models_names.periode_disponibilites:
      expertId = req.user.id;
      body = { ...req.body, expertId: expertId };
      break;
    case models_names.dressings:
      userId = req.user.id;
      customerId = req.params.customerId;
      body = { ...req.body, userId: userId, customerId: customerId };
      break;
    case models_names.looks:
      userId = req.user.id;
      dressingId = req.params.dressingId;
      if (dressingId) {
        body = { ...req.body, userId: userId, dressingId: dressingId };
      } else {
        body = { ...req.body, userId: userId };
      }
      break;
    case models_names.products:
      imageUrl = "/images/" + req.file.filename;
      body = {
        ...req.body,
        imageUrl: imageUrl,
      };
      break;
    case models_names.placeholders:
      body = {
        ...req.body,
      };
      break;
    default:
      body = { ...req.body };
  }

  return body;
};

const GetOneSpec = async (Model, req) => {
  const { id } = req.params;
  const { email } = req.query;
  let query;
  let userId;
  let customerId;
  let productId;
  let placeholderId;
  let lookId;
  let categoryId;
  let sujetId;

  switch (Model.getTableName()) {
    case models_names.sujets:
      sujetId = req.params.sujetId;
      query = Model.findOne({
        where: { id: sujetId },
        include: [
          {
            model: Frais,
            attributes: ["prix", "duree"],
          },
          {
            model: Expert,
            attributes: ["id", "nom", "prenom", "photo", "specialite"]
          }
        ],
      });
      break;
    case models_names.consultations:
      const consultationId = req.params.consultationId;
      query = Model.findOne({
        where: { id: consultationId },
        include: [
          {
            model: Demandeur,
            attributes: ["id", "nom", "prenom", "photo"]
          },
          {
            model: PeriodeSeance,
            attributes: ["dateDeb", "dateFin"]
          },
          {
            model: Sujet,
            attributes: ["id", "titre"],
            include: [
              {
                model: Expert,
                attributes: ["id", "nom", "prenom", "photo"],
              },
              {
                model: Frais,
                attributes: ["duree", "prix"],
                order: [["duree", "DESC"]]
              },
            ]
          }
        ]
      });
      break;
    case models_names.conferences:
      const conferenceId = req.params.conferenceId;
      query = Model.findOne({
        where: { id: conferenceId },
        include: [
          {
            model: Demandeur,
            attributes: ["id", "nom", "prenom", "photo"]
          },
          {
            model: PeriodeSeance,
            attributes: ["dateDeb", "dateFin"]
          },
          {
            model: Sujet,
            attributes: ["id", "titre"],
            include: [
              {
                model: Expert,
                attributes: ["id", "nom", "prenom", "photo"]
              },
              {
                model: Frais,
                attributes: ["duree", "prix"],
                order: [["duree", "DESC"]]
              }
            ]
          }
        ],
      });
      break;
    case models_names.customers:
      if (id) {
        userId = req.user.id;
        query = Model.findOne({
          where: { id: id, userId: userId },
        });
      } else if (email) {
        console.log(email);
        userId = req.user.id;
        query = Model.findOne({
          where: { email: email, userId: userId },
        });
      }
      break;
    // NOTE: it needs to be refactored
    case models_names.dressings:
      userId = req.user.id;
      customerId = req.params.customerId;
      query = Model.findOne({
        where: { id: id, userId: userId, customerId: customerId },
      });
      break;
    case models_names.products:
      productId = req.params.productId;
      query = Model.findOne({
        where: { id: productId },
      });
      break;
    case models_names.looks:
      userId = req.user.id;
      lookId = req.params.lookId;
      query = Model.findOne({
        where: { userId: userId, id: lookId },
      });
      break;
    case models_names.placeholders:
      placeholderId = req.params.placeholderId;
      query = Model.findOne({
        where: {
          id: placeholderId,
        },
      });
      break;
    case models_names.categories:
      categoryId = req.params.categoryId;
      query = Model.findOne({
        where: {
          id: categoryId,
        },
        attributes: ["id"],
        // Make sure to include the products
        include: [
          {
            model: PlaceHolder,
            required: false,
            // Pass in the Product attributes that you want to retrieve
            attributes: ["name"],
          },
        ],
      });
      break;
    default:
      query = Model.findOne({
        where: { id: id },
      });
  }

  return query;
};

const GetAllSpec = async (Model, limit, offset, req) => {
  let query;
  let query2;
  const customerId = req.params.customerId;
  const dressingId = req.params.dressingId;
  const categoryId = req.params.categoryId;
  const brand = req.params.brand;
  const price = req.params.price;
  const type = req.params.type;
  const disponibiliteId = req.params.disponibiliteId;
  const sujetId = req.params.sujetId;
  const utilisateurId = req.params.utilisateurId;
  var expertId = req.params.expertId;
  const role = req.params.role;
  const id = req.params.id;
  const dateDeb = req.params.dateDeb;
  const dateFin = req.params.dateFin;
  const searchQuery = (req.query.search && normalize(req.query.search)) || "";
  switch (Model.getTableName()) {
    case models_names.customers:
      query = Model.findAndCountAll({
        where: {
          userId: req.user.id,
          [Op.or]: [
            { firstName: { [Op.like]: `%${searchQuery}%` } },
            { lastName: { [Op.like]: `%${searchQuery}%` } },
          ],
        },
        limit,
        offset,
        order: [["updatedAt", "DESC"]],
      });
      break;
    case models_names.dressings:
      if (customerId) {
        query = Model.findAndCountAll({
          where: {
            userId: req.user.id,
            customerId: customerId,
            name: { [Op.like]: "%" + searchQuery + "%" },
          },
          limit,
          offset,
          order: [["updatedAt", "DESC"]],
        });
      } else {
        query = Model.findAndCountAll({
          where: {
            userId: req.user.id,
            name: { [Op.like]: "%" + searchQuery + "%" },
          },
          limit,
          offset,
          order: [["updatedAt", "DESC"]],
        });
      }
      break;
    case models_names.looks:
      if (dressingId) {
        console.log(dressingId);
        query = Model.findAndCountAll({
          where: { userId: req.user.id, dressingId: dressingId },
          order: [["updatedAt", "DESC"]],
          limit,
          offset,
          distinct: true,
          attributes: ["id", "name", "updatedAt"],
          // Make sure to include the products
          include: [
            {
              model: Product,
              as: "products",
              required: false,
              // Pass in the Product attributes that you want to retrieve
              attributes: [
                "id",
                "name",
                "ref",
                "brand",
                "price",
                "imageUrl",
                "categoryId",
              ],
              through: {
                // This block of code allows you to retrieve the properties of the join table
                model: producItems,
                as: "productItem",
                attributes: ["id", "lookId", "productId"],
              },
            },
          ],
        });
      } else {
        query = Model.findAndCountAll({
          where: { userId: req.user.id },
          order: [["updatedAt", "DESC"]],
          limit,
          offset,
          distinct: true,
          attributes: ["id", "name", "updatedAt"],
          // Make sure to include the products
          include: [
            {
              model: Product,
              as: "products",
              required: false,
              // Pass in the Product attributes that you want to retrieve
              attributes: [
                "id",
                "name",
                "ref",
                "brand",
                "price",
                "imageUrl",
                "categoryId",
              ],
              through: {
                // This block of code allows you to retrieve the properties of the join table
                model: producItems,
                as: "productItem",
                attributes: ["id", "lookId", "productId"],
              },
            },
          ],
        });
      }
      break;
    case models_names.periode_disponibilites:
      if (!expertId)
        expertId = req.user.id;

      query = Model.findAndCountAll({
        /*where:
        {
          date: {
            [Op.gte]: dateDeb,
            [Op.lte]: dateFin,
          },
        },*/
        include: [
          {
            model: Expert,
            where: {
              id: expertId,
            },
            attributes: [],
          },
        ],
      });
      break;
    case models_names.consultations:
      userId = req.user.id;
      if (role == "Demandeur") {
        query = Model.findAndCountAll({
          where:
          {
            demandeurId: userId,
          },
          include: [
            {
              model: Sujet,
            },
            {
              model: PeriodeSeance,
            },
            {
              model: Demandeur,
            }
          ],
        });
      }
      else if (role == "Expert") {
        query = Model.findAndCountAll({
          include: [
            {
              model: Sujet,
              where:
              {

                expertId: userId,
              },
            },
            {
              model: PeriodeSeance,
            },
            {
              model: Demandeur,
            }
          ],
        });
      }
      else if (role == "Statistique") {
        query = Model.findAndCountAll({
          attributes: [],
          include: [
            {
              model: Sujet,
              attributes: ["id", "titre"],
              where:
              {
                expertId: userId,
              },
              include: [
                {
                  model: Frais,
                  attributes: ["duree", "prix"],
                }
              ]
            },
            {
              model: PeriodeSeance,
            }
          ],
        });
      }
      else {
        query = Model.findAndCountAll({

          include: [
            {
              model: PeriodeSeance,
              where:
              {
                dateDeb: {
                  [Op.gte]: dateDeb,
                },
                dateFin: {
                  [Op.lte]: dateFin,
                },
              },
              order: [["dateDeb", "ASC"]],
            },
          ],
        });
      }
      break;
    case models_names.conferences:
      userId = req.user.id;
      //  const role = req.params.role;
      if (role == "Demandeur") {
        query = Model.findAndCountAll({
          include: [
            {
              model: PeriodeSeance,
              where:
              {
                dateFin: {
                  [Op.gte]: new Date(),
                },
              },
            },
            {
              model: Sujet
            }
          ],
        });

        /*     query2 = Model.findAndCountAll({
               include: [
                 {
                   model: PeriodeSeance,
                   where:
                   {
                     dateFin: {
                       [Op.lte]: new Date(),
                     },
                   },
                 },
                 {
                   model: Sujet
                 },
                 {
                   model: Demandeur,
                   where: { id: userId },
                   attributes: []
                 },
               ],
             });
     */



      }
      else if (role == "Statistique") {
        query = Model.findAndCountAll({
          attributes: [],
          where:
          {
            type: "Payant"
          },
          include: [
            {
              model: Sujet,
              attributes: ["id", "titre"],
              where:
              {
                expertId: userId,
              },
              include: [
                {
                  model: Frais,
                  attributes: ["duree", "prix"],
                }
              ]
            },
            {
              model: Demandeur,
              attributes: ["id"],
            },
            {
              model: PeriodeSeance,
            }
          ],
        });
      }
      else if (role == "Expert") {
        query = Model.findAndCountAll({
          include: [
            {
              model: Sujet,
              where:
              {
                expertId: userId,
              },
            },
            {
              model: PeriodeSeance,
            }
          ],
        });
      }
      else {
        query = Model.findAndCountAll({

          include: [
            {
              model: PeriodeSeance,
              where:
              {
                dateDeb: {
                  [Op.gte]: dateDeb,
                },
                dateFin: {
                  [Op.lte]: dateFin,
                },
              },
              order: [["dateDeb", "ASC"]],
            },
          ],
        });
      }
      break;
    case models_names.experts:
      domaineId = req.params.domaineId;
      if (!domaineId) {
        query = Model.findAndCountAll({

        });
      }
      else {
        query = Model.findAndCountAll({
          where: { domaineId: domaineId }
        });
      }
      break;
    case models_names.disponibilites:
      query = Model.findAndCountAll({
        where:
        {
          date: {
            [Op.gte]: dateDeb,
            [Op.lte]: dateFin,
          },
        },
        include: [
          {
            model: Utilisateur,
            where: {
              id: utilisateurId,
            },
            attributes: [],
          },
        ],
      });
      break;
    case models_names.periodes:
      query = Model.findAndCountAll({
        include: [
          {
            model: Disponibilite,
            where: { id: disponibiliteId },
            attributes: []
          },
        ],
      });
      break;
    /* case models_names.frais:
       query = Model.findAndCountAll({
         include: [
           {
             model: Sujet,
             where: { id: sujetId },
             attributes: []
           },
         ],
       });
       break;*/
    case models_names.sujets:
      if (role == "Expert") {
        query = Model.findAndCountAll({
          include: [
            {
              model: Expert,
              attributes: [],
              where: { id: id }
            }
          ],
          order: [["updatedAt", "DESC"]],
        });
      }
      else {
        query = Model.findAndCountAll({
          include: [
            {
              model: Expert,
              attributes: [],
              where: { domaineId: id }
            }
          ],
          order: [["updatedAt", "DESC"]],
        });
      }
      break;
    case models_names.products:
      if (categoryId) {
        // NOTE: condition num 8
        if (type != "null" && brand != "null" && price > 0) {
          query = Model.findAndCountAll({
            where: {
              categoryId: categoryId,
              [Op.and]: [
                { type: { [Op.like]: type } },
                { brand: { [Op.like]: "%" + brand + "%" } },
                { price: { [Op.lt]: price } },
              ],
            },
            limit,
            offset,
          });
        }
        // NOTE: condition num 7
        else if (type != "null" && brand != "null" && price == "null") {
          console.log("===========>");
          query = Model.findAndCountAll({
            where: {
              categoryId: categoryId,
              [Op.and]: [
                { type: { [Op.like]: type } },
                { brand: { [Op.like]: "%" + brand + "%" } },
              ],
            },
            limit,
            offset,
          });
        }
        // NOTE: condition num 6
        else if (type != "null" && brand == "null" && price > 0) {
          query = Model.findAndCountAll({
            where: {
              categoryId: categoryId,
              [Op.and]: [
                { type: { [Op.like]: type } },
                { price: { [Op.lt]: price } },
              ],
            },
            limit,
            offset,
          });
        }
        // NOTE: condition num 5
        else if (type != "null" && brand == "null" && price == "null") {
          query = Model.findAndCountAll({
            where: {
              categoryId: categoryId,
              [Op.and]: [{ type: { [Op.like]: type } }],
            },
            limit,
            offset,
          });
        }
        // NOTE: condition num 4
        else if (type == "null" && brand != "null" && price > 0) {
          query = Model.findAndCountAll({
            where: {
              categoryId: categoryId,
              [Op.and]: [
                { brand: { [Op.like]: "%" + brand + "%" } },
                { price: { [Op.lt]: price } },
              ],
            },
            limit,
            offset,
          });
        }
        // NOTE: condition num 3
        else if (type == "null" && brand != "null" && price == "null") {
          query = Model.findAndCountAll({
            where: {
              categoryId: categoryId,
              [Op.and]: [{ brand: { [Op.like]: "%" + brand + "%" } }],
            },
            limit,
            offset,
          });
        }
        // NOTE: condition num 2
        else if (type == "null" && brand == "null" && price > 0) {
          query = Model.findAndCountAll({
            where: {
              categoryId: categoryId,
              [Op.and]: [{ price: { [Op.lt]: price } }],
            },
            limit,
            offset,
          });
        } else {
          query = Model.findAndCountAll({
            where: {
              categoryId: categoryId,
              name: { [Op.like]: "%" + searchQuery + "%" },
            },
            limit,
            offset,
          });
        }
      } else {
        console.log(searchQuery == "");
        if (searchQuery == "") {
          query = Model.findAndCountAll({
            where: {
              name: { [Op.like]: "%" + undefined + "%" },
            },
            limit,
            offset,
          });
        } else {
          query = Model.findAndCountAll({
            where: {
              [Op.or]: [
                {
                  name: { [Op.like]: "%" + searchQuery + "%" },
                },
                {
                  brand: { [Op.like]: "%" + searchQuery + "%" },
                },
                {
                  type: { [Op.like]: "%" + searchQuery + "%" },
                },
                {
                  price: { [Op.eq]: parseFloat(searchQuery) },
                },
              ],
            },
            limit,
            offset,
          });
        }
      }
      break;

    default:
      query = Model.findAndCountAll();
  }

  return query;
};

module.exports = { DeleteSpec, UpdateSpec, CreateSpec, GetOneSpec, GetAllSpec };
