const Thing = require("../models/Thing");

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyThing =  (req, res, next) => {
// req.params.id c'est l'id envoyé en parametre de la requete,  ...req.body, _id: req.params.id le nouvel objet avec un id en question
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }).then(
      (thing) => {
        if (!thing) {
          res.status(404).json({
            error: new Error('No such Thing!')
          });
        }
        if (thing.userId !== req.auth.userId) {
          res.status(400).json({
            error: new Error('Unauthorized request!')
          });
        }
        Thing.deleteOne({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
    )
  };

exports.getOneThing =  (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
}

exports.getAllThings =  (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}