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
    this.ref = firebase.firestore().collection("users");
    // this.unsubscribe = null;
    this.state = {
      loading: true,
      users: []
    };
  }
  // componentDidMount() {
  //   this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  // }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }
  // onCollectionUpdate = querySnapshot => {
  //   const users = [];
  //   querySnapshot.forEach(doc => {
  //     const { name } = doc.data();
  //     users.push({
  //       key: doc.id,
  //       doc,
  //       name
  //     });
  //   });
  //   this.setState({
  //     users,
  //     loading: false
  //   });
  // };
  render() {
    console.log(this.state.users);
    console.log(this.props);
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
            {_.map(this.state.users, item => (
              <ListItem>
                <Text>{item.name}</Text>
              </ListItem>
            ))}
          </List>
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
    }
  ];
};
export default withFirestore(refs)(App);
