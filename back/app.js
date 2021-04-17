const path = require("path");
const fs = require("fs");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

/**  Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax */
require("dotenv").config();

const sequelize = require("./utils/database");
const utils = require("./utils/utils");
const multer = require("multer");
const bcrypt = require("bcryptjs");

/* preparing for deployment */
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

/* database tables */
const Expert = require("./models/Expert");
const Demandeur = require("./models/Demandeur");
const Administrateur = require("./models/Administrateur");
const PeriodeDisponibilite = require("./models/PeriodeDisponibilite");
const PeriodeSeance = require("./models/PeriodeSeance");
const Sujet = require("./models/Sujet");
const Frais = require("./models/Frais");
//const Seance = require("./models/Seance");
const Domaine = require("./models/Domaine");
const Conference = require("./models/Conference");
const Consultation = require("./models/Consultation");
const Participation = require("./models/Participation");



//const User = require("./models/user");
/*const Domaine = require("./models/domaine");

const Customer = require("./models/Customer");
const Dressing = require("./models/Dressing");
const Product = require("./models/Product");
const Category = require("./models/Category");
const ProductItem = require("./models/product-item");
const Look = require("./models/Look");
const PlaceHolder = require("./models/PlaceHolder");*/

const app = express();



const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Pass the global passport object into the configuration function
require("./middleware/passport")(passport);
// require("./middleware/passportAzureAd")(passport);

/* Routes */
const authRoutes = require("./routes/auth");
/*const utilisateurRoutes = require("./routes/utilisateur");
*/
const periodeDisponibiliteRoutes = require("./routes/periode_disponibilite");
const periodeSeanceRoutes = require("./routes/periode_seance");
const sujetRoutes = require("./routes/sujet");
const fraisRoutes = require("./routes/frais");
const seanceRoutes = require("./routes/seance");
const domaineRoutes = require("./routes/domaine");
const expertRoutes = require("./routes/expert");
const demandeurRoutes = require("./routes/demandeur");
const administrateurRoutes = require("./routes/administrateur");
const consultationRoutes = require("./routes/consultation");
const conferenceRoutes = require("./routes/conference");
const participationRoutes = require("./routes/participation");


/*const categoryRoutes = require("./routes/category");
const placeHolderRoutes = require("./routes/placeHolder");
const customerRoutes = require("./routes/customer");
const dressingRoutes = require("./routes/dressing");
const lookRoutes = require("./routes/look");
const productItemRoutes = require("./routes/product-item");
const productRoutes = require("./routes/product");*/

//app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

  next();
});

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       console.log(user);
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

// swagger setup
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Lookbook API",
      description: "Lookbook API Information",
      contact: {
        name: "",
      },
      // servers: ["http://localhost:8080"],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRoutes);
/*app.use("/utilisateur", utilisateurRoutes);*/
app.use("/periode_disponibilite", periodeDisponibiliteRoutes);
app.use("/periode_seance", periodeSeanceRoutes);
/*
app.use("/periode", periodeRoutes);*/
app.use("/sujet", sujetRoutes);
app.use("/frais", fraisRoutes);
app.use("/seance", seanceRoutes);
app.use("/domaine", domaineRoutes);
app.use("/expert", expertRoutes);
app.use("/demandeur", demandeurRoutes);
app.use("/administrateur", administrateurRoutes);
app.use("/consultation", consultationRoutes);
app.use("/conference", conferenceRoutes);
app.use("/participation", participationRoutes);


/*
app.use("/category", categoryRoutes);
app.use("/placeholder", placeHolderRoutes);
app.use("/customer", customerRoutes);
app.use("/dressing", dressingRoutes);
app.use("/look", lookRoutes);
app.use("/productItem", productItemRoutes);
app.use("/product", productRoutes);
*/
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// Adding relation between database tables

Expert.belongsTo(Domaine);
Domaine.hasMany(Expert);

Sujet.belongsTo(Expert);
Expert.hasMany(Sujet);

PeriodeDisponibilite.belongsTo(Expert);
Expert.hasMany(PeriodeDisponibilite);

Frais.belongsTo(Sujet);
Sujet.hasMany(Frais);

/*
Seance.belongsTo(Sujet);
Sujet.hasMany(Seance);


Seance.belongsTo(Demandeur);
Demandeur.hasMany(Seance);


Seance.belongsTo(Demandeur);
Demandeur.hasMany(Seance);

Seance.belongsTo(PeriodeSeance);
PeriodeSeance.hasOne(Seance);*/

Consultation.belongsTo(Sujet);
Sujet.hasMany(Consultation);

Consultation.belongsTo(Demandeur);
Demandeur.hasMany(Consultation);


Consultation.belongsTo(PeriodeSeance);
PeriodeSeance.hasOne(Consultation);


Conference.belongsTo(PeriodeSeance);
PeriodeSeance.hasOne(Conference);

Conference.belongsTo(Sujet);
Sujet.hasOne(Conference);


Demandeur.belongsToMany(Conference, { through: Participation })
Conference.belongsToMany(Demandeur, { through: Participation })



const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
  debug: true,
})
const { v4: uuidv4 } = require('uuid')

app.use('/peerjs', peerServer)
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('message', (message) => {
      io.to(roomId).emit('createMessage', message, userId)
    })
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    server.listen(process.env.PORT || 8080);
  })
  .catch((err) => console.log(err));

