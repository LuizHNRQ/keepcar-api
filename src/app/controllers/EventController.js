const path = require('path');
const fs = require('fs');
const { database } = require('../services/database');

class EventController {
  async store(request, response) {
    try {
      const requiredFields = [
        'title',
        'km',
        'description',
        'eventTypeId',
        'date',
        'vehicleId',
      ];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return response
            .status(400)
            .json({ message: `Missing param ${field}` });
        }
      }

      const { title, km, description, eventTypeId, date, vehicleId } =
        request.body;

      const fileConverted = request?.file;

      console.log('fileconv->', fileConverted);

      const vehicle = await database.events.create({
        data: {
          title,
          km: +km,
          description,
          eventTypeId: +eventTypeId,
          date,
          vehicleId,
          pictures: fileConverted?.filename || '',
        },
      });

      return response.status(201).json({ vehicle });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async showEventPhoto(request, response) {
    try {
      const { filename } = request.params;
      const dirname = path.resolve();

      const fullFilePath = path.join(dirname, `public/uploads/${filename}`);

      if (!fs.existsSync(fullFilePath)) {
        return response.status(404).json({ message: 'Photo not found' });
      }

      const buffer = fs.readFileSync(fullFilePath);

      return response.send(buffer.toString('base64'));

      // return response.sendFile(fullFilePath);
    } catch (error) {
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

  async showEvent(request, response) {
    try {
      const { eventId } = request.params;

      const events = await database.events.findUnique({
        where: {
          id: +eventId,
        },
      });

      if (!events) {
        return response.status(404).json({ message: 'Events not founded' });
      }

      return response.status(200).json(events);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async listEvents(_request, response) {
    try {
      const events = await database.events.findMany();

      if (!events) {
        return response.status(404).json({ message: 'Event not founded' });
      }

      return response.status(200).json(events);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async listEventsByUserId(request, response) {
    try {
      const { userId } = request.params;
      const vehicles = await database.vehicle.findMany({
        where: {
          userId: +userId,
        },
        include: {
          events: true,
        },
      });

      if (!vehicles.length) {
        return response.status(404).json({ message: 'Event not founded' });
      }

      const eventsList = [];

      vehicles.forEach((vehicle) => {
        vehicle.events.forEach((e) => {
          eventsList.push(e);
        });
      });

      return response
        .status(200)
        .json(eventsList.sort((a, b) => b.updatedAt - a.updatedAt));
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async listEventsByVehicleId(request, response) {
    try {
      const { vehicleId } = request.params;

      const vehicle = await database.vehicle.findUnique({
        where: {
          id: vehicleId,
        },
      });

      const events = await database.events.findMany({
        where: { vehicleId },
        orderBy: {
          date: 'desc',
        },
      });

      if (!events) {
        return response.status(404).json({ message: 'Event not founded' });
      }

      return response.status(200).json({
        vehicle,
        events,
      });
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

      await database.vehicle.update({
        where: {
          id: vehicleId,
        },
        data: {
          ...request.body,
        },
      });

      return response.status(200).json('ok');
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new EventController();
