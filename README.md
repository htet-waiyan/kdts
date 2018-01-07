# KDTS
KAPPS Daily Task Schedular. KDTS is a simple daily schedular.

# Why?
My employer KAPPS is a software vendor to a bank where SA had disabled cron job in all SIT/UAT environemt which prevent me from automating my daily work.
I know there are plenty of schedular which is ready to use and more feature-rich. But while I have a chance, I wanted to create my own simple yet useful to me (only, may be) a daily schedular written in Node.js

# How to use
You will need to have node.js install in your environment. To start the daily schedular, run

	node index.js

This will start the daily schedular. 
Configure the tasks in the /config/kdts.config.js file. There are two types of tasks - Scheduled Task and Event Task.

# Scheduled Task
This taks daily regular tasks which can be configured to run in particular interval within particular times.
e.g Run the backup script everday from 9am to 6pm at every 1 hours.

	    {
          id : // unique id of the task
          command : // command or function to perform certain task
          from: "00:00:00", // start time of tasks in HH:mm:ss format
          to: "23:59:00", // end time of the task in HH:mm:ss format
          interval : "000003" // frequency of the task HHmmss format
        }

For the above example, the task will run in every day from 12am to 23:59 at every 3 seconds.

# Event Task
This task will trigger based on event. e.g Do something when a file comes in to particular directory. Or do something after particular task has completed.

	     {
          id : // unique id of the task
          fileDependency : // direcotry of file path to be watched
          command : // command or function to perform certain task
          dependency : 'Task1' //dependent task id
        }

For the above example, the task will run when the file or dir has changed and Task1 has completed.

# License
Do whatever you want License.
