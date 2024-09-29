const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, 'secret');
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).send('Unauthorized');
    }
  };
  