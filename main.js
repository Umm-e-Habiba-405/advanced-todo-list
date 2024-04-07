#! usr/bin /env node
import inquirer from "inquirer";
import chalk from "chalk";
let todolist = [];
let condition = true;
console.log(chalk.yellow("\n \t Welcome to your To-Do List \n"));
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.blueBright("Select an option:"),
                choices: ["Add Task", "Delete Task", "Update Task", "View To-Do List", "Exit"]
            }
        ]);
        if (option.choice === "Add Task") {
            await addtask();
        }
        else if (option.choice === "Delete Task") {
            await deletetask();
        }
        else if (option.choice === "Update Task") {
            await updatetask();
        }
        else if (option.choice === "View To-Do List") {
            await viewtask();
        }
        else if (option.choice === "Exit") {
            condition = false;
            console.log(chalk.rgb(255, 202, 212)("Thankyou for visiting our app!"));
        }
    }
};
//add new tasks
let addtask = async () => {
    let newtask = await inquirer.prompt([
        {
            name: "Task",
            type: "input",
            message: chalk.blueBright("Enter the task you want to add:")
        }
    ]);
    todolist.push(newtask.Task);
    console.log(chalk.greenBright(`\n"${newtask.Task}" task added successfully in the To-Do List.`));
};
//view all tasks
let viewtask = () => {
    console.log(chalk.magenta("\n Your To-Do List: \n"));
    todolist.forEach((Task, index) => {
        console.log(chalk.cyan(`${index + 1}: ${Task} `));
    });
};
//delete a task from the list
let deletetask = async () => {
    await viewtask();
    let taskindex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blue("Enter the index number of the task you want to delete :")
        }
    ]);
    let deletedtask = todolist.splice(taskindex.index - 1, 1);
    console.log(chalk.green(`\n Task "${deletedtask}" has been deleted successfully from your To-Do List. [View To-Do LIst to check the updated list.]`));
};
//update task
let updatetask = async () => {
    await viewtask();
    let update_task = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blue("Enter the index number of the task you want to update:")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.blue("Enter the updated task:")
        }
    ]);
    todolist[update_task.index - 1] = update_task.new_task;
    console.log(chalk.green(`\n Task on index no. "${update_task.index}" is successfully updated. [View To-Do LIst to check the updated list.]`));
};
main();
