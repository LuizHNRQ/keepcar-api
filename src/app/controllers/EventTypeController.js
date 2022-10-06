const { database } = require('../services/database');

class EventTypeController {
  async store(request, response) {
    try {
      const requiredFields = ['title'];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return response
            .status(400)
            .json({ message: `Missing param ${field}` });
        }
      }

      const { title } = request.body;

      const eventType = await database.eventType.create({
        data: {
          title,
        },
      });

      return response.status(201).json({ eventType });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async listEventType(_request, response) {
    try {
      const eventType = await database.eventType.findMany();

      if (!eventType) {
        return response.status(404).json({ message: 'Event Type not founded' });
      }

      return response.status(200).json(eventType);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new EventTypeController();
