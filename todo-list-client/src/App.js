import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { theme, useStyles } from "./utils/theme";
import React, { useState, useEffect } from "react";
import Web3 from "web3"; //for ethereum connection
import Contract from "./contracts/ToDoListContract.json"; //for network id, abi, and load contract
import { encrypt, decrypt } from "./utils/encrypt";

const App = () => {
  const classes = useStyles();
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);
  const [todoCount, setTodoCount] = useState();
  const [issubmit, setIssubmit] = useState(false);
  const [inpustring, setInpustring] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadweb3 = async () => {
      try {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(window.web3);
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          setWeb3(window.web3);
        } else {
          window.alert(
            "Non-Ethereum browser detected, cannot load connection.."
          );
        }
      } catch (error) {
        window.alert(
          "Unable to load connection, see console for  more details"
        );
        console.log(error);
      }
    };
    loadweb3();
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Contract.networks[networkId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(
            Contract.abi,
            deployedNetwork.address
          );
          setContract(instance);
        } else {
          window.alert(`Contract not deployed to detected network.`);
        }
      } catch (error) {
        alert(`Failed to load Check Console for More details`);
        console.error(error);
      }
    };
    if (typeof web3 !== `undefined`) {
      init();
    }
  }, [web3]);

  const reload = async () => {
    try {
      const tempCount = await contract.methods
        .getToDoLength()
        .call({ from: accounts[0] });
      setTodoCount(tempCount);
      var tempData = [];
      for (var i = todoCount - 1; i >= 0; i--) {
        const todoData = await contract.methods
          .getToDo(i)
          .call({ from: accounts[0] });
        todoData[1] = await decrypt(todoData[1]);
        tempData = [...tempData, todoData];
      }
      setData(tempData);
      console.log(tempData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const tempCount = await contract.methods
          .getToDoLength()
          .call({ from: accounts[0] });
        setTodoCount(tempCount);
        console.log(todoCount);
        var tempData = [];
        for (var i = todoCount - 1; i >= 0; i--) {
          const todoData = await contract.methods
            .getToDo(i)
            .call({ from: accounts[0] });
          todoData[1] = await decrypt(todoData[1]);
          tempData = [...tempData, todoData];
          console.log(todoData);
        }
        setData(tempData);
      } catch (error) {
        window.alert("unable to load data...");
        console.log(error);
      }
    };
    if (
      typeof contract !== "undefined" &&
      typeof contract.methods !== "undefined"
    ) {
      load();
    }
  }, [contract, todoCount, accounts]);

  const handleSubmit = async () => {
    if (inpustring.trim() !== "") {
      const todo = await encrypt(inpustring);
      await contract.methods
        .createToDo(todo, Date.now())
        .send({ from: accounts[0] });
      reload();
      setIssubmit(false);
      setInpustring("");
    }
  };

  const handleDone = async (i) => {
    await contract.methods.setToDoDone(i).send({ from: accounts[0] });
    reload();
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ marginLeft: 50 }}
              noWrap
            >
              ToDo List App
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Container>
              <Divider />
              <List>
                <ListItem>
                  <ListItemText
                    primary="Account Address: "
                    secondary="ToDo Count: "
                    style={{ padding: "15px" }}
                  />
                  <ListItemText
                    primary={
                      <div style={{ wordWrap: "break-word" }}>
                        {accounts[0]}
                      </div>
                    }
                    secondary={todoCount}
                  />
                  <ListItemIcon
                    style={{
                      width: "80px",
                      height: "80px",
                      padding: "5px",
                    }}
                  >
                    <img
                      style={{ borderRadius: "20px" }}
                      src={`https://blockies.shipchain.io/${accounts[0]}.png`}
                      alt="Account Blockies IdentyIcon"
                    />
                  </ListItemIcon>
                </ListItem>
              </List>
              <Divider />
              <div
                style={{
                  align: "center",
                  textAlign: "center",
                  width: "auto",
                  margin: "20px",
                }}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIssubmit(true);
                    handleSubmit();
                  }}
                >
                  <TextField
                    label="Enter Your ToDo Here !!"
                    error={issubmit === true && inpustring.trim() === ""}
                    helperText={
                      issubmit === true && inpustring.trim() === ""
                        ? "This Field is Required"
                        : ""
                    }
                    value={inpustring}
                    onChange={(e) => {
                      setInpustring(e.target.value);
                    }}
                  />
                  <Button type="submit" style={{ marginTop: "12px" }}>
                    Add
                  </Button>
                </form>
              </div>
              <Divider />
              <List>
                <ListItem>
                  <ListItemText primary="Your ToDo`s Here ..." align="center" />
                </ListItem>
              </List>
              <Divider />
              {typeof data !== "undefined" || data.length !== 0 ? (
                <List>
                  {data.map((idx) => {
                    return (
                      <ListItem key={idx[3]}>
                        <ListItemText
                          primary={
                            <div style={{ wordWrap: "break-word" }}>
                              {idx[1]}
                            </div>
                          }
                        />
                        <ListItemText
                          secondary={
                            idx[2] ? (
                              <Button disabled>Alredy Done !</Button>
                            ) : (
                              <Button
                                color="primary"
                                onClick={() => {
                                  handleDone(idx[0]);
                                }}
                              >
                                Done
                              </Button>
                            )
                          }
                          align="right"
                        />
                      </ListItem>
                    );
                  })}
                </List>
              ) : null}
            </Container>
          </Paper>
        </main>
      </ThemeProvider>
    </div>
  );
};

export default App;
