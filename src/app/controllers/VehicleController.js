const { database } = require('../services/database');

class VehicleController {
  async store(request, response) {
    try {
      const requiredFields = [
        'maker',
        'model',
        'year',
        'plate',
        'color',
        'km',
        'purchaseYear',
        'userId',
        'makerId',
        'modelId',
      ];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return response
            .status(400)
            .json({ message: `Missing param ${field}` });
        }
      }

      const {
        maker,
        model,
        year,
        plate,
        color,
        km,
        purchaseYear,
        nickname,
        userId,
        makerId,
        modelId,
      } = request.body;

      const fileConverted = request?.file;

      const vehicle = await database.vehicle.create({
        data: {
          id: Math.random().toString(36).slice(2, 8).toUpperCase(),
          maker,
          model,
          year,
          plate,
          color,
          km: +km,
          nickname,
          purchaseYear,
          userId: +userId,
          makerId,
          modelId,
          photo: fileConverted?.filename || '',
          initialKm: +km,
        },
      });

      return response.status(201).json({ vehicle });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async showVehicleById(request, response) {
    try {
      const { vehicleId } = request.params;

      const vehicle = await database.vehicle.findUnique({
        where: {
          id: vehicleId,
        },
        include: {
          events: true,
        },
      });

      if (!vehicle) {
        return response.status(404).json({ message: 'Vehicle not found' });
      }

      return response.status(200).json(vehicle);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async listVehicles(_request, response) {
    try {
      const vehicle = await database.vehicle.findMany();

      if (!vehicle) {
        return response.status(404).json({ message: 'Vehicles not founded' });
      }

      return response.status(200).json(vehicle);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async listVehiclesByUserId(request, response) {
    try {
      const { userId } = request.params;

      const vehicles = await database.vehicle.findMany({
        where: { userId: Number(userId) },
        include: { events: true },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      if (!vehicles) {
        return response
          .status(404)
          .json({ message: 'User vehicles not founded' });
      }

      return response.status(200).json(vehicles);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateVehicle(request, response) {
    try {
      const { vehicleId } = request.params;

      const vehicle = await database.vehicle.findUnique({
        where: {
          id: vehicleId,
        },
      });

      if (!vehicle) {
        return response.status(404).json({ message: 'Vehicle not found' });
      }

      const { color, nickname } = request.body;

      const fileConverted = request?.file;

      const updatedvehicle = await database.vehicle.update({
        where: {
          id: vehicleId,
        },
        data: {
          color,
          nickname,
          ...(fileConverted && { photo: fileConverted?.filename || '' }),
        },
      });

      return response.status(201).json({ updatedvehicle });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new VehicleController();
