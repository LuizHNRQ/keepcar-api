const dayjs = require('dayjs');
const { database } = require('../services/database');

class VehicleSharesController {
  async store(request, response) {
    try {
      const requiredFields = ['vehicleId', 'expiresAt'];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return response
            .status(400)
            .json({ message: `Missing param ${field}` });
        }
      }

      const { vehicleId, expiresAt } = request.body;

      const vehicleShare = await database.vehicleShares.create({
        data: {
          id: Math.random().toString(36).slice(2, 8).toUpperCase(),
          vehicleId,
          expiresAt,
        },
      });

      return response.status(201).json({
        keepCarId: vehicleShare.id,
        expiresAt: vehicleShare.expiresAt,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async showVehicleByKeepcarId(request, response) {
    try {
      const { keepcarId } = request.params;

      const vehicleShare = await database.vehicleShares.findUnique({
        where: {
          id: keepcarId,
        },
      });

      if (!vehicleShare) {
        return response.status(404).json({ message: 'Veículo não encontrado' });
      }

      if (dayjs(vehicleShare.expiresAt).isBefore(new Date())) {
        return response
          .status(400)
          .json({ message: 'Prazo para consulta expirado' });
      }

      //   const vehicle = await database.vehicle.findUnique({
      //     where: {
      //       id: vehicleShare.vehicleId,
      //     },
      //     include: {
      //       events: true,
      //     },
      //   });

      //   if (!vehicle) {
      //     return response.status(404).json({ message: 'Vehicle not found' });
      //   }

      return response.status(200).json({ vehicleId: vehicleShare.vehicleId });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async showActiveKeysByVehicleId(request, response) {
    try {
      const { vehicleId } = request.params;

      const keysByVehicle = await database.vehicleShares.findMany({
        where: {
          vehicleId,
        },
      });

      if (!keysByVehicle) {
        return response.status(404).json({ message: 'Chaves não encontradas' });
      }

      const removeExpiredKeepCarId = keysByVehicle.filter((keepCarId) =>
        dayjs(keepCarId.expiresAt).isAfter(new Date()),
      );
      return response
        .status(200)
        .json(
          removeExpiredKeepCarId.sort((a, b) =>
            dayjs(a.expiresAt).isAfter(b.expiresAt) ? 1 : -1,
          ),
        );
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async removeActiveKeepCarIdById(request, response) {
    try {
      const { keepCarId } = request.params;

      await database.vehicleShares.update({
        where: {
          id: keepCarId,
        },
        data: {
          expiresAt: new Date(),
        },
      });

      return response.status(200).json();
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new VehicleSharesController();
