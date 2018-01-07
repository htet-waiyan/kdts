const _ = require('lodash');

var workerRegistory = [];
var taskRegistory = [];


exports.validateWorkerConfig = function(workerConfig){
  if(!workerConfig.id) // id is unique and mandatory
    throw new Error('Worker ID is required');
  else if(!isUniqueWorker(workerConfig.id))
    throw new Error('Worker is already registered')

  if(workerConfig.from && !isValidFromToFormat(workerConfig.from))
    throw new Error ('Invalid format "From" hh:mm:ss')
  if(workerConfig.to && !isValidFromToFormat(workerConfig.to))
    throw new Error ('Invalid format "To" hh:mm:ss')

  workerRegistory.push(workerConfig.id);
};

exports.validateTaskConfig = function (taskConfig){
  if(!taskConfig.id)
    throw new Error ('Task ID is required');
  else if(!isUniqueTasks(taskConfig.id))
    throw new Error (`${taskConfig.id} already registered`);

  taskRegistory.push(taskConfig.id);
}

const isUniqueWorker = function (workerID){
  if(workerRegistory.length == 0)
    return true;

  return !workerRegistory.includes(workerID);
}

const isUniqueTasks = function (taskID){
  if(taskRegistory.length == 0)
    return true;

  return !taskRegistory.includes(taskID);
}

const isValidFromToFormat = function (fromTo){
  const hhmmss = fromTo.split(":",3);
  const [hh,mm,ss] = hhmmss;

  if(!_.isNumber(_.toNumber(hh)) || !_.isNumber(_.toNumber(mm)) || !_.isNumber(_.toNumber(ss)))
    return false;

  return ((hh >= 0 && hh <=23) && (mm >= 0 && mm <=60) && (ss >= 0 && ss <=60));

}

const isValidInterval = function (interval) {
  return _.isNumber(interval);
}





