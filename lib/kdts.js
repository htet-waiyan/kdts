const KTSConfig = require('../config/kdts.config.js')
const validator = require('./config.validator.js')
const moment = require('moment')
const util = require('./util')
const childProcess = require('child_process')
const EventEmitter = require('events')
const chokidar = require('chokidar')
const _ = require('lodash')

//Todo change to logger

var taskDependencyRegistory = new Map();

const loadTaskDependency = task => {
  let tasks = taskDependencyRegistory.get(task.dependency);

  if(tasks){
    tasks.push(task);
    taskDependencyRegistory.set(task.dependency,tasks);
  }
  else{
    let newTasks = [];
    newTasks.push(task);
    taskDependencyRegistory.set(task.dependency,newTasks);
  }
}


class TaskSchedular extends EventEmitter {
  executeTask(task){
        console.log(`Executing task ${task.id}`)

        if(_.isFunction(task.command))
          task.command();
        else
          childProcess.exec(task.command);

        this.emit('EndTask',task);
  }

  schedule(){
    KTSConfig.scheduledTasks.forEach(task => {
        const intervalInMs = util.toMilliseconds(task.interval);
        console.log(`Task ${task.id} has been scheduled every day`);
        console.log(`The task will execute from ${task.from} to ${task.to} in every ${intervalInMs} milliseconds`);
        setInterval(() => {
          let justNow = moment();
          let from = moment(task.from,'HH:mm:ss');
          let to = moment(task.to, 'HH:mm:ss');

          if(justNow.isBetween(from,to)){
            this.emit('TimeForTask',task);
          }
        },intervalInMs);
    });

    KTSConfig.eventTasks.forEach(eTask => {
      if(eTask.dependency){
        loadTaskDependency(eTask);
      }

      if(eTask.fileDependency){
          console.log(`Task ${eTask.id} has been scheduled. The task is watching the dir ${eTask.fileDependency}`)
          chokidar.watch(eTask.fileDependency, {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
            if(event == 'add')
              this.emit('FileAdded',eTask);
          });
      }
    })
  }

  execute(){
      this.on('TimeForTask', this.executeTask);

      this.on('FileAdded', this.executeTask);

      this.on('EndTask', endTask => {
        let dependencyTree = taskDependencyRegistory.get(endTask.id) || [];

        //TODO change to async executing of each dependency
        dependencyTree.forEach(dependency => {
          console.log('Executing Dependent Task of '+endTask.id);
          this.executeTask(dependency);
        })
      })

      this.schedule();
  }
}

exports.TaskSchedular = TaskSchedular;
