const KTSConfig = require('../config/kdts.config.js')
const validator = require('./config.validator.js')
const moment = require('moment')
const util = require('./util')
const childProcess = require('child_process')
const EventEmitter = require('events')
const chokidar = require('chokidar')

var taskDependencyRegistory = new Map();

var testMap = new Map();
testMap.set('k1','v1');
testMap.set('k2','v2');

class TaskSchedular extends EventEmitter {
  schedule(){
    KTSConfig.scheduledTasks.forEach(task => {
        this.emit('Scheduled',task)
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

    let dependentTasks = [];

    KTSConfig.eventTasks.forEach(eTask => {
      this.emit('Scheduled',eTask);

      if(eTask.dependency){
        dependentTasks.push(eTask);
        taskDependencyRegistory.set(eTask.dependency,dependentTasks);
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
      this.on('TimeForTask', task => {
        console.log(`Executing task ${task.id}`)
        childProcess.exec(task.command);
        this.emit('EndTask',task);
      })

      this.on('FileAdded', eTask => {
        console.log(`Executing task ${eTask.id}`)
        childProcess.exec(eTask.command);
        this.emit('EndTask',eTask);
      })

      this.on('EndTask', endTask => {
        let dependencyTree = taskDependencyRegistory.get(endTask.id) || [];

        dependencyTree.forEach(dependency => {
          console.log(`Executing task ${eTask.id}`)
          childProcess.exec(dependency.command);
          this.emit('EndTask',eTask);
        })
      })

      this.schedule();
  }
}

exports.TaskSchedular = TaskSchedular;
