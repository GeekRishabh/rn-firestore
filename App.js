import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Spinner,
  Body,
  Title,
  Icon,
  Left,
  Right,
  Button,
  List,
  ListItem,
  Text
} from "native-base";
import _ from "lodash";
import withFirestore from "./src/hocs";
import firebase from "react-native-firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      users: []
    };
  }
  addUser() {
    this.ref.add({
      name: "testme"
    });
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>FireStore-Hoc</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            {_.map(this.props.data.users, item => (
              <ListItem>
                <Text>{item.name}</Text>
              </ListItem>
            ))}
          </List>
          <Button onPress={() => this.addUser()}>
            <Text>CLICK TO ADD</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const refs = props => {
  return [
    {
      name: "users",
      ref: firebase.firestore().collection("users")
    },
    {
      name: "todos",
      ref: firebase.firestore().collection("todos")
    }
  ];
};
export default withFirestore(refs)(App);
