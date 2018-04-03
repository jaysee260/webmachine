'use strict';

/////////////////////////////////////////////
////////        db interactions      ///////
///////////////////////////////////////////

const moment =            require('moment');
const { Workitem } =      require('../../../db/schemas/Workitem');

module.exports = async function(issues, repo) {
  // Get all workitems for repo from db
  let data = await Workitem.find({repo: repo}).lean();
  /*
    Iterate through issues and:
      1. find the workitem with matching issue number
      2. attach some values to issue object
      3. return issue
    In the end we're left with a new array of issues, all with
    prices, etc.
  */
  issues = issues.map(issue => {
    let issue_number = issue.number.toString();
    let workitem = data.filter(wi => wi.itemId === issue_number)[0];
    let price = workitem.price;
    console.log(price);
    issue.price = price;
    issue.stage = workitem.stage;
    issue.assignee = workitem.assignee;
    issue.due_date = moment(workitem.dueDate).format("MMMM Do, YYYY");
    return issue;
  });
  return issues;
}
