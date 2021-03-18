const ToDoListContract = artifacts.require("ToDoListContract");

module.exports = function (deployer) {
  deployer.deploy(ToDoListContract);
};
