const routes = require('express').Router();
const multer = require('multer');
const EventController = require('../app/controllers/EventController');
const EventTypeController = require('../app/controllers/EventTypeController');

const UserController = require('../app/controllers/UserController');
const VehicleController = require('../app/controllers/VehicleController');

const authMiddleware = require('../app/middlewares/auth');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, __, cb) {
      cb(null, './public/uploads');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().valueOf()}_${file.originalname}`);
    },
  }),
});

routes.get('/', (_, res) => res.status(200).json({ message: 'connected' }));

routes.post('/users', UserController.store);
routes.post('/authenticate', UserController.authenticate);
routes.get('/users', UserController.listUsers);

routes.use(authMiddleware);

routes.post('/vehicles', upload.single('file'), VehicleController.store);
routes.get('/vehicles', VehicleController.listVehicles);
routes.get('/vehicles/:userId', VehicleController.listVehiclesByUserId);
routes.get('/vehicle/:vehicleId', VehicleController.showVehicleById);
routes.put(
  '/vehicle/:vehicleId',
  upload.single('file'),
  VehicleController.updateVehicle,
);

routes.post('/event', upload.single('file'), EventController.store);
routes.get('/event/photo/:filename', EventController.showEventPhoto);
routes.get('/event', EventController.listEvents);
routes.get('/event/:vehicleId', EventController.listEventsByVehicleId);
routes.get('/eventdetails/:eventId', EventController.showEvent);

routes.get('/eventuser/:userId', EventController.listEventsByUserId);

routes.post('/eventtype', EventTypeController.store);
routes.get('/eventtype', EventTypeController.listEventType);

module.exports = routes;
