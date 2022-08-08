const { encryptPassword, compareHashes, generateToken } = require('../helpers');

const { database } = require('../services/database');

class UserController {
  async store(request, response) {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return response
            .status(400)
            .json({ message: `Missing param ${field}` });
        }
      }

      const { name, email, password, passwordConfirmation } = request.body;

      if (password !== passwordConfirmation) {
        return response
          .status(400)
          .json({ message: 'Invalid param passwordConfirmation' });
      }

      const existsUser = await database.user.findUnique({
        where: {
          email,
        },
      });

      if (existsUser) {
        return response
          .status(400)
          .json({ message: 'This email already have an account' });
      }

      const hashedPassword = await encryptPassword(password);

      const user = await database.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return response.status(201).json({ user });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async authenticate(request, response) {
    try {
      const requiredFields = ['email', 'password'];

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return response
            .status(400)
            .json({ message: `Missing param ${field}` });
        }
      }

      const { email, password } = request.body;

      const existsUser = await database.user.findUnique({
        where: {
          email,
        },
      });

      if (!existsUser) {
        return response
          .status(400)
          .json({ message: 'Invalid email or password' });
      }

      const isValidPassword = await compareHashes(
        password,
        existsUser.password,
      );

      if (!isValidPassword) {
        return response
          .status(400)
          .json({ message: 'Invalid email or password' });
      }

      const access_token = await generateToken(existsUser);

      return response.status(200).json({ user: existsUser, access_token });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async changePassword(request, response) {
    try {
      const { userId } = request;
      const { oldPassword, newPassword } = request.body;

      const user = await database.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      if (!(await compareHashes(oldPassword, user.password))) {
        return response.status(400).json({ message: 'Invalid password' });
      }

      await database.user.update({
        where: {
          id: userId,
        },
        data: {
          password: await encryptPassword(newPassword),
        },
      });

      return response.status(200).json('ok');
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateUser(request, response) {
    try {
      const { userId } = request;

      const user = await database.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      await database.user.update({
        where: {
          id: userId,
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

  async listUsers(_request, response) {
    try {
      const users = await database.user.findMany({
        include: { vehicles: true },
      });

      if (!users) {
        return response.status(404).json({ message: 'Users not founded' });
      }

      return response.status(200).json(users);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
