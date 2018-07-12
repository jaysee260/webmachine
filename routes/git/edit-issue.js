'use strict';

//////////////////////////////////////////////////////
////////          github interactions         ///////
////////////////////////////////////////////////////

const api = require('../../api/git/index');
const moment = require('moment');
const mongoose = require('mongoose');
const { workitemSchema }  = require('../../db/schemas/Workitem').Workitem;
const { y, r } = require('../../console');

const editIssue = (router) => {
  router.put('/:repo', (req, res, next) => {

    req.checkBody('number',  'Workitem number is required').notEmpty();
    req.checkBody('title',        'Workitem title is required').notEmpty();
    req.checkBody('repo',         'Repo name is required').notEmpty();
    req.checkBody('price',        'Workitem must have a price').notEmpty();
    req.checkBody('price',        'Workitem price must be a number').isFloat(true);
    req.checkBody('price',        'Workitem price must be greater than 0').isFloat({ gt: 0.0 });
    req.checkBody('duration',     'Workitem duration is required.').notEmpty();
    req.checkBody('duration',     'Workitem duration must be a number').isInt(true);
    req.checkBody('duration',     'Workitem duration must be greater than 0').isInt({ gt: 0 });
    req.checkBody('description',  'All workitems need a description').notEmpty();

    // Run validators and catch potential errors
    const errors = req.validationErrors();

    // Refactor in future
    // Currently connecting to Strategic Machine's DB
    // Because only Strategic Machines supports a marketplace
    let connection = mongoose.createConnection("mongodb://auto:B0ston@ds251889.mlab.com:51889/client2");
    let Workitem = connection.model('Workitem', workitemSchema);

    // If there are errors, notify client side and end request.
    // In other words, if errors, workitem doesn't get updated.
    if (errors) {
      console.log(r('! Validation Error !') + '\n' + JSON.stringify(errors, null, 2));
      // Set 500 "Internal Server Error" status
      res.status(500).json({
        errorType: "VALIDATION",
        errors
      });
      next();
    } else {
      // Capture values sent from client-side
      let wi = req.body;
      // Find workitem by id (issue number) and repo
      Workitem.findOneAndUpdate({
        $and: [
          { itemId: wi.number },
          { repo: wi.repo }
        ]
      }, {
        // Update properties in Workitem document
        $set: {
          title: wi.title,
          price: wi.price,
          duration: wi.duration,
          dueDate: moment().add(wi.duration, 'days').format(),
          stage: wi.stage,
          assignee: wi.assignee === '' ? null : wi.assignee,
          description: wi.description
        }
      })
        .then(doc => {
          // If update successful, log message
          let msg = {
            db: `Updated workitem# ${doc.itemId} of repo ${doc.repo} in database.`
          };
          console.log(y(msg.db));

          // Now post update to GitHub.
          // GitHub only knows two states, open and closed. If a
          // workitem's status is active, it's open on GitHub
          let stage = wi.stage === 'active' ? 'open' : wi.stage;
          api.editIssue(wi.repo, +wi.number, wi.title, wi.description, stage)
            .then(response => {
              msg.github = 'Updated issue on GitHub';
              console.log(y(msg.github));
              res.json({ msg });
              next();
            })
            .catch(err => {
              msg.github = 'Error updating issue on GitHub';
              console.log(r(msg.github) + '\n' + err);
              res.json({ msg });
              next();
            });
        
        })
        .catch(err => {
          let msg = `Error updating workitem in database`;
          console.log(r(msg) + '\n' + err);
          res.json({ msg })
          next();
        });
    }

    
    // console.log(wi);
    // res.json({
    //   msg: 'edit received... processing'
    // });
    // next();
    
    
    
  });
}

module.exports = editIssue;
